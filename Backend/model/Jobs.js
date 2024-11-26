// models/Job.js
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  companyImage: String,
  location: String,
  salary: String,
  experience: String,
  description: String,
  role: String,
  otherDetails: [String],
  aboutCompany: String,
  url: String,
  siteKey: String,

}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
