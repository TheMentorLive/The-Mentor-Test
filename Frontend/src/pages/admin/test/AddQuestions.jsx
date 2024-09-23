import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Card, CardContent, CardActions, IconButton, MenuItem, Select, InputLabel, FormControl, Grid, Box } from '@mui/material';
import { AddCircle as AddCircleIcon, RemoveCircle as RemoveCircleIcon } from '@mui/icons-material';
import axios from 'axios'; // Import axios for making API calls
import { ADMINENDPOINTS } from '../../../constants/ApiConstants';

const AddQuestionPage = () => {
  const [questions, setQuestions] = useState([
    {
      number: 1,
      text: '',
      answers: ['', '', '', ''],
      correctAnswer: 0,
    },
  ]);
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [duration, setDuration] = useState(60);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [testType, setTestType] = useState('mock');
  const [subject, setSubject] = useState(''); // New state for subject
  const [subjects, setSubjects] = useState([]); // New state to store fetched subjects
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  

  // Fetch subjects from the backend on component mount
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(ADMINENDPOINTS.GETSUBJECTS, {
            headers: { Authorization: `Bearer ${token}` },
          });// Replace with your backend endpoint
        setSubjects(response.data);
      } catch (error) {
        console.error('Failed to fetch subjects', error);
      }
    };

    fetchSubjects();
  }, []);

  const handleQuestionChange = (index, key, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][key] = value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (questionIndex, answerIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers[answerIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        number: questions.length + 1,
        text: '',
        answers: ['', '', '', ''],
        correctAnswer: 0,
      },
    ]);
    setCurrentQuestionIndex(questions.length);
  };

  const handleRemoveQuestion = (index) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
      if (currentQuestionIndex >= index) {
        setCurrentQuestionIndex(prevIndex => Math.max(prevIndex - 1, 0));
      }
    }
  };

  const handleAddAnswer = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers.push('');
    setQuestions(updatedQuestions);
  };

  const handleRemoveAnswer = (questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[questionIndex].answers.length > 2) {
      updatedQuestions[questionIndex].answers.splice(answerIndex, 1);
      setQuestions(updatedQuestions);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');
    setSuccess('');
  
    try {
      // Create a data object
      const data = {
        questions: questions,
        duration: duration,
        category: category,
        description: description,
        testType: testType,
        subject: subject, // Include subject in the data object
      };
  
      // Make POST request
      const response = await axios.post(ADMINENDPOINTS.ADDTEST, data, {
        headers: {
          'Content-Type': 'application/json', // Set content type to JSON
          Authorization: `Bearer ${token}` // Include authorization header
        }
      });
  
      // Reset state on successful submission
      setQuestions([
        {
          number: 1,
          text: '',
          answers: ['', '', '', ''],
          correctAnswer: 0,
        },
      ]);
      setCurrentQuestionIndex(0);
      setDuration(60);
      setCategory('');
      setDescription('');
      setTestType('mock');
      setSubject(''); // Reset subject selection
      setSuccess(`Test submitted successfully! Total number of questions: ${questions.length}`);
    } catch (err) {
      setError('Failed to submit questions. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  

  return (
    <div className="flex flex-col  p-6 bg-gray-50 text-gray-900">
    <p  className=" text-center text-3xl mb-5 font-bold text-gray-800">
      Add New Test
    </p>
    
    <Grid container spacing={4}>
      {/* Sidebar for test details */}
      <Grid item xs={12} md={4}>
        <Card className="shadow-lg rounded-lg">
          <CardContent className="space-y-4">
            <TextField
              label="Test Duration (minutes)"
              type="number"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              margin="normal"
              fullWidth
              sx={{ fontSize: '0.875rem', '& input': { fontSize: '0.875rem' } }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                sx={{ fontSize: '0.875rem' }}
              >
                <MenuItem value="EXAM">Exam</MenuItem>
                <MenuItem value="NEET">NEET</MenuItem>
                <MenuItem value="JEE">JEE</MenuItem>
                <MenuItem value="OTHER">TEST-EXAM</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="normal"
              sx={{ fontSize: '0.875rem', '& input': { fontSize: '0.875rem' } }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Type of Test</InputLabel>
              <Select
                value={testType}
                onChange={(e) => setTestType(e.target.value)}
                sx={{ fontSize: '0.875rem' }}
              >
                <MenuItem value="mock">Mock</MenuItem>
                <MenuItem value="main">Main</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Subject</InputLabel>
              <Select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                sx={{ fontSize: '0.875rem' }}
              >
                {subjects.map((subj) => (
                  <MenuItem key={subj._id} value={subj.name}>
                    {subj.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
        </Card>
      </Grid>
  
      {/* Main section for questions */}
      <Grid item xs={12} md={8}>
        <Card className="shadow-lg rounded-lg">
          <CardContent>
            <Box className="space-y-6">
              {questions.map((question, index) => (
                index === currentQuestionIndex && (
                  <Box key={index}>
                    <Typography variant="h6" className="font-semibold mb-2" sx={{ fontSize: '1rem' }}>
                      Question {question.number}
                    </Typography>
                    <TextField
                      label="Question Text"
                      fullWidth
                      multiline
                      rows={1}
                      value={question.text}
                      onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
                      margin="normal"
                      sx={{ fontSize: '0.875rem', '& input': { fontSize: '0.875rem' } }}
                    />
                    <Box>
                      {question.answers.map((answer, ansIndex) => (
                        <Grid container spacing={2} alignItems="center" key={ansIndex}>
                          <Grid item xs={10}>
                            <TextField
                              label={`Answer ${ansIndex + 1}`}
                              value={answer}
                              onChange={(e) => handleAnswerChange(index, ansIndex, e.target.value)}
                              margin="dense"
                              fullWidth
                              sx={{
                                fontSize: '0.875rem',
                                '& input': { fontSize: '0.875rem' },
                                '& .MuiFormLabel-root': { fontSize: '0.875rem' },
                              }}
                            />
                          </Grid>
                          <Grid item xs={2}>
                            <IconButton onClick={() => handleRemoveAnswer(index, ansIndex)}>
                              <RemoveCircleIcon fontSize="small" />
                            </IconButton>
                          </Grid>
                        </Grid>
                      ))}
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddCircleIcon />}
                        onClick={() => handleAddAnswer(index)}
                        size="small"
                        
                        sx={{ fontSize: '0.875rem', marginTop:'10px', marginBottom:'15px' }}
                      >
                        Add Answer
                      </Button>
                    </Box>
                    <FormControl fullWidth margin="normal">
                      <InputLabel className='-mt-2'>Correct Answer</InputLabel>
                      <Select
                        value={question.correctAnswer}
                        onChange={(e) => handleQuestionChange(index, 'correctAnswer', parseInt(e.target.value))}
                        sx={{ fontSize: '0.875rem' }}
                      >
                        {question.answers.map((_, ansIndex) => (
                          <MenuItem key={ansIndex} value={ansIndex}>
                            Answer {ansIndex + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                )
              ))}
            </Box>
          </CardContent>
          <CardActions className="flex justify-between p-4">
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddQuestion}
              size="small"
              sx={{ fontSize: '0.875rem' }}
            >
              Add Question
            </Button>
            {questions.length > 1 && (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleRemoveQuestion(currentQuestionIndex)}
                size="small"
                sx={{ fontSize: '0.875rem' }}
              >
                Remove Question
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              size="small"
              disabled={isSubmitting}
              sx={{ fontSize: '0.875rem' }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Test'}
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  
    {/* Success or Error Messages */}
    {error && (
      <Typography color="error" className="text-center mt-4">
        {error}
      </Typography>
    )}
    {success && (
      <Typography color="primary" className="text-center mt-4">
        {success}
      </Typography>
    )}
  </div>
  

  );
};

export default AddQuestionPage;
