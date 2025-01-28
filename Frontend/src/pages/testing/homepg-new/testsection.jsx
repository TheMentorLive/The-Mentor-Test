import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TestSection = () => {
  const categories = ["Competitive Exams", "Academic Exams", "Company-based Tests"];
  const coursesData = {
    "Competitive Exams": [
      { title: "Aptitude" },
      { title: "Reasoning" },
      { title: "GK" },
      { title: "Strategy" },
      { title: "Test 1" },
      { title: "Test 2" },
      { title: "Test 3" },
      { title: "Test 4" },
      { title: "Test 5" },
      { title: "Test 6" },
      { title: "Test 7" },
      { title: "Test 8" },
    ],
    "Academic Exams": [
      { title: "Physics" },
      { title: "Maths" },
      { title: "Biology" },
      { title: "Chemistry" },
    ],
    "Company-based Tests": [
      { title: "Amazon" },
      { title: "TCS" },
      { title: "Infosys" },
      { title: "Wipro" },
    ],
  };

  const [selectedCategory, setSelectedCategory] = useState("Competitive Exams");
  const courses = coursesData[selectedCategory];

  const Card = ({ title }) => (
    <div className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
      <div className="flex items-center">
        <img
          src="https://t3.ftcdn.net/jpg/04/91/76/62/360_F_491766294_h4j7LbW2YgfbNHhq7F8GboIc1XyBSEY5.jpg"
          alt="Test Icon"
          className="w-10 h-10 mr-4 rounded-full bg-gray-300"
        />
        <h3 className="text-sm md:text-lg">{title}</h3>
      </div>
      <span className="text-gray-500">&gt;</span>
    </div>
  );

  return (
    
    <div className="font-sans min-h-screen bg-slate-100">
      
      <section className="px-4 pt-24 md:px-6">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-muted-foreground mb-2">COURSES</p>
          <h2 className="text-2xl md:text-3xl">
            <span className="font-bold">Test </span>your skills,<span className="font-bold"> ace </span> your goals!
          </h2>
        </div>
      </section>

      <nav>
        <ul className="flex flex-wrap space-x-6 justify-center text-sm md:text-base">
          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer ${selectedCategory === category
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-600"
                }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </nav>

      <hr className="border-t border-slate-300 mt-4" />
      
      <div className="flex items-center justify-center">
  <div className="max-w-[1340px] w-full px-4">
    <div className="flex items-center justify-center space-x-2 p-4 md:p-6">
      <button className="bg-white border rounded-full p-2 shadow-md">
        <ChevronLeft className="h-5 w-5 text-gray-500" />
      </button>

      <div className="flex justify-center space-x-2 overflow-x-auto px-4 scrollbar-thin scrollbar-thumb-gray-300">
        {["UPSC", "SSC", "Railways", "IBPS", "State PCS", "Defence", "Teaching"].map((test) => (
          <button
            key={test}
            className="bg-gray-100 px-4 py-2 text-xs md:text-sm rounded-md border border-black"
          >
            {test}
          </button>
        ))}
      </div>

      <button className="bg-white border rounded-full p-2 shadow-md">
        <ChevronRight className="h-5 w-5 text-gray-500" />
      </button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 justify-center flex-wrap">
      {courses.map((course, index) => (
        <Card key={index} title={course.title} />
      ))}
    </div>
  </div>
</div>


      <div className="flex justify-center p-6 pt-8">
        <button className="bg-white border border-black text-black px-4 py-2 rounded-lg">
          Explore all tests →
        </button>
      </div>
    </div>
    
  );
};

export default TestSection;
