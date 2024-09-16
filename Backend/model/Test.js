const mongoose = require('mongoose');

// Define the schema for a test
const testSchema = new mongoose.Schema({
  duration: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  testType: {
    type: String,
    required: true,
    enum: ['mock', 'main']
  },
  subject: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  questions: [
    {
      number: {
        type: Number,
        required: true
      },
      text: {
        type: String,
        required: true
      },
      answers: {
        type: [String],
        required: true
      },
      correctAnswer: {
        type: Number,
        required: true
      }
    }
  ],
}, { timestamps: true });

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
