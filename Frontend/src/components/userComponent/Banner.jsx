import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from '../../constants/ApiConstants';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Banner() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState(""); // State for name
  const [loading, setLoading] = useState(false); // State for loading

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleNameChange = (event) => { // Handle change for name
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    setLoading(true); // Set loading to true when starting submission

    try {
      const response = await axios.post(`${API_BASE_URL}auth/SubmitForm`, {
        name, // Include name in the POST request
        email,
        phone,
      });

      // Check the response status
      if (response.status === 201) {
        // Show success toast message
        toast.success('Form data saved successfully!');
      } else if (response.status === 409) {
        // Show error toast message for conflict
        toast.error('Lead already exists');
      } else {
        // Handle unexpected responses
        toast.error('Unexpected response from server');
      }

      // Clear the form data
      setName(''); // Clear name field
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error('Error submitting form:', error);

      // Extract error message from the response, if available
      const errorMessage = error.response?.data?.error || 'Error submitting form. Please try again.';

      // Show error toast message
      toast.error(errorMessage);
    } finally {
      setLoading(false); // Set loading to false when submission is complete
    }
  };

  return (
    <React.Fragment>
      <section className="ml-1 mt-10 md:mt-0 lg:mt-0 md:ml-[138px] md:mr-[52px] md:py-10  flex justify-center items-center">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
              <h1 className="text-[40px] sm:text-5xl md:text-6xl lg:text-7xl xl:text-6xl/none font-bold opacity-80 tracking-tighter">
  Master the Future <br />
  With <br />
  GenAI Learning
</h1>

                <p className="max-w-[600px] text-gray-500 md:text-lg dark:text-gray-400">
                  Take your knowledge to the next level with our comprehensive
                  test series and expertly designed courses.
                </p>
              </div>
              <Link to="/register">
                <button
                  type="submit"
                  className="w-full max-w-[200px] bg-[#2563EB] hover:bg-blue-500 text-white font-medium py-2 px-4 rounded"
                >
                  Get Started
                </button>
              </Link>
            </div>

            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-full max-w-md border border-blue-200 rounded-lg shadow-md">
                <div className="p-6">
                  <h2 className="text-3xl opacity-80 font-bold">Get In Touch</h2>
                </div>
                <form className="p-6 grid -mt-5 gap-4" onSubmit={handleSubmit}>

                  {/* Name Field */}
                  <div className="grid gap-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-700"
                    >
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
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
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
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-700"
                    >
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
                      disabled={loading} // Disable button while loading
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
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
