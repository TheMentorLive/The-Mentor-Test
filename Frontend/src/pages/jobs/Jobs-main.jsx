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
    <div className="w-full max-w-4xl  p-6 rounded-lg ">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Search for jobs..."
          className="w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Filter by Category</option>
          <option value="tech">Technology</option>
          <option value="design">Design</option>
          <option value="marketing">Marketing</option>
          <option value="finance">Finance</option>
        </select>
        <button className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Search
        </button>
      </div>
    </div>
  </div>

{/* Job Listings Section */}
<div className="py-8 px-4 md:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
  {[...Array(6)].map((_, index) => (
    <div
      key={index}
      className="p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out"
    >
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition duration-200">
          Frontend Developer
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          <span className="font-medium">Company:</span> TechCorp Inc.
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-medium">Location:</span> Remote
        </p>
        <p className="text-sm text-gray-500 mb-4">
          <span className="font-medium">Salary:</span> $60k - $80k/year
        </p>
      </div>
      <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out">
        View Details
      </button>
    </div>
  ))}
</div>

</div>
<HiringSection/>
<Footer/>
    </div>
  )
}

export default JobsMain