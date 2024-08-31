const path = require('path');
const fs = require('fs');
const AWS = require('aws-sdk');
const Test = require("../model/Test");


const apply= async (req, res) => {
    console.log(req.body);
    try {
      const { firstName, lastName, email, phone, coverLetter } = req.body;
      const resume = req.file;
  
      // Validate required fields
      if (!firstName || !lastName || !email || !phone || !resume) {
        return res.status(400).json({ msg: 'Please provide all required fields.' });
      }
  
      // Create a new application instance
      const application = new applicationModel({
        firstName,
        lastName,
        email,
        phone,
        coverLetter,
        resume: resume.path, // Save the file path to the database
      });
  
      // Save application to the database
      await application.save();
      res.status(201).json({ msg: 'Application submitted successfully!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server error' });
    }
  };
  


// AWS.config.update({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.AWS_REGION
//   });
  
//   const s3 = new AWS.S3();
  
//   const uploadToS3 = async (file) => {
//     const params = {
//       Bucket: process.env.S3_BUCKET_NAME,
//       Key: `resumes/${Date.now()}_${file.originalname}`, // Path within the bucket
//       Body: file.buffer,
//       ContentType: file.mimetype,
//       ACL: 'public-read' // Make the file publicly accessible
//     };
  
//     return s3.upload(params).promise();
//   };
  
//   const apply = async (req, res) => {
//     console.log(req.body);
  
//     try {
//       const { firstName, lastName, email, phone, coverLetter } = req.body;
//       const resume = req.file;
  
//       // Validate required fields
//       if (!firstName || !lastName || !email || !phone || !resume) {
//         return res.status(400).json({ msg: 'Please provide all required fields.' });
//       }
  
//       // Upload resume to S3
//       const result = await uploadToS3(resume);
//       const resumeUrl = result.Location; // S3 URL of the uploaded file
  
//       // Create a new application instance
//       const application = new applicationModel({
//         firstName,
//         lastName,
//         email,
//         phone,
//         coverLetter,
//         resume: resumeUrl // Save the S3 URL to the database
//       });
  
//       // Save application to the database
//       await application.save();
//       res.status(201).json({ msg: 'Application submitted successfully!' });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ msg: 'Server error' });
//     }
//   };

const getTests= async (req, res) => {
 console.log(req.query);
 
  const { subject } = req.query;

  try {
    if (!subject) {
      return res.status(400).json({ message: 'Subject is required.' });
    }

    // Fetch tests based on the subject
    const tests = await Test.find({ subject });
    
    // Check if tests exist for the given subject
    if (tests.length === 0) {
      return res.status(404).json({ message: 'No tests found for this subject.' });
    }

    res.json(tests);
  } catch (error) {
    console.error('Error fetching tests:', error);
    res.status(500).json({ message: 'Server error. Failed to fetch tests.' });
  }
};




module.exports={apply,
  getTests
 
    
}