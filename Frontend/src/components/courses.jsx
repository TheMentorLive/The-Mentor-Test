import { useState } from "react";

function Courses() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const courses = [
    {
      id: 1,
      category: "Data Analyst",
      title: "Fundamental of Data Analyst",
      price: "$50",
      image: "/data-analyst.png",
      alt: "Fundamental of Data Analyst",
    },
    {
      id: 2,
      category: "MTP",
      title: "A beginner's guide to start MTP",
      price: "$50",
      image: "/mtp.png",
      alt: "A beginner's guide to start MTP",
    },
    {
      id: 3,
      category: "Digital Marketing",
      title: "Digital Marketing - Basics",
      price: "$50",
      image: "/digital-marketing.png",
      alt: "Digital Marketing - Basics",
    },
    // Add more courses as needed
  ];

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  return (
    <section className="py-10 ml-28 mt-20 mr-28">
      <div className="text-center mb-8">
      <h3 className="mt-4 text-2xl -ml-[770px] font-semibold text-Black">Learn - Al - Enabled Courses and Resources </h3>
      <br/>
      <br/>
        <h2 className="text-xl font-medium text-muted-foreground">Our Courses</h2>
        
      </div>
      <div className="flex justify-center space-x-2 mb-8">
        <button
          className={`py-2 px-4 rounded ${
            selectedCategory === "All" ? "bg-blue-500 text-white" : "border border-gray-300 text-gray-700"
          }`}
          onClick={() => setSelectedCategory("All")}
        >
          All categories
        </button>
        <button
          className={`py-2 px-4 rounded ${
            selectedCategory === "Data Analyst" ? "bg-blue-500 text-white" : "border border-gray-300 text-gray-700"
          }`}
          onClick={() => setSelectedCategory("Data Analyst")}
        >
          Data Analyst
        </button>
        <button
          className={`py-2 px-4 rounded ${
            selectedCategory === "MTP" ? "bg-blue-500 text-white" : "border border-gray-300 text-gray-700"
          }`}
          onClick={() => setSelectedCategory("MTP")}
        >
          MTP
        </button>
        <button
          className={`py-2 px-4 rounded ${
            selectedCategory === "Digital Marketing" ? "bg-blue-500 text-white" : "border border-gray-300 text-gray-700"
          }`}
          onClick={() => setSelectedCategory("Digital Marketing")}
        >
          Digital Marketing
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="shadow-lg">
            <CardHeader className="p-0">
              <img
                src={course.image}
                alt={course.alt}
                className="w-full h-48 object-cover rounded-t-lg"
                width="300"
                height="200"
                style={{ aspectRatio: "300/200", objectFit: "cover" }}
              />
            </CardHeader>
            <CardContent className="p-4">
              <Badge variant="secondary" className="mb-2">
                {course.category}
              </Badge>
              <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
              <p className="text-sm font-medium">{course.price}</p>
            </CardContent>
            <CardFooter className="flex justify-between p-4">
              <button className="text-blue-500">Buy Now</button>
              <button className="text-blue-500">Learn more</button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Card({ children, className }) {
  return <div className={`bg-white rounded-lg overflow-hidden ${className}`}>{children}</div>;
}

function CardHeader({ children, className }) {
  return <div className={className}>{children}</div>;
}

function CardContent({ children, className }) {
  return <div className={className}>{children}</div>;
}

function CardFooter({ children, className }) {
  return <div className={className}>{children}</div>;
}

function Badge({ children, variant, className }) {
  return (
    <span className={`inline-block px-2 py-1 rounded text-sm ${variant === "secondary" ? "bg-gray-200 text-gray-700" : ""} ${className}`}>
      {children}
    </span>
  );
}

export default Courses;
