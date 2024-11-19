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
  <section className="relative bg-cover bg-center  flex items-center justify-center \">
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
<div className="py-8 px-4 md:px-16">
  {/* Page Title */}
  <div className="mb-8 text-center">
    <h1 className="text-2xl font-bold text-gray-800">Job Opening</h1>
    <p className="text-sm text-gray-600 opacity-70">Find your next opportunity from the latest job openings.</p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
    {/* Tags Section */}
    <div className="md:col-span-1">
  <h2 className="text-sm font-semibold text-gray-800 opacity-80 mb-4">Tags</h2>
  <div className="grid grid-cols-3 gap-2">
    {['Job Openings', 'Remote Jobs', 'TechCorp Inc.', 'Full-Time', 'Frontend', 'Backend'].map((tag, index) => (
      <div
        key={index}
        className="py-1 px-2 bg-gray-100 text-xs rounded-md text-gray-700 hover:bg-gray-200 transition cursor-pointer text-center"
      >
        {tag}
      </div>
    ))}
  </div>
</div>


    {/* Job Listings Section */}
    <div className="md:col-span-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out"
          >
            {/* Company Logo */}
            <div className="flex items-center mb-3">
              <img
                src="https://via.placeholder.com/40"
                alt="Company Logo"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <h2 className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition duration-200">
                  Frontend Developer
                </h2>
                <p className="text-xs text-gray-500">TechCorp Inc.</p>
              </div>
            </div>

          {/* Job Details */}
<div className="mb-4">
  <p className="text-xs text-gray-600">
    <span className="font-medium">Location:</span> Remote
  </p>
  <p className="text-xs text-gray-600">
    <span className="font-medium">Salary:</span> $60k - $80k/year
  </p>
  <p className="text-xs text-gray-600">
    <span className="font-medium">Experience:</span> 2-4 years
  </p>
  <p className="text-xs text-gray-600">
    <span className="font-medium">Posted:</span> {index + 3} days ago
  </p>
</div>


            {/* View Details Button */}
            <div className="flex justify-end">
              <button className="px-2 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="mt-6 flex justify-center">
        <button className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200">
          View More
        </button>
      </div>
    </div>
  </div>
</div>



</div>
<HiringSection/>
<Footer/>
    </div>
  )
}

export default JobsMain