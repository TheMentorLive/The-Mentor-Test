export default function KeyFeatures() {
    return (
      <section className="py-8 md:py-16 md:mr-40 md:mt-20 md:ml-40 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="mt-8 md:mt-24">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Key Features
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-600">
                Our portal offers a comprehensive suite of features to help you ace your government exams.
              </p>
            </div>
            <div className="space-y-6 md:space-y-8">
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                  Adaptive Tests
                </h3>
                <p className="mt-2 text-sm md:text-base text-gray-600">
                  Our adaptive tests adjust to your skill level, providing a personalized learning experience.
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                  Performance Analysis
                </h3>
                <p className="mt-2 text-sm md:text-base text-gray-600">
                  Track your progress and identify areas for improvement with our detailed performance analysis.
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                  Study Material
                </h3>
                <p className="mt-2 text-sm md:text-base text-gray-600">
                  Access a vast library of study material, including practice questions, video lectures, and study guides.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  