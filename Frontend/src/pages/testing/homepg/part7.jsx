import { GraduationCap } from "lucide-react"

export default function Part7() {
  return (
    <section className="flex items-center justify-between p-8 lg:ml-36 lg:mr-36 mt-20 mb-24">
      <div className="text-3xl font-bold">
        <p>The All-in-One Edtech</p>
        <p>Platform you've been</p>
        <p>Looking for!</p>
      </div>
      <div className="flex space-x-8">
        {["LEARN", "TEST", "JOB"].map((label) => (
          <div key={label} className="flex flex-col items-center">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full">
              <GraduationCap className="text-white" size={32} />
            </div>
            <span className="mt-2 font-semibold">{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

