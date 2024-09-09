// import React, { useState, useEffect } from 'react';
// import { Button, IconButton, Typography, Card, CardContent, CardActions, CardHeader } from '@mui/material';
// import { ArrowBack, ArrowForward, Book } from '@mui/icons-material';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { USERENDPOINTS } from '../../../constants/ApiConstants';

// // Component definition
// const TestPage = () => {
//   // State variables
//   const [token, setToken] = useState(() => localStorage.getItem('token') || ''); // Token for authentication
//   const [testData, setTestData] = useState(null); // To store fetched test data
//   const [currentQuestion, setCurrentQuestion] = useState(0); // Current question index
//   const [answers, setAnswers] = useState({}); // User's answers to questions
//   const [flaggedQuestions, setFlaggedQuestions] = useState([]); // Flagged questions array
//   const [timeRemaining, setTimeRemaining] = useState(0); // Time left for the test
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(''); // Error message
//   const user = localStorage.getItem('token'); // Fetch token from local storage

//   const location = useLocation(); // Get current location
//   const queryParams = new URLSearchParams(location.search); // Parse query parameters
//   const testId = queryParams.get('id'); // Test ID from the query
//   const navigate = useNavigate(); // Initialize navigation hook

//   useEffect(() => {
//     // Effect to fetch test data
//     if (testId) {
//       const fetchTest = async () => {
//         try {
//           // Fetching test details
//           const response = await axios.get(`${USERENDPOINTS.GETTESTSLANDING}?id=${testId}`, {
//             headers: { Authorization: `Bearer ${token}` }
//           });
//           console.log(response.data);
//           setTestData(response.data); // Set test data
//           setTimeRemaining(response.data.duration * 60); // Set the time remaining based on duration
//         } catch (error) {
//           setError('Error fetching test details'); // Error handling
//           console.error('Error fetching test details:', error);
//         } finally {
//           setLoading(false); // Set loading to false
//         }
//       };

//       fetchTest(); // Call the fetch function

//       // Timer interval to decrease time remaining
//       const interval = setInterval(() => {
//         setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
//       }, 1000); // Update every second

//       return () => clearInterval(interval); // Cleanup interval on unmount
//     }
//   }, [testId, token]);

//   // Function to format time from seconds
//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`; // Formatted time
//   };

//   // Function to handle question navigation
//   const handleQuestionChange = (direction) => {
//     if (direction === 'prev' && currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1); // Move to previous question
//     } else if (direction === 'next' && testData && currentQuestion < testData.questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1); // Move to next question
//     }
//   };

//   // Function to select an answer
//   const handleAnswerSelect = (questionIndex, answerIndex) => {
//     setAnswers((prevAnswers) => ({
//       ...prevAnswers, // Spread previous answers
//       [questionIndex]: answerIndex, // Update current question's answer
//     }));
//   };

//   // Function to flag/unflag a question
//   const handleQuestionFlag = (questionIndex) => {
//     if (flaggedQuestions.includes(questionIndex)) {
//       setFlaggedQuestions(flaggedQuestions.filter((index) => index !== questionIndex)); // Unflag the question
//     } else {
//       setFlaggedQuestions([...flaggedQuestions, questionIndex]); // Flag the question
//     }
//   };

//   // Function to handle test submission
//   const handleSubmit = async () => {
//     if (!testData) return; // Early exit if no test data

//     const completionTime = testData.duration * 60 - timeRemaining; // Calculate completion time
//     const correctAnswers = testData.questions.map((q) => q.correctAnswer); // Get correct answers
//     const userAnswers = Object.values(answers); // Get user's answers

//     const result = {
//       testId: testData._id, // Test ID
//       answers: userAnswers, // User's answers
//       correctAnswers, // Correct answers
//       completionTime, // Time taken to complete
//       totalDuration: testData.duration * 60, // Total available duration
//       flaggedQuestions, // Flagged questions
//     };

//     console.log(result); // Log results for debugging

