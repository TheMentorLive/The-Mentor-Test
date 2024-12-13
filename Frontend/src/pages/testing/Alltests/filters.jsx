import { useState } from 'react';
import { InfoIcon, Star, StarHalf, Search } from 'lucide-react';

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


function CourseListing() {
  const [filtersVisible, setFiltersVisible] = useState(true);

  const toggleFilters = () => {
    setFiltersVisible((prev) => !prev);
  };

  return (
    <div className="mx-auto py-8 ml-[100px] mr-[100px]">
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
