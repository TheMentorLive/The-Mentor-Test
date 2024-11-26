import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import JobsHero from './JobsHero';
import Header from '/src/components/Header';
import Footer from '/src/components/Footer';
import HiringSection from './HiringSection';
import Cmpnycarousel from '/src/components/cmpny-carousel';
import axios from 'axios';
import { GEUESTENDPOINTS } from '/src/constants/ApiConstants';
import { FiLock } from 'react-icons/fi';

function JobsMain() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLoginPopup, setShowLoginPopup] = useState(false); // State for showing the popup
  const navigate = useNavigate(); // For navigation to login page

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(GEUESTENDPOINTS.GETGUESTJOBS);
      const allJobs = response.data;
      const limitedJobs = allJobs.slice(0, 9); // Display only the first 9 jobs
      setJobs(limitedJobs);
      setFilteredJobs(limitedJobs); // Initialize filtered jobs with the limited list
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch jobs:', error.message);
      setError('Failed to fetch jobs. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase()) ||
      job.location.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  const handleViewMoreClick = () => {
    setShowLoginPopup(true); // Show the popup when "View More" is clicked
  };

  const handleLoginRedirect = () => {
    setShowLoginPopup(false); // Close the popup
    navigate('/login'); // Redirect to the login page
  };

  const handleClosePopup = () => {
    setShowLoginPopup(false); // Close the popup when "Cancel" is clicked
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Header />
      <JobsHero />
      <Cmpnycarousel />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-cover bg-center flex items-center justify-center mt-24">
          <div className="absolute inset-0"></div>
          <div className="relative z-5 text-black text-center max-h-10">
            <h1 className="text-4xl md:text-4xl font-bold">Explore Job Opportunities</h1>
            <p className="text-lg md:text-xl mt-8">Find your dream job today</p>
          </div>
        </section>

        {/* Centered Search and Filter Section */}
        <div className="py-16 flex items-center justify-center">
          <div className="w-full max-w-4xl p-6 rounded-lg shadow-lg bg-white">
            <div className="flex flex-col md:flex-row items-center gap-4">
              {/* Search Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
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
  <div className="mb-8 text-center">
    <h1 className="text-3xl font-extrabold text-gray-900">Job Openings</h1>
    <p className="text-sm text-gray-600 opacity-80">Find your next opportunity from the latest job openings.</p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {filteredJobs.length > 0 ? (
      filteredJobs.map((job, index) => (
        <div
          key={index}
          className="p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out"
        >
          <div className="flex items-center mb-4">
            <img
              src={job.companyImage || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRu4Fg9FtHQn4IMD8VnLWRn47Gp3O20cfB9g&s'}
              alt="Company Logo"
              className="w-12 h-12 rounded-full border border-gray-300"
            />
            <div className="ml-3">
              <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition duration-200">
                {job.title}
              </h2>
              <p className="text-sm text-gray-500">{job.company}</p>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <p className="flex items-center text-gray-600">
              <span className="font-medium text-gray-800 mr-1">Location:</span> {job.location}
            </p>
            <p className="flex items-center text-gray-600">
              <span className="font-medium text-gray-800 mr-1">Salary:</span> {job.salary}
            </p>
            <p className="flex items-center text-gray-600">
              <span className="font-medium text-gray-800 mr-1">Experience:</span> {job.experience}
            </p>
            <p className="flex items-center text-gray-600">
              <span className="font-medium text-gray-800 mr-1">Posted:</span> {job.postedAgo} days ago
            </p>
          </div>

          <div className="mt-4">
            <button className="w-full py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200">
              View Details
            </button>
          </div>
        </div>
      ))
    ) : (
      <div>No job listings available</div>
    )}
  </div>

  {/* View More Button */}
  <div className="mt-10 flex justify-center">
    <button
      onClick={handleViewMoreClick} // Trigger the popup
      className="px-6 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
    >
      View More
    </button>
  </div>
</div>

      </div>

      <HiringSection />
      <Footer />

      {/* Login Popup */}
      {showLoginPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Please log in to view more jobs</h2>
            <div className="flex justify-between">
              <button
                onClick={handleLoginRedirect}
                className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Log In
              </button>
              <button
                onClick={handleClosePopup}
                className="px-6 py-2 bg-gray-200 text-sm font-medium rounded-lg hover:bg-gray-300 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobsMain;
