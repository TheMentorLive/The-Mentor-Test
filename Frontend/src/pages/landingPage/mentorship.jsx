export default function Mentorship() {
    return (
      <div className="flex justify-center p-8 mt-28 bg-blue-100">
        <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-lg shadow-md">
          <div className="w-full md:w-1/2 p-8">
            <div className="w-full h-[320px]  rounded-lg" >
                <img src="/cards/mentorship.png"/>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-8 space-y-4 lg:mt-8 md:mt-8">
            <p className="text-sm text-gray-500">Mentors</p>
            <h2 className="text-2xl font-bold leading-tight">
              Stop procrastinating and let's build your professional{" "}
              <a href="#" className="text-blue-600 underline">
                LinkedIn
              </a>{" "}
              presence today!
            </h2>
            <p className="text-gray-500">
              This is the course process you will go through if you subscribe to our platform.
            </p>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-full">
                Book now
              </button>
              <a href="#" className="text-blue-600 underline">
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  