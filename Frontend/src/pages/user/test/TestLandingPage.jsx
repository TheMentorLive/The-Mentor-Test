import React from 'react';
import { Button } from '@mui/material'; 
import { Link } from 'react-router-dom';

const TestLandingPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-2">
      <div className="flex flex-col w-full max-w-5xl bg-white rounded-lg shadow-lg p-8 mt-8">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 md:pr-8">
            <h1 className="text-4xl font-bold mb-4">Welcome to HackerRank Back-End Developer Test</h1>
            <div className="flex space-x-12">
              <div>
                <p className="text-sm text-gray-500">Test duration</p>
                <p className="text-lg font-medium">90 mins</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">No. of questions</p>
                <p className="text-lg font-medium">1 question</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-8 md:border-l md:border-gray-200">
            <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
            <ol className="list-decimal list-inside space-y-4 text-gray-600 mb-8">
              <li>This is a timed test. Please make sure you are not interrupted during the test, as the timer cannot be paused once started.</li>
              <li>Please ensure you have a stable internet connection.</li>
              <li>
                We recommend you to try the{' '}
                <a href="#" className="text-blue-500 underline">
                  sample test
                </a>{' '}
                for a couple of minutes before taking the main test.
              </li>
            </ol>
            <div className="flex space-x-6">
              <Link to="/test">
                <Button variant="contained" color="primary" className="bg-blue-500 text-white">Continue</Button>
              </Link>
              <Button variant="outlined" color="primary" className="border-blue-500 text-blue-500">Try Sample Test</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestLandingPage;
