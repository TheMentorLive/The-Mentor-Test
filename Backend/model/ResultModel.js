const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
  testId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  answers: [Number],
  correctAnswers: [Number],
  completionTime: Number, // Time in seconds
  totalDuration: Number, // Total duration in seconds
  flaggedQuestions: [Number],
  score: Number,
  status: { type: String },
  rank: Number, // New field for rank
  accuracy: Number, // New field for accuracy percentage
  totalCorrect: Number, 
  attempts:Number,// New field for total correct answers

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TestResult', testResultSchema);
