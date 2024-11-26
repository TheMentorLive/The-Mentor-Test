import { GraduationCap, Video, Users, UsersRound } from 'lucide-react'

import { Star } from "lucide-react";

export default function StatsSection() {
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
    <div>
    <section className="w-full bg-blue-600 py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
            Why GenAi Study Materials?
          </h2>
          <p className="mx-auto max-w-[700px] text-white/90 md:text-xl">
            Learn the secrets to Life Success, these people have got the key.
          </p>
        </div>
        <div className="mx-auto mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-12">
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
              <GraduationCap className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-white">10000</h3>
            <p className="text-sm text-white/90">Expert Tutors</p>
          </div>
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
              <Video className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-white">1500</h3>
            <p className="text-sm text-white/90">Top Lessons</p>
          </div>
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-white">19000</h3>
            <p className="text-sm text-white/90">Over Students</p>
          </div>
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
              <UsersRound className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-white">4300</h3>
            <p className="text-sm text-white/90">Pro Videos</p>
          </div>
        </div>
      </div>



      
    </section>


<section className="py-12 px-4 md:px-6 lg:px-8">
<div className="max-w-6xl mx-auto">
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
  <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
    <h3 className="text-2xl md:text-3xl font-bold mb-6">
    Start Your Journey with The Mentor <br/>
No matter where you are—exploring, emerging, or elevating—our programs are here to guide you. Together, we’ll unlock your true potential.
    </h3>
    <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition">
      Get Started
    </button>
  </div>
</div>
</section>
    </div>
  )
}

