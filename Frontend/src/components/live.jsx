import { useRef } from 'react';

export default function Live() {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 320, behavior: 'smooth' }); // Smooth scrolling
    }
  };

  return (
    <div className="items-center justify-center mt-10 p-3 md:mr-72 lg:mr-[200px] lg:ml-[78px] md:ml-40 rounded-xl">
      <div className="text-center mr-2">
        <h3 className="md:mt-3 md:ml-80 text-[24px] font-semibold text-black lg:text-left lg:ml-1">
          Live - Counselling and Mentorship
        </h3>
      </div>

      <div className="relative mt-2">
        <div
          ref={carouselRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide"
        >
          {/* Cards */}
          {series.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 h-[325px] w-[280px] border rounded-lg border-slate-300 flex flex-col"
            >
              <div className="p-3 flex-grow">
                <div className="mb-4">
                  <img
                    src={item.imgSrc}
                    alt={item.title}
                    className="h-auto rounded-lg"
                    width="360"
                    height="216"
                    style={{ aspectRatio: '360/216', objectFit: 'cover' }}
                  />
                </div>
                <div className="-mb-1">
                  <h4 className="text-md font-bold">{item.title}</h4>
                  <p className="text-gray-500 mt-1 text-xs">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-3 ">
                <div className="flex justify-between gap-1">
                  <button className="px-3 py-2 bg-[#2563EB] font-bold text-white text-xs rounded-lg hover:bg-blue-600">
                    Get Started
                  </button>
                  <button className="px-3 py-2 border border-gray-300 font-bold text-xs text-gray-700 rounded-lg hover:bg-gray-100">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Arrow Button */}
        <div className="absolute top-1/2 opacity-0 right-0 transform -translate-y-1/2">
          <button
            onClick={scrollLeft}
            className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full shadow-md"
          >
            <ArrowRightIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

const series = [
  {
    title: 'Orient - School Students',
    description: 'Holistic Personality Development & Academic Excellence',
    imgSrc: '/Orient.png',
  },
  {
    title: 'Emerge - College Students',
    description:
      'Explore career paths, enhance employability skills, and transition smoothly into the workforce.',
    imgSrc: '/Emerge.png',
  },
  {
    title: 'Elevate - Working Professionals',
    description: 'Career Advancement, Leadership skills & achieve work-life balance.',
    imgSrc: '/Elevate.png',
  },
];

function ArrowRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
