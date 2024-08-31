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

  const getMessages = async(req,res)=>{
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
   
    const getApplication = async(req,res)=>{
      console.log("hjk");
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

 const addSubject= async(req,res)=>{

        console.log(req.body);
        
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

const getSubjects= async(req,res)=>{
  
  try {
    const subjects = await SubjectModel.find();
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subjects', error });
  }
};
   
const deleteSubject = async (req, res) => {
  console.log("idd",req.params);
  
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


module.exports={
    getUsers,
    getMessages,
    getApplication,
    addSubject,
    getSubjects,
    deleteSubject,
    createTest
}