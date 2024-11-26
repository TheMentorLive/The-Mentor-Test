import { GraduationCap } from "lucide-react";

export default function Banners() {
  const features = [
    {
      title: "Orient ",
      description: "Guiding school students toward clarity in academics and career choices with personalized mentorship and progress tracking.",
      Icon: GraduationCap,
    },
    {
      title: "Emerge",
      description: "Empowering college students with industry insights, skill-building, and a smooth transition into the workforce.",
      Icon: GraduationCap,
    },
    {
      title: "Elevate",
      description: " Helping professionals advance their careers with leadership training, work-life balance strategies, and expert guidance.",
      Icon: GraduationCap,
    },
  ];

  return (
    <div className="mb-10">
      {/* Why take Gen AI section */}
      <section className="bg-blue-600 py-16 px-4 sm:px-8 lg:ml-28 lg:mr-28 rounded-lg mb-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
            Our Programs:

            <br />  Designed for Every Stage
            Reply
          </h2>
        </div>
        <div className="mt-12 grid gap-8 text-white sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, description, Icon }, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-white p-3">
                <Icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{title}</h3>
              <p className="text-blue-100">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
