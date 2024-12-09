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
  const mainTestId = queryParams.get('mainTestId');
  const selectedTestId = queryParams.get('selectedTestId');

  useEffect(() => {
    const fetchTestResults = async () => {
      try {
        setLoading(true);
  
        // API Call
        const response = await axios.get(
          `${USERENDPOINTS.GETCURRENTTESTRESULT}?testId=${mainTestId}&selectedTestId=${selectedTestId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        console.log("Fetched Test Results:", response.data);
  
        const { testDetails, result } = response.data;
  
        // Extract the selected test from testDetails.tests
        const selectedTest = testDetails._doc.tests.find(
          (test) => test._id.toString() === selectedTestId
        );
        
        if (selectedTest) {
          // Process questions from the selected test
          const questions = selectedTest.questions?.map((q) => q._doc || q) || [];
          console.log("Fetched Test qes:", questions);
          // Update state with test details and questions
          setTestDetails({
            ...testDetails._doc,
            questions,
          });

          const selectedTestResult = result.tests.find(
            (test) => test.selectedTestId.toString() === selectedTestId
          );
          
          if (selectedTestResult) {
            console.log("Fetched Selected Test Results:", selectedTestResult.results);
            setTestResults(selectedTestResult.results);
          } else {
            console.error("Selected test not found.");
          }
        } else {
          setError('Selected test not found.');
        }
      } catch (err) {
        console.error('Error fetching test results:', err);
        setError('Failed to fetch test results.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchTestResults();
  }, [mainTestId, selectedTestId, token]);

  console.log("Fetched Selected Test Results:", testResults);

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleRetakeTest = () => {
    navigate(`/test?mainTestId=${mainTestId}&selectedTestId=${selectedTestId}`);
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
    <div className="flex flex-col items-center min-h-screen  p-4">
      <div className="flex flex-col w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 mt-8">
        {!showDetails && (
          <div className="flex flex-col md:flex-row">
            {/* Left Side */}
            <div className="md:w-1/2 md:pr-8 p-8 flex flex-col items-center">
              <div className="flex flex-col items-center mb-8">
                <div className="flex items-center justify-center mb-6">
                  <img
                    src="/The-mentor-logo.png"
                    alt="GenAi Learning"
                    className="h-16 w-auto mx-auto"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center h-full">
      {testResults?.map((testResult, index) => (
        <Paper key={index} className="bg-blue-800 text-white p-8 rounded-lg shadow-md mx-auto mb-6">
          <Typography variant="h5" className="font-bold">
            {testResult.status === 'Passed' ? 'Congratulations!' : 'Better Luck Next Time!'}
          </Typography>
          <Typography variant="body1">
            You have {testResult.status === 'Passed' ? 'successfully' : 'attempted'} the test: {testResult.testName}.
          </Typography>
          <Typography variant="body2">
            Score: {testResult.score} | Date: {testResult.createdAt}
          </Typography>
        </Paper>
      ))}

      {/* Other buttons for actions like showing details, retaking test, etc. */}
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
    {testResults?.map((result, index) => (
      <React.Fragment key={index}>
        <div className="flex flex-col">
          <Typography variant="body2" className="text-sm text-gray-500">
            Test duration
          </Typography>
          <Typography variant="body1" className="font-medium bg-gray-200 p-2 rounded">
            {result?.totalDuration ? `${Math.floor(result.totalDuration / 60)} mins` : 'N/A'}
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
            {result?.score || 'N/A'}
          </Typography>
        </div>

        <div className="flex flex-col">
          <Typography variant="body2" className="text-sm text-gray-500">
            Rank
          </Typography>
          <Typography variant="body1" className="font-medium bg-yellow-100 p-2 rounded text-yellow-800">
            {result?.rank || 'N/A'}
          </Typography>
        </div>

        <div className="flex flex-col">
          <Typography variant="body2" className="text-sm text-gray-500">
            Completion Time
          </Typography>
          <Typography variant="body1" className="font-medium bg-blue-100 p-2 rounded text-blue-800">
            {result?.completionTime
              ? (result.completionTime >= 60
                ? `${Math.floor(result.completionTime / 60)} mins`
                : `${result.completionTime} sec`)
              : 'N/A'}
          </Typography>
        </div>

        <div className="flex flex-col">
          <Typography variant="body2" className="text-sm text-gray-500">
            Attempts
          </Typography>
          <Typography variant="body1" className="font-medium bg-gray-200 p-2 rounded">
            {result?.attempts || 'N/A'}
          </Typography>
        </div>
      </React.Fragment>
    ))}
  </div>
</div>

          </div>
        )}

  {/* Detailed Results Section */}
{showDetails && (
  <div className="mt-8 bg-white p-8 rounded-lg w-full">
    <div className="flex justify-between mb-4">
      <Typography variant="h3" className="font-semibold">
        Detailed Results
      </Typography>
      <Button variant="outlined" color="primary" onClick={handleShowDetails}>
        Hide Details
      </Button>
    </div>
    <Divider className="mb-4" />

    {testResults?.map((result, index) => (
      <div key={index} className="mb-8">
        <Typography variant="h6" className="mb-2 font-medium">
          Test {index + 1} Overview
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Typography variant="body2" className="text-sm text-gray-500">
              Time Taken
            </Typography>
            <Typography variant="body1" className="font-medium bg-blue-100 p-2 rounded text-blue-800">
              {result?.completionTime
                ? (result.completionTime >= 60
                  ? `${Math.floor(result.completionTime / 60)} mins`
                  : `${result.completionTime} sec`)
                : 'N/A'}
            </Typography>
          </div>

          <div>
            <Typography variant="body2" className="text-sm text-gray-500">
              Accuracy
            </Typography>
            <Typography variant="body1" className="font-medium bg-green-100 p-2 rounded text-green-800">
              {result?.accuracy || 'N/A'}%
            </Typography>
          </div>

          <div>
            <Typography variant="body2" className="text-sm text-gray-500">
              Correct Answers
            </Typography>
            <Typography variant="body1" className="font-medium bg-yellow-100 p-2 rounded text-yellow-800">
              {result?.totalCorrect || 'N/A'}
            </Typography>
          </div>
        </div>

        <Typography variant="h6" className="mt-6 mb-2 font-medium">
          Questions and Answers
        </Typography>
        <Divider className="mb-4" />
        <div>
          {(testDetails?.questions || []).map((question, questionIndex) => (
            <div key={question._id} className="mb-4">
              <Typography variant="body1" className="font-medium mb-2">
                {questionIndex + 1}. {question.text}
              </Typography>

              {/* Answer Options in 2-Column Grid */}
              <div className="grid grid-cols-2 gap-4 ml-4">
                {question.answers.map((ans, ansIndex) => (
                  <div
                    key={ansIndex}
                    className={`w-full p-3 rounded-md text-left text-sm ${
                      result?.answers?.[questionIndex] === ansIndex
                        ? 'bg-blue-100 text-blue-800'
                        : ansIndex === question.correctAnswer
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="flex items-center">
                      {ansIndex === question.correctAnswer ? (
                        <CheckIcon color="success" />
                      ) : (
                        <CloseIcon color="error" />
                      )}
                      {ans}
                    </div>
                  </div>
                ))}
              </div>

              {/* Your Answer */}
              <Typography variant="body2" className="ml-6 mt-2">
                Your answer:
                <div
                  className={`w-full p-3 mt-2 rounded-md text-sm ${
                    result?.answers?.[questionIndex] === question.correctAnswer
                      ? 'bg-green-100 text-green-800'
                      : result?.answers?.[questionIndex] !== undefined
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {result?.answers?.[questionIndex] !== undefined
                    ? question.answers[result?.answers?.[questionIndex]]
                    : 'N/A'}
                </div>
              </Typography>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
)}





      </div>
    </div>
  );
};

export default TestResultsPage;
