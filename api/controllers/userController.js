const User = require('../models/user');
const { asyncHandler } = require('../utils/asyncHanlder');
const AppError = require('../utils/appError');
const { filterObj } = require('../utils/filterObj');

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  return res.send({
    status: 'success',
    results: users.length,
    data: users,
  });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id).populate({ path: 'children' });

  if (!user) {
    return next(new AppError(`No user with the ID ${req.originalUrl}`, 404));
  }

  if (String(user._id) !== req.user.id) {
    return next(
      new AppError(
        `You are not authorize to visits this page ${req.originalUrl}`,
        403
      )
    );
  }
  res.status(200).send({ status: 'success', data: user });
});

exports.updateMe = asyncHandler(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates, please use /updateMyPassword',
        400
      )
    );
  }
  const filteredBody = filterObj(req.body, 'firstName', 'lastName', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  }).populate({ path: 'children' });

  res.status(200).json({ status: 'sucess', data: updatedUser });
});

exports.deleteMe = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({ status: 'sucess', data: null });
});
