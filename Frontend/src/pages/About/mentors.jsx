import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const mentors = [
  {
    name: "Brian Clark",
    title: "CEO & Founder",
    image: "/placeholder.svg",
  },
  {
    name: "Stephanie Powell",
    title: "VP of Finance",
    image: "/placeholder.svg",
  },
  {
    name: "Christopher White",
    title: "VP of Product",
    image: "/placeholder.svg",
  },
  {
    name: "Emily Miller",
    title: "VP of HR",
    image: "/placeholder.svg",
  },
];

export default function MentorsSection() {
  return (
    <section className="py-12 px-4 ml-28 md:py-24">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tight mb-12">
          Meet <span className="text-blue-600">Our Mentors</span>
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {mentors.map((mentor) => (
            <div
              key={mentor.name}
              className="border-0 shadow-none flex gap-6 p-4 bg-white rounded-lg"
            >
              <img
                src={mentor.image}
                alt={mentor.name}
                className="w-40 h-40 rounded-lg bg-red-600 object-cover"
              />
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">{mentor.name}</h3>
                  <p className="text-muted-foreground">{mentor.title}</p>
                </div>
                <div className="flex gap-4">
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
