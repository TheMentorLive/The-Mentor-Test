export default function Live() {
  return (
    <div className="items-center flex justify-center">
    <div className="items-center flex justify-center ml-2 mr-2">
      <section className="py-16 mt-20 md:ml-20">
        <div className="text-center">
          
          <h3 className="mt-4 text-2xl md:-ml-[649px] font-semibold text-black">
          Learn - Al - Enabled Courses and Resources
          </h3>
        </div>

        <div className="grid gap-4 mt-8 mx-4 md:mx-20 lg:mx-28 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Orient - School Students",
              description: "Holistic Personality Development & Academic Excellence",
              imgSrc: "/live.png",
            },
            {
              title: "Emerge - College Students",
              description:
                "Explore career paths, enhance employability skills, and transition smoothly into the workforce.",
              imgSrc: "/live.png",
            },
            {
              title: "Elevate - Working Professionals",
              description: "Career Advancement, Leadership skills & achieve work-life balance.",
              imgSrc: "/live.png",
            },
          ].map((item, index) => (
            <div key={index} className="max-w-md mx-auto border rounded-lg shadow-lg flex flex-col justify-between">
              <div className="flex flex-col items-center justify-center h-[250px] rounded-lg bg-blue-500">
                {/* <img
                  src={item.imgSrc}
                  alt={item.title}
                  className="w-full h-auto rounded-lg"
                  width="400"
                  height="240"
                  style={{ aspectRatio: "400/240", objectFit: "cover" }}
                /> */}
              </div>
              <div className="p-4">
                <h4 className="text-lg font-bold">{item.title}</h4>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
    </div>
  );
}
