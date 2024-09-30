import { useState } from 'react';

export default function AddCoursePage() {
  const [courseDetails, setCourseDetails] = useState({
    title: '',
    description: '',
    category: '',
    duration: '',
    instructor: '',
    startDate: '',
    price: '',
    image: null,
  });

  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails({
      ...courseDetails,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCourseDetails({
      ...courseDetails,
      image: file,
    });
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!courseDetails.title || !courseDetails.instructor || !courseDetails.startDate) {
      setError('Please fill all required fields.');
      return;
    }

    // Handle form submission
    console.log('Course Details Submitted:', courseDetails);

    // Reset form after submission
    setCourseDetails({
      title: '',
      description: '',
      category: '',
      duration: '',
      instructor: '',
      startDate: '',
      price: '',
      image: null,
    });
    setImagePreview(null);
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Add a New Course</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Course Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Course Title *</label>
          <input
            type="text"
            name="title"
            value={courseDetails.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-3 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter course title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={courseDetails.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-3 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            rows="4"
            placeholder="Enter course description"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={courseDetails.category}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-3 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter course category"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Duration (in hours)</label>
          <input
            type="text"
            name="duration"
            value={courseDetails.duration}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-3 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter course duration"
          />
        </div>

        {/* Instructor Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Instructor Name *</label>
          <input
            type="text"
            name="instructor"
            value={courseDetails.instructor}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-3 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter instructor name"
            required
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date *</label>
          <input
            type="date"
            name="startDate"
            value={courseDetails.startDate}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-3 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Price (Optional)</label>
          <input
            type="number"
            name="price"
            value={courseDetails.price}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-3 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter course price"
          />
        </div>

        {/* Upload Course Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Course Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-600"
          />
          {imagePreview && (
            <div className="mt-4">
              <img src={imagePreview} alt="Course Preview" className="h-48 w-full object-cover rounded-md shadow-md" />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md shadow-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition ease-in-out">
            Add Course
          </button>
        </div>
      </form>
    </div>
  );
}
