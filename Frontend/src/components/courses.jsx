import React, { useRef } from 'react';

export default function Learn() {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -320, behavior: 'smooth' }); // Smooth scrolling to the left
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 320, behavior: 'smooth' }); // Smooth scrolling to the right
    }
  };

  return (
    <div className="items-center flex justify-start mt-10 lg:-mt-3 p-4 lg:mr-[230px] lg:ml-[148px] ml-2"> {/* Removed left margin (ml-2) */}
      <div className="items-start flex justify-start  mr-2"> {/* Removed left margin (ml-2) */}
        <section className="mt-7 mb-10">
          <div className="text-left ml-4">
            <h3 className="md:mt-4 md:ml-0 text-[25px] font-semibold text-black lg:text-left lg:ml-0">
              Learn - AI - Enabled Courses and Resources
            </h3>
          </div>

          <div className="mt-8  relative">
            <div
              ref={carouselRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide"
            >
              {/* Cards */}
              {[ 
                {
                  title: "Courses",
                  description:
                    "Mentorship for 8-12 Students. Enhance employability skills, and transition smoothly into the workforce.",
                  imgSrc: "/live.png",
                },
                {
                  title: "Courses",
                  description:
                    "Mentorship for 8-12 Students. Enhance employability skills, and transition smoothly into the workforce.",
                  imgSrc: "/live.png",
                },
                {
                  title: "Courses",
                  description:
                    "Mentorship for 8-12 Students. Enhance employability skills, and transition smoothly into the workforce.",
                  imgSrc: "/live.png",
                },
              ].map((item, index) => (
                <div key={index} className="flex-shrink-0 h-[400px] w-[300px] border rounded-lg shadow-lg flex flex-col">
                  <div className="flex flex-col items-center justify-center h-[250px] rounded-lg bg-[#2563EB]">
                    <img
                      src={item.imgSrc}
                      alt={item.title}
                      className="h-auto rounded-lg"
                      width="300"
                      height="240"
                      style={{ aspectRatio: "300/240", objectFit: "cover" }}
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-bold">{item.title}</h4>
                    <p className="text-gray-500 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Arrow Buttons */}
            <div className="absolute top-1/2 opacity-0 right-0 transform -translate-y-1/2">
              <button onClick={scrollLeft} className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full shadow-md">
                <ArrowLeftIcon className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="absolute top-1/2 opacity-0 right-0 transform -translate-y-1/2">
              <button onClick={scrollRight} className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full shadow-md">
                <ArrowRightIcon className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function ArrowLeftIcon(props) {
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
      <path d="M19 12H5" />
      <path d="m12 5-7 7 7 7" />
    </svg>
  );
}

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
