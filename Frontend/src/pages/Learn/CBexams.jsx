import { Link } from "react-router-dom";

export default function CompanyExams() {
  return (
    <section className="py-8 mt-16 mb-7 ml-40 mr-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Company-based Tests</h2>
            <p className="text-gray-600">Prepare for the top company-based tests in your field.</p>
          </div>
          <a href="#" className="text-blue-600">
            View All
          </a>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Amazon SDE", description: "Prepare for the Amazon Software Development Engineer recruitment test." },
            { title: "Google APAC", description: "Prepare for the Google Asia Pacific recruitment test." },
            { title: "Microsoft SWE", description: "Prepare for the Microsoft Software Engineer recruitment test." },
            { title: "Flipkart SDE", description: "Prepare for the Flipkart Software Development Engineer recruitment test." }
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
