import React, { useState } from "react";
import { Link } from "react-router-dom";
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
      <section className="flex flex-col-reverse md:flex-row gap-24 items-center justify-center p-4 mt-10 md:mt-32 mx-4 md:mx-0">
        
        {/* Left Image Section */}
        <div className="relative w-full md:w-1/2 flex -ml-10 justify-center">
          <div className="w-full md:w-[700px] overflow-hidden">
            <img
              src="/learn/learn.png"
              alt="Mentorship"
              className="w-full h-auto border rounded-sm"
            />
          </div>
        </div>

        {/* Right Form Section */}
        <div className="w-full max-w-md border border-blue-200 rounded-lg shadow-md flex flex-col justify-center">
          <div className="p-6">
            <h2 className="text-3xl opacity-80 font-bold">Get In Touch</h2>
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
      </section>
    );
}
