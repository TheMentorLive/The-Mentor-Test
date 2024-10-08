import { useRef } from 'react';

export default function Tseries() {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 320, behavior: 'smooth' }); // Smooth scrolling
    }
  };

  return (
    <div className="items-center justify-center mt-10 lg:-mt-5 p-8 md:mr-40 lg:mr-[125px] lg:ml-[64px] md:ml-40 rounded-xl">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Explore Test Series</h2>
        <p className="text-muted-foreground">Browse our selection of testseries.</p>
      </div>
      <div className="relative mt-8">
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide" // hide scrollbar using the custom class
        >
          {/* Cards */}
          {courses.map((course, index) => (
            <div key={index} className="w-[270px] flex-shrink-0 border rounded-md shadow-sm flex flex-col">
              <div className="h-48 bg-gray-100 flex items-center justify-center"></div>
              <div className="p-4 flex-grow">
                <h3 className="text-lg font-bold">{course.title}</h3>
                <p className="text-muted-foreground">{course.description}</p>
              </div>
              <div className="p-4 -mt-5">
                <div className="flex gap-4">
                  <button className="px-4 py-2 border bg-[#2563EB] text-sm text-white border-gray-300 rounded-md">Buy Now</button>
                  <button className="text-[#2563EB] text-sm">Learn More</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Arrow Button */}
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
          <button onClick={scrollLeft} className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full shadow-md">
            <ArrowRightIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

const courses = [
  { title: 'NEET', description: 'NEET prep with core subjects.' },
  { title: 'JEE', description: 'Master key subjects for JEE.' },
  { title: 'UPSC', description: 'UPSC prep covering all essentials.' },
  { title: 'IBPS', description: 'Crack IBPS with focused training.' },
  { title: 'CAT', description: 'CAT prep with key skills.' },
  { title: 'GATE', description: 'Essential GATE topics covered.' },
  { title: 'CLAT', description: 'Legal and logical prep for CLAT.' },
  { title: 'CA Exams', description: 'Prep for CA certification.' },
  { title: 'IIT JAM', description: 'Key topics for IIT JAM.' },
  { title: 'GMAT', description: 'Focused prep for GMAT.' },
];

function ArrowRightIcon(props) {
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
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
