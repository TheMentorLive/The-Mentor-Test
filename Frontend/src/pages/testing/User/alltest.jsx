
import { Link } from "react-router-dom";
import moment from "moment";
import { useContext } from "react";
import { mainContext } from "/src/context/mainContex";
import useDashboardData from "/src/hooks/useDashboard";

export default function TestCards() {
  const { token } = useContext(mainContext);
  const {
    allTests,
    testsByCategory,
    testsByExamType,
    isLoading,
    error,
  } = useDashboardData(token);

  console.log(allTests);
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  const renderCards = (tests) => {
    return tests.map((test) => (
      <div
        className="bg-white border border-gray-500 border-opacity-20 rounded-lg flex flex-col justify-between min-w-[180px] sm:w-[220px] flex-shrink-0"
        key={test._id}
      >
        <div>
          <div className="bg-[#2563EB] p-2 py-1 mb-3 border rounded-t-lg flex justify-between items-center">
            <h3 className="text-md text-white font-bold">{test.category}</h3>
            <img
              src="https://img.freepik.com/premium-vector/test-icon-illustration_430232-32.jpg"// Placeholder for image
              alt={test.title}
              className="h-10 w-10 rounded-full"
            />
          </div>
          <div className="mb-1 p-3 h-24">
            <p className="text-xs sm:text-sm">{test.title}</p>
            <p className="mt-4 text-sm text-gray-600">
              Exam Created Date: {moment(test.updatedAt).format("DD MMM YYYY")}
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center p-3 bg-gray-100 rounded-b-lg">
          <Link
            to={`/Testdetails?id=${test._id}`}
            className="text-sm font-medium text-[#2563EB]"
          >
            View Details
          </Link>
          <span className="text-sm text-gray-700 font-semibold">
            ₹{test.price}
          </span>
        </div>
      </div>
    ));
  };

  return (
    <section className="py-4 mt-8 mb-4 flex flex-col items-center justify-center md:ml-[140px] lg:ml-[75px] lg:mr-[100px]">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-4">All Paid Tests</h2>
      <div className="flex gap-4 overflow-x-auto">{renderCards(allTests)}</div>


      {Object.entries(testsByExamType).map(([examType, tests]) => (
        <div key={examType} className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">{examType} Exams</h2>
          <div className="flex gap-4 overflow-x-auto">{renderCards(tests)}</div>
        </div>
      ))}
    </div>
    
       </section>
  );
}
