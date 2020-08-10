const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  lessonNum: { type: Number, min: 1, max: 86 },
  tags: [String],
});

module.exports = mongoose.model('Lesson', lessonSchema);
