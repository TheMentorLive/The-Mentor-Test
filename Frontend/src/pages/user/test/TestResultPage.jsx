import React from 'react';
import { Button, Typography, Paper } from '@mui/material';

const TestResultsPage = () => {
  return (
    <div className="flex flex-col items-center  min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col w-full max-w-4xl bg-white rounded-lg shadow-lg  p-8 mt-8">
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
      </div>
    </div>
  );
};

export default TestResultsPage;
