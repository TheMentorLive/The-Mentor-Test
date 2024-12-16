import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Heart } from 'lucide-react'; // Import Heart icon for wishlist
import { USERENDPOINTS } from '/src/constants/ApiConstants';
import { mainContext } from '/src/context/mainContex';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function CourseListing() {
  const [filtersVisible, setFiltersVisible] = useState(true);

  const toggleFilters = () => {
    setFiltersVisible((prev) => !prev);
  };

  const handleFavoriteToggle = (courseId) => {
    setFavoriteCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId) // Remove from favorites
        : [...prev, courseId] // Add to favorites
    );
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value); // Update search query state
  };

  const filteredCourses = courses.filter((course) => {
    const categoryMatch =
      selectedCategory === "All" ||
      (selectedCategory === "JEE" && course.title.includes("JEE")) ||
      (selectedCategory === "NEET" && course.title.includes("NEET"));

    const levelMatch =
      selectedLevel === "All" || course.level === selectedLevel;

    const ratingMatch = course.rating >= minRating;

    const searchMatch = course.title.toLowerCase().includes(searchQuery.toLowerCase()); // Check if title matches search query

    return categoryMatch && levelMatch && ratingMatch && searchMatch;
  });


  const handleTestClick = (testId) => {
    history(`/Testdetails?id=${testId}`); // Navigate to TestDetails page
  };

  // Pagination logic
  const indexOfLastTest = currentPage * testsPerPage;
  const indexOfFirstTest = indexOfLastTest - testsPerPage;
  const currentTests = filteredTests.slice(indexOfFirstTest, indexOfLastTest);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }
  return (
    <div className="mx-auto py-8 px-4 sm:px-6 lg:px-24">
      <h1 className="text-3xl font-bold mb-6 mt-10">All Tests</h1>

      <div className="relative bg-gray-100 p-2 rounded-lg flex items-center w-full mb-7">
  <input
    type="text"
    placeholder="Search for test series..."
    className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <Search className="absolute left-5 text-gray-500 h-5 w-5" />
</div>

      <div className="flex justify-between items-center mb-4">
        {/* Filter and Most Popular button */}
        <div className="flex items-center gap-4">
  <button onClick={toggleFilters} className="border border-gray-300 px-4 py-2 rounded w-28 h-10">
    {filtersVisible ? "Filter" : "Filter"}
  </button>
  <div className="relative inline-block w-36">
    <select className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight h-10">
      <option value="popular">Most Popular</option>
      <option value="rating">Highest Rated</option>
      <option value="newest">Newest</option>
    </select>
  </div>
</div>

        
        {/* Results text */}
        <div className="text-sm text-gray-500">1,902 results</div>
      </div>

      <div className="flex gap-6">
        {/* Filters */}
        <div
          className={`w-64 flex-shrink-0 transition-all duration-500 ease-in-out ${
            filtersVisible ? "opacity-100" : "opacity-0 w-0"
          }`}
        >
         <div className="border rounded-lg divide-y">
  <div className="px-4 py-2 cursor-pointer flex justify-between items-center">
    <span>Category</span>
    <select className="border bg-white px-2 py-1 rounded">
      <option value="category1">JEE</option>
      <option value="category2">NEET</option>
    </select>
  </div>
  <div className="px-4 py-2 cursor-pointer flex justify-between items-center">
    <span>Ratings</span>
    
  </div>
  <div className="px-4 py-2 cursor-pointer flex justify-between items-center">
    <span>Level</span>
    <select className="border bg-white px-2 py-1 rounded">
      <option value="beginner">Beginner</option>
      <option value="intermediate">Intermediate</option>
      <option value="advanced">Advanced</option>
    </select>
  </div>
  <div className="px-4 py-2 cursor-pointer flex justify-between items-center">
    <span>Price</span>
    
  </div>
</div>

        </div>

        {/* Course Listings */}
        <div className={`flex-1 ${filtersVisible ? "" : "-ml-7"}`}>
          <div className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="flex border rounded-lg overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-52 w-72 object-cover"
                />
                <div className="flex-1 p-4">
                  <div className="flex justify-between">
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg">{course.title}</h3>
                      <p className="text-sm text-gray-600">{course.description}</p>
                      <p className="text-sm text-gray-600">{course.instructor}</p>
                      <div className="flex items-center gap-1">
                        <span className="font-bold">{course.rating}</span>
                        <div className="flex text-yellow-400">
                          {Array(Math.floor(course.rating))
                            .fill(null)
                            .map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-current" />
                            ))}
                          {course.rating % 1 >= 0.5 && <StarHalf className="h-4 w-4 fill-current" />}
                        </div>
                        <span className="text-sm text-gray-600">({course.reviews.toLocaleString()})</span>
                      </div>
                      <div className="text-sm">
                        {course.hours} total hours • {course.lectures} lectures • {course.level}
                      </div>
                      {course.isBestseller && (
                        <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                          Bestseller
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-bold">₹{course.price}</div>
                      <div className="text-sm text-gray-600 line-through">₹{course.originalPrice}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseListing;
