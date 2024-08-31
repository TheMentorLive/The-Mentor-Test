
import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AnimateName from '../context/animateName';
import { API_BASE_URL } from '../constants/ApiConstants';
import { toast } from 'react-toastify';
import {
  Button,
  TextField,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';
import { GitHub, Google, Menu as MenuIcon, Terrain as MountainIcon } from '@mui/icons-material';


function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);  // State for loading
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const navigate= useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userData = { email, password, role };
      const { data } = await axios.post(`${API_BASE_URL}auth/register`, userData);
      console.log('Registered user:', data);
      setPassword('')
      setRole('user');

      // Show success toast message
      toast.success('Registration successful!');
      setShowOtpPopup(true);
      // navigate("/login")
      
    } catch (error) {
      setError(error.response?.data?.msg || 'An error occurred');
      console.log(error);
      toast.error(error.response?.data?.error || 'An error occurred');
    }
    finally {
      setLoading(false);  // Stop loading
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}auth/verify-otp`, { email, otp });
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.error || 'An error occurred');
    }
  };

  return (

<div className="grid w-full min-h-screen grid-cols-1 lg:grid-cols-2">
{/* Left section */}
<div className="flex flex-col items-start justify-center bg-white p-6 lg:p-10">
  <div className="mx-auto w-full max-w-md space-y-6">
    {/* Logo and menu button */}
    <div className="flex items-center justify-between">
      <Link href="#" prefetch={false}>
        <a className="inline-flex items-center gap-2">
        <img src="/logo.png" alt="The Mentor Logo" style={{ width: '100px', height: '40px' }} />

          {/* <Typography variant="h6" component="span" className="font-bold">
            The Mentor
          </Typography> */}
        </a>
      </Link>
      <IconButton>
        <MenuIcon />
      </IconButton>
    </div>
    {/* Header */}
    <div className="space-y-2 text-left">
      <Typography variant="h4" className="font-bold">
      Sign up for a new account
      </Typography>
      <Typography className="text-gray-500">
        Enter your email and password below to create your account.You will receive otp after signUp via Email.
      </Typography>
    </div>
    {/* Form fields */}
    <div className="space-y-4">
      <TextField
        id="email"
        label="Email"
        type="email"
        value={email}
         onChange={(e) => setEmail(e.target.value)}
        placeholder="m@example.com"
        fullWidth
        required
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
      />
       <Button type="submit" variant="contained" onClick={handleSubmit} fullWidth disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </Button>
    </div>
    {/* Divider */}
    <div className="relative">
      <Divider>
        <Typography variant="caption" className="bg-gray-100 px-2">
          Or sign up with
        </Typography>
      </Divider>
    </div>
    {/* Social buttons */}
    <div className="grid grid-cols-2 gap-4">
      <Button variant="outlined" startIcon={<GitHub />}>
        GitHub
      </Button>
      <Button variant="outlined" startIcon={<Google />}>
        Google
      </Button>
    </div>
    {/* Sign in link */}
    <div className="text-center text-sm">
      Already have an account?{' '}
      <Link to="/login" prefetch={false}>
        <a className="underline">Sign in</a>
      </Link>
    </div>
  </div>
</div>
{/* Right section for image */}
<div className="flex items-start justify-center bg-gray-100 lg:hidden">
  <img
    src="/signup.jpg"
    alt="Sign up image"
    // width="1920"
    height="1080"
    className="h-full "
    style={{ aspectRatio: '', objectFit: 'cover' }}
  />
</div>
<div className="hidden  lg:flex items-start justify-start  h-full">
  <img
    src="/signup.jpg"
    alt="Sign up image"
    
    className="h-full object-cover"
    style={{ aspectRatio: 'auto' ,width: 'auto' }}
  />
</div>
{showOtpPopup && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
    <motion.div
      initial={{ y: '-100vh', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '-100vh', opacity: 0 }}
      transition={{ duration: 2.5, type: 'spring', stiffness: 70 }}
      className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg mx-4"
    >
      {/* Title and additional text */}
      <div className="mb-6 text-center">
        <Typography variant="h5" className="font-bold mb-2">
          OTP Verification
        </Typography>
        <Typography variant="body1" className="text-gray-600">
          We have sent a One-Time Password (OTP) to your registered email address. Please enter the OTP below to verify your account.
        </Typography>
      </div>
      {/* OTP Input */}
      <TextField
        id="otp"
        label="OTP"
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        fullWidth
        required
        className="mb-4"
      />
      {/* Action buttons */}
      <div className="flex justify-between mt-4">
        <Button
          variant="contained"
          color="primary"
          onClick={handleVerifyOtp}
          className="w-full mr-3"
        >
          Verify
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setShowOtpPopup(false)}
          className="w-full ml-2"
        >
          Cancel
        </Button>
      </div>
    </motion.div>
  </div>
)}

</div>

  );
}

export default Register;
