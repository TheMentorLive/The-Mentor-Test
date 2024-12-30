import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Heart } from 'lucide-react';
import { USERENDPOINTS } from '/src/constants/ApiConstants';
import { mainContext } from '/src/context/mainContex';
import { useNavigate } from 'react-router-dom';

function CourseListing() {
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

  return (
    <div className="mx-auto py-8 px-4 sm:px-6 lg:px-24">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 mt-10">All Tests</h1>

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

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative w-full sm:w-48">
          <select
            value={selectedFilters.examType}
            onChange={(e) => handleFilterChange('examType', e.target.value)}
            className="block w-full bg-white border border-gray-300 px-4 py-2 rounded shadow h-10"
          >
            <option value="">All Exam Types ({tests.length})</option>
            {Object.keys(examTypeCounts).map((type) => (
              <option key={type} value={type}>
                {type} ({examTypeCounts[type]})
              </option>
            ))}
          </select>
        </div>

        <div className="relative w-full sm:w-48">
          <select
            value={selectedFilters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="block w-full bg-white border border-gray-300 px-4 py-2 rounded shadow h-10"
          >
            <option value="">All Categories</option>
            {[
              ...new Set(tests.map((test) => test.category)),
            ].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="relative w-full sm:w-48">
          <select
            value={selectedFilters.level}
            onChange={(e) => handleFilterChange('level', e.target.value)}
            className="block w-full bg-white border border-gray-300 px-4 py-2 rounded shadow h-10"
          >
            <option value="">All Levels</option>
            {[
              ...new Set(tests.map((test) => test.level)),
            ].map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div className="relative w-full sm:w-48">
          <select
            value={selectedFilters.price}
            onChange={(e) => handleFilterChange('price', e.target.value)}
            className="block w-full bg-white border border-gray-300 px-4 py-2 rounded shadow h-10"
          >
            <option value="">All Prices</option>
            <option value="low">Low (&lt; ₹500)</option>
            <option value="medium">Medium (₹500 - ₹1000)</option>
            <option value="high">High (&gt; ₹1000)</option>
          </select>
        </div>
      </div>

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
                    className={`cursor-pointer text-2xl transition-all duration-300 ${
                      wishlist.includes(test._id)
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
  );
}

export default CourseListing;