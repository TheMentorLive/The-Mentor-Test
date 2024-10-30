import axios from 'axios';
import { ADMINENDPOINTS } from '/src/constants/ApiConstants';
import { mainContext } from '/src/context/mainContex';
import { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddCoursePage() {
  const { token } = useContext(mainContext);
  const [courseDetails, setCourseDetails] = useState({
    title: '',
    description: '',
    instructor: '',
    duration: '',
    category: '',
    price: '',
    level: 'Beginner',
    prerequisites: [],
    imageUrl: null,
    lessons: [],
    startDate: '',
  });

  const [lesson, setLesson] = useState({ title: '', content: '', videoUrl: '', duration: '' });
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails({
      ...courseDetails,
      [name]: value,
    });
  };

  const handleLessonChange = (e) => {
    const { name, value } = e.target;
    setLesson({
      ...lesson,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCourseDetails({
      ...courseDetails,
      imageUrl: file,
    });
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const addLesson = (e) => {
    e.preventDefault();
    if (!lesson.title || !lesson.content) {
      toast.error('Please fill in all lesson fields.');
      return;
    }

    setCourseDetails((prev) => ({
      ...prev,
      lessons: [...prev.lessons, lesson],
    }));

    toast.success(`Lesson "${lesson.title}" added!`);
    setLesson({ title: '', content: '', videoUrl: '', duration: '' }); // Reset lesson input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    // Check for required fields
    if (!courseDetails.title || !courseDetails.instructor || !courseDetails.duration || 
        !courseDetails.category || !courseDetails.description || !courseDetails.startDate) {
      setError('Please fill all required fields.');
      setLoading(false);
      return;
    }
  
    try {
      let imageUrl = '';
  
      // Upload image to Cloudinary if an image is present
      if (courseDetails.imageUrl) {
        const formData = new FormData();
        formData.append('file', courseDetails.imageUrl);
        formData.append('upload_preset', 'genailearning');
  
        try {
          const cloudinaryResponse = await axios.post(
            `https://api.cloudinary.com/v1_1/dqhatfb1w/image/upload`,
            formData
          );
          imageUrl = cloudinaryResponse.data.secure_url;
        } catch (uploadError) {
          console.error('Image upload failed:', uploadError);
          setError('Failed to upload image. Please try again.');
          setLoading(false);
          return;
        }
      }
  
      // Construct the course data
      const courseData = {
        ...courseDetails,
        imageUrl,
      };
  
      // Send course data to backend
      const response = await axios.post(ADMINENDPOINTS.ADDCOURSE, courseData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 201) {
        toast.success('Course added successfully!');
        setCourseDetails({
          title: '',
          description: '',
          instructor: '',
          duration: '',
          category: '',
          price: '',
          level: 'Beginner',
          prerequisites: [],
          imageUrl: null,
          lessons: [],
          startDate: '',
        });
        setImagePreview(null);
      } else {
        toast.error('Failed to submit course details.');
      }
    } catch (error) {
      console.error('Error submitting course details:', error);
      setError('Error submitting course details.');
      toast.error('Error submitting course details.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="mx-auto p-4 rounded-lg max-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Add a New Course</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        {/* Course Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Course Title *</label>
          <input
            type="text"
            name="title"
            value={courseDetails.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
            placeholder="Enter course title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description *</label>
          <textarea
            name="description"
            value={courseDetails.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
            rows="3"
            placeholder="Enter course description"
            required
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
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
            placeholder="Enter instructor name"
            required
          />
        </div>

        {/* Duration, Category, Price */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Duration *</label>
            <input
              type="text"
              name="duration"
              value={courseDetails.duration}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
              placeholder="Enter course duration"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category *</label>
            <input
              type="text"
              name="category"
              value={courseDetails.category}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
              placeholder="Enter course category"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price *</label>
            <input
              type="number"
              name="price"
              value={courseDetails.price}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
              placeholder="Enter course price"
              required
            />
          </div>
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date *</label>
          <input
            type="date"
            name="startDate"
            value={courseDetails.startDate}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
            required
          />
        </div>

        {/* Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Level *</label>
          <select
            name="level"
            value={courseDetails.level}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
            required
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Prerequisites */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Prerequisites</label>
          <input
            type="text"
            name="prerequisites"
            value={courseDetails.prerequisites.join(', ')}
            onChange={(e) => setCourseDetails({ ...courseDetails, prerequisites: e.target.value.split(',').map(p => p.trim()) })}
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
            placeholder="Enter prerequisites (comma-separated)"
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
            <div className="mt-2">
              <img src={imagePreview} alt="Course Preview" className="h-20 w-15 object-fit rounded-md shadow-md" />
            </div>
          )}
        </div>

        {/* Lessons Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Add Lessons</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Lesson Title *</label>
              <input
                type="text"
                name="title"
                value={lesson.title}
                onChange={handleLessonChange}
                className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
                placeholder="Enter lesson title"
                // required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Lesson Content *</label>
              <textarea
                name="content"
                value={lesson.content}
                onChange={handleLessonChange}
                className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
                rows="3"
                placeholder="Enter lesson content"
                // required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Video URL</label>
              <input
                type="text"
                name="videoUrl"
                value={lesson.videoUrl}
                onChange={handleLessonChange}
                className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
                placeholder="Enter video URL"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Lesson Duration</label>
              <input
                type="text"
                name="duration"
                value={lesson.duration}
                onChange={handleLessonChange}
                className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
                placeholder="Enter lesson duration"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={addLesson}
                className="bg-green-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-700"
              >
                Add Lesson
              </button>
            </div>
          </div>

          {/* Display added lessons */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Added Lessons:</h3>
            <ul>
              {courseDetails.lessons.map((addedLesson, index) => (
                <li key={index} className="text-gray-700">
                  {addedLesson.title}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Add Course'}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
