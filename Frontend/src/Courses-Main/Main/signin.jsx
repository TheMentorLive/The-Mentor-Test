import { useState } from 'react';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-in logic here
  };

  return (
    <div className="flex min-h-screen">
      <div className="relative w-1/2 bg-white">
        <div className="absolute bottom-0 left-0 p-8 text-black bg-opacity-50">
          <h2 className="text-4xl font-bold">
            GenAi Leaning 
          </h2>
          
        </div>
      </div>
      <div className="flex items-center justify-center w-1/2 p-8 bg-white">
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-col items-center">
            <img href="/logo.png"/>
            <h3 className="text-xl font-semibold">Welcome to GenAi Learning</h3>
            <h2 className="mt-2 text-2xl font-bold">Sign in with your email and password</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" className="w-full bg-blue-600">Sign In</Button>
              <div className="flex items-center justify-center">
                <span className="text-gray-600">or</span>
              </div>
              <Button variant="outline" className="w-full">
                
                Continue with Google
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center">
            <p className="text-xs text-gray-600">
              By continuing you agree to our{" "}
              <a href="#" className="underline">
                privacy policy
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                terms of use
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function Card({ children, className }) {
  return <div className={`bg-white shadow-lg rounded-lg ${className}`}>{children}</div>;
}

function CardHeader({ children, className }) {
  return <div className={`p-6 border-b ${className}`}>{children}</div>;
}

function CardContent({ children, className }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

function CardFooter({ children, className }) {
  return <div className={`p-6 border-t ${className}`}>{children}</div>;
}

function Input({ type, placeholder, value, onChange, className }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
}

function Label({ htmlFor, children, className }) {
  return (
    <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 ${className}`}>
      {children}
    </label>
  );
}

function Button({ children, variant, className, type }) {
  const baseStyle = "px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2";
  const variants = {
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    default: "bg-blue-600 text-white hover:bg-blue-700",
  };
  return <button type={type} className={`${baseStyle} ${variants[variant] || variants.default} ${className}`}>{children}</button>;
}


function LogInIcon(props) {
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
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>
  );
}
