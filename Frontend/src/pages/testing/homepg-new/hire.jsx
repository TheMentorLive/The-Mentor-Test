// src/App.jsx
import React from 'react';


const HireSection = () => {
  return (
    <div className="flex items-center min-h-screen ">
      <div className="grid grid-cols-1 md:grid-cols-2  mx-auto">

        <div className="bg-blue-600 text-white p-40 ">
          <div className='ml-40'>
          <h4 className="text-sm font-semibold mb-4">FOR LEARNERS</h4>
          <h2 className="text-4xl mb-4">
            <span className=" font-bold ">Empower</span> Your<br/> Learning Journey
          </h2>
          <p className="mb-6">
            The Mentor: Top mentors, curated courses,<br/> and personalized guidance to elevate your<br/> academic and professional growth. Start<br/> your success story today.
          </p>
          <button className="bg-transparent border border-white text-white px-6 py-3 rounded-md font-semibold flex items-center mt-10">
            Start Learning <span className="ml-2">→</span>
          </button>
          </div>
        </div>


        <div className="bg-white text-black p-40 ">
          <div className='mr-40'>
          <h4 className="text-sm font-semibold mb-4">For EMPLOYERS</h4>
          <h2 className="text-4xl mb-4">
            <span className=" font-bold ">Hire</span> Top Talent, Smarter and Faster
          </h2>
          <p className="mb-6">
          Discover pre-assessed candidates tailored<br/> to your needs with AI-powered precision.<br/> Save time, reduce effort, and build your<br/> dream team today.
          </p>
          <button className="bg-blue-600 border border-white text-white px-6 py-3 rounded-md font-semibold flex items-center mt-10">
            Start Learning <span className="ml-2">→</span>
          </button>
          <p className="mb-6 text-white">
            Discover pre-assessed candidates tailored  to your needs with AI-powered precision. Save time, reduce effort, and build your dream team today.
          </p>
          </div>
        </div>


        {/* <div className="bg-white text-gray-800p-40 rounded-lg">
          <h4 className="text-sm font-semibold mb-2">FOR EMPLOYERS</h4>
          <h2 className="text-4xl  mb-4">
            <span className="font-bold">Hire</span> top talent, <br/>smarter and faster
          </h2>
         
          <p className="mb-6">
            Discover pre-assessed candidates tailored<br/>  to your needs with AI-powered precision.<br/> Save time, reduce effort, and build your<br/> dream team today.
          </p>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-md font-semibold flex items-center mt-10">
            Start Hiring <span className="ml-2">→</span>
          </button> <p className="mb-6 text-white">
            Discover pre-assessed candidates tailored  to your needs with AI-powered precision. Save time, reduce effort, and build your dream team today.
          </p>
        
        </div> */}
      </div>
    </div>
  );
};

export default HireSection;
