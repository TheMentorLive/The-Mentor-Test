
import { Video, Users, GraduationCap } from "lucide-react";
import { useState } from "react";

export default function Part3() {
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
      <div className="container mx-auto p-6">
       <section className="w-full bg-blue-600 py-16 border rounded-lg">
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
      </div>
    );
  }
  
  