export default function Live() {
  return (
    <div className="items-center flex justify-center ml-20 mr-8">
    <section className="py-16 mt-20 md:ml-20 ">
      <div className="text-center">
        <h2 className="text-3xl font-bold">What we Offer?</h2>
        <br />
        <br />
        <h3 className="mt-4 text-2xl md:-ml-[629px] font-semibold text-black">Live - Counselling and Mentorship</h3>
      </div>

      <div className="grid gap-8 mt-8 mx-4 md:mx-20 lg:mx-28 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Orient - School Students",
            description: "Holistic Personality Development & Academic Excellence",
            imgSrc: "/live.png",
          },
          {
            title: "Emerge - College Students",
            description: "Explore career paths, enhance employability skills, and transition smoothly into the workforce.",
            imgSrc: "/live.png",
          },
          {
            title: "Elevate - Working Professionals",
            description: "Career Advancement, Leadership skills & achieve work-life balance.",
            imgSrc: "/live.png",
          },
        ].map((item, index) => (
          <div key={index} className="flex lg:items-center lg:flex lg:justify-center flex-col shadow-lg bg-white rounded-lg overflow-hidden">
            <img
              src={item.imgSrc}
              alt={item.title}
              className="w-full h-48 object-cover"
              width="300"
              height="200"
            />
            <div className="flex flex-col flex-grow p-4">
              <h4 className="text-[16px] font-bold">{item.title}</h4> {/* Reduced font size */}
              <p className="text-[12px] text-gray-500 mt-2 flex-grow">{item.description}</p> {/* Reduced font size */}
              <div className="flex flex-row justify-between mt-6">
                <button className="px-2 text-sm py-2 bg-blue-500 text-white rounded-lg">Learn More</button>
                <button className="px-2 text-sm py-2 border border-blue-500 text-blue-500 rounded-lg">Get Started</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
}
