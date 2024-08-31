import { useState, useEffect, useCallback, memo } from "react";
import { Card } from "@/public/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/public/ui/avatar";
import { Button } from "@/public/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const ChevronLeftIcon = memo(function ChevronLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
});

const ChevronRightIcon = memo(function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
});

const reviews = [
  {
    name: "John Doe",
    designation: "Software Engineer",
    image: "/reviews/re1.png",
    feedback: "John's review text goes here. It's insightful and detailed.",
  },
  {
    name: "Jane Smith",
    designation: "Product Manager",
    image: "/reviews/re2.png",
    feedback: "Jane's review text goes here. It's concise and informative.",
  },
  {
    name: "Alice Johnson",
    designation: "UX Designer",
    image: "/reviews/re3.png",
    feedback: "Alice's review text goes here. It's creative and thoughtful.",
  },
  {
    name: "Bob Brown",
    designation: "Marketing Specialist",
    image: "/reviews/re2.png",
    feedback: "Bob's review text goes here. It's persuasive and engaging.",
  },
];

export default function ModernTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  }, []);

  useEffect(() => {
    if (!isPaused) {
      const intervalId = setInterval(handleNext, 5000);
      return () => clearInterval(intervalId);
    }
  }, [isPaused, handleNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100"
    >
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-indigo-900"
      >
        What Our Clients Say
      </motion.h2>
      <div className="relative w-full max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center"
          >
            <Card className="w-full max-w-2xl bg-white shadow-xl rounded-2xl overflow-hidden">
              <div className="flex flex-col md:flex-row items-center p-6 md:p-8">
                <Avatar className="w-20 h-20 md:w-28 md:h-28 mb-4 md:mb-0 md:mr-6">
                  <AvatarImage src={reviews[currentIndex].image} alt={`${reviews[currentIndex].name}'s avatar`} />
                  <AvatarFallback>{reviews[currentIndex].name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-lg md:text-xl font-bold text-indigo-700">{reviews[currentIndex].name}</h3>
                  <p className="text-sm md:text-base text-gray-600 mb-2">{reviews[currentIndex].designation}</p>
                  <p className="text-gray-800 italic">&ldquo;{reviews[currentIndex].feedback}&rdquo;</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
        <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center -mt-4 px-4">
          <Button
            onClick={() => { handlePrev(); setIsPaused(true); }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="bg-white text-indigo-700 hover:bg-indigo-100 rounded-full p-2 shadow-md transition-colors duration-150"
          >
            <ChevronLeftIcon className="w-6 h-6" />
            <span className="sr-only">Previous testimonial</span>
          </Button>
          <Button
            onClick={() => { handleNext(); setIsPaused(true); }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="bg-white text-indigo-700 hover:bg-indigo-100 rounded-full p-2 shadow-md transition-colors duration-150"
          >
            <ChevronRightIcon className="w-6 h-6" />
            <span className="sr-only">Next testimonial</span>
          </Button>
        </div>
      </div>
      <div className="flex justify-center mt-6 space-x-2">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-indigo-700' : 'bg-indigo-300'
            } transition-colors duration-150`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
}
