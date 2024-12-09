import { Link } from "react-router-dom";
import moment from "moment";

export default function TestCards() {
  const exams = [
    { _id: 1, title: "AWS Certified Developer", category: "AWS", image: "https://via.placeholder.com/40", updatedAt: "2023-10-01" },
   
  ];

  return (
    <section className="py-4 mt-8 mb-4 flex items-center justify-center md:ml-[140px] lg:ml-[75px] lg:mr-[100px]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-start items-start mb-6 gap-6">
          {/* Left Section */}
          <div className="flex flex-col w-full md:w-[300px] mt-12 lg:mt-7 md:mt-0">
            <h2 className="text-lg sm:text-xl font-bold">Company-Based Exams</h2>
            <p className="text-gray-600 text-xs sm:text-sm">Prepare for the top Company-Based exams in your field.</p>
            <button className="mt-5 w-full md:w-[180px] md:mt-7 px-2 py-1 md:px-3 md:py-2 bg-[#2563EB] text-white rounded-lg hover:bg-blue-600 focus:outline-none">
              View all Courses
            </button>
          </div>

          {/* Right Section - Cards */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full">
            {exams.map((exam) => (
              <div
                className="bg-white border border-gray-500 border-opacity-20 rounded-lg flex flex-col justify-between min-w-[180px] sm:w-[220px] flex-shrink-0"
                key={exam._id}
              >
                <div>
                  <div className="bg-[#2563EB] p-2 py-1 mb-3 border rounded-t-lg flex justify-between items-center">
                    <h3 className="text-md text-white font-bold">{exam.category}</h3>
                    <img
                      src={exam.image}
                      alt={exam.title}
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                  <div className="mb-1 p-3 h-24">
                    <p className="text-xs sm:text-sm">{exam.title}</p>
                    <p className="mt-4 text-sm text-gray-600">
                      Exam Created Date: {moment(exam.updatedAt).format("DD MMM YYYY")}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row space-x-2 p-3 mt-auto">
                  <Link to={`/Testdetails?id=${exam._id}`}>
                    <button className="border border-gray-300 text-gray-700 py-1 px-2 rounded-md lg:text-[12px] md:text-[12px] text-[9px]">
                      Learn More
                    </button>
                  </Link>
                  <Link to="/register">
                    <button className="bg-blue-600 text-white py-1 px-2 rounded-md lg:text-[12px] md:text-[12px] text-[9px]">
                      Start Exam
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
