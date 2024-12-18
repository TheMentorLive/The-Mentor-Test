import React, { useState } from "react";
import { GraduationCap, ChevronRight } from "lucide-react";

export default function Part3() {
  const [activeTab, setActiveTab] = useState("all"); // State for active tab

  const examCategories = [
    // Competitive Exams
    { name: "Civil Services Exam: UPSC", category: "competitive" },
    { name: "JEE Mains + Advanced", category: "competitive" },
    { name: "NEET", category: "competitive" },
    { name: "GATE", category: "competitive" },
    { name: "CAT", category: "competitive" },
    { name: "Staff Selection Commission: SSC", category: "competitive" },
    { name: "Railway Recruitment Board: RRB", category: "competitive" },
    { name: "Chartered Accountancy: CA", category: "competitive" },
    { name: "National Defence Academy: NDA", category: "competitive" },
    { name: "CLAT", category: "competitive" },
    { name: "NIFT/NIIT", category: "competitive" },
    { name: "State Public Service Commission: State PSC", category: "competitive" },
    { name: "IBPS", category: "competitive" },
  
    // Academic Exams
    { name: "10th Grade Milestone: Achieve Excellence in Board Exams", category: "academic" },
    { name: "Prepare for 12th Exams: Strategies for Success", category: "academic" },
  
    // Company-based Tests
    { name: "TCS National Qualifier Test (TCS NQT)", category: "company" },
    { name: "Infosys Certification Exam", category: "company" },
    { name: "Wipro Elite National Talent Hunt (Wipro Elite NTH)", category: "company" },
    { name: "Cognizant GenC Next and GenC Elevate Exams", category: "company" },
    { name: "Deloitte Aptitude Test", category: "company" },
    { name: "EY Young Tax Professional Program", category: "company" },
    { name: "Tech Mahindra", category: "company" },
  ];
  
  const tabs = [
    { label: "All", value: "all" },
    { label: "Competitive Exams", value: "competitive" },
    { label: "Academic Exams", value: "academic" },
    { label: "Company-based Tests", value: "company" },
  ];
  
  // Filter exams based on active tab
  const filteredExams = examCategories.filter(
    (exam) => activeTab === "all" || exam.category === activeTab
  );

  return (
    <div className="container mx-auto">
    <div className=" mx-auto px-4 py-8 md:ml-40 md:mr-40 lg:mx-[110px] mb-7">
      <div className="mb-20">
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-blue-600 text-white p-2 rounded-full">
            <GraduationCap size={24} />
          </div>
          <h1 className="text-2xl font-bold">Explore Test</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Get exam-ready with concepts, questions, and study notes as per the latest pattern.
        </p>

        {/* Tabs Section */}
        <div className="mb-6 flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)} // Update active tab on click
              className={`px-4 py-2 text-sm font-medium transition-all border-b-2 ${
                activeTab === tab.value
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-600 hover:text-blue-600 border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Exam Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExams.map((exam, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-lg p-4 flex justify-between items-center border border-gray-200"
            >
              <span>{exam.name}</span>
              <ChevronRight className="text-gray-400" />
            </div>
          ))}
          <a href="#" className="text-blue-600 ml-3 mt-3 hover:underline">
            Explore All Exams
          </a>
        </div>
      </div>

      {/* Job Section */}
      <div className="bg-blue-600 text-white p-8 rounded-lg shadow flex flex-col md:flex-row items-center">
        <div className="flex-1 mb-6 md:mb-0">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap size={32} />
            <h2 className="text-2xl ">Empower Your Learning Journey</h2>
          </div>
          <p className="mb-4 text-1xl">
          The Mentor connects you with top-notch mentors who guide you in every step of your academic and professional growth. Unlock curated courses, personalized mentorship, and actionable insights to transform your career.  Your success story starts here.
          </p>
          <button className="px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all">
            Learn More
          </button>
        </div>
        <div className="flex-1 lg:-mb-8 flex justify-center">
          <img
            src="./landing/student.png"
            alt="Professional with laptop"
            className="max-w-full h-[270px]"
          />
        </div>
      </div>
    </div>
    </div>
  );
}
