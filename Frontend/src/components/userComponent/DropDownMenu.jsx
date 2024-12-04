import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { mainContext } from '../../context/mainContex';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Bell, Heart, ListIcon, ShoppingCartIcon } from 'lucide-react';



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
    navigate("/login"); // Ensure navigation to login page
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

  // Get the first letter of the user's name
  const getInitial = () => {
    if (user && user.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return "U"; // Default fallback if user or name is not available
  };

  return (
    <div ref={dropdownRef} className=" hidden lg-block relative inline-block text-left ">
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2   px-2 rounded-md  text-white hover:bg-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white"
      >
       
       <div
  className="flex items-center justify-center w-10 h-10 p-2 rounded-full bg-white text-black font-bold border border-gray-600 shadow-sm"
>
  {getInitial()}
</div>

      
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && ( 
         <motion.div
         initial={{ opacity: 0, y: -10 }}
         animate={{ opacity: 1, y: 0 }}
         exit={{ opacity: 0, y: -10 }}
         transition={{ duration: 0.3 }}
         className="absolute right-0 mt-2 w-66 bg-white text-black border border-gray-300 shadow-lg ring-1 ring-black ring-opacity-5 text-sm"
       >
         {/* User Info */}
         <div className="flex items-center px-4 py-3 border-b">
  {/* Round and big user icon */}
  <div className="bg-black text-white w-16 h-16 flex items-center justify-center rounded-full text-lg font-bold">
    {getInitial()}
  </div>
  <div className="ml-3">
    <p className="font-semibold">{user.name}</p>
    <p className="text-gray-500">{user.email}</p>
  </div>
</div>

       
         <div className="px-2 py-2 border-b">
           <Link
             to="/my-learning"
             className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
             onClick={() => setIsOpen(false)}
           >
             {/* <ListIcon className="mr-2 text-blue-500" /> */}
             <span>My Learning</span>
           </Link>
           <Link
             to="/cart"
             className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
             onClick={() => setIsOpen(false)}
           >
             {/* <ShoppingCartIcon className="mr-2 text-blue-500" /> */}
             <span>My Cart</span>
             <span className="ml-auto bg-blue-500 text-white text-xs rounded-full px-2 py-1">3</span>
           </Link>
           <Link
             to="/wishlist"
             className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
             onClick={() => setIsOpen(false)}
           >
             {/* <Heart className="mr-2 text-blue-500" /> */}
             <span>Wishlist</span>
             <span className="ml-auto bg-blue-500 text-white text-xs rounded-full px-2 py-1">3</span>
           </Link>
         </div>
       
         <div className="px-2 py-2 border-b">
           <Link
             to="/notifications"
             className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
             onClick={() => setIsOpen(false)}
           >
             {/* <Bell className="mr-2 text-purple-500" /> */}
             <span>Notifications</span>
             <span className="ml-auto bg-blue-500 text-white text-xs rounded-full px-2 py-1">2</span>
           </Link>
           <Link
             to="/settings"
             className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
             onClick={() => setIsOpen(false)}
           >
             {/* <SettingsIcon className="mr-2 text-gray-500" /> */}
             <span>Account Settings</span>
           </Link>
         </div>
       
         <div className="px-2 py-2 border-b">
           <Link
             to="/profile"
             className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
             onClick={() => setIsOpen(false)}
           >
             {/* <AccountCircleIcon className="mr-2" /> */}
             <span>Profile</span>
           </Link>
           <Link
             to="/edit-profile"
             className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
             onClick={() => setIsOpen(false)}
           >
             {/* <AccountCircleIcon className="mr-2" /> */}
             <span>Edit Profile</span>
           </Link>
         </div>
       
         <div>
           <Link
             to="/settings"
             className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
             onClick={() => setIsOpen(false)}
           >
             <SettingsIcon className="mr-2" />
             <span>Settings</span>
           </Link>
           <Link
             to="/"
             className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
             onClick={handleLogout}
           >
             <LogoutIcon className="mr-2 text-red-500" />
             <span>Logout</span>
           </Link>
         </div>
       </motion.div>
       
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownMenu;
