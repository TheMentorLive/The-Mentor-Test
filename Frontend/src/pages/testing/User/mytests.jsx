import { Link } from "react-router-dom";
import moment from "moment";

export default function MyTests() {
  const exams = [
    { _id: 1, title: "AWS Certified Developer", category: "AWS", image: "https://via.placeholder.com/40", updatedAt: "2023-10-01" },
    { _id: 2, title: "React Developer Certification", category: "React", image: "https://via.placeholder.com/40", updatedAt: "2023-11-15" },
    { _id: 3, title: "JavaScript Fundamentals", category: "JavaScript", image: "https://via.placeholder.com/40", updatedAt: "2023-09-21" },
    { _id: 4, title: "Data Analysis with Python", category: "Data Analysis", image: "https://via.placeholder.com/40", updatedAt: "2023-12-01" },
  ];

  const neetExams = [
    { _id: 5, title: "NEET Physics Preparation", category: "Physics", image: "https://via.placeholder.com/40", updatedAt: "2023-08-20" },
    { _id: 6, title: "NEET Chemistry Crash Course", category: "Chemistry", image: "https://via.placeholder.com/40", updatedAt: "2023-07-15" },
    { _id: 7, title: "NEET Biology Essentials", category: "Biology", image: "https://via.placeholder.com/40", updatedAt: "2023-06-10" },
    { _id: 8, title: "NEET Mock Tests", category: "Mock Test", image: "https://via.placeholder.com/40", updatedAt: "2023-09-05" },
  ];

  return (
    <>
      {/* First Section */}
      <section className="py-4 mt-8 mb-4 flex flex-col items-center justify-center md:ml-[140px] lg:ml-[75px] lg:mr-[100px]">
        <div className="container mx-auto px-4">
          <h2 className="text-lg sm:text-xl font-bold mb-4">Completed Tests</h2>
          <div className="flex flex-row overflow-x-auto space-x-4 w-full">
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
      </section>

      {/* NEET Exams Section */}
      <section className="py-4 mt-8 mb-4 flex flex-col items-center justify-center md:ml-[140px] lg:ml-[75px] lg:mr-[100px]">
        <div className="container mx-auto px-4">
          <h2 className="text-lg sm:text-xl font-bold mb-4">Pending Tests</h2>
          <div className="flex flex-row overflow-x-auto space-x-4 w-full">
            {neetExams.map((exam) => (
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
      </section>
    </>
  );
}
