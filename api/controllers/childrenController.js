const User = require('../models/user');
const Child = require('../models/child');
const { asyncHandler } = require('../utils/asyncHanlder');
const { filterObj } = require('../utils/filterObj');
const AppError = require('../utils/appError');

exports.getChild = asyncHandler(async (req, res, next) => {
  const child = await Child.findById(req.params.childId);

  if (!child) {
    return next(
      new AppError(`No child with the ID ${req.params.childId}`, 404)
    );
  }

  if (child.active === false) {
    return next(new AppError('This child have been cancelled', 400));
  }

  if (String(child.user) !== req.params.id) {
    return next(
      new AppError(
        `You are not authorize to visits this page ${req.originalUrl}`,
        403
      )
    );
  }
  return res.status(200).json({ status: 'success', data: child });
});

exports.createChild = asyncHandler(async (req, res, next) => {
  const { name, birthYear, gender } = req.body;

  const user = req.user.id;
  const childBody = {
    name,
    birthYear,
    gender,
    user,
  };

  const newChild = await Child.create(childBody);

  return res.status(201).json({
    status: 'success',
    data: { child: newChild },
  });
});

exports.updateChild = asyncHandler(async (req, res, next) => {
  const child = await Child.findById(req.params.childId);
  if (!child) {
    return next(
      new AppError(`No child with the ID ${req.params.childId}`, 404)
    );
  }

  if (child.active === false) {
    return next(
      new AppError(
        'This child have been cancelled, please connect the administrator',
        400
      )
    );
  }
  if (req.params.id !== req.user.id) {
    return next(
      new AppError(
        `You are not authorize to visits this page ${req.originalUrl}`,
        403
      )
    );
  }
  const filteredBody = filterObj(req.body, 'name', 'birthYear', 'gender');
  const updatedUser = await Child.findByIdAndUpdate(child._id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).send(updatedUser);
});

exports.deleteChild = asyncHandler(async (req, res, next) => {
  const child = await Child.findById(req.params.childId);
  console.log(child);

  if (!child) {
    return next(new AppError(`No user with the ID ${req.originalUrl}`, 404));
  }

  if (String(child.user) !== req.user.id) {
    console.log(
      JSON.stringify(child.user),
      'child.user',
      req.user.id,
      'req.uesr.id'
    );
    return next(
      new AppError(
        `You are not authorize to visits this page ${req.originalUrl}`,
        403
      )
    );
  }
  if (child.active === false) {
    return next(
      new AppError(
        `This user already been cancelled ${req.params.childId}`,
        400
      )
    );
  }

  child.active = false;
  child.save();
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
