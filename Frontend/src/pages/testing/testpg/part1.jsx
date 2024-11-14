import { useState } from "react";

export default function Part1() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="min-h-screen bg-gray-800 text-white flex items-center justify-center p-4">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-sm uppercase tracking-wide">About Us</h2>
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Empowering Learning With AI-Driven Precision
          </h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Get Started</button>
        </div>
        <div className="lg:w-1/2 max-w-md w-full bg-white text-gray-800 p-6 rounded-lg shadow-md">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold">
              Learn, Test and Grow Today with Gen Ai Learning
            </h2>
          </div>
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                User ID / Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter user id / email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password ID"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent focus:outline-none"
                >
                  <span className="h-4 w-4 text-gray-500">
                    {showPassword ? "🙈" : "👁️"}
                  </span>
                </button>
              </div>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
