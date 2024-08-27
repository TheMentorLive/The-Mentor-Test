import React, { useContext, useState, useEffect } from 'react';
import { mainContext } from '../../context/mainContex';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, InputAdornment } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ProfileComponent() {
  const { user, signOut } = useContext(mainContext);
  const [open, setOpen] = useState(false);
  const [verificationType, setVerificationType] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [otpSent, setOtpSent] = useState(false);

//   useEffect(() => {
//     // Refresh user data when component mounts
//     refreshUser();
//   }, [refreshUser]);

  useEffect(() => {
    if (!user.isVerified || !user.isEmailVerified) {
      setVerificationType(!user.isVerified ? 'mobile' : 'email');
      setOpen(true);
    }
  }, [user]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = () => {
    handleSendOtp(inputValue); // Call function to send OTP
    setOtpSent(true); // Update state to reflect OTP has been sent
  };

  const handleVerify = () => {
    // Handle the verification logic here
    // For example, send OTP or verification link based on `verificationType`
    console.log(`Verifying ${verificationType}`);
    handleClose();
  };

  return (
    <div className="flex min-h-screen bg-gray-100 p-8">
      <div className="w-full max-w-3xl mx-auto bg-white p-8 sm:p-12 space-y-6 rounded-lg shadow-lg">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Edit Profile</h1>
          <p className="text-gray-500">Update your profile information.</p>
        </div>
        <form className="space-y-6">
          {/* Personal Info Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Personal Info</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block font-medium">Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    defaultValue={user.name}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block font-medium">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    defaultValue={user.email}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="phone" className="block font-medium">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    defaultValue={user.phone}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="address" className="block font-medium">Location</label>
                  <input
                    id="address"
                    type="text"
                    placeholder="Enter your address"
                    defaultValue="123 Main St, Anytown USA"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="bio" className="block font-medium">Bio</label>
                <textarea
                  id="bio"
                  placeholder="Enter your bio"
                  defaultValue="I am a software engineer with a passion for building beautiful and functional web applications. I have been working in the industry for 5 years and have experience with a variety of technologies including React, Node.js, and MongoDB."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows="4"
                />
              </div>
            </div>

            {/* Education Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Education</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="college" className="block font-medium">College</label>
                  <input
                    id="college"
                    type="text"
                    placeholder="Enter your college"
                    defaultValue="University of California, Berkeley"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="graduation-year" className="block font-medium">Graduation Year</label>
                  <input
                    id="graduation-year"
                    type="text"
                    placeholder="Enter your graduation year"
                    defaultValue="2020"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="cgpa" className="block font-medium">CGPA</label>
                  <input
                    id="cgpa"
                    type="text"
                    placeholder="Enter your CGPA"
                    defaultValue="4.0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Recent Employment Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Recent Employment</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="company" className="block font-medium">Current Company</label>
                  <input
                    id="company"
                    type="text"
                    placeholder="Enter your current company"
                    defaultValue="Acme Inc."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="skills" className="block font-medium">Job Role</label>
                  <input
                    id="skills"
                    type="text"
                    placeholder="Enter your job role"
                    defaultValue="Software Engineer"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Links Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Links</h2>
              <div className="space-y-2">
                <label htmlFor="links" className="block font-medium">Links</label>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <input
                      id="links"
                      type="text"
                      placeholder="Enter your links"
                      defaultValue="https://github.com/johndoe"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      id="links"
                      type="text"
                      placeholder="Enter your links"
                      defaultValue="https://linkedin.com/in/johndoe"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <a
              to="/"
              className="inline-flex items-center px-4 py-2 rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </a>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{verificationType === 'mobile' ? 'Verify Mobile' : 'Verify Email'}</DialogTitle>
      <DialogContent>
        {!otpSent ? (
          <>
            <p>Please enter your {verificationType === 'mobile' ? 'mobile number' : 'email address'}.</p>
            {verificationType === 'mobile' ? (
              <TextField
                autoFocus
                margin="dense"
                id="phone"
                label="Phone Number"
                type="text"
                fullWidth
                variant="outlined"
                value={inputValue}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">+91</InputAdornment> // Example for country code (+1 for US)
                }}
              />
            ) : (
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
                value={inputValue}
                onChange={handleChange}
              />
            )}
            <div style={{ marginTop: '16px' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSend}
              >
                Send OTP
              </Button>
            </div>
          </>
        ) : (
          <>
            <p>Please enter the OTP sent to your {verificationType === 'mobile' ? 'mobile number' : 'email address'}.</p>
            <TextField
              margin="dense"
              id="otp"
              label="OTP"
              type="text"
              fullWidth
              variant="outlined"
            />
            <div style={{ marginTop: '16px' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleVerify(inputValue)}
              >
                Verify
              </Button>
            </div>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Link to="/">
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </Link>
      </DialogActions>
    </Dialog>
    </div>
  );
}
