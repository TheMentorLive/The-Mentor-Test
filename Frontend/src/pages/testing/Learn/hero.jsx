import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from '../../../constants/ApiConstants';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Hero() {
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

      <section className="relative flex flex-col md:flex-row items-center justify-center  md:mt-11 h-auto md:h-[400px]">
      {/* Background Image */}
      <img
        src="./test/test-hero.png"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    
      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between max-w-6xl w-full px-4 md:px-8 space-y-8 md:space-y-0 md:space-x-8">
        {/* Hero Content */}
        <div className="text-white md:w-1/2 flex flex-col items-center md:items-start space-y-4">
          <h1 className="text-[24px] sm:text-[30px] md:text-[40px] lg:text-[48px] p-2 font-bold tracking-tight leading-tight text-center md:text-left">
          India's Structured Online Test series platform
          </h1>
          <p className="max-w-[550px] text-gray-400 text-center md:text-left p-2 text-sm md:text-base hidden md:block">
          Boost your exam preparation with Test Series for Banking, SSC, RRB & All other Govt. Exams
          </p>
          <div className="py-2">
            <Link to="/register">
              <button
                type="button"
                className="w-full max-w-[180px] bg-[#2563EB] hover:bg-blue-500 p-2 text-white font-medium py-2 px-4 rounded hidden md:block"
              >
                Get Started
              </button>
            </Link>
          </div>
        </div>
    
           {/* Form Section */}
       {/* Form Section */}
<div className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow-md p-3 space-y-4">
  <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-center">
    Get In Touch
  </h2>

  <form className="grid gap-3" onSubmit={handleSubmit}>
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
        className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
        className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
        className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
    </section>
  
    );
}
