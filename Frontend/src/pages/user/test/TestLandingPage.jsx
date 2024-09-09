import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material'; 
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'; // Import Moment.js if needed
import { ADMINENDPOINTS, USERENDPOINTS } from '../../../constants/ApiConstants';

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
          });; // Update with your endpoint
          console.log(response.data);
          
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!test) return <p>No test found</p>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-2">
    <div className="flex flex-col w-full  max-w-5xl bg-white rounded-lg shadow-lg p-8 mt-28 ">
      <div className="flex flex-col  md:flex-row">
        <div className="md:w-1/2 md:pr-8">
          <h1 className="text-4xl font-bold mb-4">{/* test.description */} Test Title Here</h1>
          <br/>
          <div className="flex space-x-12">
            <div>
              <p className="text-sm text-gray-500">Test duration</p>
              <p className="text-lg font-medium">{/* test.duration */} 60 mins</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">No. of questions</p>
              <p className="text-lg font-medium">{/* test.questions.length */} 20 questions</p>
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
            <Link to={`/test?id=1`}>
              <Button variant="contained" color="primary" className="bg-[#2563EB] text-white">Continue</Button>
            </Link>
            <Button variant="outlined" color="primary" className="border-[#2563EB] text-[#2563EB]">Try Sample Test</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default TestLandingPage;
