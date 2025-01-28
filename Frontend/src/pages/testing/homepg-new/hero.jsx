import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-b">
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 lg:pt-24 pt-14 lg:pl-4 pl-14 pb-14 font-san">
        <div className="flex flex-wrap md:flex-nowrap items-center">
          <div className="max-w-3xl lg:mt-28">
            <p className="text-sm font-medium text-from-black-50 to-white-600 mb-4">
              ONE STOP SOLUTION FOR ALL EDTECH NEEDS
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-4xl tracking-tight mb-4 ">
              From <span className="text-black-600 font-bold">Learning</span> to{" "}
              <span className="text-black-600 font-bold">Earning – </span>
              <br />
            </h1>
            <h1 className="text-4xl md:text-5xl lg:text-4xl tracking-tight mb-4 ">
              GenAi Learning Has You Covered
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Explore courses, sharpen your skills with tests, and
              <br /> apply for jobs—all on{" "}
              <span className="text-black-600  ">
                <b>Gen AI Learning</b>
              </span>{" "}
              designed to
              <br /> make you job-ready.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg text-lg font-medium hover:bg-blue-50">
                Start Hiring
              </button>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-medium flex items-center hover:bg-blue-700">
                Start Learning
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="-mt-20 ml-[80px] hidden md:block">
            <img
              src="./leaderboard/Hero.png"
              alt="Hero Section"
              className="w-full rounded-lg z-10"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
