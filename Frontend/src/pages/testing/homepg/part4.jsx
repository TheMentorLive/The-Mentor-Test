import { Star } from "lucide-react";

export default function Part4() {
  const testimonials = [
    {
      name: "Guy Hawkins",
      role: "UI-UX Designer",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "Ut pharetra ipsum nec leo blandit, sit amet tincidunt eros pharetra. Nam sed imperdiet turpis. In hac habitasse platea dictumst. Praesent nulla massa, hendrerit vestibulum gravida in, feugiat auctor felis.",
    },
    {
      name: "Guy Hawkins",
      role: "UI-UX Designer",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "Ut pharetra ipsum nec leo blandit, sit amet tincidunt eros pharetra. Nam sed imperdiet turpis. In hac habitasse platea dictumst. Praesent nulla massa, hendrerit vestibulum gravida in, feugiat auctor felis.",
    },
    {
      name: "Guy Hawkins",
      role: "UI-UX Designer",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "Ut pharetra ipsum nec leo blandit, sit amet tincidunt eros pharetra. Nam sed imperdiet turpis. In hac habitasse platea dictumst. Praesent nulla massa, hendrerit vestibulum gravida in, feugiat auctor felis.",
    },
  ];

  return (
    <div className="container mx-auto">

    
    <section className="py-12 px-4 md:px-6 lg:mx-[100px]">
      <div className=" mx-auto">
        <h2 className="text-center text-sm font-semibold text-gray-500 mb-4">
          5000+ Happy GEN AI Learning Users
        </h2>
        <h3 className="text-center text-3xl md:text-4xl font-bold mb-12">
          Don&apos;t just take our words
        </h3>
        <div className="flex overflow-x-auto gap-8 md:grid md:grid-cols-3 md:gap-8 mb-12 scrollbar-hide">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-none bg-white shadow rounded-lg p-6 w-80 md:w-auto"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-current text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-sm">{testimonial.content}</p>
            </div>
          ))}
        </div>
        
        <div className="conatainer mx-auto">

        </div>
        <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
          WHY THE MENTOR?<br/></h3>
          <p>
Personalized guidance, real-world skills, and expert mentorship—all in one place. Join a community that’s empowered thousands to achieve their dreams. Your success starts here!
</p>
          <button className="px-6 py-3 mt-5 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition">
            Get Started
          </button>
        </div>
      </div>
    </section>
    </div>
    
  );
}
