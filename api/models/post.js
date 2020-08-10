const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    desc: {
      type: String,
      required: [true, 'Please add a description'],
      trim: true,
    },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
      required: [true, 'Please add a lesson number'],
    },
    difficultyLevel: { type: Number, min: 0, max: 5, default: 0 },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please add a user Id'],
    },

    childId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Child',
      required: [true, 'Please add a child Id'],
    },
    image: { type: String },

    createdAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'lessonId',
  }).populate({ path: 'childId' });
  next();
});

module.exports = mongoose.model('Post', postSchema);
