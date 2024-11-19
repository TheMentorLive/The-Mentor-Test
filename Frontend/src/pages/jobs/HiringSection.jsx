import React from 'react';

const HiringSection = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-16 py-12">
      {/* Top Companies Hiring Now */}
      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Top companies hiring now
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            {
              title: "MNCs",
              count: "2K+",
              logos: [
                "https://via.placeholder.com/50/0000FF/FFFFFF?text=TVS",
                "https://via.placeholder.com/50/FF5733/FFFFFF?text=Tricon",
                "https://via.placeholder.com/50/28A745/FFFFFF?text=dSPACE",
                "https://via.placeholder.com/50/FFC300/FFFFFF?text=P",
              ],
            },
            {
              title: "Internet",
              count: "215",
              logos: [
                "https://via.placeholder.com/50/E74C3C/FFFFFF?text=ACV",
                "https://via.placeholder.com/50/3498DB/FFFFFF?text=Medfin",
                "https://via.placeholder.com/50/F1C40F/FFFFFF?text=miRun",
              ],
            },
            {
              title: "Manufacturing",
              count: "848",
              logos: [
                "https://via.placeholder.com/50/2ECC71/FFFFFF?text=Lokesh",
                "https://via.placeholder.com/50/9B59B6/FFFFFF?text=Commander",
                "https://via.placeholder.com/50/34495E/FFFFFF?text=Yash",
              ],
            },
            {
              title: "Fortune 500",
              count: "113",
              logos: [
                "https://via.placeholder.com/50/1ABC9C/FFFFFF?text=Dell",
                "https://via.placeholder.com/50/E67E22/FFFFFF?text=Maersk",
              ],
            },
            {
              title: "Product",
              count: "1K+",
              logos: [
                "https://via.placeholder.com/50/BDC3C7/FFFFFF?text=Ipicanix",
                "https://via.placeholder.com/50/7F8C8D/FFFFFF?text=Amagi",
              ],
            },
          ].map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-4 w-72 flex flex-col items-center"
            >
              <h3 className="font-semibold text-lg text-gray-700">{category.title} &rarr;</h3>
              <p className="text-sm text-gray-500 mb-4">
                {category.count} are actively hiring
              </p>
              <div className="flex space-x-2">
                {category.logos.map((logo, idx) => (
                  <img
                    key={idx}
                    src={logo}
                    alt={`${category.title} logo ${idx + 1}`}
                    className="w-12 h-12 rounded-md bg-gray-200 object-contain"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Companies */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Featured companies actively hiring
        </h2>
        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          {["All", "IT Services", "BFSI"].map((filter, idx) => (
            <button
              key={idx}
              className={`px-4 py-2 text-sm rounded-lg ${
                idx === 0
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-300 text-gray-600"
              } hover:bg-blue-500 hover:text-white transition`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Company Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              logo: "https://via.placeholder.com/80x80?text=Empower",
              name: "Empower",
              rating: "3.7",
              reviews: "252",
              description: "We're a financial services company.",
            },
            {
              logo: "https://via.placeholder.com/80x80?text=Navi",
              name: "Navi Technologies",
              rating: "4.0",
              reviews: "1.2K",
              description:
                "Fastest growing financial services companies in India.",
            },
            {
              logo: "https://via.placeholder.com/80x80?text=SCB",
              name: "Standard Chartered",
              rating: "3.8",
              reviews: "4.2K",
              description: "Expand your horizons.",
            },
            {
              logo: "https://via.placeholder.com/80x80?text=JPM",
              name: "JPMorgan Chase Bank",
              rating: "4.1",
              reviews: "5.6K",
              description: "Leader in financial services.",
            },
            {
              logo: "https://via.placeholder.com/80x80?text=FIS",
              name: "FIS",
              rating: "3.9",
              reviews: "3.5K",
              description: "FIS is hiring for C++ and Murex roles.",
            },
          ].map((company, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="w-16 h-16 mb-4 rounded-full object-contain"
              />
              <h3 className="font-semibold text-lg text-gray-700 mb-1">
                {company.name}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                ⭐ {company.rating} | {company.reviews} reviews
              </p>
              <p className="text-sm text-gray-600 mb-4">{company.description}</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                View jobs
              </button>
            </div>
          ))}
        </div>

        {/* View All Companies */}
        <div className="flex justify-center mt-8">
          <button className="px-6 py-2 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition">
            View all companies
          </button>
        </div>
      </section>
    </div>
  );
};

export default HiringSection;
