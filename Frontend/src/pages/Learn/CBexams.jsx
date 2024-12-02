import { Link } from "react-router-dom";
import moment from "moment";

export default function CompanyExams({ exams }) {
  return (
    <section className="py-4 mt-8 mb-4 flex items-center justify-center md:ml-[140px] lg:ml-[75px] lg:mr-[100px]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-start items-start mb-6 gap-24">
          {/* Left Section (Title and Subtitle) */}
          <div className="flex flex-col w-full md:w-[300px] mt-12 lg:mt-7 md:mt-0">
            <h2 className="text-lg sm:text-xl font-bold">Company-Based Exams</h2>
            <p className="text-gray-600 text-xs sm:text-sm">
              Prepare for the top competitive exams in your field.
            </p>
            <button className="mt-5 w-full md:w-[180px] md:mt-7 px-2 py-1 md:px-3 md:py-2 bg-[#2563EB] text-white rounded-lg hover:bg-blue-600 focus:outline-none">
              View all Courses
            </button>
          </div>

          {/* Right Section (Cards or Message) */}
          <div className="overflow-x-auto flex space-x-4 md:space-x-6 lg:space-x-9 w-full">
            {exams.length === 0 ? (
              <div className="bg-white border border-gray-500 border-opacity-20 rounded-lg flex justify-center items-center w-full min-h-[200px]">
                <p className="text-sm text-gray-600">There are no tests available for this category.</p>
              </div>
            ) : (
              exams.map((exam) => (
                <div
                  className="bg-white border border-gray-500 border-opacity-20 rounded-lg flex flex-col justify-between min-w-[180px] w-[180px] sm:w-[220px] flex-shrink-0"
                  key={exam.title} // Use unique exam title as key
                >
                  <div>
                    <div className="bg-[#2563EB] p-2 py-1 mb-3 border rounded-t-lg flex justify-between items-center">
                      <h3 className="text-md text-white font-bold">{exam.category}</h3>
                      <img
                        src={exam.image || "https://via.placeholder.com/40"}
                        alt="Exam"
                        className="h-10 w-10 rounded-full"
                      />
                    </div>
                    <div className="mb-1 p-3 h-24">
                      <p className="text-xs sm:text-sm">{exam.title}</p>
                      <p className="mt-4 text-sm text-gray-600">
                        Exam Created Date: {exam.updatedAt
                          ? moment(exam.updatedAt).format("DD MMM YYYY")
                          : "TBA"}
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
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
