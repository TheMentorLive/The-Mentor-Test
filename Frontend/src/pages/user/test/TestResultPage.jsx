import React, { useState, useEffect } from 'react';
import { Button, Typography, Paper, Divider } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { USERENDPOINTS } from '../../../constants/ApiConstants'; // Adjust the import path
import { useLocation, useNavigate } from 'react-router-dom';

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

const TestResultsPage = () => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [showDetails, setShowDetails] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [testDetails, setTestDetails] = useState({ questions: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const testId = queryParams.get('id');

  useEffect(() => {
    const fetchTestResults = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${USERENDPOINTS.GETCURRENTTESTRESULT}?testId=${testId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response.data);

        setTestResults(response.data.result);

        // Extract questions correctly from response
        const questions = response.data.testDetails?.questions?.map(q => q._doc) || [];
        setTestDetails({
          ...response.data.testDetails,
          questions
        });
      } catch (err) {
        setError('Failed to fetch test results.');
      } finally {
        setLoading(false);
      }
    };

    fetchTestResults();
  }, [testId, token]);

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleRetakeTest = () => {
    navigate(`/test?id=${testId}`);
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <style>{spinnerStyles}</style>
      <div className="spinner"></div>
      <p className="ml-4 text-blue-500">Loading...</p>
    </div>
  );
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 mt-8">
        {!showDetails && (
          <div className="flex flex-col md:flex-row">
            {/* Left Side */}
            <div className="md:w-1/2 md:pr-8 p-8 flex flex-col items-center">
              <div className="flex flex-col items-center mb-8">
                <div className="flex items-center justify-center mb-6">
                  <img
                    src="/The-mentor-logo.png"
                    alt="The Mentor"
                    className="h-16 w-auto mx-auto"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center h-full">
                <Paper className="bg-blue-800 text-white p-8 rounded-lg shadow-md mx-auto mb-6">
                  <Typography variant="h5" className="font-bold">
                    {testResults?.status === 'Passed' ? 'Congratulations!' : 'Better Luck Next Time!'}
                  </Typography>
                  <Typography variant="body1">
                    You have {testResults?.status === 'Passed' ? 'successfully' : 'attempted'} the test.
                  </Typography>
                </Paper>
                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                  <Button variant="contained" color="primary" size="small">
                    Give Feedback
                  </Button>
                  <Button variant="outlined" color="primary" size="small" onClick={handleShowDetails}>
                    {showDetails ? 'Hide Details' : 'Show Results'}
                  </Button>
                  <Button variant="outlined" color="primary" size="small" onClick={handleRetakeTest}>
                    Retake Test
                  </Button>
                </div>

              </div>
            </div>
            {/* Right Side */}
            <div className="md:w-1/2 md:pl-8 md:border-l p-8">
              <Typography variant="h5" className="mb-4 font-semibold">
                Test Results
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <Typography variant="body2" className="text-sm text-gray-500">
                    Test duration
                  </Typography>
                  <Typography variant="body1" className="font-medium bg-gray-200 p-2 rounded">
                    {testResults?.totalDuration ? `${Math.floor(testResults.totalDuration / 60)} mins` : 'N/A'}
                  </Typography>
                </div>
                <div className="flex flex-col">
                  <Typography variant="body2" className="text-sm text-gray-500">
                    No. of questions
                  </Typography>
                  <Typography variant="body1" className="font-medium bg-gray-200 p-2 rounded">
                    {testDetails?.questions.length || 'N/A'} questions
                  </Typography>
                </div>
                <div className="flex flex-col">
                  <Typography variant="body2" className="text-sm text-gray-500">
                    Score
                  </Typography>
                  <Typography variant="body1" className="font-medium bg-green-100 p-2 rounded text-green-800">
                    {testResults?.score || 'N/A'}
                  </Typography>
                </div>
                <div className="flex flex-col">
                  <Typography variant="body2" className="text-sm text-gray-500">
                    Rank
                  </Typography>
                  <Typography variant="body1" className="font-medium bg-yellow-100 p-2 rounded text-yellow-800">
                    {testResults?.rank || 'N/A'}
                  </Typography>
                </div>
                <div className="flex flex-col">
                  <Typography variant="body2" className="text-sm text-gray-500">
                    Completion Time
                  </Typography>
                  <Typography variant="body1" className="font-medium bg-blue-100 p-2 rounded text-blue-800">
                    {testResults?.completionTime
                      ? (testResults.completionTime >= 60
                        ? `${Math.floor(testResults.completionTime / 60)} mins`
                        : `${testResults.completionTime} sec`)
                      : 'N/A'}
                  </Typography>
                </div>
                <div className="flex flex-col">
                  <Typography variant="body2" className="text-sm text-gray-500">
                    Attempts
                  </Typography>
                  <Typography variant="body1" className="font-medium bg-gray-200 p-2 rounded">
                    {testResults?.attempts || 'N/A'}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Detailed Results Section */}
        {showDetails && (
          <div className="mt-8 bg-white p-8 rounded-lg shadow-lg">
            <div className="flex justify-between mb-4">
              <Typography variant="h3" className="font-semibold">
                Detailed Results
              </Typography>
              <Button variant="outlined" color="primary" onClick={handleShowDetails}>
                Hide Details
              </Button>
            </div>
            <Divider className="mb-4" />

            <Typography variant="h6" className="mb-2 font-medium">
              Exam Overview
            </Typography>
            <div className="mb-6">
              <Typography variant="body2" className="text-sm text-gray-500">
                Time Taken
              </Typography>
              <Typography variant="body1" className="font-medium bg-blue-100 p-2 rounded text-blue-800">
                {testResults?.completionTime
                  ? (testResults.completionTime >= 60
                    ? `${Math.floor(testResults.completionTime / 60)} mins`
                    : `${testResults.completionTime} sec`)
                  : 'N/A'}
              </Typography>
            </div>

            <Typography variant="h6" className="mb-2 font-medium">
              Results Breakdown
            </Typography>
            <div className="mb-6">
              <Typography variant="body2" className="text-sm text-gray-500">
                Accuracy
              </Typography>
              <Typography variant="body1" className="font-medium bg-green-100 p-2 rounded text-green-800">
                {testResults?.accuracy || 'N/A'}%
              </Typography>
              <Typography variant="body2" className="text-sm text-gray-500">
                Correct Answers
              </Typography>
              <Typography variant="body1" className="font-medium bg-yellow-100 p-2 rounded text-yellow-800">
                {testResults?.totalCorrect || 'N/A'}
              </Typography>
            </div>

            <Typography variant="h6" className="mt-6 mb-2 font-medium">
              Questions and Answers
            </Typography>
            <Divider className="mb-4" />
            <div>
              {(testDetails?.questions || []).map((question, index) => (
                <div key={question._id} className="mb-4">
                  <Typography variant="body1" className="font-medium mb-2">
                    {index + 1}. {question.text}
                  </Typography>
                  <div className="ml-4 mb-2">
                    {question.answers.map((ans, ansIndex) => (
                      <Typography key={ansIndex} variant="body2" className={`mb-1 ${testResults?.answers[index] === ansIndex ? 'text-blue-600' : ''}`}>
                        {ansIndex === question.correctAnswer ? (
                          <CheckIcon color="success" />
                        ) : (
                          <CloseIcon color="error" />
                        )}
                        {ans}
                      </Typography>
                    ))}
                  </div>
                  <Typography variant="body2" className="ml-4">
                    Your answer: {testResults?.answers[index] === question.correctAnswer ? (
                      <CheckIcon color="success" />
                    ) : (
                      <CloseIcon color="error" />
                    )}
                    {question.answers[testResults?.answers[index]] || 'N/A'}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestResultsPage;
