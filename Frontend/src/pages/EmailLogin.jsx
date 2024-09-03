import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IconButton, TextField, Button, Divider, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import GitHub from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google'; // Optional: Use an icon for Google login
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import { API_BASE_URL } from '../constants/ApiConstants';

export default function EmailOtpLogin() {
  const [step, setStep] = useState('enterEmail');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [isVerifiedUser, setIsVerifiedUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false); // Google login loading state
  const [linkedInLoading, setLinkedInLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}auth/send-emailotp`, { email });
      console.log(response.data);
      if (response.data.keyword === 'USER_VERIFIED') {
        setIsVerifiedUser(true);
      } else {
        setIsVerifiedUser(false);
      }
      setStep('verifyOtp');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}auth/verify-emailotp`, { email, otp, name });
      const { token } = response.data;
      localStorage.setItem('token', token);
      const response1 = await axios.get(`${API_BASE_URL}auth/userDetails`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { user } = response1.data;
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/'); // Redirect to home or dashboard
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const onGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      // Redirect to backend Google OAuth route
      window.location.href = `${API_BASE_URL}auth/google`;
    } catch (error) {
      console.error('Google Login Error:', error);
      setError('An error occurred during Google login');
    } finally {
      setGoogleLoading(false);
    }
  };

   // Google OAuth callback handling
  
  //  const handleAuthResponse = async () => {
  //   try {
  //     const response = await axios.get(`${API_BASE_URL}auth/google/callback`, {
  //       withCredentials: true,
  //     });
  //     const { token, user } = response.data;
  
  //     // Store the token and user details in local storage
  //     localStorage.setItem('token', token);
  //     localStorage.setItem('userId', user.id);
  //     localStorage.setItem('userRole', user.role);
  
  //     navigate('/'); // Redirect to home or dashboard
  //   } catch (error) {
  //     console.error('Authentication Error:', error);
  //     setError('An error occurred during authentication');
  //   }
  // };
  
  // useEffect(() => {
  //   handleAuthResponse(); // Call this function when the component mounts if needed
  // }, []);
 

  
    const handleLinkedInLogin = () => {
      setLinkedInLoading(true);
      try {
        window.location.href = `${API_BASE_URL}auth/linkedin`;
      }  catch (error) {
        console.error('linkedin Login Error:', error);
        setError('An error occurred during linkein login');
      } finally {
        setLinkedInLoading(false);
      }
    };

  return (
    <div className="grid w-full min-h-screen grid-cols-1 lg:grid-cols-2">
  {/* Left section */}
  <div className="flex flex-col items-start justify-center bg-white p-6 lg:p-10">
    <div className="mx-auto w-full max-w-md space-y-6">
      {/* Logo and menu button */}
      <div className="flex items-center justify-between">
        <a href="#" className="inline-flex items-center gap-2">
          <img src="/The-mentor-logo.png" alt="The Mentor Logo" style={{ width: '100px', height: '40px' }} />
        </a>
        <IconButton>
          <MenuIcon />
        </IconButton>
      </div>
      {/* Header */}
      <div className="space-y-2 text-left">
        <Typography variant="h4" className="font-bold">
          {step === 'enterEmail' ? 'Enter Your Email' : 'Verify OTP'}
        </Typography>
        <Typography className="text-gray-500">
          {step === 'enterEmail' ? 'Enter your email to receive an OTP.' : 'Enter the OTP sent to your email.'}
        </Typography>
      </div>
      {/* Form fields */}
      <div className="space-y-4">
        {step === 'enterEmail' ? (
          <>
            <TextField
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />
            <Button type="button" variant="contained" className='h-10 ' onClick={handleSendOtp} fullWidth disabled={loading}>
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </Button>
          </>
        ) : (
          <>
            <TextField
              id="otp"
              label="OTP"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              fullWidth
              required
            />
            {!isVerifiedUser && (
              <TextField
                id="name"
                label="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
              />
            )}
            <Button type="button" variant="contained" onClick={handleVerifyOtp} fullWidth disabled={loading}>
              {loading ? 'Verifying OTP...' : 'Verify OTP'}
            </Button>
          </>
        )}
      </div>
      {/* Error message */}
      {error && <Typography color="error">{error}</Typography>}
      {/* Divider */}
      <div className="relative">
        <Divider>
          <Typography variant="caption" className="bg-gray-100 px-2">
            Or sign in with
          </Typography>
        </Divider>
      </div>
      {/* Social buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="contained"
          startIcon={<LinkedInIcon />}
          onClick={handleLinkedInLogin}
          fullWidth
          disabled={linkedInLoading}
          size="small" // Small size button
          className="bg-white h-10 hover:bg-blue-700 text-white" // Tailwind CSS classes for LinkedIn
        >
          {linkedInLoading ? 'Signing in with LinkedIn...' : ' LinkedIn'}
        </Button>
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          onClick={onGoogleLogin}
          fullWidth
          disabled={googleLoading}
          size="small" // Small size button
          className="bg-red-600 hover:bg-red-700 text-white" // Tailwind CSS classes for Google
        >
          {googleLoading ? 'Signing in with Google...' : ' Google'}
        </Button>
      </div>
    </div>
  </div>
  {/* Right section for image */}
  <div className="hidden lg:flex ml-9 items-start justify-start h-full">
    <img
      src="/signup.jpg"
      alt="Sign up image"
      className="h-auto lg:h-[729px] object-cover w-full lg:w-auto" // Responsive styles
    />
  </div>
</div>
  )}

