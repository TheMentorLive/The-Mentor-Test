import { Video, Users, GraduationCap } from "lucide-react";

export default function Banners() {
 
  
  const features = [
    {
      title: "Comprehensive Test Coverage",
      description: "Covers all topics with updated and relevant questions.",
      Icon: Video,
    },
    {
      title: "Expertly Curated Questions",
      description: "Questions prepared by industry experts for effective learning.",
      Icon: Users,
    },
    {
      title: "Track Your Progress",
      description: "Analyze performance and improve with detailed insights.",
      Icon: GraduationCap,
    },
  ];

  

    return (
      <div className="mb-10">
        {/* Why take Gen AI section */}
       
  



    <section className="w-full bg-blue-600 py-16 border rounded-lg mb-16">
      <div className="  px-4 md:px-6">
        <h2 className="text-center text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
          Why take Gen AI Learning Test Series?
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 text-white lg:grid-cols-3">
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
      </div>
    </section>

        
   
      <div className="w-full bg-blue-600 py-12 text-center border rounded-lg text-white">
        <div className="  px-4">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Start Your Exam Preparation Now!</h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-100">
            Lorem ipsum dolor sit amet consectetur. Sociis ut tortor enim ut pellentesque vulputate aliquet.
          </p>
          <button variant="secondary" size="lg" className="font-semibold border p-4 rounded-lg border-black text-blue-600 bg-white">
            Get Started
          </button>
        </div>
      </div>

  
      </div>
    );
  }
  