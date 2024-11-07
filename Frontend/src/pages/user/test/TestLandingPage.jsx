import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { USERENDPOINTS } from '../../../constants/ApiConstants';
import TestFooter from './Footer';
import TestNavbar from './Navbar';

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

const TestLandingPage = () => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const testId = queryParams.get('id');

  useEffect(() => {
    if (testId) {
      const fetchTest = async () => {
        try {
          const response = await axios.get(`${USERENDPOINTS.GETTESTSLANDING}?id=${testId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setTest(response.data);
        } catch (error) {
          setError('Error fetching test details');
          console.error('Error fetching test details:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchTest();
    }
  }, [testId]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <style>{spinnerStyles}</style>
      <div className="spinner"></div>
      <p className="ml-4 text-blue-500">Loading...</p>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-red-500 text-lg">{error}</p>
    </div>
  );

  if (!test) return (
    <div className="flex justify-center items-center min-h-screen">
      <p>No test found</p>
    </div>
  );

  return (
    <div>
      <TestNavbar/>
    <div className="flex flex-col justify-center items-center min-h-screen  p-4">
  <div className="flex flex-col w-full max-w-5xl bg-white rounded-lg shadow-lg p-8">
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2 md:pr-8">
        <h1 className="text-4xl font-bold mb-4">{test.description || 'Test Title Here'}</h1>
        <div className="flex space-x-12 mb-4">
          <div>
            <p className="text-sm text-gray-500">Test duration</p>
            <p className="text-lg font-medium">{test.duration || '60 mins'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">No. of questions</p>
            <p className="text-lg font-medium">{test.questions?.length || '20 questions'}</p>
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
            <a href="#" className="text-[#2563EB] underline">
              sample test
            </a>{' '}
            for a couple of minutes before taking the main test.
          </li>
        </ol>
        <div className="flex space-x-6">
          <Link to={`/test?id=${test._id}`}>
          <button   className="bg-[#2563EB] px-5 py-2 border rounded-md text-white">Continue</button>
          </Link>
          <Button variant="outlined"  className="border-[#2563EB] text-[#2563EB]">Try Sample Test</Button>
        </div>
      </div>
    </div>
  </div>
</div>
<TestFooter/>
</div>

  );
};

export default TestLandingPage;
