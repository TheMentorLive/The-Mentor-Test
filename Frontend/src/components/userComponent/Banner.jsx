import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mainContext } from '../../context/mainContex';

const Banner = () => {
  const { user } = useContext(mainContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    'https://www.iitms.co.in/online-examination-system/assets/img/online-examination-system-banner.jpg',
    'https://via.placeholder.com/1500x600?text=Second+Image',
    'https://via.placeholder.com/1500x600?text=Third+Image'
  ]; // Replace with your actual image URLs
  const navigate = useNavigate();

  // useEffect to update isLoggedIn based on user object
  useEffect(() => {
    setIsLoggedIn( localStorage.getItem('user', JSON.stringify(user)));
    // setIsLoggedIn(Boolean(user && user.name));
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const handleGetStartedClick = () => {
    if (isLoggedIn) {
      navigate('/subjects'); // Replace with the actual route for logged-in users
    } else {
      navigate('/login');
    }
  };

  return (
     <div
      className="relative w-full h-[60vh] bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url(${images[currentImageIndex]})` }} // Dynamically set background image
    >
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 max-w-md p-6 bg-transparent bg-opacity-70 rounded-lg">
        <h2 className="text-3xl text-blue-600 font-bold">Ace the JEE Exam</h2>
        <p className="text-gray-700 mt-4">
          Our platform provides comprehensive resources and tools to help you prepare for the JEE exam with confidence.
        </p>
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleGetStartedClick}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            {isLoggedIn ? 'Explore' : 'Get Started'}
          </button>
          <button className="border border-blue-600 text-black py-2 px-4 rounded hover:bg-blue-600 hover:text-white transition">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
