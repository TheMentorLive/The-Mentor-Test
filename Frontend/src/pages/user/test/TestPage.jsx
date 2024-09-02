import React, { useState, useEffect } from 'react';
import { Button, IconButton, Typography, Card, CardContent, CardActions, CardHeader } from '@mui/material';
import { ArrowBack, ArrowForward, Book } from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  const user = localStorage.getItem('token') 

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const testId = queryParams.get('id');
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    if (testId) {
      const fetchTest = async () => {
        try {
          const response = await axios.get(`${USERENDPOINTS.GETTESTSLANDING}?id=${testId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log(response.data);
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
    if (flaggedQuestions.includes(questionIndex)) {
      setFlaggedQuestions(flaggedQuestions.filter((index) => index !== questionIndex));
    } else {
      setFlaggedQuestions([...flaggedQuestions, questionIndex]);
    }
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

    console.log(result);

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
    <div className="flex flex-col h-screen">
      <main className="flex-1 p-8 bg-gray-100 text-gray-900">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Book fontSize="large" />
            <Typography variant="h4" component="h1">{testData.description}</Typography>
          </div>
          <div className="flex items-center gap-4">
            <Typography variant="body1" component="div" className="px-4 py-2 rounded-md bg-gray-300">
              {formatTime(timeRemaining)}
            </Typography>
            <Button size="small" variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
        <Card className="mb-6 bg-white">
          <CardHeader
            title={`Question ${currentQuestion + 1}`}
            action={
              <div className="flex items-center gap-2">
                <IconButton onClick={() => handleQuestionChange('prev')} disabled={currentQuestion === 0}>
                  <ArrowBack />
                </IconButton>
                <IconButton onClick={() => handleQuestionChange('next')} disabled={currentQuestion === testData.questions.length - 1}>
                  <ArrowForward />
                </IconButton>
              </div>
            }
          />
          <CardContent>
            <Typography variant="body1" component="div" className="mb-4">{testData.questions[currentQuestion].text}</Typography>
            <div className="grid grid-cols-2 gap-4">
              {testData.questions[currentQuestion].answers.map((answer, index) => (
                <Button
                  key={index}
                  variant={answers[currentQuestion] === index ? 'contained' : 'outlined'}
                  color="primary"
                  onClick={() => handleAnswerSelect(currentQuestion, index)}
                >
                  {answer}
                </Button>
              ))}
            </div>
          </CardContent>
          <CardActions>
            <Button
              variant={flaggedQuestions.includes(currentQuestion) ? 'contained' : 'outlined'}
              color="secondary"
              onClick={() => handleQuestionFlag(currentQuestion)}
            >
              {flaggedQuestions.includes(currentQuestion) ? 'Unflag' : 'Flag'}
            </Button>
            <div className="flex-1 flex justify-end items-center">
              <Typography variant="body2" component="div">
                {flaggedQuestions.length} flagged | {Object.keys(answers).length} answered
              </Typography>
            </div>
          </CardActions>
        </Card>
        <Card className="mb-6 bg-white">
          <CardHeader title="Question Map" />
          <CardContent>
            <div className="grid grid-cols-4 gap-2">
              {testData.questions.map((_, index) => (
                <Button
                  key={index}
                  variant={currentQuestion === index ? 'contained' : 'outlined'}
                  className={`w-8 h-8 flex items-center justify-center ${currentQuestion === index ? 'bg-primary text-white' : flaggedQuestions.includes(index) ? 'bg-yellow-500 text-white' : answers[index] !== undefined ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
                  onClick={() => setCurrentQuestion(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TestPage;
