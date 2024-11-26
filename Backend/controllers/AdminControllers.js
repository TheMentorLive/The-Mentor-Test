const Course = require("../model/Course");
const Jobs = require("../model/Jobs");
const SubjectModel = require("../model/SubjectModel");
const Test = require("../model/Test");
const UserModel = require("../model/UserModel");
const { scrapeJobDetails } = require("../utils/scrapper");
const jobSelectors = require("../utils/selectors");


const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find(); // Await the promise returned by find()
    res.json({
      users,
      message: "Successfully fetched users",
      success: true
    });
  } catch (error) {
    console.error(error); // Log the error to the console
    res.status(500).json({
      message: "An error occurred while fetching users",
      success: false
    });
  }
};

const getFormData = async (req, res) => {
  try {
    const forms = await FormData.find(); // Await the promise returned by find()
    res.json({
      forms,
      message: "Successfully fetched users",
      success: true
    });
  } catch (error) {
    console.error(error); // Log the error to the console
    res.status(500).json({
      message: "An error occurred while fetching Forms",
      success: false
    });
  }
};


const getMessages = async (req, res) => {
  try {
    const messages = await ContactModel.find().sort({ createdAt: -1 });

    res.json({
      messages,
      message: "Successfully fetched messages",
      success: true
    });
  } catch (error) {
    console.error(error); // Log the error to the console
    res.status(500).json({
      message: "An error occurred while fetching users",
      success: false
    });
  }
};

const getApplication = async (req, res) => {

  try {


    const applications = await applicationModel.find().sort({ createdAt: -1 });

    res.json({
      applications,
      message: "Successfully fetched Applications",
      success: true
    });
  } catch (error) {
    console.error(error); // Log the error to the console
    res.status(500).json({
      message: "An error occurred while fetching users",
      success: false
    });
  }
};

const addSubject = async (req, res) => {



  const { name, description } = req.body;

  try {
    // Create a new subject
    const newSubject = new SubjectModel({
      name,
      description,
    });

    // Save the subject to the database
    await newSubject.save();

    // Send a success response
    res.status(201).json({ message: 'Subject added successfully' });
  } catch (error) {
    console.error('Error adding subject:', error);
    if (error.code === 11000) {
      // Handle duplicate subject names
      res.status(400).json({ message: 'Subject name already exists' });
    } else {
      res.status(500).json({ message: 'Server error. Please try again.' });
    }
  }
};

const getSubjects = async (req, res) => {

  try {
    const subjects = await SubjectModel.find();
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subjects', error });
  }
};

const deleteSubject = async (req, res) => {


  const { id } = req.params;

  try {
    const subject = await SubjectModel.findByIdAndDelete(id);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.status(200).json({ message: 'Subject deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subject', error });
  }
};

const createTest = async (req, res) => {
  try {
    const { questions, duration, category, description, testType, subject } = req.body;

    const newTest = new Test({
      duration,
      category,
      description,
      testType,
      subject,
      questions, // No need to parse JSON since it's already an object
    });

    await newTest.save();

    res.status(201).json({ message: 'Test added successfully', test: newTest });
  } catch (error) {
    console.error('Error adding test:', error);
    res.status(500).json({ message: 'Server error. Failed to add test.' });
  }
};


