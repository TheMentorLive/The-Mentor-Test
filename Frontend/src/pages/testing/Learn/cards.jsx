import React from 'react';
import { Clock } from 'lucide-react';

const placeholder = "https://via.placeholder.com/150";

export default function Cards() {
  const courses = [
    {
      imageUrl: placeholder,
      instructorImageUrl: placeholder,
      instructorName: 'Prof. Sachin Teli',
      title: 'Digital Marketing - Beginner to Advanced',
      duration: '1 hour 56 minutes',
    },
    {
      imageUrl: placeholder,
      instructorImageUrl: placeholder,
      instructorName: 'Prof. Sachin Teli',
      title: 'Chat GPT',
      duration: '30 minutes',
    },
    {
      imageUrl: placeholder,
      instructorImageUrl: placeholder,
      instructorName: 'Prof. Sachin Teli',
      title: 'Python Basics',
      duration: '3 hours 30 minutes',
    },
    {
      imageUrl: placeholder,
      instructorImageUrl: placeholder,
      instructorName: 'Prof. Sachin Teli',
      title: 'UI UX - Figma Advance',
      duration: '1 hour 56 minutes',
    },
  ];

  return (
    <section className="py-12 bg-gray-50 sm:mr-4 sm:ml-4 md:mr-16 md:ml-16 lg:mr-36 lg:ml-36">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Library Of Resources</h2>
        
        {/* Horizontal scroll for small screens */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto sm:overflow-hidden">
          {courses.concat(courses).map((course, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-72 sm:w-auto bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <img
                    src={course.instructorImageUrl}
                    alt={course.instructorName}
                    className="rounded-full w-8 h-8 mr-2"
                  />
                  <span className="text-sm text-gray-600">{course.instructorName}</span>
                </div>
                <h3 className="font-semibold mb-2">{course.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{course.duration}</span>
                </div>
                <button className="w-full bg-blue-100 text-blue-600 py-2 rounded-md hover:bg-blue-200 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <a href="#" className="text-blue-600 hover:underline">
            view more
          </a>
        </div>
      </div>
    </section>
  );
}
