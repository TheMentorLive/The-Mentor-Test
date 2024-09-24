import { Link } from "react-router-dom";


export default function Cexams() {
  return (
    <section className="py-8 mt-16 mb-7 ml-40 mr-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Competitive Exams</h2>
            <p className="text-gray-600">Prepare for the top competitive exams in your field.</p>
          </div>
          <a href="#" className="text-blue-600">
            View All
          </a>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {["UPSC CSE", "GATE", "CAT", "NEET"].map((exam) => (
            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between" key={exam}>
              <div>
                <div className="mb-4">
                  <h3 className="text-lg font-bold">{exam}</h3>
                </div>
                <div className="mb-4 h-24"> {/* Set a fixed height for the description */}
                  <p>
                    {exam === "UPSC CSE" && "Prepare for the Union Public Service Commission Civil Services Examination."}
                    {exam === "GATE" && "Prepare for the Graduate Aptitude Test in Engineering."}
                    {exam === "CAT" && "Prepare for the Common Admission Test for MBA admissions."}
                    {exam === "NEET" && "Prepare for the National Eligibility cum Entrance Test for medical admissions."}
                  </p>
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
