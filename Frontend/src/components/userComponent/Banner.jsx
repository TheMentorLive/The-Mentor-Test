import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mainContext } from '../../context/mainContex';

const Banner = () => {
  const { user } = useContext(mainContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // useEffect to update isLoggedIn based on user object
  useEffect(() => {
    setIsLoggedIn( localStorage.getItem('user', JSON.stringify(user)));
    // setIsLoggedIn(Boolean(user && user.name));
  }, [user]);

  const handleGetStartedClick = () => {
    if (isLoggedIn) {
      navigate('/dashboard'); // Replace with the actual route for logged-in users
    } else {
      navigate('/login');
    }
  };

  return (
    <div
      className="relative w-full h-[35vh] bg-cover bg-center flex items-center"
      style={{ backgroundImage: "url('https://img.freepik.com/free-vector/trendy-modern-white-color-stripes-geometric-business-banner_1055-15061.jpg?semt=ais_hybrid')" }} // Replace with your background image URL
    >
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 max-w-md p-6 bg-transparent bg-opacity-70 rounded-lg">
        <h2 className="text-3xl font-bold">Ace the JEE Exam</h2>
        <p className="text-gray-700 mt-4">
          Our platform provides comprehensive resources and tools to help you prepare for the JEE exam with confidence.
        </p>
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleGetStartedClick}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-violet-700 transition"
          >
            {isLoggedIn ? 'Go to' : 'Get Started'}
          </button>
          <button className="border border-violet-600 text-violet-600 py-2 px-4 rounded hover:bg-violet-600 hover:text-white transition">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
