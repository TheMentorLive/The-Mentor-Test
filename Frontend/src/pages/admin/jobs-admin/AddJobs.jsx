import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { mainContext } from "/src/context/mainContex";
import { ADMINENDPOINTS } from "/src/constants/ApiConstants";
import { LocationOn, MonetizationOn, Work, Visibility, Edit, Delete } from "@mui/icons-material"; // MUI Icons

const AddJob = () => {
  const [url, setUrl] = useState("");
  const [siteKey, setSiteKey] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]); // State to hold jobs

  const { token } = useContext(mainContext);

  // Fetch latest jobs from the backend
  const fetchJobs = async () => {
    try {
      const response = await axios.get(ADMINENDPOINTS.GETJOBS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(response.data.jobs); // Get the latest 2 jobs
    } catch (error) {
      toast.error("Failed to fetch jobs: " + (error.response?.data?.error || error.message));
    }
  };

  useEffect(() => {
    fetchJobs(); // Fetch jobs when the component mounts
  }, []);

  // Handle form submission to add a job
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!siteKey.trim()) {
      toast.error("Please provide a valid site key (site name).");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        ADMINENDPOINTS.ADDJOBS,
        { url, siteKey },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(`Job added successfully! Job ID: ${response.data.job._id}, Site: ${response.data.job.siteKey}`);
      setUrl("");
      setSiteKey("");

      // After adding a job, fetch the latest jobs again
      fetchJobs();

      toast.success("Job added successfully!");
    } catch (error) {
      toast.error("Failed to add job: " + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-6 max-w-7xl space-y-10">
    {/* Row Layout for Form and Jobs Section */}
    <div className="flex flex-wrap lg:flex-nowrap space-y-6 lg:space-y-0 lg:space-x-6">
      {/* Job Form */}
      <div className="bg-white shadow-md rounded-lg p-6 flex-1">
        <h1 className="text-2xl font-extrabold text-blue-600 mb-6 text-center">Add a New Job</h1>
        <p className="text-gray-600 text-center mb-8">
          Enter the job details to add them to the system. Ensure the URL starts with{" "}
          <span className="font-bold">http://</span> or <span className="font-bold">https://</span>.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Job URL</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Site Key</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the site name"
              value={siteKey}
              onChange={(e) => setSiteKey(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center space-x-2">
                <div className="w-6 h-6 border-4 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
                <span className="text-white">Loading...</span>
              </div>
            ) : (
              "Add Job"
            )}
          </button>
        </form>
        {message && <p className="mt-6 text-green-500 text-center">{message}</p>}
      </div>
  
      {/* Latest Jobs */}
      <div className="bg-white shadow-md rounded-lg p-6 flex-1">
  <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Latest Added Jobs</h2>
  <p className=" text-gray-800 mb-6 text-center">Latest 3 Jobs</p>
  <div className="space-y-4">
    {jobs.length === 0 ? (
      <p className="text-center text-gray-500">No jobs added yet.</p>
    ) : (
      jobs.map((job) => (
        <div
          key={job._id}
          className="bg-white border rounded-lg shadow-sm hover:shadow-md transition duration-200 p-4 flex items-center"
        >
          {/* Job Image */}
          <img
            src={job.companyImage || "https://via.placeholder.com/80"}
            alt={`${job.title || "Company"} Logo`}
            className="w-16 h-16 object-cover rounded-full mr-4"
          />

          {/* Job Content */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-700">{job.title || "Job Title"}</h3>
            {/* <h6>{job.siteKey}</h6> */}
            <div className="text-sm text-gray-600">
              <div className="flex items-center">
                <LocationOn className="text-blue-500 mr-1" />
                <span>{job.location || "Location not specified"}</span>
              </div>
              <div className="flex items-center">
                <MonetizationOn className="text-green-500 mr-1" />
                <span>{job.salary || "Not specified"}</span>
              </div>
              <div className="flex items-center">
                <Work className="text-purple-500 mr-1" />
                <span>{job.experience || "Not specified"}</span>
              </div>

             
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4 text-gray-500">
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-500 hover:text-blue-700 transition"
            >
              <Visibility fontSize="small" />
            </a>
            <button
              onClick={() => console.log("Edit job", job._id)}
              className="flex items-center text-green-500 hover:text-green-700 transition"
            >
              <Edit fontSize="small" />
            </button>
            <button
              onClick={() => console.log("Delete job", job._id)}
              className="flex items-center text-red-500 hover:text-red-700 transition"
            >
              <Delete fontSize="small" />
            </button>
          </div>
        </div>
      ))
    )}
  </div>
</div>

    </div>
  
    <ToastContainer position="top-center" autoClose={3000} />
  </div>
  
  );
};

export default AddJob;
