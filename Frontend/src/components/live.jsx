export default function Live() {
  return (
    <section className="py-16 mt-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold">What we Offer?</h2>
        <h3 className="mt-4 text-2xl font-semibold text-primary">Live - Counselling and Mentorship</h3>
      </div>

      <div className="grid gap-8 mt-8 px-4 md:px-8 lg:px-16 xl:px-28 md:grid-cols-2 lg:grid-cols-3">
        <div className="shadow-lg bg-white rounded-lg overflow-hidden">
          <img
            src="/live.png"
            alt="School Students"
            className="w-full h-48 object-cover"
            width="300"
            height="200"
            style={{ aspectRatio: "300/200" }}
          />
          <div className="p-4">
            <h4 className="text-xl font-bold">Orient - School Students</h4>
            <p className="text-gray-500 mt-2">Holistic Personality Development & Academic Excellence</p>
            <div className="flex flex-col md:flex-row justify-between mt-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-2 md:mb-0 md:mr-2">Learn More</button>
              <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg">Get Started</button>
            </div>
          </div>
        </div>
        <div className="shadow-lg bg-white rounded-lg overflow-hidden">
          <img
            src="/live.png"
            alt="College Students"
            className="w-full h-48 object-cover"
            width="300"
            height="200"
            style={{ aspectRatio: "300/200" }}
          />
          <div className="p-4">
            <h4 className="text-xl font-bold">Emerge - College Students</h4>
            <p className="text-gray-500 mt-2">
              Explore career paths, enhance employability skills, and transition smoothly into the workforce.
            </p>
            <div className="flex flex-col md:flex-row justify-between mt-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-2 md:mb-0 md:mr-2">Learn More</button>
              <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg">Get Started</button>
            </div>
          </div>
        </div>
        <div className="shadow-lg bg-white rounded-lg overflow-hidden">
          <img
            src="/live.png"
            alt="Working Professionals"
            className="w-full h-48 object-cover"
            width="300"
            height="200"
            style={{ aspectRatio: "300/200" }}
          />
          <div className="p-4">
            <h4 className="text-xl font-bold">Elevate - Working Professionals</h4>
            <p className="text-gray-500 mt-2">Career Advancement, Leadership skills & achieve work-life balance.</p>
            <div className="flex flex-col md:flex-row justify-between mt-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-2 md:mb-0 md:mr-2">Learn More</button>
              <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg">Get Started</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
