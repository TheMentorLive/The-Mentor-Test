export default function UCexams() {
    return (
      <div className="flex flex-col items-center mt-20 mb-20 p-8">
        <h1 className="text-4xl font-bold mb-2">Upcoming Exams</h1>
        <p className="text-center text-gray-500 mb-8">
          Prepare for the latest government, competitive, and academic exams with our comprehensive study material and
          adaptive tests.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <h2 className="text-xl font-semibold mb-4">Government Exams</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">UPSC Civil Services</h3>
                <p className="text-sm text-gray-500">Exam Date: 4th June 2023</p>
                <button className="mt-2 w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">
                  Start Preparation
                </button>
              </div>
              <div>
                <h3 className="font-medium">SSC CGL</h3>
                <p className="text-sm text-gray-500">Exam Date: 1st August 2023</p>
                <button className="mt-2 w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">
                  Start Preparation
                </button>
              </div>
              <div>
                <h3 className="font-medium">RRB NTPC</h3>
                <p className="text-sm text-gray-500">Exam Date: 15th September 2023</p>
                <button className="mt-2 w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">
                  Start Preparation
                </button>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Competitive Exams</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">CAT</h3>
                <p className="text-sm text-gray-500">Exam Date: 25th November 2023</p>
                <button className="mt-2 w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">
                  Start Preparation
                </button>
              </div>
              <div>
                <h3 className="font-medium">JEE Main</h3>
                <p className="text-sm text-gray-500">Exam Date: 6th April 2024</p>
                <button className="mt-2 w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">
                  Start Preparation
                </button>
              </div>
              <div>
                <h3 className="font-medium">Olympiads</h3>
                <p className="text-sm text-gray-500">Exam Dates: Varies</p>
                <button className="mt-2 w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">
                  Start Preparation
                </button>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Academic Exams</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">NEET</h3>
                <p className="text-sm text-gray-500">Exam Date: 7th May 2024</p>
                <button className="mt-2 w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">
                  Start Preparation
                </button>
              </div>
              <div>
                <h3 className="font-medium">CLAT</h3>
                <p className="text-sm text-gray-500">Exam Date: 14th May 2024</p>
                <button className="mt-2 w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">
                  Start Preparation
                </button>
              </div>
              <div>
                <h3 className="font-medium">GATE</h3>
                <p className="text-sm text-gray-500">Exam Date: 4th February 2024</p>
                <button className="mt-2 w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">
                  Start Preparation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  