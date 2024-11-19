
export default function UPE() {
    return (
      <div className="w-full space-y-16 mb-10">
        {/* Why take Gen AI section */}
        <section className="w-full bg-blue-600 py-16 border rounded-lg ">
          <div className="container px-4 md:px-6">
            <h2 className="text-center text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
              Why take Gen AI Learning Test Series?
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 text-white lg:grid-cols-3">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-white p-3">
                    {/* Replace with appropriate icons or SVG */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Lorem ipsum dolor sit</h3>
                  <p className="text-blue-100">
                    Lorem ipsum dolor sit amet consectetur. Diam sem arcu senectus.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* Upcoming Professional Exams section */}
        <section className="container px-4 md:px-6">
          <h2 className="mb-8 text-3xl font-bold tracking-tighter">
            Upcoming Professional Exams
          </h2>
          <div className="grid gap-6 lg:grid-cols-[200px_1fr]">
            <div className="space-y-1">
              <button className="w-full justify-start bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Government Exams
              </button>
              <button className="w-full justify-start px-4 py-2 rounded-md text-blue-600 border border-blue-600 hover:bg-blue-50">
                Competitive Exams
              </button>
              <button className="w-full justify-start px-4 py-2 rounded-md text-blue-600 border border-blue-600 hover:bg-blue-50">
                Academic Exams
              </button>
            </div>
            <div className="relative">
              <div className="flex space-x-4 overflow-x-auto pb-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="min-w-[300px] bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-gray-100" />
                      <h3 className="font-semibold">IPCC Group 1 - Taxation</h3>
                    </div>
                    <p className="mt-4 text-sm text-gray-600">Exam Date: 4th June 2025</p>
                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Get Started
                    </button>
                  </div>
                ))}
              </div>
              <button className="absolute -right-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-white shadow-lg flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>

        
   
      <div className="w-full bg-blue-600 py-12 text-center border rounded-lg text-white">
        <div className="container px-4">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Start Your Exam Preparation Now!</h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-100">
            Lorem ipsum dolor sit amet consectetur. Sociis ut tortor enim ut pellentesque vulputate aliquet.
          </p>
          <button variant="secondary" size="lg" className="font-semibold border p-4 rounded-lg border-black text-blue-600 bg-white">
            Get Started
          </button>
        </div>
      </div>

  
      </div>
    );
  }
  