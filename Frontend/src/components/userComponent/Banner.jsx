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
    "https://www.shutterstock.com/image-photo/copy-space-panorama-banner-asian-260nw-2292732351.jpg",
  ];

  // Update isLoggedIn based on user object
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

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative mt-7  mr-20 sm:mx-10 md:mx-20 lg:mx-40 lg:mr-40 h-[50vh] sm:h-[60vh] flex items-center overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center transition-transform duration-1000"
        style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
      ></div>
      
      <div className="absolute left-4 sm:left-8 lg:left-16 top-1/2 transform -translate-y-1/2 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-4 sm:p-6 bg-transparent bg-opacity-70 rounded-lg">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600">
          Ace the JEE Exam
        </h2>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 mt-2 sm:mt-4">
          Our platform provides comprehensive resources and tools to help you prepare for the JEE exam with confidence.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4 sm:mt-6">
          <button
            onClick={handleGetStartedClick}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            {isLoggedIn ? 'Explore' : 'Sign In'}
          </button>
          <button className="border border-blue-600 text-black py-2 px-4 rounded hover:bg-blue-600 hover:text-white transition">
            Qearn More
          </button>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex mt-4 gap-2">
          <button
            onClick={prevImage}
            className="bg-blue-300 p-2 rounded-l hover:bg-blue-400 transition"
          >
            &lt;
          </button>
          <button
            onClick={nextImage}
            className="bg-blue-300 p-2 rounded-r hover:bg-blue-400 transition"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
