import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import CampaignIcon from "@mui/icons-material/Campaign";
import { mainContext } from "../context/mainContex";
import DropdownMenu from "./userComponent/DropDownMenu";
import axios from "axios";

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
    navigate('/login');
  };

  // useEffect to update isLoggedIn based on user object
  useEffect(() => {
    setIsLoggedIn( localStorage.getItem('user', JSON.stringify(user)));
    // setIsLoggedIn(Boolean(user && user.name));
  }, [user]);

  return (
    <header className="fixed top-0 left-0 w-full bg-violet-800 text-white shadow-md z-50">
      {/* Marquee Section */}
      <div className="bg-violet-800 text-white flex items-center justify-between py-1 px-4 text-xs font-medium">
        <div className="flex items-center gap-2">
          <CampaignIcon className="w-4 h-4" />
          <marquee className="text-xs" style={{ fontFamily: 'Courier New, monospace' }}>
            JEE 2023 Exam Date Announced - The JEE 2023 exam will be held on April 2, 2023. Registration will open on February 1, 2023. New JEE Preparation Courses Available - Enroll now for early bird discounts.
          </marquee>
        </div>
      </div>

      <div className="flex items-center justify-between py-2 px-4">
        {/* Menu Icon */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-white text-2xl mr-4"
          aria-label="Toggle navigation menu"
        >
          <MenuIcon />
        </button>

        {/* Logo and Title */}
        <Link to="/" className="flex-1 flex items-center justify-center lg:justify-start">
          {/* <img src="https://thementor.live/wp-content/uploads/2024/08/THE.png"/> */}
          <h1 className="text-lg font-bold tracking-wide">The Mentor</h1>
          <p className="text-sm hidden lg:inline">-Test Platform</p>
        </Link>

        {/* Navigation Links for Desktop */}
        <nav className="hidden lg:flex items-center space-x-4 text-sm">
          <Link to="/" className="flex items-center space-x-1 py-2 px-3 hover:bg-violet-700 rounded transition-colors duration-300">
            <HomeRoundedIcon />
            <span>Home</span>
          </Link>
          <Link to="/" className="flex items-center space-x-1 py-2 px-3 hover:bg-violet-700 rounded transition-colors duration-300">
            <span>Subject</span>
          </Link>
          <Link to="/" className="flex items-center space-x-1 py-2 px-3 hover:bg-violet-700 rounded transition-colors duration-300">
            <span>Upcoming Test</span>
          </Link>
          <Link to="/" className="flex items-center space-x-1 py-2 px-3 hover:bg-violet-700 rounded transition-colors duration-300">
            <span>Test History</span>
          </Link>
          {isLoggedIn && (
            <DropdownMenu isLoggedIn={isLoggedIn} />
          )}
        </nav>
      </div>

      {/* Sidebar for mobile */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-violet-900 shadow-lg z-50 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col py-4 px-6">
          <button
            onClick={toggleMenu}
            className="self-end text-white text-2xl"
            aria-label="Close navigation menu"
          >
            X
          </button>
          <Link to="/" className="block py-2 px-4 text-white hover:bg-gray-700 transition-colors duration-300">
            <HomeRoundedIcon className="mr-2" />
            Home
          </Link>
          <Link to="/" className="block py-2 px-4 text-white hover:bg-gray-700 transition-colors duration-300">
            Subject
          </Link>
          <Link to="/" className="block py-2 px-4 text-white hover:bg-gray-700 transition-colors duration-300">
            Upcoming Test
          </Link>
          <Link to="/" className="block py-2 px-4 text-white hover:bg-gray-700 transition-colors duration-300">
            Test History
          </Link>
          {isLoggedIn && (
            <>
              <DropdownMenu isLoggedIn={isLoggedIn} />
            </>
          )}
        </div>
      </div>

      {/* Transparent backdrop for sidebar */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </header>
  );
};

export default Header;
