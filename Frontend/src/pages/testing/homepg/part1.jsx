import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from '../../../constants/ApiConstants';
import { toast } from 'react-toastify';
import axios from 'axios';

function Part1() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState(""); 
  const [loading, setLoading] = useState(false); 

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleNameChange = (event) => { 
    setName(event.target.value);
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
    <div className="App">
      {/* Hero Section */}
      <main className="bg-gray-50  md:mr-32 md:ml-36 lg:ml-36 mb-20 lg:mr-32">
        <div className="mx-auto flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
         {/* Left Section: Text */}
<div className="text-center md:text-left md:w-1/2 space-y-4 px-4 sm:px-6 md:px-0">
  <p className="text-gray-500 text-sm sm:text-lg">One stop solution for all edtech needs</p>
  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600">
    Learn, Test and Grow
  </h1>
  <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold">
    with GenAi Learning
  </h2>
  <button className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg mt-4 sm:mt-6 hover:bg-blue-700">
    Log in / Sign up
  </button>
</div>


          {/* Right Section: Image + Stats */}
          
            {/* Form Section */}
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-md p-6 space-y-4 ">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
            Get In Touch
          </h2>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={handleNameChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
    
            {/* Email Field */}
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
    
            {/* Phone Number Field */}
            <div className="grid gap-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={handlePhoneChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
    
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-[#2563EB] hover:bg-blue-500 text-white font-medium py-2 px-4 rounded ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="none"
                        d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6H4z"
                      ></path>
                    </svg>
                    Loading...
                  </span>
                ) : (
                  'Send'
                )}
              </button>
            </div>
          </form>
      

            
          </div>
        </div>
      </main>
    </div>
  );
}

export default Part1;
