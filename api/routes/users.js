const express = require('express');
const childrenRouter = require('./children');

const router = express.Router();

const {
  // updateUser,
  getUser,
  getAllUsers,
  updateMe,
  deleteMe,
  getMe,
} = require('../controllers/userController');

const {
  signup,
  signin,
  protect,
  restrictTo,
  forgotPassword,
  resetPassword,
  updatePassword,
  validateEmail,
  validateCurrentPassword,
} = require('../controllers/authController');

//****ROUTES  */

//Authentication ROUTES

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/validateEmail', validateEmail);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

//User Routes
router.use(protect);

router.get('/me', getMe, getUser);
router.patch('/updateMe', updateMe);
router.patch('/updateMyPassword', updatePassword);
router.post('/validateCurrentPassword', validateCurrentPassword);
router.delete('/deleteMe', deleteMe);
router.use('/:id/children/', childrenRouter);

//Admin routes Don't forger to put restictTo and protect in production
router.get('/:id', getUser);
router.get('/', restrictTo('admin'), getAllUsers);

module.exports = router;
