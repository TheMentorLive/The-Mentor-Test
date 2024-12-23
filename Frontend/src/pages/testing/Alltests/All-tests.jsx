import { useState } from 'react'; 
import { InfoIcon, Star, StarHalf, Search, Heart } from 'lucide-react'; // Import Heart icon

const courses = [
  {
    id: 1,
    title: "JEE Main & Advanced Physics Preparation",
    description: "Comprehensive course covering key concepts in Physics for JEE Main & Advanced. Learn from top educators with in-depth problem-solving techniques.",
    instructor: "Amit Sharma",
    rating: 4.8,
    reviews: 30512,
    hours: 45.5,
    lectures: 150,
    level: "Advanced",
    price: 799,
    originalPrice: 4999,
    image: "/placeholder.svg",
    isBestseller: true,
  },
  {
    id: 2,
    title: "NEET Biology Mastery Course",
    description: "A complete guide to mastering NEET Biology with extensive coverage of all topics, practice questions, and expert-led explanations.",
    instructor: "Dr. Priya Singh",
    rating: 4.7,
    reviews: 23000,
    hours: 40.0,
    lectures: 120,
    level: "Intermediate",
    price: 699,
    originalPrice: 3999,
    isBestseller: true,
  },
  {
    id: 3,
    title: "JEE Chemistry Crash Course",
    description: "Fast-track your JEE Chemistry preparation with this crash course. Key reactions, formulas, and concepts are explained with an emphasis on problem-solving.",
    instructor: "Sandeep Kumar",
    rating: 4.6,
    reviews: 18850,
    hours: 30.0,
    lectures: 90,
    level: "Intermediate",
    price: 649,
    originalPrice: 3499,
    isBestseller: true,
  },
];

function AllTests() {
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [favoriteCourses, setFavoriteCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query

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
      <div className="relative bg-gray-100 p-2 rounded-lg flex items-center w-full mb-7">
        <input
          type="text"
          placeholder="Search for test series..."
          className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery} // Bind input to searchQuery state
          onChange={handleSearch} // Update search query state on change
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
          <div className="space-y-4">
            {filteredCourses.map((course) => (
              <div key={course.id} className="flex flex-col sm:flex-row border rounded-lg overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-52 w-full sm:w-72 object-cover"
                />
                <div className="flex-1 p-4">
                  <div className="flex flex-col sm:flex-row justify-between">
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
                          {course.rating % 1 >= 0.5 && (
                            <StarHalf className="h-4 w-4 fill-current" />
                          )}
                        </div>
                        <span className="text-sm text-gray-600">
                          ({course.reviews.toLocaleString()})
                        </span>
                      </div>
                      <div className="text-sm">
                        {course.hours} total hours • {course.lectures} lectures •{" "}
                        {course.level}
                      </div>
                      {course.isBestseller && (
                        <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                          Bestseller
                        </span>
                      )}
                    </div>
                    <div className="text-right mt-4 sm:mt-0">
                      <div className="font-bold">₹{course.price}</div>
                      <div className="text-sm text-gray-600 line-through">
                        ₹{course.originalPrice}
                      </div>
                      {/* Heart Button */}
                      <button
  onClick={() => handleFavoriteToggle(course.id)}
  className={`text-red-500 hover:text-red-500 mt-2 ${favoriteCourses.includes(course.id) ? "text-red-500" : "text-red-500"}`}
>
  <Heart className={`h-6 w-6 ${favoriteCourses.includes(course.id) ? "fill-current text-red-500" : ""}`} />
</button>
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

export default AllTests;