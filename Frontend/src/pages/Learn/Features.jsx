export default function Features() {
    return (
      <section className="flex flex-col items-center mt-20  mx-auto space-y-8 ml-64 mr-64">
        <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-gray-600 rounded-full">
          Features
        </span>
        <h2 className="text-4xl font-bold text-center">Comprehensive Test Features</h2>
        <p className="text-lg text-center text-gray-500">
          Discover the key features that make our tests the best choice for your assessment needs.
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold">Comprehensive Assessments</h3>
              <p className="text-gray-500">
                Our tests cover a wide range of topics and skills to provide a thorough evaluation of your capabilities.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Personalized Feedback</h3>
              <p className="text-gray-500">
                Receive detailed feedback and recommendations to help you identify your strengths and areas for improvement.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Adaptive Difficulty</h3>
              <p className="text-gray-500">
                Our tests adapt to your performance, ensuring a challenging yet rewarding experience tailored to your level.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center p-4 bg-gray-200 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-16 h-16 text-gray-500"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
        </div>
      </section>
    )
  }
  