import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="bg-gray-100 py-8 px-4 lg:px-16">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        {/* Back to Home Button */}
        <button
          onClick={handleBackToHome}
          className="mb-6 text-blue-600 hover:underline flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Home
        </button>

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          About GenAi Learning
        </h1>

        {/* About GenAi Learning Section */}
        <p className="text-gray-600 mb-4">
          <strong>Get Personalised Guidance from Industry Professionals!</strong>
        </p>
        <p className="text-gray-600 mb-4">
          GenAi Learning is committed to bringing about a fundamental change in the way young individuals work toward building their careers. Our aim is to bridge the gap between the skill set of students and the demands of the industry, connecting them to industry professionals and mentors at a negligible cost.
        </p>
        <p className="text-gray-600 mb-4">
          GenAi Learning’s founder, Shubham, launched the first venture in education in 2020. As part of GenAi Learning, the founders connected students to industry professionals and mentored more than 10,000 students.
        </p>

        {/* Services Section */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Our Services</h2>
        <p className="text-gray-600 mb-4">
          <strong>Live Training Program:</strong> GenAi Learning offers immersive training programs to prepare you for the industry in the following domains:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>Digital Marketing</li>
          <li>Data Analytics</li>
          <li>Human Resources</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
