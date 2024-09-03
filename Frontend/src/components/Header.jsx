import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import CampaignIcon from "@mui/icons-material/Campaign";
import { FaTimes } from "react-icons/fa";
import { mainContext } from "../context/mainContex";
import DropdownMenu from "./userComponent/DropDownMenu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, setToken, signOut } = useContext(mainContext);

  const navigate = useNavigate();

  // Toggle menu open or close
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle user logout
  const handleLogout = () => {
    signOut();
    setToken("");
    navigate("/login");
  };

  // useEffect to update isLoggedIn based on user object
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("user", JSON.stringify(user)));
  }, [user]);

  return (
    <header className="fixed top-0 left-0 w-full bg-white  shadow-md z-50">
      {/* Marquee Section */}
      <div className="bg-white text-black flex items-center justify-between py-1 px-4 text-xs font-medium">
        <div className="flex items-center gap-2">
          <CampaignIcon className="w-4 h-4" />
          <marquee className="text-xs" style={{ fontFamily: "Courier New, monospace" }}>
            JEE 2023 Exam Date Announced - The JEE 2023 exam will be held on April 2, 2023.
            Registration will open on February 1, 2023. New JEE Preparation Courses Available - Enroll
            now for early bird discounts.
          </marquee>
        </div>
      </div>

      <div className="flex items-center  justify-center py-2 px-4">
        {/* Menu Icon */}
        <button onClick={toggleMenu} className="lg:hidden text-black text-2xl mr-4" aria-label="Toggle navigation menu">
          <MenuIcon />
        </button>

        {/* Logo and Title */}
        
        <Link to="/" className="flex-1 flex items-center justify-center lg:justify-start">
        <img 
        src="/The-mentor-logo.png"
        className="h-10"/>
        </Link>

        {/* Navigation Links for Desktop */}
        <nav className="hidden lg:flex items-center  space-x-4 text-sm">
         
          <Link to="/" className="flex items-center space-x-1 py-2 px-3 hover:bg-blue-700 rounded transition-colors duration-300">
            <HomeRoundedIcon />
            <span>Home</span>
          </Link>
          <Link to="/courses" className="flex items-center space-x-1 py-2 px-3 hover:bg-blue-700 rounded transition-colors duration-300">
            <span>Courses</span>
          </Link>
          {isLoggedIn && (
            <>
              <Link to="/subjects" className="flex items-center space-x-1 py-2 px-3 hover:bg-blue-700 rounded transition-colors duration-300">
                <span>Subjects</span>
              </Link>
              <Link to="/test-history" className="flex items-center space-x-1 py-2 px-3 hover:bg-blue-700 rounded transition-colors duration-300">
                <span>Test History</span>
              </Link>
            </>
          )}
          <Link to="/upcoming-test" className="flex items-center space-x-1 py-2 px-3 hover:bg-blue-700 rounded transition-colors duration-300">
            <span>Upcoming Test</span>
          </Link>
          <div className="flex items-center gap-2 ">
        <Link
          href="/login"
          className="inline-flex items-center justify-center text-white rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Get Started
        </Link>
        
      </div>
          {isLoggedIn && <DropdownMenu isLoggedIn={isLoggedIn} />}
        </nav>
      </div>

      {/* Sidebar for mobile */}
      <div className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col py-4 px-6">
          <button onClick={toggleMenu} className="self-end text-black text-2xl" aria-label="Close navigation menu">
            <FaTimes />
          </button>
          <Link to="/" className="block py-2 px-4 text-black hover:bg-gray-700 transition-colors duration-300">
            <HomeRoundedIcon className="mr-2" />
            Home
          </Link>
          <Link to="/courses" className="block py-2 px-4 text-black hover:bg-gray-700 transition-colors duration-300">
            Courses
          </Link>
          {isLoggedIn && (
            <>
              <Link to="/subjects" className="block py-2 px-4 text-black hover:bg-gray-700 transition-colors duration-300">
                Subjects
              </Link>
              <Link to="/test-history" className="block py-2 px-4 text-black hover:bg-gray-700 transition-colors duration-300">
                Test History
              </Link>
            </>
          )}
          <Link to="/upcoming-test" className="block py-2 px-4 text-black hover:bg-gray-700 transition-colors duration-300">
            Upcoming Test
          </Link>
          {isLoggedIn && <DropdownMenu isLoggedIn={isLoggedIn} />}
        </div>
      </div>

      {/* Transparent backdrop for sidebar */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu}></div>
      )}
    </header>
  );
};

export default Header;
