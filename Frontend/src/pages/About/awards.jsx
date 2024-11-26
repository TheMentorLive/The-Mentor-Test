export default function AwardsSection() {
  const awards = [
    { id: 1, title: "Lorem", image: "./awards/postman.png" },
    { id: 2, title: "Lorem ipsum", image: "./awards/postman.png" },
    { id: 3, title: "Lorem", image: "./awards/postman.png" },
    { id: 4, title: "Lorem", image: "./awards/postman.png" },
    { id: 5, title: "Lorem", image: "./awards/postman.png" },
    { id: 6, title: "Lorem", image: "./awards/postman.png" },
  ];

  return (
    <section className="py-16 lg:ml-28 lg:mr-28">
      <div className="container mb-28">
        <h2 className="text-4xl font-bold text-center mb-12">Our Awards</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {awards.map((award) => (
            <div key={award.id} className="flex flex-col items-center">
              {/* Stacked circle and image */}
              <div className="relative w-24 h-24">
                {/* Blue circle background */}
                <div className="absolute inset-0 w-full h-full rounded-full bg-blue-200"></div>
                {/* Award image */}
                <img
                  src={award.image}
                  alt={`Award ${award.title}`}
                  className="absolute inset-0 w-16 h-16 object-cover rounded-full m-auto"
                />
              </div>
              {/* Award title */}
              <p className="text-center text-sm mt-4">{award.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-blue-600 text-white rounded-lg p-20 text-center">
        <h3 className="text-2xl md:text-5xl font-bold mb-6">
        Start Your Journey with The Mentor <br/> </h3><br/> <p>
No matter where you are—exploring, emerging, or elevating—our programs are here to guide you. Together, we’ll unlock your true potential.
</p>
       
        <button className="px-6 py-3 mt-5 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition">
          Get Started
        </button>
      </div>
    </section>
  );
}
