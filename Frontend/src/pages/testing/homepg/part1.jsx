'use client'

import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mainContext } from '../../../context/mainContex';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { API_BASE_URL } from '../../../constants/ApiConstants';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react'



// Button component
function Button({ variant = "default", size = "medium", children, ...props }) {
  const baseStyles = "py-2 px-4 rounded focus:outline-none";
  const variantStyles = variant === "ghost"
    ? "bg-transparent border border-gray-300"
    : "bg-[#2563EB] text-white";

  const sizeStyles = size === "icon"
    ? "p-2"
    : size === "small"
      ? "py-1 px-3"
      : "py-2 px-4";

  return (
    <button className={`${baseStyles} ${variantStyles} ${sizeStyles}`} {...props}>
      {children}
    </button>
  );
}


// Icons
function GoogleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 326667 333333"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      fillRule="evenodd"
      clipRule="evenodd"
    >
      <path
        d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z"
        fill="#4285f4"
      />
      <path
        d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z"
        fill="#34a853"
      />
      <path
        d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z"
        fill="#fbbc04"
      />
      <path
        d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z"
        fill="#ea4335"
      />
    </svg>
  );
};

const LinkedinIcon = (props) => {
  return (
    <svg
      {...props}
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 122.88 122.31"
    >
      <defs>
        <style>
          {`.cls-1{fill:#0a66c2;}.cls-1,.cls-2{fill-rule:evenodd;}.cls-2{fill:#fff;}`}
        </style>
      </defs>
      <title>linkedin-app</title>
      <path
        className="cls-1"
        d="M27.75,0H95.13a27.83,27.83,0,0,1,27.75,27.75V94.57a27.83,27.83,0,0,1-27.75,27.74H27.75A27.83,27.83,0,0,1,0,94.57V27.75A27.83,27.83,0,0,1,27.75,0Z"
      />
      <path
        className="cls-2"
        d="M49.19,47.41H64.72v8h.22c2.17-3.88,7.45-8,15.34-8,16.39,0,19.42,10.2,19.42,23.47V98.94H83.51V74c0-5.71-.12-13.06-8.42-13.06s-9.72,6.21-9.72,12.65v25.4H49.19V47.41ZM40,31.79a8.42,8.42,0,1,1-8.42-8.42A8.43,8.43,0,0,1,40,31.79ZM23.18,47.41H40V98.94H23.18V47.41Z"
      />
    </svg>
  );
};


function Part1() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const { token, setToken } = useContext(mainContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false);
  const [linkedInLoading, setLinkedInLoading] = useState(false);
  const navigate = useNavigate();


  // Handle Google login
  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    try {
      // Redirect to backend Google OAuth route
      window.location.href = `${API_BASE_URL}auth/google`;
    } catch (error) {
      toast.error('Google Login Error:', error);
      toast('An error occurred during Google login');
    } finally {
      setGoogleLoading(false);
    }
  };

  // Handle LinkedIn login
  const handleLinkedinLogin = () => {
    setLinkedInLoading(true);
    try {
      window.location.href = `${API_BASE_URL}auth/linkedin`;
    } catch (error) {
      console.error('linkedin Login Error:', error);
      setError('An error occurred during linkein login');
    } finally {
      setLinkedInLoading(false);
    }
  };

  // Handle login
  const handleLogin = async () => {
    setLoading(true);

    if (!email || !password) {
      toast.error('Please enter both email and password.');
      setLoading(false); // Stop the loading indicator in case of validation failure
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}auth/login`, { email, password });
      console.log("Response data:", response.data); // Log response data to check its structure

      if (response.data && response.data.token) {
        setToken(response.data.token);
        // Store token and user details in local storage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user || {})); // Ensure user object exists

        toast.success('Login successful!');
        navigate('/'); // Redirect to dashboard or another page
      } else {
        toast.error(response.data.message || 'Login failed.');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        // Show the error message from the backend
        toast.error(error.response.data.message);
      } else {
        // Fallback for network errors or unexpected issues
        toast.error('Login failed. Please try again.');
      }
      console.error('Error during login:', error);
    } finally {
      setLoading(false); // Ensure loading is stopped regardless of success or failure
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}auth/SubmitForm`, {
        name,
        email,
        phone,
      });

      if (response.status === 201) {
        toast.success('Form data saved successfully!');
      } else if (response.status === 409) {
        toast.error('Lead already exists');
      } else {
        toast.error('Unexpected response from server');
      }

      setName('');
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMessage = error.response?.data?.error || 'Error submitting form. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mx-auto container ">
      {/* Hero Section */}
      <main className="   mb-20 lg:mx-20">
        <div className="mx-auto flex flex-col md:flex-row items-center space-y-8  md:space-x-60 lg:space-x-60">
          {/* Changed from space-x-8 to space-x-12 */}
          {/* Left Section: Text */}
          <div className="text-center md:text-left md:w-1/2 space-y-4 px-4 sm:px-6">
            <p className="text-gray-500 text-base sm:text-xl">One stop solution for all edtech needs</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-blue-600">
              Learn, Test and Grow
            </h1>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold">
              with GenAi Learning
            </h2>
            <Link to="/register">
            <button className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg mt-4 sm:mt-6 hover:bg-blue-700">
              Log in / Sign up
            </button>
            </Link>
          </div>





          <div className="w-full max-w-[400px]  bg-white border border-gray-200 rounded-lg shadow-md p-6 space-y-4 float-left">

            <h2 className="text-2xl md:text-3xl font-bold lg:-mt-2 lg:mb-5 text-gray-800 text-left">
              Create Your Account
            </h2>
            <form className="grid gap-4" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2 mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>



              {/* Submit Button */}
              <button
                onClick={handleLogin}
                disabled={loading}
                className="flex w-full items-center text-white h-10 rounded-md bg-[#2563EB] hover:bg-blue-400 justify-center">
                {loading ? (
                  <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                ) : null}
                Start Learning for Free
              </button>



              <div className="relative ">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">or</span>
                </div>
              </div>



              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" onClick={handleLinkedinLogin} className="flex items-center text-black  h-10 rounded-md hover:bg-slate-100 bg-white border border-blue-500 justify-center">
                  <LinkedinIcon className="mr-2 h-4 w-4" />
                  Linkedin
                </Button>
                <Button variant="outline" onClick={handleGoogleLogin} className="flex items-center text-black  h-10 rounded-md hover:bg-slate-100 bg-white border border-blue-500 justify-center">
                  <GoogleIcon className="mr-2 h-4 w-4" />
                  Google
                </Button>
              </div>


            </form>



          </div>
        </div>
      </main>
    </div>
  );
}

export default Part1;