const saveTest = async (req, res) => {
  const { questions } = req.body; // Get questions from the request
  console.log("questions", questions);

  try {
    // Check if questions data is available
    if (!questions || questions.length === 0) {
      return res.status(400).send('No questions data provided');
    }

    // Extract metadata from the first row (assuming all rows have consistent metadata)
    const [header, ...rows] = questions;
    const metadata = rows[0]; // Assuming metadata is consistent in the first row of actual data

    const category = metadata[2]?.trim() || 'Unknown Category';
    const description = metadata[3]?.trim() || 'No description';
    const duration = parseInt(metadata[4]?.trim(), 10) || 60; // Default duration if not provided
    const testType = metadata[5]?.trim() || 'mock';

    // Extract subject from the first question (assuming consistent across all questions)
    const subject = rows[0][1]?.trim() || 'Unknown Subject';

    // Map the rest of the data to the schema
    const formattedQuestions = rows.map((row) => ({
      number: parseInt(row[0].trim(), 10), // Convert number to integer
      subject: row[1].trim(),          // Subject field
      category: row[2].trim(),         // Category field
      description: row[3].trim(),      // Description field
      duration: parseInt(row[4].trim(), 10), // Duration field
      testType: row[5].trim(),         // Test type field
      level: row[6].trim(),            // Level field
      text: row[7].trim(),             // Question text
      answers: row[8].split('|').map(answer => answer.trim()), // Split answers by '|'
      correctAnswer: parseInt(row[9].trim(), 10) - 1 // Correct answer index adjusted (zero-based index)
    }));

    // Create a new test document with extracted metadata
    const test = new Test({
      duration, // Duration from metadata
      category, // Category from metadata
      description, // Description from metadata
      testType, // Test type from metadata
      subject, // Use the extracted subject from the first question
      questions: formattedQuestions, // Use the mapped questions array
      level: formattedQuestions[0]?.level || 'Unknown Level' // Assuming all questions have the same level
    });

    // Save the test to the database
    const savedTest = await test.save();
    console.log('Test saved:', savedTest);
    return res.status(201).json(savedTest);
  } catch (error) {
    console.error('Error saving questions to DB:', error);
    return res.status(500).send('Error saving questions to database');
  }
};



const getMockTests= async(req,res)=>{
  try {
    const mockTests = await Test.find({testType:"mock"});
    res.json(mockTests);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching mock tests' });
  }
};


const editMockTests = async (req, res) => {
  const { description, category, testType, duration, paymentAccess } = req.body; // Ensure paymentAccess is destructured from the request body
  const { id } = req.params; // Get the test ID from the request parameters

  try {
    // Ensure the ID exists before attempting to update
    if (!id) {
      return res.status(400).json({ message: 'Test ID is required' });
    }

    // Find the test by ID and update it
    const updatedTest = await Test.findByIdAndUpdate(
      id,
      {
        description,
        category,
        testType,
        duration,
        paymentAccess, // Make sure the field is part of the update
      },
      { new: true } // Return the updated document
    );

    // If no test found, return 404
    if (!updatedTest) {
      return res.status(404).json({ message: 'Test not found' });
    }

    // Send the updated test back
    res.status(200).json(updatedTest);
  } catch (error) {
    console.error('Error updating test:', error);
    res.status(500).json({ message: 'Error updating test' });
  }
};

const deleteMockTest = async (req, res) => {
  const { id } = req.params; // Get the test ID from the request parameters

  try {
    // Find the test by ID and remove it
    const deletedTest = await Test.findByIdAndDelete(id);

    // If no test found, return 404
    if (!deletedTest) {
      return res.status(404).json({ message: 'Test not found' });
    }

    // Send a success message
    res.status(200).json({ message: 'Test deleted successfully' });
  } catch (error) {
    console.error('Error deleting test:', error);
    res.status(500).json({ message: 'Error deleting test' });
  }
}

const getMockDetails = async (req, res) => {
  try {
    const testId = req.params.id;
    const mockTest = await Test.findById(testId);
    if (!mockTest) {
      return res.status(404).json({ message: 'Test not found' });
    }
    res.status(200).json(mockTest);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching test details', error });
  }
};

const getMainTests =async(req,res)=>{
  try {
    const mainTests = await Test.find({testType:"main"});
    res.json(mainTests);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching mock tests' });
  }
};

