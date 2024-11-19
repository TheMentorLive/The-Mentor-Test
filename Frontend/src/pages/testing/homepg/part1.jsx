import React from 'react';
import { Users, ClipboardList, GraduationCap } from 'lucide-react'

function Part1() {
  return (
    <div className="App">
      {/* Navbar */}
      <header className="bg-white shadow-md lg:ml-20  lg:mr-20">
        <div className="container mx-auto flex justify-between items-center -mt-2 ">
          <div className="text-2xl font-bold text-blue-600">GEN AI</div>
          <nav className="flex space-x-6 text-gray-700">
            <a href="#learn" className="hover:text-blue-600">Learn</a>
            <a href="#test" className="hover:text-blue-600">Test</a>
            <a href="#jobs" className="hover:text-blue-600">Jobs</a>
            <a href="#about" className="hover:text-blue-600">About us</a>
          </nav>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Log in / Sign up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="bg-gray-50 py-16 ">
        <div className="container mx-auto flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
          {/* Text Section */}
          <div className="text-center md:text-left ml-40 md:w-1/2">
            <p className="text-gray-500 text-1xl">One stop solution for all edtech needs</p>
            <h1 className="text-5xl font-bold text-blue-600 mt-2">
              Learn, Test and Grow
            </h1>
            <h2 className="text-5xl  font-semibold mt-2">
              with GenAi Learning
            </h2>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-6 hover:bg-blue-700">
              Log in / Sign up
            </button>
          </div>
          
          {/* Image Section */}
          <div className="md:w-1/2 mr-[400px]">
  <img 
    src="/Hero1.png" 
    alt="Illustration of AI learning" 
    className="rounded-lg shadow-lg mr-[400px]" 
  />
</div>

        </div>

        {/* Stats Section */}
        <div className="container mx-auto flex flex-col md:flex-row justify-center mt-12 space-y-4 md:space-y-0 md:space-x-8 text-center">
          <div className="flex flex-col items-center">
            <p className="text-3xl font-bold text-blue-600">1500+</p>
            <span className="text-gray-600">Tests taken</span>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-3xl font-bold text-blue-600">1100+</p>
            <span className="text-gray-600">Online learners</span>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-3xl font-bold text-blue-600">550+</p>
            <span className="text-gray-600">Students mentored</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Part1;
