import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mainContext } from '../../context/mainContex';

const Banner = () => {
  const { user } = useContext(mainContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const images = [
    "https://www.iitms.co.in/online-examination-system/assets/img/online-examination-system-banner.jpg",
    "https://www.shutterstock.com/image-photo/copy-space-panorama-banner-asian-260nw-2292732351.jpg", // Replace with your image URLs
  ];

  // useEffect to update isLoggedIn based on user object
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('user'));
  }, [user]);

  // Carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); // Change the image every 6 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  const handleGetStartedClick = () => {
    if (isLoggedIn) {
      navigate('/subjects');
    } else {
      navigate('/login');
    }
  };

  return (
    <div
      className="relative w-full h-[60vh] flex items-center overflow-hidden"
    >
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center transition-transform duration-1000"
        style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
      ></div>
      <div className="absolute left-4 sm:left-8 lg:left-16 top-1/2 transform -translate-y-1/2 max-w-sm sm:max-w-md md:max-w-lg p-4 sm:p-6 bg-transparent bg-opacity-70 rounded-lg">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600">Ace the JEE Exam</h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mt-2 sm:mt-4">
          Our platform provides comprehensive resources and tools to help you prepare for the JEE exam with confidence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-6">
          <button
            onClick={handleGetStartedClick}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            {isLoggedIn ? 'Explore' : 'Sign In'}
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
