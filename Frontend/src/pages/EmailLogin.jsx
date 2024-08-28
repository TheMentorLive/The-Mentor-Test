import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IconButton, TextField, Button, Divider, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import GitHub from '@mui/icons-material/GitHub';
import Google from '@mui/icons-material/Google';
import { API_BASE_URL } from '../constants/ApiConstants';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import {jwt_decode} from 'jwt-decode';

export default function EmailOtpLogin() {
  const [step, setStep] = useState('enterEmail'); // 'enterEmail' or 'verifyOtp'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [isVerifiedUser, setIsVerifiedUser] = useState(false);
  const [loading, setLoading] = useState(false);
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
      const { token,  } = response.data;
      localStorage.setItem('token', token);
      const response1 = await axios.get('http://localhost:8080/api/auth/userDetails', {
                headers: { Authorization: `Bearer ${token}` },
              });
              const {  user } = response1.data;
          
              localStorage.setItem('user', JSON.stringify(response1.data.user));
      navigate('/'); // Redirect to home or dashboard
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const googleSignin = async (givenName, familyName, email) => {
    console.log(givenName, familyName, email,"ghjkl");
    
    try {
      const response = await axios.post(`${API_BASE_URL}auth/google-login`, { givenName, familyName, email });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/'); // Redirect to home or dashboard
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      setError('An error occurred during Google Sign-In');
    }
  };

  return (
    <GoogleOAuthProvider clientId="97196702829-ggt635ikqhgugeup96saocjjcg0gnonu.apps.googleusercontent.com">
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
                  <Button type="button" variant="contained" onClick={handleSendOtp} fullWidth disabled={loading}>
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
              <Button variant="outlined" startIcon={<GitHub />}>
                GitHub
              </Button>
              <GoogleLogin
                onSuccess={credentialResponse => {
                  const details = jwt_decode(credentialResponse.credential);
                  googleSignin(details.given_name, details.family_name, details.email);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </div>
            {/* Sign up link */}
            {/* <div className="text-center text-sm">
              Login With{' '}
              <a href="/login" className="underline text-blue-600">
                Phone Number
              </a>
            </div> */}
          </div>
        </div>
        {/* Right section for image */}
        <div className="flex items-start justify-center bg-gray-100 lg:hidden">
          <img
            src="/signup.jpg"
            alt="Sign up image"
            height="1080"
            className="h-full"
            style={{ aspectRatio: '', objectFit: 'cover' }}
          />
        </div>
        <div className="hidden lg:flex items-start justify-start h-full">
          <img
            src="/signup.jpg"
            alt="Sign up image"
            className="h-full object-cover"
            style={{ aspectRatio: 'auto', width: 'auto' }}
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
