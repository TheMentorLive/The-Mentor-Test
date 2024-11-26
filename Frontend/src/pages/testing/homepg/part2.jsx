import { GraduationCap, Clock } from 'lucide-react';

export default function Part2() {
  const courses = [
    {
      title: "Digital Marketing",
      image: "/placeholder.svg",
      instructor: "Prof. Sachin Teli",
      duration: "1 hours 56 minutes",
    },
    {
      title: "Chat GPT",
      image: "/placeholder.svg",
      instructor: "Prof. Sachin Teli",
      duration: "30 minutes",
    },
    {
      title: "Python Basics",
      image: "/placeholder.svg",
      instructor: "Prof. Sachin Teli",
      duration: "3 hours 30 minutes",
    },
    {
      title: "UI UX - Figma Advance",
      image: "/placeholder.svg",
      instructor: "Prof. Sachin Teli",
      duration: "1 hours 56 minutes",
    },
  ];

  return (
    <section className="w-full items-center justify-center mb-20 bg-white">
      <div className="container px-4 md:px-6">
      
      



      <div className="mt-16 md:mr-40 md:ml-40 lg:ml-40 lg:mr-40">
  <div className="flex justify-between items-center mb-8">
    <div className="flex items-center space-x-4">
      <div className="bg-blue-600 text-white p-2 rounded-full">
        <GraduationCap size={24} />
      </div>
      <h3 className="text-2xl font-bold">Explore Learn</h3>
    </div>
    <button className="text-blue-600 underline text-sm font-medium">
      Explore All Study Materials
    </button>
  </div>
  <p className="text-muted-foreground mb-8">
    Explore our EdTech platform offering mentorship,<br /> upskilling courses, job opportunities, and a thriving<br /> community.
  </p>
  <div className="sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 flex overflow-x-auto scrollbar-hide">
    {courses.map((course, index) => (
      <div
        key={index}
        className="flex-none bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 w-80 sm:w-auto"
      >
        <div className="w-full h-48">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h4 className="text-lg font-semibold mb-2">{course.title}</h4>
          <p className="text-sm text-gray-600 mb-2">{course.instructor}</p>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            {course.duration}
          </div>
        </div>
        <div className="p-4 border-t border-gray-200">
          <button className="w-full py-2 text-blue-600 border border-blue-600 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition">
            Learn More
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

      </div>
    </section>
  );
}
