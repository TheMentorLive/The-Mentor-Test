export default function AwardsSection() {
    const awards = [
      { id: 1, title: "Lorem" },
      { id: 2, title: "Lorem ipsum" },
      { id: 3, title: "Lorem" },
      { id: 4, title: "Lorem" },
      { id: 5, title: "Lorem" },
      { id: 6, title: "Lorem" },
    ];
  
    return (
      <section className="py-16 ml-28 mr-28 ">
        <div className="container mb-28">
          <h2 className="text-4xl font-bold text-center mb-12">Our Awards</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {awards.map((award) => (
              <div key={award.id} className="flex flex-col items-center">
                {/* Placeholder for award icon */}
                <div className="w-24 h-24 rounded-full bg-blue-200 mb-4"></div>
                {/* Award title */}
                <p className="text-center text-sm">{award.title}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-blue-600 text-white rounded-lg p-20 text-center">
          <h3 className="text-2xl md:text-5xl font-bold mb-6">
            Lorem ipsum dolor sit amet,<br/> consectetur adipiscing elit
          </h3>
          <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition">
            Get Started
          </button>
        </div>
      </section>
    );
  }
  