const addCourse = async (req, res) => {
  console.log(req.body);

  try {
    const {
      title,
      description,
      category,
      duration,
      instructor,
      startDate,
      price,
      image, // Assuming this is coming from file upload
      level,
      prerequisites,
      imageUrl,
      lessons,
    } = req.body;

    // Validate required fields
    if (!title || !instructor || !startDate || !category || !duration || !price) {
      return res.status(400).json({ success: false, message: 'Please fill all required fields.' });
    }

    // Validate startDate format
    const parsedDate = new Date(startDate);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ success: false, message: 'Invalid date format for startDate.' });
    }

    // Validate lessons structure
    if (!Array.isArray(lessons) || lessons.some(lesson => !lesson.title || !lesson.content)) {
      return res.status(400).json({ success: false, message: 'Lessons must be an array and contain title and content.' });
    }

    // Create new course instance
    const newCourse = new Course({
      title,
      description,
      category,
      duration: Number(duration), // Ensure numeric
      instructor,
      startDate: parsedDate, // Store as Date object
      price: Number(price), // Ensure numeric
      image, // Adjust this if you're handling file uploads separately
      level,
      prerequisites: Array.isArray(prerequisites) ? prerequisites : [], // Ensure it's an array
      imageUrl,
      lessons: lessons.map(lesson => ({
        title: lesson.title,
        content: lesson.content,
        videoUrl: lesson.videoUrl || '', // Default to empty string if not provided
        duration: Number(lesson.duration) || 0, // Default to 0 if not provided
      })),
    });

    // Save course to the database
    await newCourse.save();
    return res.status(201).json({ success: true, message: 'Course added successfully', course: newCourse });
  } catch (error) {
    console.error('Error saving course:', error);
    return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};

module.exports = { addCourse };



const getCourse=async(req,res)=>{
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses" });
  }
}

const deleteCourse = async (req, res) => {
  const { id } = req.query; // Extract id from query parameters

  if (!id) {
    return res.status(400).json({ message: "Course ID is required." });
  }

  try {
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (deletedCourse) {
      res.json({ message: "Course deleted successfully." });
    } else {
      res.status(404).json({ message: "Course not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting course." });
  }
};

const updateCourse = async (req, res) => {
  const { id } = req.params; // Extract id from URL parameters
  const { title, duration, instructor,category,price,description } = req.body; // Extract updated data from request body

  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { title, duration, instructor ,category,price,description}, // Update only these fields
      { new: true } // Return the updated document
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found." });
    }

    res.json(updatedCourse); // Send back the updated course
  } catch (error) {
    res.status(500).json({ message: "Error updating course." });
  }
};

const addJobs= async(req,res)=>{
  console.log(req.body);
    
  const { url, siteKey } = req.body;

  // Validate inputs
  if (!url || !siteKey) {
    return res.status(400).json({ error: "URL and site key are required." });
  }

  const selectors = jobSelectors[siteKey];
  if (!selectors) {
    return res.status(400).json({ error: "Invalid site key provided." });
  }

  try {
    // Scrape job details using the provided URL and selectors
    const scrapedData = await scrapeJobDetails(url, selectors);

    // Include URL and siteKey in the job data
    const jobData = {
      ...scrapedData,
      url,
      siteKey,
    };

    // Save the job to the database
    const job = new Jobs(jobData);
    await job.save();

    res.status(200).json({ message: "Job added successfully!", job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to scrape and save job details." });
  }
};

const getJobs = async (req, res) => {
  try {
    // Fetch the latest 2 jobs from DB, sorted by creation date (descending)
    const jobs = await Jobs.find().sort({ createdAt: -1 }).limit(3);

    // Send the jobs as the response
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs." });
  }
};

const getAllJobs = async (req, res) => {
  try {
    // Fetch the latest 2 jobs from DB, sorted by creation date (descending)
    const jobs = await Jobs.find().sort({ createdAt: -1 })

    // Send the jobs as the response
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs." });
  }
};



module.exports = {
  getUsers,
  getMessages,
  getApplication,
  addSubject,
  getSubjects,
  deleteSubject,
  createTest,
  getFormData,
  saveTest,
  getMockTests,
  editMockTests,
  deleteMockTest,
  getMockDetails,
  getMainTests,

  addCourse,
  getCourse,
  deleteCourse,
  updateCourse,

  addJobs,
  getJobs,
  getAllJobs
}