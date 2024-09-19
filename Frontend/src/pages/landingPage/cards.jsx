export default function Cards() {
  const cardData = [
    { name: "Live", org: "Counselling & Mentorship", image: "/cards/Live1.png" },
    { name: "Learn", org: "UpSkilling Courses", image: "/cards/Learn1.png" },
    { name: "Jobs", org: "Remote, Hybrid & Onsite", image: "/cards/Jobs1.png" },
    { name: "Community", org: "Connect & Grow", image: "/cards/Community1.png" },
  ];

  return (
    <div className="flex items-center justify-center">
    <section className="container   px-4 py-10 sm:px-10 sm:py-20 lg:px-40 lg:py-40 md:-mt-10 lg:-mt-10 md:-mb-28 lg:-mb-28">
      <div className="text-center mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-left font-bold">
          The All in One <span className="text-blue-600">Edtech Platform</span>
          <br />
          you've been Looking for
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section */}
        <div className="flex flex-col items-center lg:items-start lg:w-[480px]">
          <div className="bg-gray-100 w-full h-64 flex items-center justify-center mb-4">
            <img
              src="/mtp1.png"
              alt="Mentor Training Program"
              className="border  h-64 rounded-lg"
              
              
            />
          </div>
          <h2 className="text-xl font-bold">Mentor Training Program</h2>
          <p className="text-gray-700 mb-4">
            One course to unlock essential skills in law, tech, marketing & finance for career success.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Learn More</button>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 mt-2">
          <p className="text-gray-700 mb-8 opacity-85">
            Explore our all-in-one EdTech platform offering live mentorship, upskilling courses, job opportunities, and
            a thriving community. Whether you're seeking career guidance, learning new skills, or finding your next job,
            we've got it covered.
          </p>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {cardData.map((app, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-2 border rounded-lg bg-white border-gray-300"
              >
                <div className="border px-8 py-5 rounded-lg bg-blue-100 border-gray-300">
                  <img
                    src={app.image}
                    alt={app.name}
                    width="70"
                    height="70"
                    className="rounded-lg"
                    style={{ aspectRatio: "1/1", objectFit: "cover" }}
                  />
                </div>
                <div className="text-left mt-2 w-full">
                  <p className="text-md font-semibold">{app.name}</p>
                  {app.badge && (
                    <span className="text-sm px-2 py-1 bg-gray-200 text-gray-700 rounded-md mb-1">
                      {app.badge}
                    </span>
                  )}
                  <p className="text-gray-500 text-[12px]">{app.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
