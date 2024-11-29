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
  const [testModules, setTestModules] = useState([{ moduleNumber: 1, title: '', description: ''}]);
  const [duration, setDuration] = useState(60);
  const [category, setCategory] = useState('');
  const [examType, setExamType] = useState('');
  const [examTypes, setExamTypes] = useState([]);
  const [summary, setSummary] = useState('');
  const [testLevel, setTestLevel] = useState('easy');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [testType, setTestType] = useState('mock');
  const [subject, setSubject] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [image, setImage] = useState(null);
  

  // Fetch subjects from the backend on component mount
  
  const fetchSubjects = async () => {
    try {
      const response = await axios.get(ADMINENDPOINTS.GETSUBJECTS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubjects(response.data); 
    } catch (error) {
      console.error('Failed to fetch subjects', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(ADMINENDPOINTS.GETCATEGORIES, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data); 
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  const fetchExamTypes = async () => {
    try {
      const response = await axios.get(ADMINENDPOINTS.GETEXAMTYPES, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExamTypes(response.data); 
    } catch (error) {
      console.error('Failed to fetch exam types', error);
    }
  };

  useEffect(() => {
    fetchSubjects();
    fetchCategories();
    fetchExamTypes();
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(URL.createObjectURL(file));
    } else {
      setError('Please upload a valid image file.');
    }
  };

  const handleAddModule = () => {
    const newModule = { moduleNumber: testModules.length + 1, title: '', description: '', };
    setTestModules([...testModules, newModule]);
  };

  const handleModuleChange = (index, field, value) => {
    const newModules = [...testModules];
    newModules[index][field] = value;
    setTestModules(newModules);
  };

  const handleRemoveModule = (index) => {
    setTestModules((prevModules) => {
      const newModules = [...prevModules];  // Create a shallow copy of the previous modules
      newModules.splice(index, 1);          // Remove the module at the specified index
      return newModules;                   // Return the updated modules
    });
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
        examtype: examType,
        title:title,
        testModules:testModules,
        testLevel:testLevel,
        summary:summary

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
                label="Title"
                fullWidth
                multiline
                rows={1}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
                sx={{ fontSize: '0.75rem', '& input': { fontSize: '0.75rem' } }}
              />
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
                <InputLabel sx={{ fontSize: '0.75rem' }}>Exam Type</InputLabel>
                <Select
                  value={examType}
                  onChange={(e) => setExamType(e.target.value)}
                  sx={{ fontSize: '0.75rem' }}
                >
                  {examTypes && examTypes.length > 0 ? examTypes.map((types) => (
                    <MenuItem key={types._id} value={types.name} sx={{ fontSize: '0.75rem' }}>
                      {types.name}
                    </MenuItem>
                  )) : null}
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel sx={{ fontSize: '0.75rem' }}>Category</InputLabel>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  sx={{ fontSize: '0.75rem' }}
                >
                  {categories && categories.length > 0 ? categories.map((cat) => (
                    <MenuItem key={cat._id} value={cat.name} sx={{ fontSize: '0.75rem' }}>
                      {cat.name}
                    </MenuItem>
                  )) : null}
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
             <TextField
              label="Summary"
              fullWidth
              multiline
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
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
              <InputLabel>Level</InputLabel>
              <Select
                value={testLevel}
                onChange={(e) => setTestLevel(e.target.value)}
                sx={{ fontSize: '0.875rem' }}
              >
                <MenuItem value="hard">Hard</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="easy">Easy</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="body2" color="textSecondary" gutterBottom>
        Optional
      </Typography>
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

            <TextField
                type="file"
                fullWidth
                margin="normal"
                onChange={handleImageChange}
                inputProps={{ accept: 'image/*' }}
              />
              
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


          </CardActions>
        </Card>
        {image && <img src={image} alt="Test Image" className="mt-4 w-30 h-40 object-fit" />}
      </Grid>
    </Grid>

    <div>
                <Typography variant="h6" gutterBottom>
                  Test Modules
                </Typography>
                {testModules.map((module, index) => (
                  <div key={index} className="space-y-3">
                    <TextField
                      label={`Module ${module.moduleNumber} Title`}
                      variant="outlined"
                      value={module.title}
                      onChange={(e) => handleModuleChange(index, 'title', e.target.value)}
                      fullWidth
                      sx={{ fontSize: '0.75rem' }}
                    />
                    <TextField
                      label={`Module ${module.moduleNumber} Description`}
                      variant="outlined"
                      multiline
                      rows={2}
                      value={module.description}
                      onChange={(e) => handleModuleChange(index, 'description', e.target.value)}
                      fullWidth
                      sx={{ fontSize: '0.75rem' }}
                    />
                   
                   
                  </div>
                ))}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleAddModule}
                  size="small"
                  sx={{ fontSize: '0.75rem' }}
                >
                  Add Module
                </Button>

                <IconButton
                      onClick={() => handleRemoveModule(index)}
                      color="error"
                    >
                      <RemoveCircleIcon fontSize="small" />
                    </IconButton>
              </div>
              
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
