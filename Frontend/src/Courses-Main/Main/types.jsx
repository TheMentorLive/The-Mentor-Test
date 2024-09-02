
export default function Types() {
    return (
      <div className="flex mt-52 flex-col md:flex-row items-center justify-center gap-8 p-8">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/placeholder.png"
            alt="Illustration"
            className="w-full max-w-[400px]"
            width="400"
            height="400"
            style={{ aspectRatio: "400/400", objectFit: "cover" }}
          />
        </div>
        <div className="w-full md:w-1/2 space-y-8">
          <div>
            <h2 className="text-xl font-bold text-blue-600">Live - Counselling & Mentorship</h2>
            <p className="text-gray-600">
              Personalized, real-time mentorship and guidance to accelerate your growth and achieve your goals.
            </p>
          </div>
          <div>
          <h2 className="text-xl font-bold text-blue-600">Learn - Courses & Case Studies</h2>
            <p className="text-gray-600">
              Master AI-driven coursesand{" "}
              case studies to fast-track your career with cutting-edge skills and
              personalized guidance.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-600">Jobs - Placements & Internships</h2>
            <p className="text-gray-600">
              Leverage our  for connections, mentorship & resources
              to accelerate personal and professional growth.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-600">Community - Networking & Connections</h2>
            <p className="text-gray-600">
              Leverage our <span className="text-blue-600">Alumni network</span> for connections, mentorship & resources
              to accelerate personal and professional growth.
            </p>
          </div>
        </div>
      </div>
    )
  }