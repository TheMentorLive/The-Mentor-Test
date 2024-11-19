import Header from "./Header";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cmpnycarousel from "./cmpny-carousel";
import { API_BASE_URL } from "../constants/ApiConstants";
import { toast } from 'react-toastify';
import axios from "axios";
import { FaChalkboardTeacher, FaClipboardList, FaUserGraduate } from "react-icons/fa";
import Footer from "./Footer";
import CountUp from 'react-countup';
import { Facebook, Twitter, LinkedIn } from '@mui/icons-material'

const About = () => {
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
    <>
      <Header />
      <div className="font-sans">
      <section className="relative flex flex-col md:flex-row items-center justify-center mt-10 md:mt-16 h-auto md:h-[72vh]">
  {/* Background Image */}
  <img
    src="https://s3-alpha-sig.figma.com/img/be36/e5b2/1b4730e6f41aa331c0647d38efb22dd8?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IPh9RL4dns8tfAia22zTBksikZqlRqInSyelLwbsdW8O54jow200Z5qIYCieX9GEHl88Vy-x5PmgQZlapfet3QJUJj9lpCHNS~oJ4D8f3wsjTo~zRGJnmdDW6Ym1hy2PLvMyTR1b89YD6jj8~7POpHIIsmgVpMfB38Ge5oS0slf7ZJKZt-VktCoFTLn6oSzmTMm1yvg6sHhNJNEa-u8j6TLykL3Ebr1oc5-JC4aWDDw-raDigfr4-HoEaGlqpjQUQOAXxNi-lZTlS9tDa6mMElIJI92uOScLcjFvT7tCcruHt34oXwkbAIWfKZGGwpM2sRLgrOvjXdc56p-O4p8b8g__"
    alt="Hero Background"
    className="absolute inset-0 w-full h-full object-cover z-0"
  />
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>

  <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between max-w-6xl w-full space-y-8 md:space-y-0 md:space-x-8 px-4 md:px-8">
    {/* Hero Content */}
    <div className="text-white md:w-1/2 flex flex-col items-center md:items-start space-y-4">
      <h1 className="text-[24px] sm:text-[30px] md:text-[40px] lg:text-[48px] p-2 font-bold tracking-tight leading-tight text-center md:text-left">
        Empowering Learning With AI-Driven Precision
      </h1>
      <div className="py-2">
        <Link to="/register">
          <button
            type="button"
            className="w-full max-w-[180px] bg-[#2563EB] hover:bg-blue-500 text-white font-medium py-2 px-4 p-2 rounded hidden md:block"
          >
            Get Started
          </button>
        </Link>
      </div>
    </div>

    {/* Form Section */}
    <div className="w-full max-w-md bg-white border border-blue-200 rounded-lg shadow-md p-6 space-y-4">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
        Get In Touch
      </h2>
      <form className="grid gap-4" onSubmit={handleSubmit}>
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


        <Cmpnycarousel />

        {/* Introduction Section */}
        <section className="py-16  px-4 md:px-8 flex flex-col md:flex-row items-center md:justify-between">
          <div className="md:w-1/2 text-black space-y-4">
            <h2 className="text-3xl px-16 md:text-4xl font-bold mb-4 text-center md:text-left">
              Gen AI Knowledge Hub & Progressive Learning
            </h2>
            <p className="text-gray-700 px-16 mb-6 text-center md:text-left">
              Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet consectetur adipiscing elit sed.
            </p>
            <div className="text-center px-16 md:text-left">
              <button className="bg-[#2563EB]  hover:bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                Get Started
              </button>
            </div>
          </div>

          <div className="md:w-1/2 relative flex justify-center items-center space-x-8">
            <img
              src="./landing/image2.jpeg"
              alt="Learning"
              className="w-3/4 md:w-[50%] rounded-lg shadow-lg mb-6 transform translate-x-6 translate-y-4 z-10"
            />
            <img
              src="./landing/image1.jpeg"
              alt="Student"
              className="w-3/4 md:w-[60%] rounded-lg shadow-lg absolute top-4 left-4"
            />
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full bg-white bg-opacity-90 py-4 mt-4 rounded-lg flex flex-col md:flex-row justify-around items-center text-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="bg-gray-200 p-2 rounded-full">
              <FaClipboardList className="text-blue-600 text-xl" />
            </div>
            <div>
              <p className="text-xl font-bold text-blue-600">
                <CountUp start={0} end={1500} duration={2} separator="," />
                +
              </p>
              <span className="text-gray-600">Tests taken</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="bg-gray-200 p-2 rounded-full">
              <FaUserGraduate className="text-blue-600 text-xl" />
            </div>
            <div>
              <p className="text-xl font-bold text-blue-600">
                <CountUp start={0} end={1100} duration={2} separator="," />
                +
              </p>
              <span className="text-gray-600">Online learners</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="bg-gray-200 p-2 rounded-full">
              <FaChalkboardTeacher className="text-blue-600 text-xl" />
            </div>
            <div>
              <p className="text-xl font-bold text-blue-600">
                <CountUp start={0} end={550} duration={2} separator="," />
                +
              </p>
              <span className="text-gray-600">Students mentored</span>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-[#2563EB] text-white text-center px-6 sm:px-12 md:px-24">
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-4xl font-bold">
              Values that define <br /> the learning Experience with Gen AI
            </h2>
          </div>

          <div className="py-16 px-16 flex flex-col md:flex-row justify-center space-y-6 md:space-y-6 md:space-x-4">
            {["Lorem", "Lorem", "Lorem"].map((value, index) => (
              <div key={index} className="flex items-center justify-center text-center space-x-4 max-w-md">
                <div className="bg-gray-200 bg-opacity-50 rounded-full p-6 mb-4 md:mb-0">
                  <span className="text-4xl">🎓</span>
                </div>
                <div>
                  <h3 className="font-semibold">{value}</h3>
                  <p className="text-xs break-words">
                    Lorem ipsum dolor sit amet consectetur. Faucibus mauris. Lorem ipsum dolor sit amet consectetur. Faucibus mauris.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mentors Section */}
        <section className="py-16 px-4 md:px-8 bg-gray-100">
          <h2 className="text-3xl font-bold text-left mb-8 px-40">
            Meet <span className="text-blue-500">Our Mentors</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center mx-auto max-w-screen-lg">
            {[
              {
                name: "Brian Clark",
                title: "CEO & Founder",
                img: "./landing/mentor1.jpeg",
              },
              {
                name: "Stephanie Powell",
                title: "VP of Finance",
                img: "./landing/mentor2.jpeg",
              },
              {
                name: "Christopher White",
                title: "VP of Product",
                img: "./landing/mentor3.jpeg",
              },
              {
                name: "Emily Miller",
                title: "VP of HR",
                img: "./landing/mentor4.jpeg",
              },
            ].map((mentor, index) => (
              <div
                key={index}
                className="flex items-center bg-white shadow-lg rounded-lg p-6"
              >
                {/* Image Section */}
                <img
                  src={mentor.img}
                  alt={mentor.name}
                  className="w-24 h-24 object-cover "
                />

                {/* Details Section */}
                <div className="flex flex-col justify-center ml-4">
                  <h3 className="font-semibold text-base">{mentor.name}</h3>
                  <p className="text-gray-700 text-sm mb-2">{mentor.title}</p>
                  <div className="flex space-x-4 text-blue-500">
                    <a href="#" aria-label="Facebook" className="hover:text-blue-700">
                      <Facebook fontSize="large" />
                    </a>
                    <a href="#" aria-label="Twitter" className="hover:text-blue-700">
                      <Twitter fontSize="large" />
                    </a>
                    <a href="#" aria-label="LinkedIn" className="hover:text-blue-700">
                      <LinkedIn fontSize="large" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Awards Section */}
        <section className="py-16 text-center">
  <h2 className="text-3xl sm:text-4xl font-bold mb-8">Our Awards</h2>
  <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
    {Array.from({ length: 5 }).map((_, index) => (
      <div
        key={index}
        className="text-center w-1/2 sm:w-1/4 lg:w-1/5"
      >
        <div className="text-5xl mb-4">🏆</div>
        <p className="text-gray-700 text-sm sm:text-base">Award {index + 1}</p>
      </div>
    ))}
  </div>
</section>


        {/* Final Introduction Section */}
        <section className="py-16 px-4 md:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Gen AI Knowledge Hub & Progressive Learning</h2>
          <p className="text-lg text-gray-700 mb-8">
            Our platform leverages the latest advancements in AI to provide a personalized learning experience.
          </p>
          <Link to="/register">
            <button
              type="submit"
              className="w-full max-w-[180px] bg-[#2563EB] hover:bg-blue-500 text-white font-medium py-2 px-4 rounded"
            >
              Get Started
            </button>
          </Link>
          <div className="flex justify-center mt-8 space-x-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold">20k+</h3>
              <p className="text-gray-700">Users</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold">100+</h3>
              <p className="text-gray-700">Languages</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold">40+</h3>
              <p className="text-gray-700">Countries</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;
