import { useState } from "react";


export default function Part2({testDetails}) {
  const [openIndex, setOpenIndex] = useState(null);

  // Function to toggle the accordion
  const toggleAccordion = (index) => {
    // If the clicked item is already open, close it, otherwise open it
    if (openIndex === index) {
      setOpenIndex(null); // Close it if it is already open
    } else {
      setOpenIndex(index); // Open the clicked item
    }
  };
  return (
    <div className="mx-auto p-6 lg:ml-9 mr-16">
      <div className="grid gap-6 ">
        <div className="space-y-8">
          {/* About the Test Section */}
          <section className="space-y-4">
            <h1 className="text-2xl font-bold tracking-tight">About the Test</h1>
            <p className="text-gray-500">
              {testDetails.description}
            </p>
            <div className="space-y-4 border-t pt-4">
              <div className="flex gap-2">
                <span className="font-medium">Type:</span>
                <span className="text-gray-500">{testDetails.examType}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium">Time:</span>
                <span className="text-gray-500">{testDetails.duration}. min</span>
              </div>
            </div>
          </section>

          {/* Summary Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Summary of the {testDetails.title}</h2>
            <p className="text-gray-500">
             {testDetails.summary}
            </p>
          </section>
        </div>

        {/* Card Section */}
        
      </div>


      <section>
      <div className="w-full lg:-ml-9 lg:-mr-9 space-y-8 p-4">
      {/* Test Module Section */}
       <div className="rounded-lg border bg-gray-100">
      <h2 className="text-lg font-medium p-4">Test Module</h2>
      <div className="w-full">
        {testDetails.testModules.map((module, index) => (
          <div key={index} className="border-b">
            <button
              className="w-full flex justify-between items-center px-4 py-2 hover:bg-gray-200"
              onClick={() => toggleAccordion(index)}
            >
              <div className="flex gap-2">
                <span className="text-gray-500">{String(index + 1).padStart(2, "0")}</span>
                <span>{module.title}</span>
              </div>
              <span>{openIndex === index ? "-" : "+"}</span>
            </button>
            <div className={`px-4 pt-1 pb-3 ${openIndex === index ? "block" : "hidden"}`}>
              {module.description}
            </div>
          </div>
        ))}
      </div>
    </div>

      {/* FAQ Section */}
      <div className="rounded-lg border bg-gray-100">
        <h2 className="text-xl font-semibold p-4">FAQ'S</h2>
        <div className="w-full">
          {/* FAQ Item 1 */}
          <div className="border-b">
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-200"
              onClick={(e) => toggleAccordion(e)}
            >
              What Curriculums Do You Offer?
            </button>
            <div className="hidden px-4 pt-1 pb-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.
            </div>
          </div>

          {/* FAQ Item 2 */}
          <div className="border-b">
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-200"
              onClick={(e) => toggleAccordion(e)}
            >
              Lorem Ipsum Dolor Sit Amet, Consectetur, Lorem Ipsum Dolor Sit Amet?
            </button>
            <div className="hidden px-4 pt-1 pb-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
          </div>

          {/* FAQ Item 3 */}
          <div className="border-b">
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-200"
              onClick={(e) => toggleAccordion(e)}
            >
              Lorem Ipsum Dolor Sit Amet, Consectetur, Lorem Ipsum Dolor Sit Amet?
            </button>
            <div className="hidden px-4 pt-1 pb-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
          </div>
        </div>
      </div>
    </div>
  

  
      </section>
    </div>
  );
}

