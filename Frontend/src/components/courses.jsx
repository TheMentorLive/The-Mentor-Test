export default function Learn() {
  
  return (
    <div className="items-center flex justify-center">
      <div className="items-center flex justify-center ml-2 mr-2">
        <section className=" mt-7 mb-10 md:ml-20">
          <div className="text-center  mr-2">
            <h3 className="md:mt-4 md:ml-96 text-[25px] font-semibold text-black lg:text-left lg:ml-32">
              Learn - AI - Enabled Courses and Resources
            </h3>
          </div>

          <div className="grid gap-4 mt-8 mx-4 md:mx-20 lg:mx-28 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Courses",
                description:
                  "Mentorship for 8-12 Students. Enhance employability skills, and transition smoothly into the workforce.",
                imgSrc: "/live.png",
              },
              {
                title: "Courses",
                description:
                  "Mentorship for 8-12 Students. Enhance employability skills, and transition smoothly into the workforce.",
                imgSrc: "/live.png",
              },
              {
                title: "Courses",
                description:
                  "Mentorship for 8-12 Students. Enhance employability skills, and transition smoothly into the workforce.",
                imgSrc: "/live.png",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="max-w-md mx-auto border rounded-lg shadow-lg flex flex-col justify-between"
              >
                <div className="flex flex-col items-center justify-center h-[250px] rounded-lg bg-[#2563EB]"></div>
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
