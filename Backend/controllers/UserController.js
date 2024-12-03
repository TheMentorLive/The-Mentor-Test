const Test = require("../model/Test");
const ResultModel = require('../model/ResultModel');
const Jobs = require("../model/Jobs");
const ExamType = require("../model/ExamType");
const dotenv = require("dotenv");
const PaidTest = require("../model/PaidTest");
const UserModel = require("../model/UserModel");
const Razorpay = require('razorpay');
const { verifyRazorpaySignature } = require("../utils/verifyRazorpaySignature");
dotenv.config();



const getTests= async (req, res) => {
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

const getTestsLanding = async (req, res) => {
  // console.log("fghjs", req.query);
  
  const { id } = req.query;

  try {
    if (!id) {
      return res.status(400).json({ message: 'id is required.' });
    }

    // Fetch the test based on the ID
    const test = await Test.findOne({ _id: id });
    // console.log(test);

    // Check if the test exists for the given ID
    if (!test) {
      return res.status(404).json({ message: 'No test found for this id.' });
    }

    // Send the test object as the response
    res.json(test);
  } catch (error) {
    console.error('Error fetching test:', error);
    res.status(500).json({ message: 'Server error. Failed to fetch test.' });
  }
};

const SubmitTest = async (req, res) => {
  try {
    const { testId, answers, correctAnswers, completionTime, totalDuration, flaggedQuestions } = req.body;

    // Validate request
    if (!testId || !answers || !correctAnswers) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    // Calculate score and total correct answers
    const totalCorrect = answers.reduce((acc, answer, index) => (
      answer === correctAnswers[index] ? acc + 1 : acc
    ), 0);

    const score = totalCorrect;
    const accuracy = totalCorrect / correctAnswers.length * 100;

    // Fetch test details to get the total number of questions
    const testDetails = await Test.findOne({ _id: testId });
    if (!testDetails) {
      return res.status(404).json({ error: 'Test details not found' });
    }

    const totalQuestions = testDetails.questions.length;

    // Determine result status based on score
    const status = score > totalQuestions / 2 ? 'Passed' : 'Failed';

    // Find existing result if any
    const existingResult = await ResultModel.findOne({ testId, userId: req.user._id });

    if (existingResult) {
      // Update existing result
      existingResult.answers = answers;
      existingResult.correctAnswers = correctAnswers;
      existingResult.completionTime = completionTime;
      existingResult.totalDuration = totalDuration;
      existingResult.flaggedQuestions = flaggedQuestions;
      existingResult.score = score;
      existingResult.status = status;
      existingResult.accuracy = accuracy;
      existingResult.totalCorrect = totalCorrect;
      existingResult.attempts = (existingResult.attempts || 0) + 1; // Increment attempt count

      await existingResult.save();

      res.status(200).json({ message: 'Test updated successfully!', result: existingResult });
    } else {
      // Save new result
      const result = new ResultModel({
        testId,
        userId: req.user._id, // Assuming you have user authentication middleware
        answers,
        correctAnswers,
        completionTime,
        totalDuration,
        flaggedQuestions,
        score,
        status,
        accuracy,
        totalCorrect,
        attempts: 1 // Initialize attempt count
      });

      await result.save();

      res.status(201).json({ message: 'Test submitted successfully!', result });
    }
  } catch (error) {
    console.error('Error submitting test:', error);
    res.status(500).json({ error: 'Error submitting test' });
  }
};



const getResults=async (req, res) => {
  try {
    const { testId } = req.query;
    const userId = req.user._id;

    // Fetch test result based on testId and userId
    const result = await ResultModel.findOne({ testId, userId });
    if (!result) {
      return res.status(404).json({ message: 'Test result not found.' });
    }

    // Fetch test details based on testId
    const testDetails = await Test.findOne({_id: testId });
    if (!testDetails) {
      return res.status(404).json({ message: 'Test details not found.' });
    }

    const detailedResults = testDetails.questions.map(question => {
      return {
        ...question,
        userAnswer: result.answers[question.number - 1],
        isCorrect: question.correctAnswer === result.answers[question.number - 1]
      };
    });

    res.json({
      result,
      testDetails: {
        ...testDetails,
        questions: detailedResults
      }
    });

  } catch (error) {
    console.error('Error fetching test results:', error);
    res.status(500).json({ error: 'Error fetching test results' });
  }
};


const getHistory = async (req, res) => {
  try {
    const tests = await ResultModel.find({ userId: req.user._id }).sort({ completedAt: -1 });
    res.json(tests);
  } catch (error) {
    res.status(500).send('Server error.');
  }
};



const guestJobs = async (req, res) => {
  try {
    const jobs = await Jobs.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).send('Error fetching jobs');
  }
}


