import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthDetails = async () => {
      // Get token and user ID from URL parameters
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get('token');
      const userId = queryParams.get('id');

      if (token && userId) {
        // Store token and user ID in local storage
        localStorage.setItem('token', token);
        // localStorage.setItem('userId', userId);

        // Optionally, fetch user details from your backend
        try {
          const response = await fetch('https://genai-backend-ten.vercel.app/api/auth/userDetails', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const userDetails = await response.json();
          
          // Store user details in local storage
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(userDetails.user));

          // Redirect to the home or dashboard
          navigate('/');
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      } else {
        console.error('Token or User ID missing from URL');
        navigate('/login'); // Redirect to login if there's an issue
      }
    };

    fetchAuthDetails();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default AuthCallback;
