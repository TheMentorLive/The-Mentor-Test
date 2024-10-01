import { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { mainContext } from "../../../context/mainContex";

const TestNavbar = () => {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { user, setToken, signOut } = useContext(mainContext);
    const navigate = useNavigate();
    const [showSupportOptions, setShowSupportOptions] = useState(false);

   

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem("user", JSON.stringify(user)));
    }, [user]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                document.body.classList.add('is-scrolling');
            } else {
                document.body.classList.remove('is-scrolling');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleSupportOptions = () => {
        setShowSupportOptions(!showSupportOptions);
    };

    return (
        <div className="items-center flex justify-center">
            <header className="fixed top-0 left-0 w-full bg-[#2563EB] z-50 h-16">
                <div className="flex items-center justify-between py-2 px-4">
                    {/* Logo */}
                    <Link to="/" className="flex ml-10">
                        <img src="/logo.webp" alt="Logo" className="h-12 w-auto" />
                    </Link>

                    {/* Support Button */}
                    <div className="relative">
                        <button 
                            onClick={toggleSupportOptions}
                            className="py-[8px] mr-10 text-md border-white border px-4 bg-[#2563EB] text-white hover:bg-blue-800 rounded-lg transition-colors duration-300 flex items-center"
                        >
                            Support
                        </button>
                        
                        {showSupportOptions && (
                            <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md p-2 w-48">
                                <ul className="space-y-2">
                                    <li><a href="mailto:support@genailearning.com" className="block px-4 py-2 hover:bg-gray-100">support@mentor.com</a></li>
                                    <li><a href="tel:+917878787878" className="block px-4 py-2 hover:bg-gray-100">+91 7878787878</a></li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </div>
    );
};

export default TestNavbar;
