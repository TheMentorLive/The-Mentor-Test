import { Link } from "react-router-dom";

export default function Cexams() {
  return (
    <section className="py-4 mt-8 mb-4 mx-4 sm:mx-8 md:mx-16 lg:mx-40">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">Competitive Exams</h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Prepare for the top competitive exams in your field.
            </p>
          </div>
          <a href="#" className="text-blue-600 text-sm sm:text-base">
            View All
          </a>
        </div>
        <div className="overflow-x-auto">
          <div className="flex space-x-4 md:space-x-6 lg:space-x-8">
            {["UPSC CSE", "GATE", "CAT", "NEET"].map((exam) => (
              <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between min-w-[200px]" key={exam}>
                <div>
                  <div className="mb-4">
                    <h3 className="text-lg font-bold">{exam}</h3>
                  </div>
                  <div className="mb-4 h-24">
                    <p className="text-sm sm:text-base">
                      {exam === "UPSC CSE" && "Prepare for the Union Public Service Commission Civil Services Examination."}
                      {exam === "GATE" && "Prepare for the Graduate Aptitude Test in Engineering."}
                      {exam === "CAT" && "Prepare for the Common Admission Test for MBA admissions."}
                      {exam === "NEET" && "Prepare for the National Eligibility cum Entrance Test for medical admissions."}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row space-x-2 mt-auto">
                  <Link to="/details">
                    <button className="border border-gray-300 text-gray-700 text-sm py-2 px-4 rounded-md">
                      Learn More
                    </button>
                  </Link>
                  <Link to="/register">
                    <button className="bg-blue-600 text-white text-sm py-2 px-4 rounded-md">
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
