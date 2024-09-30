import React, { useState } from "react";

const coursesData = [
  { id: 1, title: "Introduction to React", duration: "3 weeks", instructor: "John Doe" },
  { id: 2, title: "Advanced JavaScript", duration: "4 weeks", instructor: "Jane Smith" },
  { id: 3, title: "Understanding Redux", duration: "2 weeks", instructor: "Alice Johnson" },
  { id: 4, title: "Node.js for Beginners", duration: "5 weeks", instructor: "Bob Brown" },
];

const CourseListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = coursesData.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Course List</h1>
      <input
        type="text"
        placeholder="Search courses..."
        className="border p-2 rounded mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
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
              <tr key={course.id}>
                <td className="border px-4 py-2">{course.id}</td>
                <td className="border px-4 py-2">{course.title}</td>
                <td className="border px-4 py-2">{course.duration}</td>
                <td className="border px-4 py-2">{course.instructor}</td>
                <td className="border px-4 py-2">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
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
    </div>
  );
};

export default CourseListPage;
