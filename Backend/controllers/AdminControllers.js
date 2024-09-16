const SubjectModel = require("../model/SubjectModel");
const Test = require("../model/Test");
const UserModel = require("../model/UserModel");


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




module.exports = {
  getUsers,
  getMessages,
  getApplication,
  addSubject,
  getSubjects,
  deleteSubject,
  createTest,
  getFormData,
  saveTest
}