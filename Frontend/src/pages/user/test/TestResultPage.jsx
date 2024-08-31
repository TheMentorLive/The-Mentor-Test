import React, { useState } from 'react';
import { Button, Typography, Paper, Divider } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const TestResultsPage = () => {
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const testResults = {
    accuracy: '100%',
    totalCorrect: 1,
    totalQuestions: 1,
    status: 'Pass', // or 'Fail' based on actual results
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 mt-8">
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
                  Congratulations!
                </Typography>
                <Typography variant="body1">
                  You have successfully completed the HackerRank Back-End Developer Test.
                </Typography>
              </Paper>
              <div className="mt-6 flex space-x-4 justify-center">
                <Button variant="contained" color="primary">
                  Give Feedback
                </Button>
                <Button variant="outlined" color="primary" onClick={handleShowDetails}>
                  {showDetails ? 'Hide Details' : 'Show Results'}
                </Button>
                <Button variant="outlined" color="primary">
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
            <div className="flex flex-wrap space-y-4">
              <div className="w-1/2">
                <Typography variant="body2" className="text-sm text-gray-500">
                  Test duration
                </Typography>
                <Typography variant="body1" className="font-medium">
                  90 mins
                </Typography>
              </div>
              <div className="w-1/2">
                <Typography variant="body2" className="text-sm text-gray-500">
                  No. of questions
                </Typography>
                <Typography variant="body1" className="font-medium">
                  1 question
                </Typography>
              </div>
              <div className="w-1/2">
                <Typography variant="body2" className="text-sm text-gray-500">
                  Score
                </Typography>
                <Typography variant="body1" className="font-medium text-blue-500">
                  100%
                </Typography>
              </div>
              <div className="w-1/2 text-right">
                <Typography variant="body2" className="text-sm text-gray-500">
                  Rank
                </Typography>
                <Typography variant="body1" className="font-medium">
                  Top 10%
                </Typography>
              </div>
              <div className="w-1/2">
                <Typography variant="body2" className="text-sm text-gray-500">
                  Completion Time
                </Typography>
                <Typography variant="body1" className="font-medium">
                  60 mins
                </Typography>
              </div>
              <div className="w-1/2">
                <Typography variant="body2" className="text-sm text-gray-500">
                  Attempts
                </Typography>
                <Typography variant="body1" className="font-medium">
                  1
                </Typography>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Results Section */}
        {showDetails && (
          <div className="mt-8 bg-white p-8 rounded-lg shadow-lg">
            <Typography variant="h6" className="mb-4 font-semibold">
              Detailed Results
            </Typography>
            <Divider className="mb-4" />

            <Typography variant="h6" className="mb-2 font-medium">
              Exam Overview
            </Typography>
            <div className="mb-6">
              <Typography variant="body2" className="text-sm text-gray-500">
                Time Taken
              </Typography>
              <Typography variant="body1" className="font-medium">
                60 minutes
              </Typography>
            </div>

            <Typography variant="h6" className="mb-2 font-medium">
              Results Summary
            </Typography>
            <div className="flex flex-col space-y-4 mb-6">
              <Paper className={`p-4 rounded-lg shadow-md ${testResults.status === 'Pass' ? 'bg-green-100' : 'bg-red-100'}`}>
                <Typography variant="body2" className="text-sm text-gray-500">
                  Accuracy
                </Typography>
                <Typography variant="body1" className={`font-medium ${testResults.status === 'Pass' ? 'text-green-700' : 'text-red-700'}`}>
                  {testResults.accuracy}
                </Typography>
              </Paper>
              <Paper className="p-4 rounded-lg shadow-md bg-gray-100">
                <Typography variant="body2" className="text-sm text-gray-500">
                  Total Correct Answers
                </Typography>
                <Typography variant="body1" className="font-medium">
                  {testResults.totalCorrect} / {testResults.totalQuestions}
                </Typography>
              </Paper>
              <Paper className={`p-4 rounded-lg shadow-md ${testResults.status === 'Pass' ? 'bg-green-100' : 'bg-red-100'}`}>
                <Typography variant="body2" className="text-sm text-gray-500">
                  Status
                </Typography>
                <Typography variant="body1" className={`font-medium ${testResults.status === 'Pass' ? 'text-green-700' : 'text-red-700'}`}>
                  {testResults.status}
                </Typography>
              </Paper>
            </div>

            <Typography variant="h6" className="mb-2 font-medium">
              Questions and Answers
            </Typography>
            <div className="flex flex-col space-y-4">
              {/* Sample Question 1 */}
              <Paper className="p-4 rounded-lg shadow-md">
                <Typography variant="body2" className="text-sm text-gray-500">
                  Question 1:
                </Typography>
                <Typography variant="body1" className="font-medium">
                  What is the output of the following code snippet?
                </Typography>
                <Divider className="my-2" />
                <div className="flex items-center space-x-2">
                  <CheckIcon className="text-green-500" />
                  <Typography variant="body1" className="font-medium">
                    Correct Answer: Option A
                  </Typography>
                </div>
                <Typography variant="body2" className="text-sm text-gray-500 mt-2">
                  Selected Answer: Option A
                </Typography>
              </Paper>
              <Paper className="p-4 rounded-lg shadow-md">
                <Typography variant="body2" className="text-sm text-gray-500">
                  Question 1:
                </Typography>
                <Typography variant="body1" className="font-medium">
                  What is the output of the following code snippet?
                </Typography>
                <Divider className="my-2" />
                <div className="flex items-center space-x-2">
                  <CheckIcon className="text-green-500" />
                  <Typography variant="body1" className="font-medium">
                    Correct Answer: Option B
                  </Typography>
                </div>
                <Typography variant="body2" className="text-sm text-gray-500 mt-2">
                  Selected Answer: Option c
                </Typography>
              </Paper>

              {/* Add more questions as needed */}
            </div>

            <div className="mt-6">
              <Typography variant="body2" className="text-sm text-gray-500">
                Feedback
              </Typography>
              <Typography variant="body1" className="font-medium">
                Your performance was excellent. Keep up the good work!
              </Typography>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestResultsPage;
