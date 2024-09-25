import { Link } from "react-router-dom";

export default function Aexams() {
  return (
    <section className="py-4 mt-8 mb-4 mx-4 sm:mx-8 md:mx-16 lg:mx-40">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">Academic Exams</h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Prepare for the top academic exams in your field.
            </p>
          </div>
          <a href="#" className="text-blue-600 text-sm sm:text-base">
            View All
          </a>
        </div>
        <div className="overflow-x-auto">
          <div className="flex space-x-4 md:space-x-6 lg:space-x-8">
            {[
              { title: "CBSE Board Exams", description: "Prepare for the Central Board of Secondary Education exams." },
              { title: "ICSE Board Exams", description: "Prepare for the Indian Certificate of Secondary Education exams." },
              { title: "JEE Main", description: "Prepare for the Joint Entrance Examination (Main) for engineering admissions." },
              { title: "NATA", description: "Prepare for the National Aptitude Test in Architecture." }
            ].map((exam) => (
              <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between min-w-[200px]" key={exam.title}>
                <div>
                  <div className="mb-4">
                    <h3 className="text-lg font-bold">{exam.title}</h3>
                  </div>
                  <div className="mb-4 h-24">
                    <p className="text-sm sm:text-base">{exam.description}</p>
                  </div>
                </div>
                {/* Change flex-col to flex-row to align buttons horizontally */}
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
