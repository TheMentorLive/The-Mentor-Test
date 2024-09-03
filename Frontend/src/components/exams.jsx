export default function Examss() {
    return (
      <section className="py-12  ml-28 mr-28">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold">We cover all Exams and Classes</h2>
          <p className="mt-2 text-lg text-gray-600">
            From videos to notes to tests, providing all you need to learn and practice in one place
          </p>
        </div>
        <div className="container mx-auto mt-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold">50+ Entrance Exams</h3>
            <a href="#" className="text-blue-600">
              Explore all Exams
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "UPSC", img: "/placeholder.svg?height=64&width=64" },
              { name: "CAT", img: "/placeholder.svg?height=64&width=64" },
              { name: "NEET", img: "/placeholder.svg?height=64&width=64" },
              { name: "JEE", img: "/placeholder.svg?height=64&width=64" },
              { name: "CLAT", img: "/placeholder.svg?height=64&width=64" },
              { name: "GATE", img: "/placeholder.svg?height=64&width=64" },
              { name: "SSC", img: "/placeholder.svg?height=64&width=64" },
              { name: "Teaching", img: "/placeholder.svg?height=64&width=64" },
              { name: "Banking", img: "/placeholder.svg?height=64&width=64" },
              { name: "Insurance", img: "/placeholder.svg?height=64&width=64" },
              { name: "State PSC", img: "/placeholder.svg?height=64&width=64" },
              { name: "State Exams", img: "/placeholder.svg?height=64&width=64" },
              { name: "Defence", img: "/placeholder.svg?height=64&width=64" },
              { name: "Police Exams", img: "/placeholder.svg?height=64&width=64" },
              { name: "Judiciary", img: "/placeholder.svg?height=64&width=64" },
              { name: "GMAT", img: "/placeholder.svg?height=64&width=64" },
              { name: "IELTS", img: "/placeholder.svg?height=64&width=64" },
              { name: "GRE", img: "/placeholder.svg?height=64&width=64" },
              { name: "IIT JAM", img: "/placeholder.svg?height=64&width=64" },
              { name: "CA Exams", img: "/placeholder.svg?height=64&width=64" },
              { name: "Railways", img: "/placeholder.svg?height=64&width=64" },
              { name: "Agriculture", img: "/placeholder.svg?height=64&width=64" },
            ].map((exam) => (
              <div key={exam.name} className="flex flex-col items-center p-4 bg-white rounded-lg shadow">
                <img src={exam.img} alt={exam.name} className="w-16 h-16 mb-2" />
                <span className="text-sm font-medium">{exam.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  