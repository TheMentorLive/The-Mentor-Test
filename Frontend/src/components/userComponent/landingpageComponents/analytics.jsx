import React from 'react';
import { Card, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Analytics = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Upcoming Tests Section */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white p-6 shadow-lg rounded-lg border border-gray-200">
          <div className="flex items-center justify-between border-b pb-4 mb-4">
            <h3 className="text-2xl font-semibold text-gray-900">Upcoming Tests</h3>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/tests')}
              className="hover:bg-blue-700 transition-colors duration-300"
            >
              View All
            </Button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-300">
              <div>
                <p className="text-lg font-medium text-gray-800">JEE Mock Test 1</p>
                <p className="text-sm text-gray-600">August 15, 2023</p>
              </div>
              <Button
                variant="outlined"
                color="primary"
                className="hover:bg-gray-100 transition-colors duration-300"
              >
                Register
              </Button>
            </div>
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-300">
              <div>
                <p className="text-lg font-medium text-gray-800">JEE Mock Test 2</p>
                <p className="text-sm text-gray-600">September 1, 2023</p>
              </div>
              <Button
                variant="outlined"
                color="primary"
                className="hover:bg-gray-100 transition-colors duration-300"
              >
                Register
              </Button>
            </div>
          </div>
        </Card>

        {/* Test History Section */}
        <Card className="bg-white p-6 shadow-lg rounded-lg border border-gray-200">
          <div className="flex items-center justify-between border-b pb-4 mb-4">
            <h3 className="text-2xl font-semibold text-gray-900">Test History</h3>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/history')}
              className="hover:bg-blue-700 transition-colors duration-300"
            >
              View All
            </Button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-300">
              <div>
                <p className="text-lg font-medium text-gray-800">JEE Mock Test 1</p>
                <p className="text-sm text-gray-600">August 1, 2023</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-medium text-gray-800">Score: 480/720</p>
                <p className="text-sm text-gray-600">Percentile: 92.5</p>
              </div>
            </div>
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-300">
              <div>
                <p className="text-lg font-medium text-gray-800">JEE Mock Test 2</p>
                <p className="text-sm text-gray-600">July 15, 2023</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-medium text-gray-800">Score: 520/720</p>
                <p className="text-sm text-gray-600">Percentile: 95.2</p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Individual Test Analytics Section */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white p-6 shadow-lg rounded-lg border border-gray-200">
          <div className="flex items-center justify-between border-b pb-4 mb-4">
            <h3 className="text-2xl font-semibold text-gray-900">Individual Test Analytics</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-300">
              <div>
                <p className="text-lg font-medium text-gray-800">JEE Mock Test 1</p>
                <p className="text-sm text-gray-600">August 1, 2023</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-medium text-gray-800">Score: 480/720</p>
                <p className="text-sm text-gray-600">Percentile: 92.5</p>
                <p className="text-sm text-gray-600">Strengths: Physics, Maths</p>
                <p className="text-sm text-gray-600">Weaknesses: Chemistry</p>
              </div>
            </div>
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-300">
              <div>
                <p className="text-lg font-medium text-gray-800">JEE Mock Test 2</p>
                <p className="text-sm text-gray-600">July 15, 2023</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-medium text-gray-800">Score: 520/720</p>
                <p className="text-sm text-gray-600">Percentile: 95.2</p>
                <p className="text-sm text-gray-600">Strengths: Chemistry, Maths</p>
                <p className="text-sm text-gray-600">Weaknesses: Physics</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Overall Analytics Section */}
        <Card className="bg-white p-6 shadow-lg rounded-lg border border-gray-200">
          <div className="flex items-center justify-between border-b pb-4 mb-4">
            <h3 className="text-2xl font-semibold text-gray-900">Overall Analytics</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-300">
              <div>
                <p className="text-lg font-medium text-gray-800">Average Score</p>
                <p className="text-sm text-gray-600">500/720</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-medium text-gray-800">Average Percentile</p>
                <p className="text-sm text-gray-600">93.8%</p>
              </div>
            </div>
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-300">
              <div>
                <p className="text-lg font-medium text-gray-800">Subjects Strengths</p>
                <p className="text-sm text-gray-600">Maths, Chemistry</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-medium text-gray-800">Subjects Weaknesses</p>
                <p className="text-sm text-gray-600">Physics</p>
              </div>
            </div>
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-300">
              <div>
                <p className="text-lg font-medium text-gray-800">Improvement Areas</p>
                <p className="text-sm text-gray-600">Focus on Physics concepts</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-medium text-gray-800">Recommended Actions</p>
                <p className="text-sm text-gray-600">
                  Enroll in Physics course, practice more Physics problems
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Analytics;
