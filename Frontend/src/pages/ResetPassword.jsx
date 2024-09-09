import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../constants/ApiConstants';

// Button Component
function Button({ variant = "default", size = "medium", children, ...props }) {
  const baseStyles = "py-2 px-4 rounded focus:outline-none";
  const variantStyles = variant === "ghost"
    ? "bg-transparent border border-gray-300"
    : "bg-[#2563EB] text-white";
  const sizeStyles = size === "icon" ? "p-2" : size === "small" ? "py-1 px-3" : "py-2 px-4";

  return (
    <button className={`${baseStyles} ${variantStyles} ${sizeStyles}`} {...props}>
      {children}
    </button>
  );
}

// Label Component
function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
      {children}
    </label>
  );
}

// Input Component
function Input({ id, type = "text", placeholder, required, value, onChange }) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
      className="block w-full border border-gray-300 rounded-md p-2"
    />
  );
}

export default function ResetPassword() {
  const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Verify OTP, Step 3: Set new password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  // Handle email submission for password reset
  const handleEmailSubmit = async () => {
    toast.info('sending otp...', { autoClose: 3000 });

    
    try {
      await axios.post(`${API_BASE_URL}auth/reset-password/email`, { email });
      toast.success('OTP sent to your email!');
      setStep(2); // Move to Step 2: OTP Verification
    } catch (error) {
      toast.error('Failed to send OTP. Please try again.');
      console.error('Error during email submission:', error);
    }
  };

  // Handle OTP Verification
  const handleOtpSubmit = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}auth/reset-password/verify-otp`, { email, otp });
      if (response.data.success) {
        toast.success('OTP verified successfully!');
        setStep(3); // Move to Step 3: Set new password
      } else {
        toast.error('Invalid OTP. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to verify OTP.');
      console.error('Error during OTP verification:', error);
    }
  };

  // Handle New Password Submission
  const handlePasswordSubmit = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}auth/reset-password/set-password`, { email, newPassword });
      toast.success('Password reset successfully!');
      navigate('/login'); // Redirect to login page after successful password reset
    } catch (error) {
      toast.error('Failed to reset password.');
      console.error('Error during password reset:', error);
    }
  };

  return (
    <div className="grid w-full min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col items-start justify-center bg-muted p-6 lg:p-10">
        <div className="mx-auto w-full max-w-[400px] space-y-6">
          <div className="flex items-center  justify-between">
            <Link to="/" className="inline-flex items-center -mt-[500px]  md:-mt-64 gap-2">
              <img src="/logo.webp" alt="Logo" className="  lg:mt-auto h-12" />
            </Link>
          </div>

          <div className="space-y-2 text-left">
            <h1 className="text-3xl font-bold">
              {step === 1 ? 'Reset Your Password' : step === 2 ? 'Verify OTP' : 'Set New Password'}
            </h1>
            <p className="text-muted-foreground">
              {step === 1
                ? 'Enter your email to receive the OTP.'
                : step === 2
                ? 'Enter the OTP sent to your email.'
                : 'Enter your new password.'}
            </p>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@gmail.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <br/>
              <Button variant="outline" className="flex w-full items-center text-white h-10 rounded-md bg-[#2563EB] hover:bg-blue-400 justify-center" onClick={handleEmailSubmit}>
                Send OTP
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter OTP"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <Button type="button" className="w-full" onClick={handleOtpSubmit}>
                Verify OTP
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="New Password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <Button type="button" className="w-full" onClick={handlePasswordSubmit}>
                Reset Password
              </Button>
            </div>
          )}

          <div className="flex justify-center mt-4">
            <p className="text-center">
              Remember your password?
              <Link to="/login" className="text-[#2563EB] hover:underline"> Sign in</Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex items-start justify-start bg-muted">
        <img
          src="/signup.jpg"
          alt="Reset Password"
          className="h-full w-full object-cover"
          style={{ aspectRatio: "1920/1080", objectFit: "cover" }}
        />
      </div>
    </div>
  );
}
