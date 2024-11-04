import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResultPage = () => {
  const [showAnswers, setShowAnswers] = useState(false);
  const navigate = useNavigate();

  const handleViewAnswers = () => {
    setShowAnswers(!showAnswers);
  };

  const goToDashboard = () => {
    navigate('/dashboard'); // Change '/dashboard' to your actual dashboard route
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Result Overview */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Test Results</h2>
          <p className="text-lg">Congratulations on completing the test! Here is your performance summary:</p>
        </div>

        {/* Score Section */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center space-y-4">
          <h3 className="text-xl font-semibold">Your Score</h3>
          <p className="text-4xl font-bold text-green-400">85%</p>
        </div>

        {/* Test Summary */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Test Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-700 rounded-lg text-center">
              <p className="text-lg font-semibold">Total Questions</p>
              <p className="text-2xl font-bold">50</p>
            </div>
            <div className="p-4 bg-gray-700 rounded-lg text-center">
              <p className="text-lg font-semibold">Correct Answers</p>
              <p className="text-2xl font-bold text-green-400">42</p>
            </div>
            <div className="p-4 bg-gray-700 rounded-lg text-center">
              <p className="text-lg font-semibold">Wrong Answers</p>
              <p className="text-2xl font-bold text-red-400">8</p>
            </div>
            <div className="p-4 bg-gray-700 rounded-lg text-center">
              <p className="text-lg font-semibold">Skipped Questions</p>
              <p className="text-2xl font-bold text-yellow-400">0</p>
            </div>
          </div>
        </div>

        {/* View Answers Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <button
            onClick={handleViewAnswers}
            className="px-6 py-3 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-600"
          >
            {showAnswers ? 'Hide Answers' : 'View Answers'}
          </button>

          {showAnswers && (
            <div className="mt-6 space-y-4">
              {/* Example Question and Answer */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="font-bold">Question 1:</h4>
                <p>What is the capital of France?</p>
                <p className="text-green-400">Your Answer: Paris (Correct)</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="font-bold">Question 2:</h4>
                <p>Which data structure uses FIFO?</p>
                <p className="text-red-400">Your Answer: Stack (Incorrect)</p>
                <p className="text-green-400">Correct Answer: Queue</p>
              </div>
              {/* Add more questions/answers dynamically */}
            </div>
          )}
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
          <h3 className="text-2xl font-bold text-white">Performance Analysis</h3>
          <ul className="list-disc list-inside space-y-4 text-gray-300">

            <li className="flex justify-between">
              <span>Time Spent:</span>
              <span className="font-semibold">20 minutes</span>
            </li>

            <li className="flex justify-between">
              <span>Difficulty Level:</span>
              <span className="font-semibold">Medium</span>
            </li>

            <li className="flex justify-between">
              <span>Accuracy:</span>
              <span className="font-semibold">84%</span>
            </li>

            <li className="flex justify-between">
              <span>Total Questions:</span>
              <span className="font-semibold">50</span>
            </li>

            <li className="flex justify-between">
              <span>Answered Questions:</span>
              <span className="font-semibold">50</span>
            </li>

            <li className="flex justify-between">
              <span>Correct Answers:</span>
              <span className="font-semibold text-green-400">42</span>
            </li>

            <li className="flex justify-between">
              <span>Incorrect Answers:</span>
              <span className="font-semibold text-red-400">8</span>
            </li>

            <li className="flex justify-between">
              <span>Skipped Questions:</span>
              <span className="font-semibold text-yellow-400">0</span>
            </li>

            <li className="flex justify-between">
              <span>Average Time per Question:</span>
              <span className="font-semibold">24 seconds</span>
            </li>




          </ul>

          <div className="flex justify-end mt-4">
          </div>
        </div>



        {/* Suggestions Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-bold">What's Next?</h3>
          <p>We recommend reviewing these areas to improve:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Data Structures</li>
            <li>Algorithms</li>
            <li>JavaScript Concepts</li>
          </ul>
          <div className='space-x-5'>
            <button className="mt-4 px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600">
              Take Another Test
            </button>
            <button
              onClick={goToDashboard}
              className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
            >
              Go to Dashboard
            </button>
          </div>
        </div>



      </div>
    </div>
  );
};

export default ResultPage;
