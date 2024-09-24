import { Link } from "react-router-dom";


export default function Aexams() {
  return (
    <section className="py-8 mt-16 mb-7 ml-40 mr-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Academic Exams</h2>
            <p className="text-gray-600">Prepare for the top academic exams in your field.</p>
          </div>
          <a href="#" className="text-blue-600">
            View All
          </a>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "CBSE Board Exams", description: "Prepare for the Central Board of Secondary Education exams." },
            { title: "ICSE Board Exams", description: "Prepare for the Indian Certificate of Secondary Education exams." },
            { title: "JEE Main", description: "Prepare for the Joint Entrance Examination (Main) for engineering admissions." },
            { title: "NATA", description: "Prepare for the National Aptitude Test in Architecture." }
          ].map((exam) => (
            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between" key={exam.title}>
              <div>
                <div className="mb-4">
                  <h3 className="text-lg font-bold">{exam.title}</h3>
                </div>
                <div className="mb-4 h-24">
                  <p>{exam.description}</p>
                </div>
              </div>
              <div className="flex space-x-2 mt-auto">
                <Link to="/details">
                  <button className="border border-gray-300 text-gray-700 text-sm py-2 px-4 rounded-md">Learn More</button>
                </Link>
                <Link to="/register">
                  <button className="bg-blue-600 text-white text-sm py-2 px-4 rounded-md">Start Exam</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
