const Test = require("../model/Test");
const ResultModel = require('../model/ResultModel');


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



module.exports={
  getTests,
  getTestsLanding,
  getResults,
  SubmitTest,
  getHistory,
 
    
}