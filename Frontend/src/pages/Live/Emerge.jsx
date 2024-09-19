import { useState } from 'react';

export default function Emerge() {
  const [visibleSection, setVisibleSection] = useState(null);

  const handleToggle = (section) => {
    setVisibleSection(visibleSection === section ? null : section);
  };

  return (
    <div className="flex flex-col md:flex-row items-center mt-10 md:mt-40 gap-6 p-4 sm:p-6 bg-white rounded-lg">
      <div className="relative w-full md:w-1/2">
        <img
          src="/live/Emerge.png"
          alt="Emerge Program"
          className="w-[300px] sm:w-[400px] h-[400px] sm:h-[550px] rounded-lg mx-auto md:ml-40"
          width="1000"
          height="1000"
        />
      </div>
      <div className="w-full md:w-1/2 space-y-4 md:mr-40 text-center md:text-left">
        <h2 className="text-2xl sm:text-3xl">
          <span className="text-[#2563EB] font-bold">Emerge</span> – College Grads
        </h2>
        <p className="text-[#2563EB] font-bold">Counseling & Mentorship • 8 – 12</p>
        <p className="text-gray-700">
          College graduates with mentors have 68% higher retention rates in companies and are more likely to achieve career growth and build Professional Network.
        </p>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <p className="text-sm sm:text-base">Month 1-4: Overview - Marketing, HR, Tech, Law, Finance</p>
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
              <p className="text-gray-700 text-sm sm:text-base">
                Detailed description for Month 1-4: Overview - Marketing, HR, Tech, Law, Finance.
              </p>
            )}
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <p className="text-sm sm:text-base">Month 5: Case Studies & Mentor Discussions</p>
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
              <p className="text-gray-700 text-sm sm:text-base">
                Detailed description for Month 5: Case Studies & Mentor Discussions.
              </p>
            )}
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <p className="text-sm sm:text-base">Month 6: Live Projects & Internships</p>
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
              <p className="text-gray-700 text-sm sm:text-base">
                Detailed description for Month 6: Live Projects & Internships.
              </p>
            )}
          </div>
        </div>
        <button className="mt-4 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto">
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
