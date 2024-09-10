import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12">
      <div className="text-center bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
        <div className="mb-6">
          <ComingSoonIcon className="mx-auto h-20 w-20 text-yellow-600" />
        </div>
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          Coming Soon
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          We're Working on It!
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Our new feature is on the way. Stay tuned for something amazing.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-white bg-teal-500 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

// ComingSoonIcon Component (Clock Icon)
function ComingSoonIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Clock Circle */}
      <circle cx="12" cy="12" r="10"></circle>
      {/* Clock Hands */}
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );
}


export default NotFound;
