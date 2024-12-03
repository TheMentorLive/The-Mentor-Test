import React, { useState } from "react";
import { Link } from "react-router-dom";


function JobsHero() {
  
    
    return (

      <section className="relative flex flex-col md:flex-row items-center justify-center mt-10 md:mt-10  md:mx-0 h-[370px]">
  {/* Background Image */}
  <img
    src="https://media.licdn.com/dms/image/D4E12AQEmv4lYUyq1bg/article-cover_image-shrink_600_2000/0/1704524969164?e=2147483647&v=beta&t=STuyEyXrilWmEVL9GaEVyFArrKbeoAyA6zvVi-0wCo8"
    alt="Hero Background"
    className="absolute inset-0 w-full h-full object-cover z-0"
  />
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>

  <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between max-w-6xl w-full space-y-8 md:space-y-0 md:space-x-8 px-4 md:px-8">
    {/* Hero Content */}
    <div className="text-white flex flex-col items-center md:items-start lg:-ml-10 space-y-4">
          <h1 className="text-[24px] sm:text-[30px] md:text-[40px] lg:text-[48px] p-2 font-bold tracking-tight leading-tight text-center md:text-left">
          We Will Help You To Find Your Dream Jobs.
          </h1>
          <p className="max-w-[550px] text-gray-400 text-center md:text-left p-2 text-sm md:text-base hidden md:block">
          Take your knowledge to the next level with our comprehensive
                  test series and expertly designed courses.
          </p>
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

    
  </div>
</section>
  )
}

export default JobsHero