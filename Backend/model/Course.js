// models/Course.js

const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  instructor: {
    type: String,
    required: true,
    trim: true,
  },
  duration: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner',
  },
  lessons: [
    {
      title: String,
      content: String,
      videoUrl: String,
      duration: String,
    },
  ],
  prerequisites: {
    type: [String],
  },
  imageUrl: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  startDate:{
    type: Date,
    default: Date.now,

  },
  enrolledStudents: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Course', courseSchema);
