import { Video, Users, GraduationCap } from "lucide-react";
import { useState } from "react";

export default function UPE() {
  const [selectedCategory, setSelectedCategory] = useState("Government Exams");

  const examData = {
    "Government Exams": [
      { title: "UPSC - Prelims", date: "12th June 2025" },
      { title: "SSC CGL - Tier 1", date: "20th July 2025" },
    ],
    "Competitive Exams": [
      { title: "CAT - Management", date: "25th Nov 2025" },
      { title: "GATE - Engineering", date: "7th Feb 2026" },
    ],
    "Academic Exams": [
      { title: "IPCC Group 1 - Taxation", date: "4th June 2025" },
      { title: "NET - Economics", date: "10th Dec 2025" },
    ],
  };
  
  const features = [
    {
      title: "Comprehensive Test Coverage",
      description: "Covers all topics with updated and relevant questions.",
      Icon: Video,
    },
    {
      title: "Expertly Curated Questions",
      description: "Questions prepared by industry experts for effective learning.",
      Icon: Users,
    },
    {
      title: "Track Your Progress",
      description: "Analyze performance and improve with detailed insights.",
      Icon: GraduationCap,
    },
  ];

  

    return (
      <div className="mb-10">
        {/* Why take Gen AI section */}
       
  
       
        <section className="  px-4 md:px-6 mt-16 mb-16 mr-20 ml-20">
      <h2 className="mb-8 text-3xl font-bold tracking-tighter">
        Upcoming Professional Exams
      </h2>
      <div className="grid gap-6 lg:grid-cols-[200px_1fr]">
        <div className="space-y-1 mt-8">
          {Object.keys(examData).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`w-full justify-start px-4 py-2 rounded-md ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "text-blue-600 border border-blue-600 hover:bg-blue-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="relative">
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {examData[selectedCategory].map((exam, i) => (
              <div
                key={i}
                className="min-w-[300px] bg-white rounded-lg shadow-lg p-6"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-gray-100" />
                  <h3 className="font-semibold">{exam.title}</h3>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  Exam Date: {exam.date}
                </p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Get Started
                </button>
              </div>
            ))}
          </div>
          <button className="absolute -right-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-white shadow-lg flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>




  
      </div>
    );
  }
  