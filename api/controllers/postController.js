const Post = require('../models/post');
const Lesson = require('../models/lesson');
const Child = require('../models/child');
const AppError = require('../utils/appError');
const { asyncHandler } = require('../utils/asyncHanlder');
require('dotenv').config();

exports.getPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find();
  return res.json({
    status: 'success',
    results: posts.length,
    data: posts,
  });
});

exports.getUserPosts = asyncHandler(async (req, res, next) => {
  if (!req.user._id) {
    return next(
      new AppError(
        `You are not authorize to visits these posts ${req.originalUrl}`,
        403
      )
    );
  }

  const posts = await Post.find({ userId: req.user._id }).sort({
    createdAt: -1,
  });

  return res.json({
    status: 'success',
    results: posts.length,
    data: posts,
  });
});

exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new AppError(`No post with the ID ${req.originalUrl}`, 404));
  }

  if (String(post.userId._id) !== req.user.id) {
    return next(
      new AppError(
        `You are not authorize to visits this posts ${req.originalUrl}`,
        403
      )
    );
  }
  res.status(200).json({ stats: 'sucess', data: { post } });
});

exports.createPost = asyncHandler(async (req, res, next) => {
  const { desc } = req.body;
  const userId = req.user._id;
  const lesson = await Lesson.findOne({ lessonNum: req.body.lessonNum });
  const child = await Child.findById(req.body.childId);
  let path = null;
  if (req.file) {
    path = req.file.path;
  }

  const newPost = {
    desc,
    lessonId: lesson._id,
    userId,
    childId: child._id,
    image: path,
  };

  const post = await Post.create(newPost);
  return res.status(201).json({ status: 'success', data: post });
});

exports.updatePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new AppError(`No post with the ID ${req.originalUrl}`, 404));
  }

  if (String(post.userId._id) !== req.user.id) {
    return next(
      new AppError(
        `You are not authorize to edit this post ${req.originalUrl}`,
        403
      )
    );
  }

  const lesson = await Lesson.findOne({ lessonNum: req.body.lessonNum });
  if (req.body.lessonNum) req.body.lessonId = lesson.id;

  const { desc, lessonId, childId } = req.body;
  let image = null;
  if (req.file) {
    image = req.file.path;
  }

  const reqBody = { desc, lessonId, childId, image };
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, reqBody, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({ status: 'success', data: updatedPost });
});

exports.updateDifficultyLevel = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new AppError(`No post with the ID ${req.originalUrl}`, 404));
  }

  if (String(post.userId._id) !== req.user.id) {
    return next(
      new AppError(
        `You are not authorize to edit this post ${req.originalUrl}`,
        403
      )
    );
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body);
  return res.status(200).json({ status: 'success', data: updatedPost });
});

exports.deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new AppError(`No post with the ID ${req.originalUrl}`, 404));
  }
  if (String(post.userId._id) !== req.user.id) {
    return next(
      new AppError(
        `You are not authorize to delete this post ${req.originalUrl}`,
        403
      )
    );
  }
  post.remove(function (err, item) {
    if (err)
      return next(new AppError(`could not proceed deleting ${err}`, 500));
  });
  res.status(204).json({ status: 'success', data: null });
});
