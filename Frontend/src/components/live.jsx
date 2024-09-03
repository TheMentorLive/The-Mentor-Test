export default function Live() {
    return (
      <section className="py-16 mt-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary">What we Offer ?</h2>
      <br/>
      <br/>

          <h3 className="mt-4 text-2xl -ml-[900px] font-semibold text-Black">Live - Counselling and Mentorship </h3>
        </div>
        <br/>
        <br/>
        <div className="grid gap-8 mt-8 md:grid-cols-3 mr-28 ml-28">
          <div className="shadow-lg bg-white rounded-lg overflow-hidden">
            <img
              src="/live.png"
              alt="School Students"
              className="w-full h-48 object-cover"
              width="300"
              height="200"
              style={{ aspectRatio: "300/200", objectFit: "cover" }}
            />
            <div className="p-4">
              <h4 className="text-xl font-bold">Orient - School Students</h4>
              <p className="text-gray-500">Holistic Personality Development & Academic Excellence</p>
              <div className="flex justify-between mt-20">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Learn More</button>
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
              style={{ aspectRatio: "300/200", objectFit: "cover" }}
            />
            <div className="p-4">
              <h4 className="text-xl font-bold">Emerge - College Students</h4>
              <p className="text-gray-500">
                Explore career paths, enhance employability skills, and transition smoothly into the workforce.
              </p>
              <div className="flex justify-between mt-14">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Learn More</button>
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
              style={{ aspectRatio: "300/200", objectFit: "cover" }}
            />
            <div className="p-4">
              <h4 className="text-xl font-bold">Elevate - Working Professionals</h4>
              <p className="text-gray-500">Career Advancement, Leadership skills & achieve work-life balance.</p>
              <div className="flex justify-between mt-20">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Learn More</button>
                <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg">Get Started</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  