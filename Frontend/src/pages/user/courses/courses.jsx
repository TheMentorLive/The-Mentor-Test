export default function Course() {
    return (
      <div className="p-5">
      <section className="flex flex-col md:flex-row p-4 bg-gray-100 w-full md:w-[850px] rounded-2xl">
        {/* Image Section */}
        <div className="w-full md:w-1/3">
          <img
            src="/placeholder.svg"
            alt="Laptop"
            className="rounded-lg w-full h-auto"
            style={{ aspectRatio: "1", objectFit: "cover" }}
          />
        </div>
  
        {/* Content Section */}
        <div className="w-full md:w-2/3 pl-0 md:pl-6 mt-4 md:mt-0">
          {/* Header */}
          <div className="flex justify-between text-xs md:text-sm text-gray-500">
            <span>Data Analyst</span>
            <span>Expiry Date: Aug 2025</span>
          </div>
  
          {/* Title */}
          <h2 className="mt-2 text-lg md:text-2xl font-bold">7 Skills of Highly Effective For Data Analyst</h2>
  
          {/* Description */}
          <p className="mt-2 text-gray-500">
            Our team was inspired by the seven skills of highly effective programmers created by the TechLead.
          </p>
  
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="bg-gray-400 rounded-lg text-xs md:text-sm px-2 py-1">Fundamentals of Web Development</span>
            <span className="bg-gray-400 rounded-lg text-xs md:text-sm px-2 py-1">Data Structure & Algorithms</span>
            <span className="bg-gray-400 rounded-lg text-xs md:text-sm px-2 py-1">Web Development</span>
            <span className="bg-gray-400 rounded-lg text-xs md:text-sm px-2 py-1">AI Tools for Developers</span>
            <span className="bg-gray-400 rounded-lg text-xs md:text-sm px-2 py-1">Interview Preparation</span>
          </div>
  
          {/* Footer */}
          <div className="flex items-center mt-4">
            {/* Avatar */}
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden bg-gray-200">
              <img
                src="/placeholder-user.jpg"
                alt="Glen Williams"
                className="object-cover w-full h-full"
              />
            </div>
            
            {/* Name and Link */}
            <a href="#" className="ml-2 text-blue-600 text-sm">Glen Williams</a>
            <a href="#" className="ml-auto text-blue-600 text-sm">Read more →</a>
          </div>
        </div>
      </section>
      </div>
    );
  }
  