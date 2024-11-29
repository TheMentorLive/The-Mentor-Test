// models/ExamType.js
const mongoose = require('mongoose');

const examTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('ExamType', examTypeSchema);
