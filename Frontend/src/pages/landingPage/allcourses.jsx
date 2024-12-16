import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";

export default function AllCourses() {
  const [activeCategory, setActiveCategory] = useState("All");

  const courses = [
    {
      title: "Generative AI Fundamentals",
      category: "Beginner",
      provider: "IBM",
      specialization: "Specialization",
      image: "/Orient.png",
    },
    {
      title: "AI for Good",
      category: "Popular",
      provider: "DeepLearning.AI",
      specialization: "Specialization",
      image: "/Orient.png",
    },
    {
      title: "Navigating Generative AI for Leaders",
      category: "Tools",
      provider: "Coursera",
      specialization: "Specialization",
      image: "/Orient.png",
    },
    {
      title: "New AI Techniques",
      category: "New",
      provider: "AI University",
      specialization: "Course",
      image: "/Orient.png",
    },
  ];

  // Filter courses based on the active category
  const filteredCourses =
    activeCategory === "All"
      ? courses
      : courses.filter((course) => course.category === activeCategory);

  return (
    <div className="flex items-center justify-center lg:mr-[2px] lg:-ml-[68px]">
    <div className="px-4 md:px-20 lg:px-40  md:-mt-7 md:mb-2">
      <div className="space-y-2 text-left ml-7 mb-10">
        <h2 className="text-3xl font-bold">Explore Courses</h2>
        <p className="text-muted-foreground">Browse our selection of courses.</p>
      </div>
      <section className="bg- p-6 md:p-8 border border-slate-300 rounded-lg">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="space-y-4 mt-[59px]">
            <h2 className="text-2xl md:text-3xl font-bold">Get started with GenAI</h2>
            <p className="text-sm md:text-base">
              Identify, develop, and execute impactful GenAI business strategies.
            </p>
            <Link to="/All-Tests">
            <button className="mt-5 md:mt-7 px-3 py-2 md:px-4 md:py-2 bg-[#2563EB] text-white rounded-lg hover:bg-blue-600 focus:outline-none">
              View all Courses
            </button>
            </Link>
          </div>
          <div className="col-span-3 space-y-4">
            {/* Category filter buttons */}
            <div className="flex space-x-1 md:space-x-1 mb-8 overflow-auto">
              {["All", "Beginner", "Popular", "New", "Tools"].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1 rounded-2xl text-xs md:text-sm font-medium border border-slate-500 ${
                    activeCategory === category
                      ? "bg-[#2563EB] text-white"
                      : "bg-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Swiper Slider for courses */}
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              navigation={true}
              modules={[Navigation]}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="mySwiper"
            >
              {filteredCourses.map((course, index) => (
                <SwiperSlide key={index}>
                  <div className="p-4 border h-[300px] border-gray-300 rounded-lg">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="rounded-lg"
                      width="1000"
                      height="1000"
                      style={{ aspectRatio: "450/300", objectFit: "cover" }}
                    />
                    <div className="mt-4">
                      <div className="flex items-center space-x-2">
                        <p className="text-xs md:text-sm font-medium">{course.provider}</p>
                      </div>
                      <h3 className="mt-2 text-sm md:text-lg font-bold">{course.title}</h3>
                      <p className="text-xs md:text-sm text-gray-500">
                        {course.specialization}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </div>
    </div>
  );
}
