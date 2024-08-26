import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { mainContext } from '../../context/mainContex';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const DropdownMenu = ({ isLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setToken, signOut } = useContext(mainContext);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    signOut();
    setToken("");
  
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener on mount
    document.addEventListener('mousedown', handleClickOutside);

    // Remove event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 py-2 px-4 rounded-md bg-violet-600 text-white hover:bg-violet-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
      >
        <span className="font-semibold">My Account</span>
        <ArrowDropDownIcon />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 mt-2 w-56 bg-white border border-gray-300 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
          >
            <Link
              to="/profile"
              className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-t-lg transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <AccountCircleIcon className="mr-2" />
              <span>Profile</span>
            </Link>
            <Link
              to="/settings"
              className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <SettingsIcon className="mr-2" />
              <span>Settings</span>
            </Link>
            <Link
              to="/"
              className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-b-lg transition-colors duration-200"
              onClick={handleLogout}
            >
              <LogoutIcon className="mr-2" />
              <span>Logout</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownMenu;
