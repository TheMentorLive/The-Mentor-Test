const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  examType: { type: mongoose.Schema.Types.ObjectId, ref: 'ExamType', required: true },
  
  createdAt: {
    type: Date,}

});

module.exports = mongoose.model('Category', categorySchema);
