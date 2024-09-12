const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
    name:String,
    email: String,
    phone: String,

  },{ timestamps: true });
  
  // Create a model from the schema
 
  module.exports = mongoose.model('FormData', formDataSchema);