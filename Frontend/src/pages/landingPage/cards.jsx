export default function Cards() {
    const cardData = [
      { name: "Live", org: "Counselling & Mentorship", image: "/cards/Live.png" },
      { name: "Learn", org: "UpSkilling Courses", image: "/cards/Learn.png" },
      { name: "Jobs", org: "Remote, Hybrid & Onsite", image: "/cards/Jobs.png" },
      { name: "Community", org: "Connect & Grow", image: "/cards/Community.png" },
    ];
  
    return (
      <div className=" flex justify-center mt-16 items-center">
        <div className="p-4 grid grid-cols-1 gap-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {cardData.map((app, index) => (
            <div key={index} className="flex flex-col  items-center p-1 border rounded-lg border-gray-300">
                <div className="border px-5 rounded-lg border-gray-300">
              <img
                src={app.image}
                alt={app.name}
                className=""
                width="100"
                height="100"
                style={{ aspectRatio: "40/40", objectFit: "cover" }}
              />
              </div>
              <div className="text-left mt-2 ">
                <p className="text-sm ">{app.name}</p>
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
    );
  }
  