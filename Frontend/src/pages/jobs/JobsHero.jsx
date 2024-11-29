import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from '../../constants/ApiConstants';
import { toast } from 'react-toastify';
import axios from 'axios';

function JobsHero() {
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

      <section className="relative flex flex-col md:flex-row items-center justify-center mt-10 md:mt-10  md:mx-0 h-[72vh]">
  {/* Background Image */}
  <img
    src="https://media.licdn.com/dms/image/D4E12AQEmv4lYUyq1bg/article-cover_image-shrink_600_2000/0/1704524969164?e=2147483647&v=beta&t=STuyEyXrilWmEVL9GaEVyFArrKbeoAyA6zvVi-0wCo8"
    alt="Hero Background"
    className="absolute inset-0 w-full h-full object-cover z-0"
  />
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>

  <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between max-w-6xl w-full space-y-8 md:space-y-0 md:space-x-8 px-4 md:px-8">
    {/* Hero Content */}
    <div className="text-white md:w-1/2 space-y-4 text-center md:text-left">
      <h1 className="text-[30px] sm:text-[36px] md:text-[40px] lg:text-[48px] font-bold tracking-tighter leading-tight">
        We Will Help You To Find Your Dream Jobs.
      </h1>
      <p className="max-w-[550px] text-gray-500 md:text-[15px] dark:text-gray-400">
                  Take your knowledge to the next level with our comprehensive
                  test series and expertly designed courses.
                </p>
      <div className="py-2">
        <Link to="/register">
          <button
            type="button"
            className="w-full max-w-[180px] bg-[#2563EB] hover:bg-blue-500 text-white font-medium py-2 px-4 rounded"
          >
            Explore More
          </button>
        </Link>
      </div>
    </div>

    
  </div>
</section>
  )
}

export default JobsHero