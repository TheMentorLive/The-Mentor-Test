"use client";

import React from "react";
import InfiniteMovingCards from "./ui/infinite-moving-cards";

// Testimonial data with image URLs
const testimonials = [
  {
    quote: "It was the best of times, it was the worst of times,",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote: "To be, or not to be, that is the question: Whether",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote: "It is a truth universally acknowledged",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote: "Call me Ishmael. Some years ago—never mind",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];

export default function Testi() {
  return (
    <div className="h-[40rem]  rounded-md flex flex-col antialiased bg-white dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden space-y-10">
      {/* First row of cards moving left */}
      <div className="w-full h-[8rem]">
        <InfiniteMovingCards items={testimonials} direction="left" speed="normal" />
      </div>
      
      {/* Second row of cards moving right */}
      <div className="w-full h-[8rem]">
        <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
      </div>
      
      {/* Third row of cards moving left */}
      <div className="w-full h-[8rem]">
        <InfiniteMovingCards items={testimonials} direction="left" speed="slow" />
      </div>
    </div>
  );
}
