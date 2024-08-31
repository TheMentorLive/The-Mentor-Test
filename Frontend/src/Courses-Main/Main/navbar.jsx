import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }} className="border-b bg-white border-gray-300">
      <header className="flex h-16 items-center justify-between bg-background px-4 md:px-6 lg:ml-48 lg:mr-[217px]">
        {/* Logo and Home Link */}
        <div className="flex items-center gap-2">
          <Link to="/">
            <img
              src="/logo.png"
              alt="Description of image"
              width={120} // Adjust width for responsiveness
              height={40} // Adjust height for responsiveness
              className="w-auto h-auto max-w-full max-h-full"
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex">
          <ul className="flex items-center gap-6 text-sm font-medium">
            <li>
              <Link to="#" className="hover:underline hover:underline-offset-4">
                Courses
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline hover:underline-offset-4">
                About
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline hover:underline-offset-4">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Desktop SignIn/SignUp Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/Main/signin"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Sign In
          </Link>
          <Link
            to="/Main/signup"
            className="rounded-md bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 border border-primary"
          >
            Sign Up
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden flex items-center">
          <button className="text-3xl focus:outline-none">
            {/* Icon Placeholder */}
            <span className="block">☰</span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="absolute top-16 left-0 w-full bg-background z-50 md:hidden">
          <nav className="flex flex-col items-center gap-4 py-4">
            <Link to="#" className="text-lg font-medium hover:underline hover:underline-offset-4">
              Courses
            </Link>
            <Link to="#" className="text-lg font-medium hover:underline hover:underline-offset-4">
              About
            </Link>
            <Link to="#" className="text-lg font-medium hover:underline hover:underline-offset-4">
              Contact
            </Link>
            <Link
              to="/Main/signin"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 w-3/4 text-center"
            >
              Sign In
            </Link>
            <Link
              to="/Main/signup"
              className="rounded-md bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 border border-primary w-3/4 text-center"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </header>
    </div>
  );
}
