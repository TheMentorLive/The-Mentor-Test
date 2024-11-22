import { GraduationCap } from "lucide-react";

export default function Banners() {
 
  
  const features = [
    {
      title: "Comprehensive Test Coverage",
      description: "Covers all topics with updated and relevant questions.",
      Icon: GraduationCap,
    },
    {
      title: "Expertly Curated Questions",
      description: "Questions prepared by industry experts for effective learning.",
      Icon: GraduationCap,
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
       
  



    <section className=" bg-blue-600 py-16 border ml-28 mr-28 rounded-lg mb-16">
      <div className="  px-4 md:px-6">
        <h2 className="text-center text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
        Values that define the learning <br/> Experience with Gen AI
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

        
   
    

  
      </div>
    );
  }
  