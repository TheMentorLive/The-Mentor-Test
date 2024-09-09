export default function Live() {
  return (
    <div className="items-center flex justify-center">
    <div className="items-center flex justify-center ml-2 mr-2">
      <section className="py-16 mt-20 md:ml-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold">What we Offer?</h2>
          <br />
          <br />
          <h3 className="mt-4 text-2xl md:-ml-[769px] font-semibold text-black">
            Live - Counselling and Mentorship
          </h3>
        </div>

        <div className="grid gap-4 mt-8 mx-4 md:mx-20 lg:mx-28 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Orient - School Students",
              description: "Holistic Personality Development & Academic Excellence",
              imgSrc: "/Orient.png",
            },
            {
              title: "Emerge - College Students",
              description:
                "Explore career paths, enhance employability skills, and transition smoothly into the workforce.",
              imgSrc: "/Emerge.png",
            },
            {
              title: "Elevate - Working Professionals",
              description: "Career Advancement, Leadership skills & achieve work-life balance.",
              imgSrc: "/Elevate.png",
            },
          ].map((item, index) => (
            <div key={index} className="max-w-md mx-auto border rounded-lg shadow-lg flex flex-col justify-between">
              <div className="p-4 flex-grow">
                <div className="mb-4">
                  <img
                    src={item.imgSrc}
                    alt={item.title}
                    className="w-full h-auto rounded-lg "
                    width="400"
                    height="240"
                    style={{ aspectRatio: "400/240", objectFit: "cover" }}
                  />
                </div>
                <div className="mb-4">
                  <h4 className="text-lg font-bold">{item.title}</h4>
                  <p className="text-gray-500 mt-2 text-sm">{item.description}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between gap-4">
                  <button className="px-4 py-2 bg-[#2563EB] font-bold text-white text-xs rounded-lg hover:bg-blue-600">
                  Get Started
                  </button>
                  <button className="px-4 py-2 border border-gray-300 font-bold text-xs text-gray-700 rounded-lg hover:bg-gray-100">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
    </div>
  );
}
