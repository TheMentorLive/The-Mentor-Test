import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export default function Item() {
  return (
    <div>
      <Header/>
    <div className="flex flex-col ml-40 md:flex-row gap-8">
      <div className="w-full md:w-2/3">
        <h1 className="mt-2 text-2xl font-bold">UPSC - Union Public Service Commission</h1>
        <p className="mt-1">UPSC</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="bg-gray-200 px-2 py-1 rounded text-xs font-semibold text-gray-700">Bestseller</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Created by{" "}
          <a href="#" className="text-blue-500">
            Dr. Angela Yu
          </a>
          , Developer and Lead Instructor
        </p>
        <div className="mt-2 flex items-center text-sm text-muted-foreground">
          <GlobeIcon className="h-4 w-4" />
          <span className="ml-1">English, Arabic [Auto], 14 more</span>
        </div>
        <h2 className="mt-4 text-lg font-bold">Explore related topics</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="bg-gray-200 px-2 py-1 rounded text-xs font-semibold text-gray-700">Web Development</span>
          <span className="bg-gray-200 px-2 py-1 rounded text-xs font-semibold text-gray-700">Development</span>
        </div>
        <h2 className="mt-4 text-lg font-bold">What you'll learn</h2>
        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
          <li>Build 16 web development projects for your portfolio, ready to apply for junior developer jobs.</li>
          <li>Learn the latest technologies, including Javascript, React, Node and even Web3 development.</li>
          <li>After the course you will be able to build ANY website you want.</li>
          <li>Build fully-fledged websites and web apps for your startup or business.</li>
        </ul>
        <div className="mb-4 mt-10">
          <h2 className="text-2xl font-bold">Course content</h2>
          <p className="text-sm text-muted-foreground">44 sections • 373 lectures • 61h 44m total length</p>
          <a href="#" className="text-blue-600">
            Expand all sections
          </a>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-4 border rounded">
            <div>
              <h3 className="font-semibold">▼ Front-End Web Development</h3>
              <p className="text-sm text-muted-foreground">9 lectures • 37min</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-600">Learn more</a>
              <a href="#" className="text-blue-600">Take test</a>
            </div>
          </div>
          {[
            "Introduction to HTML",
            "Intermediate HTML",
            "Multi-Page Websites",
            "Introduction to CSS",
            "CSS Properties",
            "Intermediate CSS",
            "Advanced CSS",
            "Flexbox",
            "Grid",
          ].map((section) => (
            <div key={section} className="flex items-center justify-between p-4 border rounded">
              <h3>{section}</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-600">Learn more</a>
                <a href="#" className="text-blue-600">Take test</a>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button className="px-4 py-2 text-blue-600 border rounded">34 more sections</button>
        </div>
      </div>

      {/* Item Card */}
      <div className="w-full md:w-1/3 fixed top-20 md:top-10 md:right-10">
        <div className="p-4 border rounded shadow">
          <div className="bg-gray-200 h-48 flex items-center justify-center">
            <ImageIcon className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="mt-4 text-lg font-bold">Subscribe to Udemy's top courses</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Get this course, plus 12,000+ of our top-rated courses, with Personal Plan.{" "}
            <a href="#" className="text-blue-500">Learn more</a>
          </p>
          <button className="w-full mt-2 bg-blue-500 text-white px-4 py-2 rounded">Add to Cart</button>
          <p className="mt-2 text-sm text-muted-foreground">Starting at ₹850 per month</p>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
}

// ... Icons (CalendarIcon, GlobeIcon, ImageIcon, StarIcon) remain unchanged


  
  function CalendarIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
      </svg>
    )
  }
  
  function GlobeIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    )
  }
  
  function ImageIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </svg>
    )
  }
  
  function StarIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    )
  }
  