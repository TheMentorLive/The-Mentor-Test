import React, { useState, useEffect, useContext } from 'react';
import { Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USERENDPOINTS } from '../../../constants/ApiConstants';
import TestNavbar from '../../../pages/user/test/Navbar';
import TestFooter from '../../../pages/user/test/Footer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FlagIcon from '@mui/icons-material/Flag';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { mainContext } from '/src/context/mainContex';
import { AccountCircle } from '@mui/icons-material';

const spinnerStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #2563EB;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }
`;

const TestPage = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const {user}= useContext(mainContext)
  const [testData, setTestData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);  // Track current question
  const [openSubmitPopup, setOpenSubmitPopup] = useState(false); // State for controlling the submit popup
  const [selectedTest, setSelectedTest] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const mainTestId = queryParams.get('mainTestId');
  const selectedTestId = queryParams.get('selectedTestId');
  const navigate = useNavigate();

  useEffect(() => {
    // Request fullscreen mode
    const requestFullscreen = () => {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
      }
    };

    requestFullscreen();

    // Cleanup function to exit fullscreen when component unmounts
    return () => {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
      }
    };
  }, []);

  useEffect(() => {
    if (mainTestId) {
      const fetchTest = async () => {
        try {
          const response = await axios.get(`${USERENDPOINTS.GETTESTSLANDING}?id=${mainTestId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });

          const testData = response.data;
          setTestData(testData);

          // Find the selected test from the tests array
          const selected = testData.tests.find((t) => t._id === selectedTestId);
          setSelectedTest(selected);
          
         
          setQuestions(selected.questions.map((q, index) => ({
            ...q,
            id: index + 1,   // Ensure each question has a unique id
            status: 'Not Answered'  // Set default status
          })));
          setTimeRemaining(response.data.duration * 60);
        } catch (error) {
          setError('Error fetching test details');
        } finally {
          setLoading(false);
        }
      };

      fetchTest();

      const interval = setInterval(() => {
        setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [mainTestId, selectedTestId,token]);

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNextQuestion = (markForReview = false) => {
    if (markForReview) {
      setFlaggedQuestions((prevFlagged) => [...prevFlagged, currentQuestion]);
    }

    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) =>
        i === currentQuestion
          ? { ...q, status: markForReview ? 'Marked' : 'Answered' }
          : q
      )
    );
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answerIndex,
    }));
  };

  const openSubmitDialog = () => {
    setOpenSubmitPopup(true);
  };

  const closeSubmitDialog = () => {
    setOpenSubmitPopup(false);
  };

  const handleSubmit = async () => {
    if (!testData) return;

    const completionTime = testData.duration * 60 - timeRemaining;
    const correctAnswers = selectedTest.questions.map((q) => q.correctAnswer);
    const userAnswers = Object.values(answers);

    const result = {
      testId: testData._id,
      answers: userAnswers,
      correctAnswers,
      completionTime,
      totalDuration: testData.duration * 60,
      flaggedQuestions,
      selectedTestId:selectedTestId // Include flagged questions
    };
  
    

    try {
      await axios.post(`${USERENDPOINTS.SUBMITTEST}`, result, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Navigate to the result page with userId and testId
      navigate(`/result?mainTestId=${mainTestId}&selectedTestId=${selectedTest._id}`);
    } catch (error) {
      setError('Error submitting test');
    }
  };

  // Function to calculate counts of answered, flagged, and not answered questions
  const getQuestionStatusCounts = () => {
    const answered = questions.filter((q) => q.status === 'Answered').length;
    const flagged = questions.filter((q) => flaggedQuestions.includes(q.id)).length;
    const notAnswered = questions.filter((q) => q.status === 'Not Answered').length;
    return { answered, flagged, notAnswered };
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner"></div>
        <p className="ml-4 text-blue-500">Starting Exam...</p>
      </div>
    );
  }

  if (error) return <Typography color="error">{error}</Typography>;
  if (!selectedTest) return <Typography>No test data found.</Typography>;

  const { answered, flagged, notAnswered } = getQuestionStatusCounts();

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <style>{spinnerStyles}</style>
      <div className="spinner"></div>
      <p className="ml-4 text-blue-500">Starting Exam...</p>
    </div>
  );

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!testData) {
    return <Typography>No test data found.</Typography>;
  }

  return (
    <>
      <TestNavbar />
      <div className="min-h-fit flex flex-col lg:ml-24 lg:mr-24 lg:flex-row p-4 mt-28">
        {/* Left Section: Question Area */}
        <div className="bg-white shadow-lg p-6 rounded-lg w-full lg:w-3/4 mb-6 lg:mb-0 lg:mr-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{selectedTest.testTitle}</h2>
            <p className="text-sm items-left"> {selectedTest.testdescription}</p>
            <span className="text-gray-600">{formatTime(timeRemaining)}</span>
          </div>

          <div className="mb-6">
            <h3 className="text-md font-medium mb-2">Question No. {currentQuestion + 1}</h3>
            <p className="text-gray-700 mb-4">{selectedTest.questions[currentQuestion].text}</p>

            {/* Options */}
            <div>
              {selectedTest.questions[currentQuestion].answers.map((answer, index) => (
                <label key={index} className="block cursor-pointer">
                  <input
                    type="radio"
                    name="answer"
                    className="mr-2"
                    checked={answers[currentQuestion] === index}
                    onChange={() => handleAnswerSelect(currentQuestion, index)}
                  /> {answer}
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition duration-200"
              onClick={() => handleNextQuestion(true)} // Mark for review and next
            >
              Mark for Review & Next
            </button>
            <div className="space-x-2">
              <button
                className={`bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition duration-200 ${currentQuestion === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
              >
                Previous
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
                onClick={() => handleNextQuestion(false)} // Save & next
              >
                Save & Next
              </button>
            </div>
          </div>
        </div>

        {/* Right Section: Sidebar */}
        <div className="bg-white shadow-lg p-6 rounded-lg w-full max-h-fit lg:w-1/4">
          <div className="mb-6 flex items-center space-x-3">
            <div 
            // className="w-8 h-8 bg-gray-300 rounded-full"
            >
              
              <AccountCircle/>
            </div>
            <span>{user.name}</span>
          </div>

          {/* Question Status */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span>Answered</span>
              <span>{answered}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Flagged</span>
              <span>{flagged}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Not Answered</span>
              <span>{notAnswered}</span>
            </div>
          </div>

          {/* Question Navigator */}
          <div className="grid grid-cols-5 gap-2 mb-6">
            {questions.map((q, i) => (
              <button
                key={i}
                className={`border border-gray-300 text-gray-700 w-10 h-10 rounded hover:bg-gray-200 transition ${q.status === 'Answered' ? 'bg-green-200' : q.status === 'Marked' ? 'bg-purple-200' : ''}`}
                onClick={() => setCurrentQuestion(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* Submit Button */}
          <button
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition duration-200"
            onClick={openSubmitDialog}  // Open the confirmation dialog
          >
            Submit Test
          </button>
        </div>
      </div>

      {/* Submit Confirmation Dialog */}
      <Dialog
      open={openSubmitPopup}
      onClose={closeSubmitDialog}
      aria-labelledby="submit-dialog-title"
      aria-describedby="submit-dialog-description"
    >
      <DialogTitle id="submit-dialog-title" className="text-center font-semibold text-xl text-gray-700">
        <span>Confirm Submission</span>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" className="mb-4 text-center">
          <strong>Are you sure you want to submit the test?</strong>
        </Typography>

        <div className="space-y-4">
          {/* Answered Questions Status */}
          <div className="flex items-center justify-start space-x-2">
            <CheckCircleIcon color="success" />
            <Typography>Answered: <strong>{answered}</strong></Typography>
          </div>

          {/* Flagged Questions Status */}
          <div className="flex items-center justify-start space-x-2">
            <FlagIcon color="warning" />
            <Typography>Flagged: <strong>{flagged}</strong></Typography>
          </div>

          {/* Not Answered Questions Status */}
          <div className="flex items-center justify-start space-x-2">
            <HelpOutlineIcon color="disabled" />
            <Typography>Not Attended: <strong>{notAnswered}</strong></Typography>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeSubmitDialog} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          autoFocus
          variant="contained"
          style={{ backgroundColor: '#3f51b5', color: '#fff' }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>

      <TestFooter />
    </>
  );
};

export default TestPage;

