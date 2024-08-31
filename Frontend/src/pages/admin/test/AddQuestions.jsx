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
    <div className="flex flex-col min-h-fit p-4 bg-gray-100 text-gray-900">
      <Typography variant="h4" component="h1" className="mb-4" align="center">
        Add New Test
      </Typography>
      <Grid container spacing={2}>
        {/* Sidebar for test details */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <TextField
                label="Test Duration (minutes)"
                type="number"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                margin="normal"
                fullWidth
                sx={{ fontSize: '0.75rem', '& input': { fontSize: '0.75rem' } }} // Adjust font size and input field
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  sx={{ fontSize: '0.75rem' }} // Adjust font size
                >
                  <MenuItem value="Math">Exam</MenuItem>
                  <MenuItem value="Science">NEET</MenuItem>
                  <MenuItem value="History">JEE</MenuItem>
                  <MenuItem value="Geography">TEST-EXAM</MenuItem>
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
                sx={{ fontSize: '0.75rem', '& input': { fontSize: '0.75rem' } }} // Adjust font size
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Type of Test</InputLabel>
                <Select
                  value={testType}
                  onChange={(e) => setTestType(e.target.value)}
                  sx={{ fontSize: '0.75rem' }} // Adjust font size
                >
                  <MenuItem value="mock">Mock</MenuItem>
                  <MenuItem value="main">Main</MenuItem>
                </Select>
              </FormControl>
              {/* Subject dropdown */}
              <FormControl fullWidth margin="normal">
                <InputLabel>Subject</InputLabel>
                <Select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  sx={{ fontSize: '0.75rem' }} // Adjust font size
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
          <Card>
            <CardContent>
              <Box>
                {questions.map((question, index) => (
                  index === currentQuestionIndex && (
                    <Box key={index} mb={1}>
                      <Typography variant="h6" mb={1} sx={{ fontSize: '1rem' }}>Question {question.number}</Typography>
                      <TextField
                        label="Question Text"
                        fullWidth
                        multiline
                        rows={1}
                        value={question.text}
                        onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
                        margin="normal"
                        sx={{ fontSize: '0.75rem', '& input': { fontSize: '0.75rem' } }} // Decrease font size
                      />
                      <Box mb={1}>
                        {question.answers.map((answer, ansIndex) => (
                          <Grid container spacing={1} alignItems="center" key={ansIndex} mb={0.5}>
                            <Grid item xs={10}>
                              <TextField
                                label={`Answer ${ansIndex + 1}`}
                                value={answer}
                                onChange={(e) => handleAnswerChange(index, ansIndex, e.target.value)}
                                margin="dense" // Use dense margin to reduce space around the field
                                fullWidth
                                sx={{ 
                                  fontSize: '0.75rem', // Smaller font size
                                  '& input': { 
                                    fontSize: '0.75rem' // Smaller font size for input text
                                  },
                                  '& .MuiFormLabel-root': { 
                                    fontSize: '0.75rem' // Smaller font size for label
                                  },
                                  '& .MuiFormHelperText-root': { 
                                    fontSize: '0.75rem' // Smaller font size for helper text
                                  }
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
                          sx={{ fontSize: '0.75rem' }} // Smaller font size
                        >
                          Add Answer
                        </Button>
                      </Box>
                      <FormControl fullWidth>
                        <InputLabel>Correct Answer</InputLabel>
                        <Select
                          value={question.correctAnswer}
                          onChange={(e) => handleQuestionChange(index, 'correctAnswer', parseInt(e.target.value))}
                          sx={{ fontSize: '0.75rem' }} // Smaller font size
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
            <CardActions>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleAddQuestion}
                size="small" // Smaller button size
                sx={{ fontSize: '0.75rem' }} // Smaller font size
              >
                Add Question
              </Button>
              {questions.length > 1 && (
                <Button 
                  variant="contained" 
                  color="secondary" 
                  onClick={() => handleRemoveQuestion(currentQuestionIndex)}
                  size="small" // Smaller button size
                  sx={{ fontSize: '0.75rem' }} // Smaller font size
                >
                  Remove Question
                </Button>
              )}
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleSubmit}
                size="small" // Smaller button size
                disabled={isSubmitting}
                sx={{ fontSize: '0.75rem' }} // Smaller font size
              >
                {isSubmitting ? 'Submitting...' : 'Submit Test'}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}
      {success && (
        <Typography color="primary" mt={2}>
          {success}
        </Typography>
      )}
    </div>
  );
};

export default AddQuestionPage;
