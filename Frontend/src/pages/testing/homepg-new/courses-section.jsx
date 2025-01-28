import React, { useState } from "react";
import { Users, Clock } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CoursesSection = () => {
  const categories = ["Web Development", "Design", "Data Science", "Competitive exams", "ChatGPT & AI", "Marketing"];
  const coursesData = {
    "Web Development": [
      { title: "Learn HTML & CSS", learners: "3K+ Learners", duration: "4 hours" },
      { title: "Master JavaScript", learners: "5K+ Learners", duration: "6 hours" },
      { title: "React Basics", learners: "4K+ Learners", duration: "5 hours" },
      { title: "Advanced Node.js", learners: "2K+ Learners", duration: "7 hours" },
    ],
    Design: [
      { title: "UI/UX Fundamentals", learners: "2K+ Learners", duration: "3 hours" },
      { title: "Advanced Graphic Design", learners: "1K+ Learners", duration: "5 hours" },
      { title: "Photoshop Essentials", learners: "3K+ Learners", duration: "4 hours" },
      { title: "Illustrator for Beginners", learners: "2K+ Learners", duration: "6 hours" },
    ],
    "Data Science": [
      { title: "Python for Data Science", learners: "4K+ Learners", duration: "7 hours" },
      { title: "Machine Learning Basics", learners: "3K+ Learners", duration: "8 hours" },
      { title: "Deep Learning Overview", learners: "2K+ Learners", duration: "6 hours" },
      { title: "Data Visualization Tools", learners: "3.5K+ Learners", duration: "5 hours" },
    ],
    "Competitive exams": [
      { title: "Quantitative Aptitude", learners: "2K+ Learners", duration: "10 hours" },
      { title: "Reasoning & Logic", learners: "1.5K+ Learners", duration: "12 hours" },
      { title: "General Awareness", learners: "2.5K+ Learners", duration: "9 hours" },
      { title: "Exam Strategy Tips", learners: "1K+ Learners", duration: "3 hours" },
    ],
    "ChatGPT & AI": [
      { title: "ChatGPT Prompt Engineering", learners: "6K+ Learners", duration: "2 hours" },
      { title: "Introduction to AI", learners: "5K+ Learners", duration: "4 hours" },
      { title: "AI Ethics and Future", learners: "3K+ Learners", duration: "3 hours" },
      { title: "AI Applications in Business", learners: "4K+ Learners", duration: "6 hours" },
    ],
    Marketing: [
      { title: "Digital Marketing 101", learners: "7K+ Learners", duration: "5 hours" },
      { title: "SEO & Content Strategy", learners: "4K+ Learners", duration: "6 hours" },
      { title: "Social Media Mastery", learners: "3K+ Learners", duration: "4 hours" },
      { title: "Email Marketing Essentials", learners: "2.5K+ Learners", duration: "3 hours" },
    ],
  };

  const [selectedCategory, setSelectedCategory] = useState("Web Development");
  const courses = coursesData[selectedCategory];

  return (
    <div className="font-sans min-h-screen">
      <section className="px-4 pt-24 md:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-muted-foreground mb-2">COURSES</p>
          <h2 className="text-3xl md:text-4xl">
            <span className="font-bold">Learn </span>anything,<span className="font-bold"> achieve </span>everything
          </h2>
        </div>
      </section>

      {/* Categories Navigation */}
      <nav className="">
        <ul className="flex space-x-11 justify-center">
          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer ${selectedCategory === category
                  ? "text-blue-500 border-b-2  border-blue-500"
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
        {/* Left Arrow */}
        <button className="bg-white border rounded-full p-2 shadow-md mr-2">
          <ChevronLeft className="h-5 w-5 text-gray-500" />
        </button>

        {/* Options */}
        <div className="flex justify-center space-x-5 overflow-x-auto px-8">
          <button className="bg-black text-white px-4 py-2 rounded-md">JavaScript</button>
          <button className="bg-gray-100 px-4 py-2 rounded-md">React JS</button>
          <button className="bg-gray-100 px-4 py-2 rounded-md">Angular</button>
          <button className="bg-gray-100 px-4 py-2 rounded-md">Java</button>
          <button className="bg-gray-100 px-4 py-2 rounded-md">Android Development</button>
          <button className="bg-gray-100 px-4 py-2 rounded-md">iOS Development</button>
          <button className="bg-gray-100 px-4 py-2 rounded-md">HTML</button>
        </div>

        {/* Right Arrow */}
        <button className="bg-white border rounded-full p-2 shadow-md ml-2">
          <ChevronRight className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      {/* Course Grid */}
      <div className="flex justify-center space-x-4 mt-8 flex-wrap">
        {courses.map((course, index) => (
          <div key={index} className="bg-white rounded-lg border border-slate-200 overflow-hidden w-72 mb-4">
            <img src="https://thementor.live/wp-content/uploads/2024/08/The-Mentor-Digital-Makreting.jpg" alt="Course" className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg">{course.title}</h3>
              <p className="flex items-center mt-2 text-gray-500">
                <Users className="w-4 h-4 mr-1" /> {course.learners}
              </p>
              <p className="flex items-center mt-1 text-gray-500">
                <Clock className="w-4 h-4 mr-1 " /> {course.duration}
              </p>
              <div className="flex justify-between mt-4">
                <button className="text-blue-600">View Details</button>
                <button className="bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded-lg">Enroll Now →</button>
              </div>
            </div>
          </div>
        ))}
      </div>


      <div className="flex justify-center p-6 pt-16 pb-20">
        <button className="bg-white border border-black text-black px-4 py-2 rounded-lg">Explore all courses →</button>
      </div>
    </div>
  );
};

export default CoursesSection;
