import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { Flag as FlagIcon } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USERENDPOINTS } from '../../../constants/ApiConstants';

const TestPage = () => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [testData, setTestData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const testId = queryParams.get('id');
  const navigate = useNavigate(); // Initialize useNavigate hook
  
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
    if (testId) {
      const fetchTest = async () => {
        try {
          const response = await axios.get(`${USERENDPOINTS.GETTESTSLANDING}?id=${testId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setTestData(response.data);
          setTimeRemaining(response.data.duration * 60);
        } catch (error) {
          setError('Error fetching test details');
          console.error('Error fetching test details:', error);
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
  }, [testId, token]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleQuestionChange = (direction) => {
    if (direction === 'prev' && currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (direction === 'next' && testData && currentQuestion < testData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answerIndex,
    }));
  };

  const handleQuestionFlag = (questionIndex) => {
    setFlaggedQuestions((prevFlagged) =>
      prevFlagged.includes(questionIndex)
        ? prevFlagged.filter((index) => index !== questionIndex)
        : [...prevFlagged, questionIndex]
    );
  };

  const handleSubmit = async () => {
    if (!testData) return;

    const completionTime = testData.duration * 60 - timeRemaining;
    const correctAnswers = testData.questions.map((q) => q.correctAnswer);
    const userAnswers = Object.values(answers);

    const result = {
      testId: testData._id,
      answers: userAnswers,
      correctAnswers,
      completionTime,
      totalDuration: testData.duration * 60,
      flaggedQuestions,
    };

    try {
      await axios.post(`${USERENDPOINTS.SUBMITTEST}`, result, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Navigate to the result page with userId and testId
      navigate(`/result?id=${testId}`);

    } catch (error) {
      setError('Error submitting test');
      console.error('Error submitting test:', error);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!testData) {
    return <Typography>No test data found.</Typography>;
  }

  return (
    <div className="flex flex-col h-screen mt-10 bg-white text-black">
      <main className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-8 pt-20 p-4 md:p-8">
        <div className="bg-card text-card-foreground rounded-md p-4 md:p-6">
          <CustomCard title="Question Map" description="View the status of all questions at a glance.">
            <div className="grid grid-cols-4 gap-2 md:gap-4">
              {testData.questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-6 h-6 md:w-8 md:h-8 rounded-md flex items-center justify-center cursor-pointer transition-colors ${
                    currentQuestion === index
                      ? 'bg-[#2563EB] text-white'
                      : flaggedQuestions.includes(index)
                      ? 'bg-yellow-500 text-white'
                      : answers[index] !== undefined
                      ? 'bg-green-500 text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}
                  onClick={() => setCurrentQuestion(index)}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </CustomCard>
        </div>

        <div className="bg-card text-card-foreground rounded-md p-4 md:p-6 flex flex-col">
  <div className="flex justify-end mb-4">
    <div className="text-lg px-4 py-3 w-20 rounded-md text-white bg-blue-500">
      {formatTime(timeRemaining)}
    </div>
  </div>
  <div className="space-y-4">
    <p className="font-bold text-3xl">Exam</p>
    <div className="flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="font-medium">Question {currentQuestion + 1}</span>
        {flaggedQuestions.includes(currentQuestion) && (
          <FlagIcon className="h-4 w-4 md:h-5 md:w-5 text-primary" />
        )}
      </div>
    </div>
    <div className="space-y-4">
      <p className="text-lg font-medium">{questions[currentQuestion].text}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
        {questions[currentQuestion].answers.map((answer, index) => (
          <CustomButton
            key={index}
            variant={answers[currentQuestion] === index ? "primary" : "outline"}
            onClick={() => handleAnswerSelect(currentQuestion, index)}
            className="justify-start"
          >
            {answer}
          </CustomButton>
        ))}
      </div>
    </div>

    <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
      <CustomButton
        variant={flaggedQuestions.includes(currentQuestion) ? "primary" : "outline"}
        onClick={() => handleQuestionFlag(currentQuestion)}
        className="mb-4 md:mb-0"
      >
        {flaggedQuestions.includes(currentQuestion) ? "Unflag" : "Flag"}
      </CustomButton>
      <div className="flex items-center gap-2">
        <span>{flaggedQuestions.length} flagged</span>
        <span>{Object.keys(answers).length} answered</span>
      </div>
    </div>

    <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center gap-2">
        <span>Progress: {currentQuestion + 1}/{questions.length}</span>
        <CustomProgress value={((currentQuestion + 1) / questions.length) * 100} />
      </div>
      <div className="mt-6 flex gap-2 flex-col md:flex-row items-center">
        <CustomButton
          onClick={() => handleQuestionChange("prev")}
          disabled={currentQuestion === 0}
          className="bg-gray-300 text-gray-700 hover:bg-gray-400"
        >
          Prev
        </CustomButton>
        <CustomButton
          onClick={() => handleQuestionChange("next")}
          disabled={currentQuestion === questions.length - 1}
          className="bg-gray-300 text-gray-700 hover:bg-gray-400"
        >
          Next
        </CustomButton>
      </div>
    </div>

    <div className="flex items-center justify-end mt-4">
      <CustomButton className="bg-blue-500 text-white px-9 py-3" size="xl">
        Submit
      </CustomButton>
    </div>
  </div>
</div>
      </main>
    </div>
  );
};

function CustomButton({ variant, size, className, children, onClick, disabled }) {
  const baseStyle = "px-4 py-2 rounded-md focus:outline-none focus:ring-2";
  const variantStyle =
    variant === "primary"
      ? "bg-blue-500 text-white hover:bg-blue-600"
      : variant === "outline"
      ? "border border-gray-300 text-black hover:bg-gray-200"
      : "text-black";
  const sizeStyle = size === "sm" ? "text-sm" : "text-base";
  const disabledStyle = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      className={`${baseStyle} ${variantStyle} ${sizeStyle} ${className} ${disabledStyle}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function CustomCard({ title, description, children }) {
  return (
    <div className="border p-4 rounded-md">
      <h3 className="text-lg font-semibold text-black">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function CustomProgress({ value }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-[#2563EB] h-2.5 rounded-full"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default TestPage;
