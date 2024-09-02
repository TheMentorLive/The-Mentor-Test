import { useState } from "react";

function Courses() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const courses = [
    {
      id: 1,
      category: "Photography",
      title: "Fundamental of DSLR Photography",
      price: "$50",
      image: "/placeholder.svg",
      alt: "Fundamental of DSLR Photography",
    },
    {
      id: 2,
      category: "Painting",
      title: "A beginner's guide to start painting",
      price: "$50",
      image: "/placeholder.svg",
      alt: "A beginner's guide to start painting",
    },
    {
      id: 3,
      category: "Typography",
      title: "Customising Type with Hkamd",
      price: "$50",
      image: "/placeholder.svg",
      alt: "Customising Type with Hkamd",
    },
    // Add more courses as needed
  ];

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  return (
    <section className="py-10 ml-28 mr-28">
      <div className="text-center mb-8">
        <h2 className="text-xl font-medium text-muted-foreground">Our Course</h2>
        <h1 className="text-3xl font-bold">Popular Course</h1>
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
            selectedCategory === "Photography" ? "bg-blue-500 text-white" : "border border-gray-300 text-gray-700"
          }`}
          onClick={() => setSelectedCategory("Photography")}
        >
          Photography
        </button>
        <button
          className={`py-2 px-4 rounded ${
            selectedCategory === "Painting" ? "bg-blue-500 text-white" : "border border-gray-300 text-gray-700"
          }`}
          onClick={() => setSelectedCategory("Painting")}
        >
          Painting
        </button>
        <button
          className={`py-2 px-4 rounded ${
            selectedCategory === "Typography" ? "bg-blue-500 text-white" : "border border-gray-300 text-gray-700"
          }`}
          onClick={() => setSelectedCategory("Typography")}
        >
          Typography
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
