import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegCalendarAlt, FaUser, FaInfoCircle, FaTag, FaDollarSign } from "react-icons/fa";
import { ADMINENDPOINTS } from "/src/constants/ApiConstants";
import { ToastContainer, toast } from "react-toastify"; // Import toast
import Swal from "sweetalert2"; // Import SweetAlert

import "react-toastify/dist/ReactToastify.css"; // Import toast CSS

const CourseListPage = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingCourse, setEditingCourse] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    duration: "",
    instructor: "",
    description: "",
    category: "",
    price: "",
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(ADMINENDPOINTS.GETCOURSE);
        setCourses(response.data);
      } catch (err) {
        setError("Failed to fetch courses.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEdit = (course) => {
    setEditingCourse(course._id);
    setEditForm({
      title: course.title,
      duration: course.duration,
      instructor: course.instructor,
      description: course.description || "",
      category: course.category || "",
      price: course.price || "",
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${ADMINENDPOINTS.UPDATECOURSE}/${editingCourse}`, editForm);
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course._id === editingCourse ? { ...course, ...editForm } : course
        )
      );
      setEditingCourse(null);
      toast.success("Course updated successfully!"); // Show success toast for update
    } catch (err) {
      setError("Failed to update course.");
      console.error(err);
      toast.error("Failed to update course."); // Show error toast for update
    }
  };

  const handleDelete = async (courseId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${ADMINENDPOINTS.DELETECOURSE}?id=${courseId}`);
        setCourses((prevCourses) => prevCourses.filter((course) => course._id !== courseId));
        toast.success("Course deleted successfully!"); // Show success toast
      } catch (err) {
        setError("Failed to delete course.");
        console.error(err);
        toast.error("Failed to delete course."); // Show error toast
      }
    }
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <ToastContainer /> {/* Add ToastContainer here */}
      <h1 className="text-2xl font-bold mb-4">Course List</h1>
      <input
        type="text"
        placeholder="Search courses..."
        className="border p-2 rounded mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <p>Loading courses...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Duration</th>
              <th className="border px-4 py-2">Instructor</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <tr key={course._id}>
                  <td className="border px-4 py-2">{course._id}</td>
                  <td className="border px-4 py-2">{course.title}</td>
                  <td className="border px-4 py-2">{course.duration} hr.</td>
                  <td className="border px-4 py-2">{course.instructor}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleEdit(course)}
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center border px-4 py-2">No courses found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Edit Course Modal */}
      {editingCourse && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-2">Edit Course</h2>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-2">
              <div className="flex items-center">
                <FaRegCalendarAlt className="mr-2" />
                <label className="flex-1">
                  <span className="block text-sm font-medium">Title</span>
                  <input
                    type="text"
                    placeholder="Title"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="border p-2 rounded w-full"
                  />
                </label>
              </div>
              <div className="flex items-center">
                <FaRegCalendarAlt className="mr-2" />
                <label className="flex-1">
                  <span className="block text-sm font-medium">Duration (Hour)</span>
                  <input
                    type="text"
                    placeholder="Duration (Hour)"
                    value={editForm.duration}
                    onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })}
                    className="border p-2 rounded w-full"
                  />
                </label>
              </div>
              <div className="flex items-center">
                <FaUser className="mr-2" />
                <label className="flex-1">
                  <span className="block text-sm font-medium">Instructor</span>
                  <input
                    type="text"
                    placeholder="Instructor"
                    value={editForm.instructor}
                    onChange={(e) => setEditForm({ ...editForm, instructor: e.target.value })}
                    className="border p-2 rounded w-full"
                  />
                </label>
              </div>
              <div className="flex items-center">
                <FaInfoCircle className="mr-2" />
                <label className="flex-1">
                  <span className="block text-sm font-medium">Description</span>
                  <input
                    type="text"
                    placeholder="Description"
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="border p-2 rounded w-full"
                  />
                </label>
              </div>
              <div className="flex items-center">
                <FaTag className="mr-2" />
                <label className="flex-1">
                  <span className="block text-sm font-medium">Category</span>
                  <input
                    type="text"
                    placeholder="Category"
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="border p-2 rounded w-full"
                  />
                </label>
              </div>
              <div className="flex items-center">
                <FaDollarSign className="mr-2" />
                <label className="flex-1">
                  <span className="block text-sm font-medium">Price</span>
                  <input
                    type="text"
                    placeholder="Price"
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                    className="border p-2 rounded w-full"
                  />
                </label>
              </div>
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditingCourse(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseListPage;
