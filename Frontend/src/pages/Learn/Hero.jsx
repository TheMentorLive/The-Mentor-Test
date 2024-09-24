import React, { useState } from "react";
import { API_BASE_URL } from '../../constants/ApiConstants';
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
    <div className="flex flex-col lg:flex-row justify-center mt-24 p-8 space-y-8 lg:space-y-0 lg:space-x-44">
      
      {/* Left Section */}
      <div className="flex flex-col items-center lg:items-start md:mt-7 lg:mt-7 space-y-4">
        <div className="w-[300px] md:w-[400px] border border-slate-400 h-[200px] md:h-[250px] bg-muted-foreground flex items-center justify-center rounded-md">
          <ImageIcon className="w-16 h-16 text-muted-foreground" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-center lg:text-left">Explore New Possibilities</h2>
        <p className="text-muted-foreground text-center lg:text-left">Discover innovative solutions to transform your business.</p>
        <button className="bg-blue-600 p-2 border rounded-lg text-white">Learn More</button>
      </div>

      {/* Right Section: Form */}
      <div className="w-full max-w-lg border border-blue-200 rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-2xl md:text-3xl opacity-80 font-bold text-center lg:text-left">Get In Touch</h2>
        </div>
        <form className="p-6 grid gap-4" onSubmit={handleSubmit}>

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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <button
              type="submit"
              disabled={loading} 
              className={`w-full bg-[#2563EB] hover:bg-blue-500 text-white font-medium py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
  )
}

function ImageIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  )
}
