import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from '../../../constants/ApiConstants';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Part1() {
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

      <section className="relative flex flex-col md:flex-row items-center justify-center mt-10 md:mt-16 h-auto md:h-[72vh]">
      {/* Background Image */}
      <img
        src=""
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    
      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between max-w-6xl w-full px-4 md:px-8 space-y-8 md:space-y-0 md:space-x-8">
        {/* Hero Content */}
        <div className="text-white md:w-1/2 flex flex-col items-center md:items-start space-y-4">
          <h1 className="text-[24px] sm:text-[30px] md:text-[40px] lg:text-[48px] p-2 font-bold tracking-tight leading-tight text-center md:text-left">
          UPSC CSE test 
          </h1>
          <p className="max-w-[550px] text-gray-400 text-center md:text-left p-2 text-sm md:text-base hidden md:block">
          Lorem ipsum dolor sit amet, consectetur          </p>
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
    </section>
    

      // <section className="flex flex-col-reverse md:flex-row gap-36 mb-20 items-center justify-center p-4 mt-10 md:mt-32 mx-4 md:mx-0">
        
      //   {/* Left Image Section */}
      //   <div className="relative w-full md:w-1/2 flex -ml-10 justify-center">
      //     <div className="w-full md:w-[700px] overflow-hidden">
      //       <img
      //         src="/learn/live.png"
      //         alt="Mentorship"
      //         className="w-full h-auto border rounded-sm"
      //       />
      //     </div>
      //   </div>

      //   {/* Right Form Section */}
      //   <div className="w-full max-w-md border border-blue-200 rounded-lg shadow-md flex flex-col justify-center">
      //     <div className="p-6">
      //       <h2 className="text-3xl opacity-80 font-bold">Get In Touch</h2>
      //     </div>
      //     <form className="p-6 grid gap-4" onSubmit={handleSubmit}>
      //       {/* Name Field */}
      //       <div className="grid gap-2">
      //         <label htmlFor="name" className="text-sm font-medium text-gray-700">
      //           Name
      //         </label>
      //         <input
      //           id="name"
      //           type="text"
      //           placeholder="Enter your name"
      //           value={name}
      //           onChange={handleNameChange}
      //           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      //           required
      //         />
      //       </div>

      //       {/* Email Field */}
      //       <div className="grid gap-2">
      //         <label htmlFor="email" className="text-sm font-medium text-gray-700">
      //           Email
      //         </label>
      //         <input
      //           id="email"
      //           type="email"
      //           placeholder="m@example.com"
      //           value={email}
      //           onChange={handleEmailChange}
      //           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      //           required
      //         />
      //       </div>

      //       {/* Phone Number Field */}
      //       <div className="grid gap-2">
      //         <label htmlFor="phone" className="text-sm font-medium text-gray-700">
      //           Phone Number
      //         </label>
      //         <input
      //           id="phone"
      //           type="tel"
      //           placeholder="Enter your phone number"
      //           value={phone}
      //           onChange={handlePhoneChange}
      //           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      //           required
      //         />
      //       </div>

      //       {/* Submit Button */}
      //       <div className="mt-4">
      //         <button
      //           type="submit"
      //           disabled={loading} 
      //           className={`w-full bg-[#2563EB] hover:bg-blue-500 text-white font-medium py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      //         >
      //           {loading ? (
      //             <span className="flex items-center justify-center">
      //               <svg
      //                 className="animate-spin h-5 w-5 mr-3 text-white"
      //                 xmlns="http://www.w3.org/2000/svg"
      //                 viewBox="0 0 24 24"
      //               >
      //                 <circle
      //                   className="opacity-25"
      //                   cx="12"
      //                   cy="12"
      //                   r="10"
      //                   stroke="currentColor"
      //                   strokeWidth="4"
      //                 ></circle>
      //                 <path
      //                   className="opacity-75"
      //                   fill="none"
      //                   d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6H4z"
      //                 ></path>
      //               </svg>
      //               Loading...
      //             </span>
      //           ) : (
      //             'Send'
      //           )}
      //         </button>
      //       </div>
      //     </form>
      //   </div>
      // </section>
    );
}
