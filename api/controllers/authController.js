const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const User = require('../models/user');
const { asyncHandler } = require('../utils/asyncHanlder');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');

const signToken = (user) => {
  user.password = undefined;
  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),

    httpOnly: true,
  };
  if (process.env.NODE_END === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);
  user.password = undefined;
  res.status(statusCode).json({
    status: 'sucess',
    token,
    data: { user: user },
  });
};

exports.validateEmail = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ status: 'failed', msg: 'username already been taken' });
    }
    return res.json({ status: 'sucess', msg: 'user available' });
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

exports.signup = asyncHandler(async (req, res, next) => {
  try {
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role,
    });
    createSendToken(newUser, 201, res);
  } catch (err) {
    err.status = 'email';
    err.statusCode = 400;
    err.message = 'Email already exists';
    next(err);
  }
});

exports.signin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide correct email and password', 400));
  }
  //check if the user exist && password is correct
  const user = await User.findOne({ email })
    .select('+password')
    .populate({ path: 'children' });

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 400));
  }

  //if everything is ok, send token to client
  createSendToken(user, 200, res);
});

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.user._id);
  if (!currentUser) {
    return next(
      new AppError(`The user belonging this token does not exist anymore`, 401)
    );
  }
  if (currentUser.changePasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password, Please login again!', 401)
    );
  }

  req.user = currentUser;

  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    //roles is an array ['admin', 'lead-guide']
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have a permission to perform this action', 403)
      );
    }
    next();
  };
};

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${process.env.REACT_APP_BASE_URL}/reset-password/${resetToken}`;

  const message = `<p>Forgot your password? Submit your new password and passwordConfirm here on our <p><a href=${resetURL}>Kidlog App</a>\n<p>If you didn't forget your password, please ignore this email!<p>`;

  try {
    if (process.env.NODE_ENV === 'production') {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: user.email,
        from: 'maya@stages.global',
        subject: 'Your password reset token (valid for 10 min)',
        html: message,
      };

      sgMail.send(msg);
    }
    if (process.env.NODE_ENV === 'development') {
      await sendEmail({
        email: user.email,
        subject: 'Your password reset token (valid for 10 min)',
        message,
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  //get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  //set the new password only if token is not exipered and there is user

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: {
      $gt: Date.now(),
    },
  }).populate({ path: 'children' });

  //update changedPasswordAt property for the user
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  //log the user in, send JWT
  createSendToken(user, 201, res);
});

exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id)
    .select('+password')
    .populate({ path: 'children' });

  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  createSendToken(user, 200, res);
});

exports.validateCurrentPassword = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('+password');

    if (
      !(await user.correctPassword(req.body.passwordCurrent, user.password))
    ) {
      return res.json({
        status: 'failed',
        msg: 'Your current password is wrong',
      });
    }
    return res.json({ status: 'sucess', msg: 'Current password is correct' });
  } catch (err) {
    res.status(400).json({ status: 'failed', msg: err.message });
  }
});
