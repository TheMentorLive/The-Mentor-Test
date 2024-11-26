'use client';
import React, { useRef } from "react";


import { useState } from "react";
import { ChevronRight, Clock, FileText, Search } from 'lucide-react';

export default function Searchsec() {
  const [searchQuery, setSearchQuery] = useState("");
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300; // Adjust scroll distance if needed
      scrollRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const tests = [
    {
      id: 1,
      icon: "/placeholder.svg?height=40&width=40",
      title: "IPCC Group 1 - Taxation",
      description: "Master Indian Polity for PSC Exams: Mini Live Test Series",
      questions: 30,
      marks: 60,
      duration: "1 hours 56 minutes"
    },
    {
        id: 1,
        icon: "/placeholder.svg?height=40&width=40",
        title: "IPCC Group 1 - Taxation",
        description: "Master Indian Polity for PSC Exams: Mini Live Test Series",
        questions: 30,
        marks: 60,
        duration: "1 hours 56 minutes"
      },
      {
        id: 1,
        icon: "/placeholder.svg?height=40&width=40",
        title: "IPCC Group 1 - Taxation",
        description: "Master Indian Polity for PSC Exams: Mini Live Test Series",
        questions: 30,
        marks: 60,
        duration: "1 hours 56 minutes"
      },
    {
      id: 2,
      icon: "/placeholder.svg?height=40&width=40",
      title: "Lorem ipsum dolor sit",
      description: "Lorem ipsum dolor sit amet consectetur. Facilisi sit nisi placerat.",
      questions: 30,
      marks: 60,
      duration: "1 hours 56 minutes"
    },
    {
      id: 3,
      icon: "/placeholder.svg?height=40&width=40",
      title: "Lorem ipsum dolor sit",
      description: "Lorem ipsum dolor sit amet consectetur. Eu nisi commodo netus.",
      questions: 30,
      marks: 60,
      duration: "1 hours 56 minutes"
    },
    {
      id: 4,
      icon: "/placeholder.svg?height=40&width=40",
      title: "Lorem ipsum dolor sit",
      description: "Lorem ipsum dolor sit amet consectetur. Non in euismod at ac.",
      questions: 30,
      marks: 60,
      duration: "1 hours 56 minutes"
    }
  ];

  return (
    <div className="  px-4 mt-9">
      <h1 className="text-center text-3xl font-bold mb-8">EXPLORE TEST SERIES</h1>
      
      <div className="relative max-w-xl mx-auto mb-12">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search Tests"
          className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>


    </div>
  );
}
