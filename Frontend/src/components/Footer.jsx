import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // Import social media icons

const Footer = () => {
  return (
    <footer className="bg-violet-900 py-4"> {/* Changed py-8 to py-4 to decrease height */}
      <div className="container flex flex-col items-center justify-between gap-4 px-4 sm:flex-row">
        <div className="flex items-center">
          {/* Logo Image */}
          <img
            src="/The-mentor-logo.png"
            alt="mentor-logo"
            className="h-9 w-auto"
          />
          {/* <span className="ml-2 text-lg font-bold">Trimahtech</span> */}
        </div>
        <nav className="flex gap-4">
          <Link to="/" className="text-sm text-white font-medium hover:underline">
            Home
          </Link>
          <Link to="/service" className="text-sm text-white font-medium hover:underline">
            Subject
          </Link>
          <Link to="/contact" className="text-sm text-white font-medium hover:underline">
            Test-
          </Link>
        </nav>
        <div className="flex gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-xl hover:text-violet-300"
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-xl hover:text-violet-300"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-xl hover:text-violet-300"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-xl hover:text-violet-300"
          >
            <FaLinkedin />
          </a>
        </div>
        <p className="text-sm text-white">
          &copy; {new Date().getFullYear()} The Mentor. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