//     try {
//       // Submit the test results to the server
//       await axios.post(`${USERENDPOINTS.SUBMITTEST}`, result, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       // Navigate to the result page with userId and testId
//       navigate(`/result?id=${testId}`);

//     } catch (error) {
//       setError('Error submitting test'); // Error handling for submission
//       console.error('Error submitting test:', error);
//     }
//   };

//   if (loading) {
//     return <Typography>Loading.</Typography>; // Loading state message
//   }

//   if (error) {
//     return <Typography color="error">{error}</Typography>; // Error message display
//   }

//   if (!testData) {
//     return <Typography>No test data found.</Typography>; // No test data case
//   }

//   // Main component render
//   return (
//     <div className="flex flex-col h-screen">
//       <main className="flex-1 p-8 bg-gray-100 text-gray-900">
//         <div className="flex justify-between items-center mb-4">
//           <div className="flex items-center gap-2">
//             <Book fontSize="large" />
//             <Typography variant="h4" component="h1">{testData.description}</Typography>
//           </div>
//           <div className="flex items-center gap-4">
//             <Typography variant="body1" component="div" className="px-4 py-2 rounded-md bg-gray-300">
//               {formatTime(timeRemaining)} // Display formatted time remaining
//             </Typography>
//             <Button size="small" variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
//           </div>
//         </div>
//         <Card className="mb-6 bg-white">
//           <CardHeader
//             title={`Question ${currentQuestion + 1}`} // Display current question number
//             action={
//               <div className="flex items-center gap-2">
//                 <IconButton onClick={() => handleQuestionChange('prev')} disabled={currentQuestion === 0}>
//                   <ArrowBack /> // Previous question button
//                 </IconButton>
//                 <IconButton onClick={() => handleQuestionChange('next')} disabled={currentQuestion === testData.questions.length - 1}>
//                   <ArrowForward /> // Next question button
//                 </IconButton>
//               </div>
//             }
//           />
//           <CardContent>
//             <Typography variant="body1" component="div" className="mb-4">{testData.questions[currentQuestion].text}</Typography> // Current question text
//             <div className="grid grid-cols-2 gap-4">
//               {testData.questions[currentQuestion].answers.map((answer, index) => (
//                 <Button
//                   key={index}
//                   variant={answers[currentQuestion] === index ? 'contained' : 'outlined'} // Button style based on selection
//                   color="primary"
//                   onClick={() => handleAnswerSelect(currentQuestion, index)} // Handle answer selection
//                 >
//                   {answer} // Answer text
//                 </Button>
//               ))}
//             </div>
//           </CardContent>
//           <CardActions>
//             <Button
//               variant={flaggedQuestions.includes(currentQuestion) ? 'contained' : 'outlined'} // Button style based on flag status
//               color="secondary"
//               onClick={() => handleQuestionFlag(currentQuestion)} // Handle question flagging
//             >
//               {flaggedQuestions.includes(currentQuestion) ? 'Unflag' : 'Flag'} // Flag button text
//             </Button>
//             <div className="flex-1 flex justify-end items-center">
//               <Typography variant="body2" component="div">
//                 {flaggedQuestions.length} flagged | {Object.keys(answers).length} answered // Status display
//               </Typography>
//             </div>
//           </CardActions>
//         </Card>
//         <Card className="mb-6 bg-white">
//           <CardHeader title="Question Map" />
//           <CardContent>
//             <div className="grid grid-cols-4 gap-2">
//               {testData.questions.map((_, index) => (
//                 <Button
//                   key={index}
//                   variant={currentQuestion === index ? 'contained' : 'outlined'} // Button style based on current question
//                   className={`w-8 h-8 flex items-center justify-center ${currentQuestion === index ? 'bg-primary text-white' : flaggedQuestions.includes(index) ? 'bg-yellow-500 text-white' : answers[index] !== undefined ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
//                   onClick={() => setCurrentQuestion(index)} // Handle question selection
//                 >
//                   {index + 1} // Question number
//                 </Button>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   );
// };

// export default TestPage; // Exporting the component
