const mongoose = require('mongoose');

// Define the schema for a test
const testSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
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
  summary: {
    type: String,
    required: true
  },
  testType: {
    type: String,
    required: true,
    enum: ['mock', 'main']
  }, 
  
  examType: {
    type: String,
   
  },
  image: {
    type: String,
    default:"https://img.freepik.com/premium-vector/test-icon-illustration_430232-32.jpg"},

  subject: {
    type: String,
    required: true
  },
  level: { 
    type: String,
    required: true,
    default: 'easy', 
    enum: ['hard', 'easy', 'medium'],
  },
  price: {
    type: String,
    default: '100.00', // Set your default price here
    // required: true
  },
  paymentAccess: {
    type: Boolean,
    default: false
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
      },
     
    }
  ],


  testModules: [{
    moduleNumber: {
      type: Number,
      required: true, // Indicates the module order
    },
    title: {
      type: String,
      required: true, // Module title (e.g., "Front-End Web Development")
    },
    description: {
      type: String,
      required: true, // Module description (e.g., "Ensure data accuracy...")
    },
  }],

},  { timestamps: true });

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
