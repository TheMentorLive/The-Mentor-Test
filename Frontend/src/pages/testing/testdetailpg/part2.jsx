import { mainContext } from "/src/context/mainContex";
import { usePaidTests } from "/src/hooks/usePaidTest";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Part2({ testDetails }) {
  const [openTestIndex, setOpenTestIndex] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [showAllModules, setShowAllModules] = useState(false); // State to toggle the visibility of all modules
  const navigate = useNavigate();
  const{token,user}=useContext(mainContext)
  const { paidTests, loading: paidTestsLoading, error: paidTestsError } =
  usePaidTests(token);

  const toggleShowAllModules = () => {
    setShowAllModules((prevState) => !prevState); // Toggle the visibility of all modules
  };

  // Function to toggle the test accordion
  const toggleTestAccordion = (index) => {
    if (openTestIndex === index) {
      setOpenTestIndex(null); // Close it if it is already open
    } else {
      setOpenTestIndex(index); // Open the clicked item
    }
  };

  // Function to toggle the FAQ accordion
  const toggleFaqAccordion = (index) => {
    if (openFaqIndex === index) {
      setOpenFaqIndex(null); // Close it if it is already open
    } else {
      setOpenFaqIndex(index); // Open the clicked item
    }
  };

  // Group tests by subject
  const groupedBySubject = testDetails.tests.reduce((acc, test) => {
    if (!acc[test.subject]) {
      acc[test.subject] = [];
    }
    acc[test.subject].push(test);
    return acc;
  }, {});

  // Function to handle taking the test
  const handleTakeTest = (mainTestId, selectedTestId) => {
    // Navigate to the test start page with the main test ID and selected test ID as query parameters
    navigate(`/start-test?mainTestId=${mainTestId}&selectedTestId=${selectedTestId}`);
  };

  const isTestPurchased = paidTests.includes(testDetails?._id);

  return (
    <div className="mx-auto conatainer p-6 lg:ml-9 mr-16">
      <div className="grid gap-6">
        <div className="space-y-8">
          {/* About the Test Section */}
          <section className="space-y-4">
            <h1 className="text-2xl font-bold tracking-tight">About the Test</h1>
            <p className="text-gray-500">{testDetails.description}</p>
            <div className="space-y-4 border-t pt-4">
              <div className="flex gap-2">
                <span className="font-medium">Type:</span>
                <span className="text-gray-500">{testDetails.examType}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium">Time:</span>
                <span className="text-gray-500">{testDetails.duration} min/per-test</span>
              </div>
            </div>
          </section>

          {/* Summary Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Summary of the {testDetails.title}</h2>
            <p className="text-gray-500">{testDetails.summary}</p>
          </section>
        </div>

        {/* Test Module Section */}
       {/* Test Module Section */}
<section className="">
  <div className="rounded-lg border bg-gray-100">
    <div className="flex justify-between items-center p-4">
      <h2 className="text-lg font-medium">Test Module</h2>
      <button
        className="text-blue-500 text-xl"
        onClick={toggleShowAllModules} // Toggle the visibility of all modules
      >
        {showAllModules ? "-" : "+"}
      </button>
    </div>
    <div className="w-full">
      {/* Render all test modules if showAllModules is true */}
      {showAllModules && (
  <div className="w-full">
    {/* Iterate over each subject */}
    {Object.keys(groupedBySubject).map((subject) => (
      <div key={subject}>
        <h2 className="text-xs font-bold mt-4 ml-4">{subject}</h2>

        {/* Iterate over tests for the current subject */}
        {groupedBySubject[subject].map((test, index) => (
          <div key={test._id} className="border-b">
            <div className="px-4 py-2">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <span className="text-gray-500 text-xs">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm">{test.testTitle}</span>
                </div>

                {/* Take Test Button */}
                {!user._id ? (
        <button className="bg-blue-500 text-white px-4 py-2 rounded text-xs">
          Login
        </button>
      ) : !isTestPurchased ? (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded text-xs"
          onClick={() => {
            // Handle purchase logic here
            console.log("Proceed to purchase the test");
          }}
        >
          Purchase
        </button>
      ) : (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded text-xs"
          onClick={() => handleTakeTest(testDetails._id, test._id)} // Pass both IDs
        >
          Take Test
        </button>
      )}
              </div>
            </div>

            {/* Accordion content for test modules */}
            <div className="px-4 pt-1 pb-3">
              {test.testModules.map((module, moduleIndex) => (
                <div key={moduleIndex} className="p-2 border rounded mt-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold">
                      Module {module.moduleNumber}:
                    </span>
                    <span className="font-semibold">{module.title}</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-600">
                    {module.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
)}

    </div>
  </div>
</section>

        {/* FAQ Section */}
        <section>
          <div className="rounded-lg border bg-gray-100">
            <h2 className="text-xl font-semibold p-4">FAQ'S</h2>
            <div className="w-full">
              {/* FAQ Item 1 */}
              <div className="border-b">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-200"
                  onClick={() => toggleFaqAccordion(0)}
                >
                  What Curriculums Do You Offer?
                </button>
                <div className={`px-4 pt-1 pb-3 ${openFaqIndex === 0 ? "block" : "hidden"}`}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua.
                </div>
              </div>

              {/* FAQ Item 2 */}
              <div className="border-b">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-200"
                  onClick={() => toggleFaqAccordion(1)}
                >
                  Lorem Ipsum Dolor Sit Amet, Consectetur, Lorem Ipsum Dolor Sit Amet?
                </button>
                <div className={`px-4 pt-1 pb-3 ${openFaqIndex === 1 ? "block" : "hidden"}`}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </div>
              </div>

              {/* FAQ Item 3 */}
              <div className="border-b">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-200"
                  onClick={() => toggleFaqAccordion(2)}
                >
                  Lorem Ipsum Dolor Sit Amet, Consectetur, Lorem Ipsum Dolor Sit Amet?
                </button>
                <div className={`px-4 pt-1 pb-3 ${openFaqIndex === 2 ? "block" : "hidden"}`}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
