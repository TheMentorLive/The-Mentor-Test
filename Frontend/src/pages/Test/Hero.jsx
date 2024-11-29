import React, { useState } from "react";
import { Link } from "react-router-dom";


export default function Hero() {
   
    return (

      <section className="relative flex flex-col md:flex-row items-center justify-center  md:-mt-11 h-auto md:h-[400px]">
      {/* Background Image */}
      <img
        src="./test/test-hero.png"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    
      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between max-w-6xl w-full px-4 md:px-8 space-y-8 md:space-y-0 md:space-x-8">
        {/* Hero Content */}
        <div className="text-white flex flex-col items-center md:items-start lg:-ml-10 space-y-4">
          <h1 className="text-[24px] sm:text-[30px] md:text-[40px] lg:text-[48px] p-2 font-bold tracking-tight leading-tight text-center md:text-left">
          India's Structured Online Test series platform
          </h1>
          <p className="max-w-[550px] text-gray-400 text-center md:text-left p-2 text-sm md:text-base hidden md:block">
          Boost your exam preparation with Test Series for Banking, SSC, RRB & All other Govt. Exams
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
    
           {/* Form Section */}
       {/* Form Section */}



      </div>
    </section>
  
    );
}
