import { useState } from 'react';

export default function Orient() {
  // State to manage the visibility of each section
  const [visibleSection, setVisibleSection] = useState(null);

  // Function to toggle visibility
  const handleToggle = (section) => {
    setVisibleSection(visibleSection === section ? null : section);
  };

  return (
    <div className="flex flex-col md:flex-row items-center mt-40 gap-6 p-6 bg-white rounded-lg shadow-md">
      <div className="relative w-full md:w-1/2">
        <img
          src="/live/Orient.png"
          alt="School Students Orient"
          className="w-[400px] h-[550px] rounded-lg ml-40"
          width="1000"
          height="1000"
        />
        <div className="absolute bottom-4 left-52 mb-20 text-white">
          <p className="text-2xl">School Students</p>
          <h2 className="text-4xl font-bold">Orient</h2>
        </div>
      </div>
      <div className="w-full md:w-1/2 space-y-4 mr-40">
        <h2 className="text-2xl font-bold text-[#2563EB]">Orient – School Students</h2>
        <p className="text-[#2563EB]">Counseling & Mentorship • 8 – 12</p>
        <p className="text-gray-700">
          One course that covers important practical concepts from All Important subjects which will make you Personally
          and Professionally ready for the future
        </p>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <p>Month 1-4 : Overview - Marketing, HR, Tech, Law, Finance,</p>
            <button onClick={() => handleToggle('month1-4')} className="focus:outline-none">
              {visibleSection === 'month1-4' ? (
                <MinusIcon className="w-5 h-5 text-gray-500" />
              ) : (
                <PlusIcon className="w-5 h-5 text-gray-500" />
              )}
            </button>
          </div>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden border rounded-lg ${
              visibleSection === 'month1-4' ? 'max-h-screen p-4' : 'max-h-0 p-0'
            }`}
          >
            {visibleSection === 'month1-4' && (
              <p className="text-gray-700">
                Detailed description for Month 1-4: Overview - Marketing, HR, Tech, Law, Finance.
              </p>
            )}
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <p>Month 5 : Case Studies & Mentor Discussions</p>
            <button onClick={() => handleToggle('month5')} className="focus:outline-none">
              {visibleSection === 'month5' ? (
                <MinusIcon className="w-5 h-5 text-gray-500" />
              ) : (
                <PlusIcon className="w-5 h-5 text-gray-500" />
              )}
            </button>
          </div>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden border rounded-lg ${
              visibleSection === 'month5' ? 'max-h-screen p-4' : 'max-h-0 p-0'
            }`}
          >
            {visibleSection === 'month5' && (
              <p className="text-gray-700">
                Detailed description for Month 5: Case Studies & Mentor Discussions.
              </p>
            )}
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <p>Month 6 : Live Projects & Internships</p>
            <button onClick={() => handleToggle('month6')} className="focus:outline-none">
              {visibleSection === 'month6' ? (
                <MinusIcon className="w-5 h-5 text-gray-500" />
              ) : (
                <PlusIcon className="w-5 h-5 text-gray-500" />
              )}
            </button>
          </div>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden border rounded-lg ${
              visibleSection === 'month6' ? 'max-h-screen p-4' : 'max-h-0 p-0'
            }`}
          >
            {visibleSection === 'month6' && (
              <p className="text-gray-700">
                Detailed description for Month 6: Live Projects & Internships.
              </p>
            )}
          </div>
        </div>
        <button className="mt-4 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-blue-700">
          Learn More
        </button>
      </div>
    </div>
  );
}

function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function MinusIcon(props) {
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
      <path d="M5 12h14" />
    </svg>
  );
}
