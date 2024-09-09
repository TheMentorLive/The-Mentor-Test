import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthDetails = async () => {
      // Get token from cookie
      const token = Cookies.get('token');  // Get token from cookie
      const userId = Cookies.get('userId'); // If you store userId in cookies

      if (token && userId) {
        // Optionally, fetch user details from your backend
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/userDetails`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch user details');
          }

          const userDetails = await response.json();
          
          // Store user details in local storage
          localStorage.setItem('user', JSON.stringify(userDetails.user));

          // Redirect to the home or dashboard
          navigate('/');
        } catch (error) {
          console.error('Error fetching user details:', error);
          setError('Failed to fetch user details. Please try again.');
          navigate('/login'); // Redirect to login if there's an issue
        }
      } else {
        console.error('Token or User ID missing from cookies');
        setError('Token or User ID is missing. Please try again.');
        navigate('/login'); // Redirect to login if there's an issue
      }

      setLoading(false); // Stop loading indicator
    };

    fetchAuthDetails();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return null; // Or a meaningful component if needed
};

export default AuthCallback;
