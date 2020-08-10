const mongoose = require('mongoose');

const childSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A child must have a name'],
      unique: false,
      index: false,
    },
    birthYear: { type: Number, required: true },
    gender: { type: String, required: true },
    active: {
      type: Boolean,
      default: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: true }
);

// childSchema.pre(/^find/, async function (next) {
//   //this points to the current query
//   this.find({ active: { $ne: false } });
//   next();
// });

module.exports = mongoose.model('Child', childSchema);
