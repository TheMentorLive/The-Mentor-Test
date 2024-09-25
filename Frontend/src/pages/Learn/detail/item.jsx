import { useEffect, useRef, useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import CompanyExams from "../CBexams";

export default function Item() {
  const cardRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  const handleScroll = () => {
    if (cardRef.current) {
      const buttonPosition = cardRef.current.getBoundingClientRect().bottom;
      const screenHeight = window.innerHeight;
      setIsSticky(buttonPosition < screenHeight ? false : true);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <Header />
      <div className="flex flex-col md:flex-row gap-4 px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="w-full mt-20 md:w-2/3 md:pr-8 lg:pr-10">
          <div className="ml-4 md:ml-8 lg:ml-20">
            <h1 className="mt-2 text-2xl font-bold">UPSC - Union Public Service Commission</h1>
            <p className="mt-1">UPSC</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="bg-gray-200 px-2 py-1 rounded text-xs font-semibold text-gray-700">
                Bestseller
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Created by{" "}
              <a href="#" className="text-blue-500">User</a>, Developer and Lead Instructor
            </p>
            <div className="mt-2 flex items-center text-sm text-muted-foreground">
              <div className="h-4 w-4 bg-black" />
              <span className="ml-1">English</span>
            </div>

            <h2 className="mt-4 text-lg font-bold">Explore related topics</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="bg-gray-200 px-2 py-1 rounded text-xs font-semibold text-gray-700">Web Development</span>
              <span className="bg-gray-200 px-2 py-1 rounded text-xs font-semibold text-gray-700">Development</span>
            </div>

            <h2 className="mt-4 text-lg font-bold">What you'll learn</h2>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Build 16 web development projects for your portfolio, ready to apply for junior developer jobs.</li>
              <li>Learn the latest technologies, including Javascript, React, Node, and even Web3 development.</li>
              <li>After the course you will be able to build ANY website you want.</li>
              <li>Build fully-fledged websites and web apps for your startup or business.</li>
            </ul>
          </div>

          <div className="mb-4 mt-10 ml-4 md:ml-8 lg:ml-20">
            <h2 className="text-2xl font-bold">Course content</h2>
            <p className="text-sm text-muted-foreground">44 sections • 373 lectures • 61h 44m total length</p>
          </div>

          <div className="space-y-2 ml-4 md:ml-8 lg:ml-20 w-full lg:w-[800px]">
            {[
              { title: "Front-End Web Development", duration: "10 hours", modules: "5 modules" },
              { title: "Introduction to HTML", duration: "5 hours", modules: "3 modules" },
              { title: "Intermediate HTML", duration: "7 hours", modules: "4 modules" },
              { title: "Multi-Page Websites", duration: "8 hours", modules: "2 modules" },
              { title: "Introduction to CSS", duration: "6 hours", modules: "3 modules" },
              { title: "CSS Properties", duration: "4 hours", modules: "2 modules" },
              { title: "Intermediate CSS", duration: "9 hours", modules: "3 modules" },
              { title: "Advanced CSS", duration: "10 hours", modules: "5 modules" },
              { title: "Flexbox", duration: "3 hours", modules: "1 module" },
              { title: "Grid", duration: "4 hours", modules: "2 modules" },
            ].map(({ title, duration, modules }) => (
              <div key={title}>
                <div className="flex items-center justify-between p-4 border rounded">
                  <div className="flex items-center cursor-pointer" onClick={() => toggleSection(title)}>
                    <span className={`mr-2 transition-transform duration-300 ${expandedSections[title] ? "rotate-90" : ""}`}>
                      ➔ {/* Arrow icon */}
                    </span>
                    <h3>{title}</h3>
                  </div>
                  <div className="flex space-x-4">
                    <a href="#" className="text-blue-600">Learn more</a>
                    <a href="#" className="text-blue-600">Take test</a>
                  </div>
                </div>
                <div
                  className={`ml-4 mt-2 transition-all duration-300 ease-in-out overflow-hidden ${
                    expandedSections[title] ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <div className="text-sm text-muted-foreground">
                    <p><strong>Duration:</strong> {duration}</p>
                    <p><strong>Modules:</strong> {modules}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-4" ref={cardRef}>
            <button className="px-4 py-2 text-blue-600 border rounded">
              34 more sections
            </button>
          </div>
        </div>

        {/* Fixed Item Card */}
        <div className={`w-full mt-10 md:w-1/3 ${isSticky ? "fixed top-10 right-10" : "relative"}`}>
          <div className="p-4 border rounded shadow">
            <div className="bg-gray-200 h-48 flex items-center justify-center">
              <div className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-bold">UPSC - Union Public Service Commission</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Get this course, plus 12,000+ of our top-rated courses, with Personal Plan.{" "}
              <a href="#" className="text-blue-500">Learn more</a>
            </p>
            <button className="w-full mt-2 bg-blue-500 text-white px-4 py-2 rounded">Add to Cart</button>
            <p className="mt-2 text-sm text-muted-foreground">EMI Starting at ₹850 per month</p>
          </div>
        </div>
      </div>

      <CompanyExams />
      <Footer />
    </div>
  );
}
