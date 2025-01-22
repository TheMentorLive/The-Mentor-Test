import React, { useState } from "react";
import { Users, Clock, ChevronLeft, ChevronRight } from "lucide-react";

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

  const [selectedCategory, setSelectedCategory] = useState("Competitive Exams"); // Updated default value
  const courses = coursesData[selectedCategory];

  const Card = ({ title }) => {
    return (
      <div className="flex items-center justify-between bg-white rounded-lg p-3 ">
        <div className="flex items-center">
          <img
            src="https://t3.ftcdn.net/jpg/04/91/76/62/360_F_491766294_h4j7LbW2YgfbNHhq7F8GboIc1XyBSEY5.jpg"
            alt="Test Icon"
            className="w-10 h-10 mr-4 rounded-full bg-grey-300"
          />
          <h3 className="text-lg">{title}</h3>
        </div>
        <span className="text-gray-500">&gt;</span>
      </div>
    );
  };

  return (
    <div className="font-sans min-h-screen bg-slate-100">
      <section className="px-4 pt-24 md:px-6">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-muted-foreground mb-2">COURSES</p>
          <h2 className="text-3xl md:text-4xl">
            <span className="font-bold">Test </span>your skills,<span className="font-bold"> ace </span> your goals!
          </h2>
        </div>
      </section>

      <nav>
        <ul className="flex space-x-11 justify-center">
          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer ${
                selectedCategory === category
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

      <hr className="border-t-1 border-slate-300" />

      <div className="flex justify-center p-6">
        <button className="bg-white border rounded-full p-2 shadow-md mr-2">
          <ChevronLeft className="h-5 w-5 text-gray-500" />
        </button>

        <div className="flex justify-center space-x-5 overflow-x-auto px-8">
  <button className="bg-black text-white px-4 py-2 rounded-md">UPSC</button>
  <button className="bg-gray-100 px-4 py-2 rounded-md border border-black">SSC</button>
  <button className="bg-gray-100 px-4 py-2 rounded-md border border-black">Railways</button>
  <button className="bg-gray-100 px-4 py-2 rounded-md border border-black">IBPS</button>
  <button className="bg-gray-100 px-4 py-2 rounded-md border border-black">State PCS</button>
  <button className="bg-gray-100 px-4 py-2 rounded-md border border-black">Defence</button>
  <button className="bg-gray-100 px-4 py-2 rounded-md border border-black">Teaching</button>
</div>


        <button className="bg-white border rounded-full p-2 shadow-md ml-2">
          <ChevronRight className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-5 mt-8 mr-44 ml-44">
        {courses.map((course, index) => (
          <Card key={index} title={course.title} />
        ))}
      </div>
      <div className="flex justify-center p-6 pt-16">
      <button className="bg-white border border-black text-black px-4 py-2 rounded-lg">Explore all tests →</button>
</div>
    </div>
  );
};

export default TestSection;