const upcommingGuestTest=async(req,res)=>{
 
  
  try {
    const tests = await Test.find();
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tests", error });
  }
}
const guestExamType = async (req, res) => {
  
  try {
    // Fetch only the 'name' field for all exam types
    const types = await ExamType.find({ name: { $ne: "Company-based Tests" } }).select("name");
    res.status(200).json(types);
  } catch (error) {
    console.error("Error fetching exam types:", error);
    res.status(500).json({ message: "Failed to fetch exam types", error });
  }
};

const guestTestByType= async(req,res)=>{
  const { examType } = req.query; // Retrieve examType from query parameters
  if (!examType) {
    return res.status(400).json({ message: "examType is required" });
  }

  try {
    // Find the ExamType by name
    const examTypeData = await ExamType.findOne({ name: examType }).populate("categories"); 
    if (!examTypeData) {
      return res.status(404).json({ message: "Exam type not found" });
    }
    // Find all tests associated with the exam type's categories
    const tests = await Test.find({ examType: { $in: examTypeData.name } }).limit(3);
    console.log("upe",tests);
    
    res.status(200).json(tests);
  } catch (error) {
    console.error("Error fetching tests by exam type:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
}

const guestTestById = async(req,res)=>{
  const { id } = req.query; // Get the 'id' from the query parameters

  if (!id) {
    return res.status(400).json({ message: "Test ID is required" });
  }

  try {
    // Fetch the test from the database by ID
    const test = await Test.findById(id);
    
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    // Return the test details as a JSON response
    res.status(200).json(test);
  } catch (error) {
    console.error("Error fetching test:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




const razorpayInstance = new Razorpay({
  key_id: process.env.KEY, // Replace with your Razorpay API key
  key_secret: process.env.SECRET, // Replace with your Razorpay API secret
});

const createPayment=async (req, res) => {
  console.log(req.body);
  
  const { testId } = req.body;

  try {
    // Fetch the test details from your database (example)
    const test = await Test.findById(testId); // Replace with your database query
    const amount = test.price * 100; // Razorpay expects amount in paise (1 INR = 100 paise)
    console.log(amount);
    

    // Create an order on Razorpay
    const order = await razorpayInstance.orders.create({
      amount: amount, // Amount in paise
      currency: "INR",
      receipt: `order_rcptid_${new Date().getTime()}`, // Unique receipt ID
    });

    // Send the order ID and amount back to the frontend
    res.json({
      order: {
        id: order.id,
        amount: order.amount,
      },
    });
  } catch (error) {
    console.error("Error creating Razorpay order", error);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
};

const verifyPayment = async (req, res) => {
  console.log(req.body,"Payment verification data");

  const { paymentId, orderId, signature, userId, testId } = req.body;

  try {
    // Razorpay secret key for verification
    const razorpaySecret = process.env.SECRET;  // Replace with your Razorpay secret

    // Verify Razorpay payment signature
    const isValid = verifyRazorpaySignature(paymentId, orderId, signature, razorpaySecret);

    if (isValid) {
      // Fetch the test details
      const test = await Test.findById(testId);
      if (!test) {
        return res.status(400).json({ error: 'Test not found' });
      }

      // Fetch the user (optional)
      const user = await UserModel.findById(req.user.id);
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      // Create a record in the PaidTest collection
      const paidTest = new PaidTest({
        userId: user._id,
        testId: test._id,
        orderId: orderId,
        paymentId: paymentId,
        amount: test.price,
        status: 'success',
      });

      // Save the paid test record
      await paidTest.save();

      // Send a response indicating payment success
      res.json({ message: 'Payment successful, test is added to paid tests' });
    } else {
      // Payment verification failed
      res.status(400).json({ error: 'Payment verification failed' });
    }
  } catch (error) {
    console.error("Error verifying payment", error);
    res.status(500).json({ error: 'Payment verification failed' });
  }
};


const paidTest = async (req, res) => {
  try {
    // Fetch paid tests where the user has paid and the status is 'success'
    const paidTests = await PaidTest.find({ userId: req.user.id, status: 'success' })
      .populate('testId', 'name price') // Populate test details like name and price
      .exec();

    // Extract only the testId from each paidTest document
    const testIds = paidTests.map((paidTest) => paidTest.testId._id);
console.log(testIds);

    // Send the testIds to the frontend
    res.status(200).json({ testIds });
  } catch (error) {
    console.error('Error fetching paid tests:', error);
    res.status(500).send('Server error');
  }
};

module.exports={
  getTests,
  getTestsLanding,
  getResults,
  SubmitTest,
  getHistory,

  // scrapeJobs,

  guestJobs,

  upcommingGuestTest,
  guestExamType,
  guestTestByType,
  guestTestById,

  createPayment,
  verifyPayment,
  paidTest
 
    
}