// TestPage.js
import React, { useState, useEffect } from 'react';
import { Button, IconButton, Typography, Card, CardContent, CardActions, CardHeader, CardMedia, CircularProgress } from '@mui/material';
import { ArrowBack, ArrowForward, Flag, Book } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const TestPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(3600);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(prevTime => prevTime - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const handleQuestionChange = (direction) => {
    if (direction === 'prev' && currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (direction === 'next' && currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionIndex]: answerIndex,
    }));
  };

  const handleQuestionFlag = (questionIndex) => {
    if (flaggedQuestions.includes(questionIndex)) {
      setFlaggedQuestions(flaggedQuestions.filter(index => index !== questionIndex));
    } else {
      setFlaggedQuestions([...flaggedQuestions, questionIndex]);
    }
  };

  const questions = [
    {
      id: 1,
      text: 'What is the capital of France?',
      answers: ['Paris', 'London', 'Berlin', 'Madrid'],
      correctAnswer: 0,
    },
    {
      id: 2,
      text: 'Which of these is not a primary color?',
      answers: ['Red', 'Blue', 'Green', 'Purple'],
      correctAnswer: 3,
    },
    {
      id: 3,
      text: 'What is the largest ocean on Earth?',
      answers: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      correctAnswer: 3,
    },
    {
      id: 4,
      text: 'Which of these is not a common programming language?',
      answers: ['JavaScript', 'Python', 'Java', 'Elvish'],
      correctAnswer: 3,
    },
  ];

  return (
    <div className={`flex flex-col h-screen ${isDarkMode ? 'dark' : ''}`}>
      <main className={`flex-1 p-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Book fontSize="large" />
            <Typography variant="h4" component="h1">Exam</Typography>
          </div>
          <div className="flex items-center gap-4">
            <Typography variant="body1" component="div" className={`px-4 py-2 rounded-md ${isDarkMode ? 'bg-gray-800' : 'bg-gray-300'}`}>
              {formatTime(timeRemaining)}
            </Typography>
            <Link
            to="/result">
            <Button size="small" variant="contained" color="primary">Submit</Button>
            </Link>
        
          </div>
        </div>
        <Card className={`mb-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
          <CardHeader
            title={`Question ${currentQuestion + 1}`}
            action={
              <div className="flex items-center gap-2">
                <IconButton onClick={() => handleQuestionChange('prev')} disabled={currentQuestion === 0}>
                  <ArrowBack />
                </IconButton>
                <IconButton onClick={() => handleQuestionChange('next')} disabled={currentQuestion === questions.length - 1}>
                  <ArrowForward />
                </IconButton>
              </div>
            }
          />
          <CardContent>
            <Typography variant="body1" component="div" className="mb-4">{questions[currentQuestion].text}</Typography>
            <div className="grid grid-cols-2 gap-4">
              {questions[currentQuestion].answers.map((answer, index) => (
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
        <Card className={`mb-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
          <CardHeader title="Question Map" />
          <CardContent>
            <div className="grid grid-cols-4 gap-2">
              {questions.map((_, index) => (
                <Button
                  key={index}
                  variant="outlined"
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
