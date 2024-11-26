import React, { useState, useEffect, useContext } from "react";
import { Visibility, Edit, Delete, Search } from "@mui/icons-material";
import axios from "axios";
import { mainContext } from "/src/context/mainContex";
import { ADMINENDPOINTS } from "/src/constants/ApiConstants";
import { Modal, Box } from "@mui/material";
import moment from "moment";

const AdminJobList = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const jobsPerPage = 10;

  const { token } = useContext(mainContext);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(ADMINENDPOINTS.GETAllJOBS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(response.data.jobs);
    } catch (error) {
      console.error("Failed to fetch jobs:", error.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Filter and Paginate Jobs
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.siteKey && job.siteKey.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // Modal Handlers
  const handleOpenModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 min-h-full">
      <h1 className="text-xl font-bold text-gray-800 mb-4">Admin - Job List</h1>

      {/* Total Counts */}
      <div className="mb-4 text-gray-600">
        <p>
          <strong>Total Jobs:</strong> {jobs.length} | <strong>Filtered:</strong>{" "}
          {filteredJobs.length}
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-4 flex items-center">
        <Search className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search jobs by title or site key"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
      </div>

      {/* Job List */}
      <div
        className="bg-white shadow-md rounded-lg p-4 overflow-y-auto"
        style={{ maxHeight: "500px" }}
      >
        {currentJobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs found.</p>
        ) : (
          <div className="space-y-4">
            {currentJobs.map((job) => (
              <div
                key={job._id}
                className="flex items-center justify-between bg-white border rounded-lg shadow-sm p-4"
              >
                {/* Job Info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={job.companyImage || "https://via.placeholder.com/80"}
                    alt={job.title || "Company Logo"}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700">
                      {job.title || "Job Title"}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {job.location || "Location not specified"}
                    </p>
                    <p className="text-xs text-gray-500">
                      <strong>Site Key:</strong> {job.siteKey || "N/A"}
                    </p>
                    <p className="text-xs text-gray-400">
                      <strong>Created At:</strong>{" "}
                      {moment(job.createdAt).format("MMM DD, YYYY")}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleOpenModal(job)}
                    className="text-blue-500 hover:text-blue-700 transition"
                  >
                    <Visibility fontSize="small" />
                  </button>
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700 transition"
                  >
                    <Visibility fontSize="small" />
                  </a>
                  <button
                    className="text-green-500 hover:text-green-700 transition"
                  >
                    <Edit fontSize="small" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <Delete fontSize="small" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === 1 ? "text-gray-400 border-gray-300" : "text-blue-500 border-blue-500"
            }`}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 border-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === totalPages ? "text-gray-400 border-gray-300" : "text-blue-500 border-blue-500"
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          className="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto mt-10 overflow-y-auto"
          style={{ maxHeight: "80vh" }}
        >
          {selectedJob && (
            <>
              <h2 className="text-lg font-semibold mb-4">{selectedJob.title}</h2>
              <img
                src={selectedJob.companyImage || "https://via.placeholder.com/150"}
                alt={selectedJob.title}
                className="w-42 h-42 object-cover rounded mb-4"
              />
              <p className="text-sm text-gray-500 mb-2">
                <strong>Location:</strong> {selectedJob.location || "Not specified"}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                <strong>Site Key:</strong> {selectedJob.siteKey || "N/A"}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                <strong>Experience:</strong> {selectedJob.experience || "N/A"}
              </p>

              <p className="text-sm text-gray-500 mb-2">
                <strong>Salary:</strong> {selectedJob.salary || "N/A"}
              </p>

              <p className="text-sm text-gray-500 mb-2">
                <strong>Description:</strong> {selectedJob.description || "N/A"}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                <strong>About company:</strong> {selectedJob.aboutCompany || "N/A"}
              </p>
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Close
              </button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default AdminJobList;
