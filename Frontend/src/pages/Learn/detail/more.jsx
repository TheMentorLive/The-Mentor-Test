import { Link } from "react-router-dom";

export default function More() {
  return (
    <div className="flex min-h-screen ml-[90px] mr-[570px] flex-col bg-background">
      <main className="container mx-auto my-8 flex-1 space-y-8 px-4 sm:px-6 md:px-8">
        <section>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Competitive Exams</h2>
              <p className="text-muted-foreground">Prepare for the top competitive exams in your field.</p>
            </div>
            <a href="#" className="text-primary">View All</a>
          </div>
          <div className="overflow-x-auto flex space-x-4 mt-5 md:space-x-6 lg:space-x-8 w-full">
          {[
              {
                title: "Amazon SDE",
                description: "Prepare for the Amazon Software Development Engineer recruitment test.",
                logo: "/Amzon.png",
              },
              {
                title: "Google APAC",
                description: "Prepare for the Google Asia Pacific recruitment test.",
                logo: "/Amzon.png",
              },
              {
                title: "Microsoft SWE",
                description: "Prepare for the Microsoft Software Engineer recruitment test.",
                logo: "/Amzon.png",
              },
              
            ].map((exam) => (
              <div
                className="bg-white border border-gray-500 border-opacity-20 rounded-lg flex flex-col justify-between min-w-[180px] w-[180px] sm:w-[220px] flex-shrink-0"
                key={exam.title}
              >
                <div>
                  <div className="bg-[#2563EB] p-2 py-1 mb-3 border rounded-t-lg flex justify-between items-center">
                    <h3 className="text-md text-white font-bold">{exam.title}</h3>
                    <img
                      src={exam.logo}
                      alt={`${exam.title} Logo`}
                      width={25}
                      height={25}
                      className="rounded-full"
                    />
                  </div>
                  <div className="mb-1 p-3 h-24">
                    <p className="text-xs sm:text-sm">{exam.description}</p>
                  </div>
                </div>
                <div className="flex flex-row space-x-2 p-3 mt-auto">
                  <Link to="/details">
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
        </section>
      </main>
    </div>
  );
}
