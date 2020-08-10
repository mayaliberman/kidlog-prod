const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINDARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECERT,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'kidlog',
    allowedFormats: ['jpg', 'jpeg', 'png'], // supports promises as well
    // public_id: (req, file) => 'computed-filename-using-request',
    type: 'authenticated',
  },
});

const parser = multer({ storage: storage });
const router = express.Router();

const {
  getPost,
  createPost,
  getUserPosts,
  updatePost,
  deletePost,
  getPosts,
  updateDifficultyLevel,
} = require('../controllers/postController');

//***ROUTES */
//USER ROUTES
router.use(protect);
router.get('/', getPosts);
//get all user posts posts
router.get('/myposts', getUserPosts);

//get a single post
router.get('/:id', getPost);

// create a new post
router.post('/', parser.single('image'), createPost);

//update a post
router.patch('/:id', parser.single('image'), updatePost);

//update difficultyLevel

router.patch('/update-difficult/:id', updateDifficultyLevel);

//delete a post
router.delete('/:id', deletePost);
//Return when posts are ready in client
// router.get('/', restrictTo('admin'), getPosts);

module.exports = router;
