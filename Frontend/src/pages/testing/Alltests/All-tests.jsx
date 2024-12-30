
import { InfoIcon, Star, StarHalf, Search, Heart } from 'lucide-react'; // Import Heart icon

import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { USERENDPOINTS } from '/src/constants/ApiConstants';
import { mainContext } from '/src/context/mainContex';
import { useNavigate } from 'react-router-dom';



function AllTests() {
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [favoriteCourses, setFavoriteCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query










  {/* Form Section */}
<div className="container mx-auto lg:mr-16">
  <div className="flex flex-col lg:flex-row">
    <div className="flex-1">
      {/* Main content goes here */}
      <div style={{ height: '1730px' }}>
        {/* Simulating a tall content area */}
        <p>Scroll down to see the sticky card in action.</p>
      </div>
    </div>
    <div className="bg-white rounded-lg shadow-lg h-fit p-4 md:ml-auto w-full md:w-[300px] lg:w-[350px] lg:sticky lg:top-16">
      <div className="space-y-3">
        <img src={testDetails.image} alt="Hexagonal pattern" className="rounded-lg object-cover w-full h-[150px]" />
        <h3 className="text-base font-bold">
          {testDetails.title} / {testDetails.category}
        </h3>
        <div className="flex items-baseline gap-1">
          <span className="text-sm font-bold">₹ {testDetails.price}/-</span>
          <span className="text-xs text-gray-500 line-through">₹1000</span>
          <span className="text-xs text-green-600">67% OFF</span>
        </div>
        <p className="text-xs text-gray-500">
          In at iaculis lorem. Praesent tempor dictum tellus ut molestie.
          Sed sed ullamcorper lorem
        </p>
        <div className="flex gap-3">
          {isItemInCart(testDetails) || userCartIncludes ? (
            <Link to="/cart">
              <button className="w-full flex items-center justify-center bg-gray-200 text-gray-800 py-2 px-8 rounded-lg text-sm hover:bg-gray-300 ml-12">
                <IconShoppingCart size={16} />
                Go To Cart
              </button>
            </Link>
          ) : (
            <>
              {isTestPurchased ? (
                <Link to="/dashboard">
                  <button className="w-full flex items-center justify-center bg-gray-200 text-gray-800 py-2 px-3 rounded-lg text-sm hover:bg-gray-300 gap-2">
                    <List size={16} />
                    Go To Learnings
                  </button>
                </Link>
              ) : (
                <button
                  className={`w-full flex items-center justify-center bg-gray-200 text-gray-800 py-2 px-3 rounded-lg text-sm hover:bg-gray-300 gap-2 ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
                  onClick={() => addToCart(testDetails)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <IconLoader className="animate-spin" size={16} />
                  ) : (
                    <IconShoppingCart size={16} />
                  )}
                  {isLoading ? "Adding..." : "Add to Cart"}
                </button>
              )}

              {isTestPurchased ? (
                <p className="text-green-500">You own this test.</p>
              ) : (
                <button
                  className="w-full flex items-center justify-center bg-blue-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-700 gap-2"
                  onClick={() => handleBuyNow(testDetails._id)}
                >
                  <IconCreditCard size={16} />
                  Checkout
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  </div>
</div>






  const { token } = useContext(mainContext);
  const [tests, setTests] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const [examTypeCounts, setExamTypeCounts] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({
    examType: '',
    category: '',
    level: '',
    price: '',
  });
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [testsPerPage] = useState(6);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      setLoading(true);
      try {
        const response = await axios.get(USERENDPOINTS.GET_ALL_TESTS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fetchedTests = response.data;
        setTests(fetchedTests);
        setFilteredTests(fetchedTests);

        const counts = fetchedTests.reduce((acc, test) => {
          acc[test.examType] = (acc[test.examType] || 0) + 1;
          return acc;
        }, {});
        setExamTypeCounts(counts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };

    if (token) {
      fetchTests();
    } else {
      console.error('Token not available.');
    }
  }, [token]);

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  useEffect(() => {
    let filtered = [...tests];

    if (selectedFilters.examType) {
      filtered = filtered.filter(
        (test) => test.examType === selectedFilters.examType
      );
    }

    if (selectedFilters.category) {
      filtered = filtered.filter(
        (test) => test.category === selectedFilters.category
      );
    }

    if (selectedFilters.level) {
      filtered = filtered.filter(
        (test) => test.level === selectedFilters.level
      );
    }

    if (selectedFilters.price) {
      filtered = filtered.filter(
        (test) =>
          selectedFilters.price === 'low'
            ? test.price < 500
            : selectedFilters.price === 'medium'
              ? test.price >= 500 && test.price <= 1000
              : selectedFilters.price === 'high'
                ? test.price > 1000
                : true
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (test) =>
          test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          test.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          test.examType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTests(filtered);
  }, [selectedFilters, tests, searchTerm]);

  const handleWishlistToggle = (testId) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.includes(testId)) {
        return prevWishlist.filter((id) => id !== testId);
      } else {
        return [...prevWishlist, testId];
      }
    });
  };

  const handleTestClick = (testId) => {
    navigate(`/Testdetails?id=${testId}`);
  };

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


  return (
    <div className="mx-auto py-8 px-4 sm:px-6 lg:px-24">
      <h1 className="text-3xl font-bold mb-6 mt-10">All Tests</h1>
      {/* Search Input */}
      <div className="relative bg-gray-100 p-2 rounded-lg flex items-center w-full mb-7">
        <input
          type="text"
          placeholder="Search for test series..."
          className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-5 text-gray-500 h-5 w-5" />
      </div>

      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <div className="flex items-center gap-4">
          <button onClick={toggleFilters} className="border border-gray-300 px-4 py-2 rounded w-28 h-10">
            {filtersVisible ? "Filter" : "Filter"}
          </button>
          <div className="relative inline-block w-[150px]">
            <select className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight h-10">
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <span className="text-gray-500 text-sm">▼</span>
            </div>
          </div>

        </div>

        <div className="text-sm text-gray-500">{filteredCourses.length} results</div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div
          className={`transition-all duration-500 ease-in-out ${filtersVisible ? "lg:w-64 opacity-100" : "lg:w-0 opacity-0 overflow-hidden"}`}
        >
          <div className="border rounded-lg divide-y">
            <div className="px-4 py-2 cursor-pointer flex justify-between items-center">
              <span>Category</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border bg-white px-2 py-1 rounded"
              >
                <option value="All">All</option>
                <option value="JEE">JEE</option>
                <option value="NEET">NEET</option>
              </select>
            </div>
            <div className="px-4 py-2 cursor-pointer flex justify-between items-center">
              <span>Ratings</span>
              <select
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
                className="border bg-white px-2 py-1 rounded"
              >
                <option value={0}>All</option>
                <option value={4.5}>4.5 & up</option>
                <option value={4.0}>4.0 & up</option>
                <option value={3.5}>3.5 & up</option>
              </select>
            </div>
            <div className="px-4 py-2 cursor-pointer flex justify-between items-center">
              <span>Level</span>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="border bg-white px-2 py-1 rounded"
              >
                <option value="All">All</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div className="px-4 py-2 cursor-pointer flex justify-between items-center">
              <span>Price</span>
              <select

                className="border bg-white px-2 py-1 max-w-[140px] rounded"
              >
                <option value="">All Prices</option>
                <option value="low">Low (&lt; ₹500)</option>
                <option value="medium">Medium (₹500 - ₹1000)</option>
                <option value="high">High (&gt; ₹1000)</option>
              </select>
            </div>

          </div>
        </div>

        <div className={`transition-all duration-500 ease-in-out ${filtersVisible ? "flex-1" : "lg:-ml-5 w-full"}`}>
          {/* Test Cards */}
          <div className="space-y-4">
            {currentTests.map((test) => (
              <div
                key={test._id}
                className="flex flex-col sm:flex-row border rounded-lg overflow-hidden"
              >
                <img
                  src={test.image}
                  alt={test.title}
                  className="h-52 w-full sm:w-72 object-cover cursor-pointer"
                  onClick={() => handleTestClick(test._id)}
                />
                <div className="flex-1 p-4">
                  <div className="flex flex-col sm:flex-row justify-between">
                    <div className="space-y-2">
                      <h3
                        className="font-bold text-lg cursor-pointer"
                        onClick={() => handleTestClick(test._id)}
                      >
                        {test.title}
                      </h3>
                      <p className="text-sm text-gray-600">{test.description}</p>
                      <p className="text-sm text-gray-600">{test.category}</p>
                      <div className="text-sm">
                        {test.duration} minutes • {test.level}
                      </div>
                    </div>
                    <div className="text-right flex sm:flex-col justify-between sm:items-end">
                      <div className="font-bold">₹{test.price}</div>
                      <Heart
                        className={`cursor-pointer text-2xl transition-all duration-300 ${wishlist.includes(test._id)
                            ? "text-red-500 scale-110"
                            : " hover:text-gray-700 hover:scale-110"
                          }`}
                        onClick={() => handleWishlistToggle(test._id)}
                      />

                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filteredTests.length === 0 && (
              <p className="text-center text-gray-500">No tests found for the selected filters.</p>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-l-lg disabled:opacity-50"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="px-4 py-2">{currentPage}</span>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-r-lg disabled:opacity-50"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(filteredTests.length / testsPerPage)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllTests;