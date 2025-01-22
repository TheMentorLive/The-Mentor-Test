// src/App.jsx
import React from 'react';


const Leaderboard = () => {
    const stats = [
        { number: '5,000', label: 'Courses' },
        { number: '6,500', label: 'Tests' },
        { number: '4,000', label: 'Jobs' },
        { number: '8,300', label: 'Learners' },
        { number: '3,500', label: 'Employers' },
      ];
  return (
    <div>
    <div className="flex justify-center items-center  mt-28">
      <div className="flex items-center space-x-8 ">
        <div className="max-w-md">
          <h2 className="text-4xl  mb-4">
            Climb the <span className="font-extrabold">Ranks</span>, Unlock Your <span className="font-extrabold">Future</span>
          </h2>
          <p className="mb-11 mt-6">
            The better your rank, the brighter your career. Top the leaderboard, showcase your skills, and grab exclusive job offers from leading recruiters.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold flex items-center">
            Start learning now! <span className="ml-2">→</span>
          </button>
        </div>
        <img
  src="/leaderboard.jpg"
  alt="Descriptive text"
  className=" rounded-lg shadow-lg  object-cover"
/>
      </div>


      
    </div>
    <hr className='mt-40'/>
    <div className="flex justify-center items-center bg-white mb-14">
          
          <div className="flex justify-around w-full py-8 px-10">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <h3 className="text-3xl font-bold text-gray-900 mb-3 mt-10">{stat.number}</h3>
                <p className="text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default Leaderboard;
