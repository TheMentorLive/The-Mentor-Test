import React from 'react'
import JobsHero from './JobsHero'
import Header from '/src/components/Header'
import Footer from '/src/components/Footer'
import HiringSection from './HiringSection'
import Cmpnycarousel from '/src/components/cmpny-carousel'

function JobsMain() {
  return (
    <div>
        <Header/>
        <JobsHero/>
        <Cmpnycarousel/>


        <div className="min-h-screen ">
  {/* Hero Section */}
  <section className="relative bg-cover bg-center  flex items-center justify-center mt-24">
    <div className="absolute inset-0 "></div>
    <div className="relative z-5 text-black text-center max-h-10">
      <h1 className="text-4xl md:text-4xl font-bold">Explore Job Opportunities</h1>
      <p className="text-lg md:text-xl mt-8 ">Find your dream job today</p>
    </div>
  </section>

  {/* Centered Search and Filter Section */}
  <div className="py-16 flex items-center justify-center">
  <div className="w-full max-w-4xl p-6 rounded-lg shadow-lg bg-white">
    <div className="flex flex-col md:flex-row items-center gap-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for jobs..."
        className="w-full h-12 px-6 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder-gray-500"
      />
      
      {/* Filter Dropdown */}
      <select className="w-full md:w-1/3 px-6 py-3 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
        <option value="">Filter by Category</option>
        <option value="tech">Technology</option>
        <option value="design">Design</option>
        <option value="marketing">Marketing</option>
        <option value="finance">Finance</option>
      </select>
      
      {/* Search Button */}
      <button className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full hover:from-blue-500 hover:to-blue-400 transition-all duration-300 ease-in-out">
        Search
      </button>
    </div>
  </div>
</div>


{/* Job Listings Section */}
<div className="py-8 px-4 md:px-16 lg:ml-24 lg:mr-24">
  {/* Page Title */}
  <div className="mb-8 text-center">
    <h1 className="text-3xl font-extrabold text-gray-900">Job Openings</h1>
    <p className="text-sm text-gray-600 opacity-80">Find your next opportunity from the latest job openings.</p>
  </div>

  {/* Tags Section */}
  <div className="mb-8">
    <h2 className="text-lg font-semibold text-gray-800 mb-4">Explore Tags</h2>
    <div className="flex flex-wrap gap-3">
      {['Job Openings', 'Remote Jobs', 'TechCorp Inc.', 'Full-Time', 'Frontend', 'Backend'].map((tag, index) => (
        <div
          key={index}
          className="py-1.5 px-4 bg-blue-100 text-sm rounded-full text-blue-700 font-medium hover:bg-blue-200 transition cursor-pointer"
        >
          {tag}
        </div>
      ))}
    </div>
  </div>

  {/* Job Listings Section */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, index) => (
      <div
        key={index}
        className="p-5 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out"
      >
        {/* Company Logo */}
        <div className="flex items-center mb-4">
          <img
            src="https://via.placeholder.com/50"
            alt="Company Logo"
            className="w-12 h-12 rounded-full border border-gray-300"
          />
          <div className="ml-3">
            <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition duration-200">
              Frontend Developer
            </h2>
            <p className="text-sm text-gray-500">TechCorp Inc.</p>
          </div>
        </div>

        {/* Job Details */}
        <div className="space-y-2 text-sm">
          <p className="flex items-center text-gray-600">
            <span className="font-medium text-gray-800 mr-1">Location:</span> Remote
          </p>
          <p className="flex items-center text-gray-600">
            <span className="font-medium text-gray-800 mr-1">Salary:</span> $60k - $80k/year
          </p>
          <p className="flex items-center text-gray-600">
            <span className="font-medium text-gray-800 mr-1">Experience:</span> 2-4 years
          </p>
          <p className="flex items-center text-gray-600">
            <span className="font-medium text-gray-800 mr-1">Posted:</span> {index + 3} days ago
          </p>
        </div>

        {/* View Details Button */}
        <div className="mt-4">
          <button className="w-full py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200">
            View Details
          </button>
        </div>
      </div>
    ))}
  </div>

  {/* View More Button */}
  <div className="mt-10 flex justify-center">
    <button className="px-6 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200">
      View More
    </button>
  </div>
</div>




</div>
<HiringSection/>
<Footer/>
    </div>
  )
}

export default JobsMain