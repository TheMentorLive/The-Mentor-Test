import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const mentors = [
  {
    name: "Brian Clark",
    title: "CEO & Founder",
    image: "./mentors/Image1.png",
  },
  {
    name: "Stephanie Powell",
    title: "VP of Finance",
    image: "./mentors/Image2.png",
  },
  {
    name: "Christopher White",
    title: "VP of Product",
    image: "./mentors/Image3.png",
  },
  {
    name: "Emily Miller",
    title: "VP of HR",
    image: "./mentors/Image4.png",
  },
];

export default function MentorsSection() {
  return (
    <section className="py-12  sm:px-8 lg:ml-28 md:py-24">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tight mb-12 text-center lg:text-left">
          Meet <span className="text-blue-600">Our Mentors</span>
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {mentors.map((mentor) => (
            <div
              key={mentor.name}
              className="border-0 shadow-sm flex flex-col items-center lg:items-start gap-6 p-4 bg-white rounded-lg"
            >
              <img
                src={mentor.image}
                alt={mentor.name}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-lg bg-red-600 object-cover"
              />
              <div className="space-y-4 text-center lg:text-left">
                <div>
                  <h3 className="text-xl font-semibold">{mentor.name}</h3>
                  <p className="text-muted-foreground">{mentor.title}</p>
                </div>
                <div className="flex justify-center lg:justify-start gap-4">
                  <a href="#" className="text-blue-600 hover:text-blue-700">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-blue-600 hover:text-blue-700">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-blue-600 hover:text-blue-700">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-blue-600 hover:text-blue-700">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
