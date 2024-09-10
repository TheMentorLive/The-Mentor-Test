import { Link } from "react-router-dom";
import React from "react";
import { Select, MenuItem } from "@mui/material";

export default function Banner() {
  const [qualification, setQualification] = React.useState("");
  const [interest, setInterest] = React.useState("");

  const handleQualificationChange = (event) => {
    setQualification(event.target.value);
  };

  const handleInterestChange = (event) => {
    setInterest(event.target.value);
  };

  return (
    <React.Fragment>
      <section className=" ml-1 mt-10 md:mt-0 lg:mt-0 md:ml-40 md:mr-20 md:py-10 lg:py-12 flex justify-center items-center ">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Master the Future <br />
                  With <br />
                  GenAI Learning
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-lg dark:text-gray-400">
                Take your knowledge to the next level with our comprehensive test series and expertly designed courses.
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
                  <h2 className="text-3xl font-bold">Get In Touch</h2>
                  
                </div>
                <div className="p-6 grid -mt-5 gap-4">
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Highest Qualification */}
                  <div className="grid gap-2">
                    <label
                      htmlFor="qualification"
                      className="text-sm font-medium text-gray-700"
                    >
                      Highest Qualification
                    </label>
                    <Select
                      id="qualification"
                      value={qualification}
                      onChange={handleQualificationChange}
                      displayEmpty
                      className="w-full px-3 py-2 h-10 border border-gray-200 rounded-md "
                    >
                       <MenuItem value="" disabled>
                        <p className="text-gray-400 -ml-2">Select an option</p> {/* Placeholder */}
                      </MenuItem>
                      <MenuItem value="post-graduation">
                        Completed Post Graduation
                      </MenuItem>
                      <MenuItem value="graduation">Passed Graduation</MenuItem>
                      <MenuItem value="in-graduation">In Graduation</MenuItem>
                      <MenuItem value="class-12-10">
                        Class 12 - Class 10
                      </MenuItem>
                      <MenuItem value="class-10-below">
                        Class 10 & Below
                      </MenuItem>
                    </Select>
                  </div>

                  {/* Area of Interest */}
                  <div className="grid gap-2">
                    <label
                      htmlFor="interest"
                      className="text-sm font-medium text-gray-700"
                    >
                      Area Of Interest
                    </label>
                    <Select
                      id="interest"
                      value={interest}
                      onChange={handleInterestChange}
                      displayEmpty
                      className="w-full px-3 py-2 h-10 border border-gray-200 rounded-md"
                    >
                      <MenuItem value="" disabled>
                        <p className="text-gray-400 -ml-2">Select an option</p> {/* Placeholder */}
                      </MenuItem>
                      <MenuItem value="counselling">Counselling</MenuItem>
                      <MenuItem value="courses">Courses</MenuItem>
                      <MenuItem value="test-series">Test Series</MenuItem>
                      <MenuItem value="govt-exam-prep">Govt Exam Prep</MenuItem>
                      <MenuItem value="study-abroad">Study Abroad</MenuItem>
                    </Select>
                  </div>


                </div>
                <div className="p-6">
                  <button className="w-full bg-[#2563EB] hover:bg-blue-500 text-white font-medium py-2 px-4 rounded">
                    Send
                  </button>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

















// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { mainContext } from '../../context/mainContex';

// const Banner = () => {
//   const { user } = useContext(mainContext);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const navigate = useNavigate();

//   const images = [
//     "https://www.iitms.co.in/online-examination-system/assets/img/online-examination-system-banner.jpg",
//     "https://www.shutterstock.com/image-photo/copy-space-panorama-banner-asian-260nw-2292732351.jpg",
//   ];

//   useEffect(() => {
//     setIsLoggedIn(!!localStorage.getItem('user'));

//     // Set the interval for sliding images every 5 seconds
//     const intervalId = setInterval(() => {
//       setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
//     }, 5000);

//     // Clear interval on component unmount
//     return () => clearInterval(intervalId);
//   }, []);

//   const handleGetStartedClick = () => {
//     if (isLoggedIn) {
//       navigate('/subjects');
//     } else {
//       navigate('/login');
//     }
//   };

//   const handleMouseMove = (e) => {
//     const { clientX } = e;
//     const bannerWidth = e.target.clientWidth;
//     const centerPoint = bannerWidth / 2;

//     if (clientX < centerPoint) {
//       setCurrentImageIndex(0);  // Show first image
//     } else {
//       setCurrentImageIndex(1);  // Show second image
//     }
//   };

//   return (
//     <div 
//       className="relative mt-7 mr-5 ml-5 sm:mx-10 md:mx-20 lg:mx-40 lg:mr-40 h-[50vh] sm:h-[60vh] flex items-center overflow-hidden"
//       onMouseMove={handleMouseMove}
//     >
//       <div
//         className="absolute top-0 left-0 w-full h-full bg-cover bg-center transition-transform duration-1000"
//         style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
//       />
//       <div className="absolute top-0 left-0 h-full w-1/4 bg-gradient-to-r from-white to-transparent opacity-90 pointer-events-none" />
//       <div className="absolute top-0 right-0 h-full w-1/4 bg-gradient-to-l from-white to-transparent opacity-90 pointer-events-none" />

//       <div className="absolute left-4 sm:left-8 lg:left-16 top-1/2 transform -translate-y-1/2 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-4 sm:p-6 bg-transparent bg-opacity-70 rounded-lg">
//         <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600">
//           Ace the JEE Exam
//         </h2>
//         <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 mt-2 sm:mt-4">
//           Our platform provides comprehensive resources and tools to help you prepare for the JEE exam with confidence.
//         </p>
//         <br />
//         <br />
//         <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4 sm:mt-6">
//           <button
//             onClick={handleGetStartedClick}
//             className="bg-blue-600 text-white py-2 px-4 w-32 rounded hover:bg-blue-700 transition"
//           >
//             {isLoggedIn ? 'Explore' : 'Sign In'}
//           </button>
//           <button className="border border-blue-600 text-black w-32 py-2 px-4 rounded hover:bg-blue-600 hover:text-white transition">
//             Learn More
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Banner;
