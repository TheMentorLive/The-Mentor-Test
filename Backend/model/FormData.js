const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
    email: String,
    phone: String,
    qualification: String,
    interest: String,
  });
  
  // Create a model from the schema
 
  module.exports = mongoose.model('FormData', formDataSchema);