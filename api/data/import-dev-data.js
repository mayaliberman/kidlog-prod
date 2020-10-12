const fs = require('fs');

const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const Post = require('../models/post');
const User = require('../models/user');

dotenv.config({ path: '.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful!');
  });

//    read jason file

// const posts = JSON.parse(fs.readFileSync(`${__dirname}/posts.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
//    import data into database

const importData = async () => {
  try {
    // await Post.create(posts);
    await User.create(users);
    console.log('Data successfuly logged');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete all data from collection
const deleteData = async () => {
  try {
    // await Post.deleteMany();
    await User.deleteMany();
    console.log('Data successfuly deleted');
  } catch (err) {}
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
