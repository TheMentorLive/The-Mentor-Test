export default function Contact() {
  // Basic Button component
  const Button = ({ children, className, variant }) => (
    <button
      className={`px-4 py-2 border rounded-lg ${
        variant === "outline" ? "border-black text-gray-500" : "bg-blue-500 text-white"
      } ${className}`}
    >
      {children}
    </button>
  );

  // Basic Input component
  const Input = ({ type, placeholder, className }) => (
    <input
      type={type}
      placeholder={placeholder}
      className={`px-4 py-2 border rounded-lg ${className}`}
    />
  );

  return (
    <section className="flex flex-col items-center justify-center min-h-screen p-4 text-blue-500">
      <Button variant="outline" className="mb-4">
        Get Started
      </Button>
      <h1 className="text-4xl font-bold text-center text-gray-900">Take the First Step</h1>
      <p className="mt-4 text-lg text-center text-gray-600">
        Join the thousands of people who have transformed their lives with our Mentorship and AI-Enabled Learning
        Resources.
      </p>
      <form className="flex flex-col items-center mt-8 space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="flex w-full max-w-md">
          <Input type="email" placeholder="Enter your email" className="flex-grow" />
          <Button variant="outline " className="ml-4 bg-blue-500">
            Send 
          </Button>
        </div>
      </form>
    </section>
  );
}
