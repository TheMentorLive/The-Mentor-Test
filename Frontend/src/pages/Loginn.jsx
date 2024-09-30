import { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { ChevronDown, ChevronUp } from 'lucide-react'; // New arrows from lucide-react

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState({
    week1: false,
    week2: true, // open by default for demonstration
    week3: false,
    week4: false,
  });

  // Toggle a section and close others if necessary
  const toggleSection = (week) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [week]: !prevState[week],
    }));
  };

  return (
    <div className="space-y-4 p-6 mx-auto max-w-3xl">
      {/* Week Components */}
      {['week1', 'week2', 'week3', 'week4'].map((week, index) => (
        <WeekSection
          key={week}
          weekTitle={`Week ${index + 1}`}
          isOpen={isOpen[week]}
          toggleSection={() => toggleSection(week)}
          completed={index % 2 === 1} // Assume odd weeks are completed for demo purposes
          weekData={getWeekContent(index + 1)}
        />
      ))}
    </div>
  );
}

function WeekSection({ weekTitle, isOpen, toggleSection, completed, weekData }) {
  return (
    <div className="border rounded-lg shadow-md p-4 transition-transform duration-300 ease-in-out transform hover:scale-105">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">{weekTitle}</h3>
        {completed && (
          <span className="bg-green-200 text-green-700 px-2 py-1 rounded-lg text-sm">
            <FaCheckCircle className="inline-block mr-1" /> Completed
          </span>
        )}
        <button
          onClick={toggleSection}
          aria-expanded={isOpen}
          className="focus:outline-none"
        >
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      <div
        className={`mt-2 transition-max-height duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        {isOpen &&
          weekData.map((item, index) => (
            <SectionItem key={index} {...item} />
          ))}
      </div>
    </div>
  );
}

function SectionItem({ title, videos, problems, duration, dueDate, score }) {
  return (
    <div className="mt-4 border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex items-center mb-2">
        <FaCheckCircle className="text-green-500 mr-2" />
        <h4 className="font-semibold">{title}</h4>
      </div>
      <div className="text-sm space-y-1">
        <p className="text-gray-500">Videos: {videos}</p>
        <p className="text-gray-500">Problems: {problems}</p>
        <p className="text-gray-500">Duration: {duration}</p>
        <p className="text-gray-500">Due on: {dueDate}</p>
        <p className="text-gray-500 text-right">Score: {score}</p>
      </div>
    </div>
  );
}

// Example data fetching function for week content
function getWeekContent(weekNumber) {
  switch (weekNumber) {
    case 1:
      return [
        {
          title: 'Orientation Session 1',
          videos: 'N/A',
          problems: 'N/A',
          duration: 'N/A',
          dueDate: 'N/A',
          score: 'N/A',
        },
      ];
    case 2:
      return [
        {
          title: 'Intro to CSS',
          videos: '10/10',
          problems: '33/33',
          duration: '1h 4m',
          dueDate: '1 Oct, 2023',
          score: '1500/1530',
        },
        {
          title: 'Styling with CSS',
          videos: '12/12',
          problems: '46/46',
          duration: '1h 43m',
          dueDate: '1 Oct, 2023',
          score: '3320/3320',
        },
        {
          title: 'Starting with Resume Project',
          videos: '6/6',
          problems: '16/16',
          duration: '40m',
          dueDate: '1 Oct, 2023',
          score: '740/740',
        },
      ];
    case 3:
      return [
        {
          title: 'Flex',
          videos: 'N/A',
          problems: 'N/A',
          duration: 'N/A',
          dueDate: 'N/A',
          score: 'N/A',
        },
      ];
    case 4:
      return [
        {
          title: 'Bootstrap',
          videos: 'N/A',
          problems: 'N/A',
          duration: 'N/A',
          dueDate: 'N/A',
          score: 'N/A',
        },
      ];
    default:
      return [];
  }
}
