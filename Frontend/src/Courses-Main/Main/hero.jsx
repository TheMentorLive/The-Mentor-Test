export default function Component() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 space-y-8 bg-gray-50 md:flex-row md:space-y-0 md:space-x-8">
        <div className="flex flex-col space-y-6 md:w-1/2">
          <h1 className="text-5xl font-bold leading-tight">
            Master the Future
            <br />
            with
            <br />
            <span className="inline-block px-2 py-1 mt-2 text-white bg-black rounded">GenAI Learning</span>
          </h1>
          <p className="text-lg text-gray-600">
            GenAI Learning offers world-class online courses and programs to help you achieve your career goals. Learn
            from industry experts and transform your future.
          </p>
          <div className="flex space-x-4">
            <Button className="bg-blue-600 text-white">Explore Courses</Button>
            <Button variant="outline">Sign up</Button>
          </div>
        </div>
        <Card className="w-full max-w-md border-2 border-blue-600 md:w-1/2">
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full-name">Full Name</Label>
              <Input id="full-name" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="john@example.com" type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Your message" className="min-h-[100px]" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-blue-600 text-white">
              <SendIcon className="mr-2" />
              Start Learning
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  // Custom Button component
  function Button({ children, className, variant, ...props }) {
    const baseStyle = "px-4 py-2 font-medium rounded focus:outline-none";
    const variantStyle =
      variant === "outline"
        ? "border border-blue-600 text-blue-600 bg-transparent"
        : "bg-blue-600 text-white";
  
    return (
      <button className={`${baseStyle} ${variantStyle} ${className}`} {...props}>
        {children}
      </button>
    );
  }
  
  // Custom Card components
  function Card({ children, className }) {
    return <div className={`bg-white shadow-md rounded-lg ${className}`}>{children}</div>;
  }
  
  function CardHeader({ children }) {
    return <div className="px-6 py-4 border-b">{children}</div>;
  }
  
  function CardTitle({ children }) {
    return <h2 className="text-xl font-semibold">{children}</h2>;
  }
  
  function CardContent({ children, className }) {
    return <div className={`px-6 py-4 ${className}`}>{children}</div>;
  }
  
  function CardFooter({ children }) {
    return <div className="px-6 py-4 border-t">{children}</div>;
  }
  
  // Custom Label component
  function Label({ htmlFor, children }) {
    return (
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
        {children}
      </label>
    );
  }
  
  // Custom Input component
  function Input({ id, type = "text", placeholder }) {
    return (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    );
  }
  
  // Custom Textarea component
  function Textarea({ id, placeholder, className }) {
    return (
      <textarea
        id={id}
        placeholder={placeholder}
        className={`block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${className}`}
      />
    );
  }
  
  // Custom SendIcon component
  function SendIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </svg>
    );
  }
  