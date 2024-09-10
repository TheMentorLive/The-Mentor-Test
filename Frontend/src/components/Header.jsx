import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { FaTimes } from "react-icons/fa";
import { mainContext } from "../context/mainContex";
import DropdownMenu from "./userComponent/DropDownMenu";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { user, setToken, signOut } = useContext(mainContext);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        signOut();
        setToken("");
        navigate("/login");
    };

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

    return (
        <div className="items-center flex justify-center">
            <header className={`fixed top-0 left-0 w-full bg-white  z-50`}>
                <div className="flex items-center md:mt-2 lg:mt-2 md:mb-2 lg:mb-2 justify-between py-4 px-4">
                    <Link to="/" className="md:flex hidden lg:flex md:ml-[170px]">
                        <img src="/logo.webp" alt="Logo" className="h-11 w-auto" />
                    </Link>
                    <nav className="hidden lg:flex text-sm justify-center items-center">
                        
                    <Link to="/pricing" className="flex items-center space-x-1 py-2 px-3 font-semibold text-gray-900 hover:text-blue-600 hover:bg-gray-100 rounded transition-colors duration-300">
                                    <span>Live</span>
                                </Link>
                                <Link to="/pricing" className="flex items-center space-x-1 py-2 px-3 font-semibold text-gray-900 hover:text-blue-600 hover:bg-gray-100 rounded transition-colors duration-300">
                                    <span>Learn</span>
                                </Link>
                                
                        {!isLoggedIn && (
                            <>
                                
                                <Link to="/support" className="flex items-center space-x-1 py-2 px-3 font-semibold text-gray-900 hover:text-blue-600 hover:bg-gray-100 rounded transition-colors duration-300">
                                    <span>Support</span>
                                </Link>
                            </>
                        )}
                        {isLoggedIn && (
                            <>
                                <Link to="/subjects" className="flex items-center space-x-1 py-2 px-3 font-semibold text-gray-900 hover:text-blue-600 hover:bg-gray-100 rounded transition-colors duration-300">
                                    <span>Subjects</span>
                                </Link>
                                <Link to="/test-history" className="flex items-center space-x-1 py-2 px-3 font-semibold text-gray-900 hover:text-blue-600 hover:bg-gray-100 rounded transition-colors duration-300">
                                    <span>Test History</span>
                                </Link>
                            </>
                        )}
                        
                        {isLoggedIn && <DropdownMenu isLoggedIn={isLoggedIn} />}
                    </nav>
                    {!isLoggedIn && (
                        <>
                        <Link to="/login" className="hidden md:-mr-[300px]  lg:block py-[7px] text-md px-4 border border-blue-600 text-blue-600 hover:bg-blue-800 hover:text-white rounded-lg transition-colors duration-300">
                            Log In
                        </Link>
                        <Link to="/register" className="hidden md:mr-[170px]  lg:block py-[7px] text-md px-4 bg-blue-600 text-white hover:bg-blue-800 rounded-lg transition-colors duration-300">
                            Sign Up
                        </Link>
                        </>
                    )}
                </div>





                

                {/* Mobile screen - Slide-out navigation menu */}
                <div className="flex items-center -mt-2  px-6">
                    <button onClick={toggleMenu} className="lg:hidden text-black text-2xl mr-4" aria-label="Toggle navigation menu">
                        <MenuIcon />
                    </button>

                    <Link to="/" className="flex ml-[220px] lg:hidden md:hidden items-center space-x-2 py-2 text-black hover:bg-gray-200 transition-colors duration-300">
                        <img src="/logo.webp" alt="Logo" className="h-8 w-auto" />
                    </Link>
                </div>

                <div className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}>
                    <div className="flex flex-col py-4 px-6">
                        <button onClick={toggleMenu} className="self-end text-black text-2xl" aria-label="Close navigation menu">
                            <FaTimes />
                        </button>

                        {/* Rest of your menu items */}

                        <Link to="/courses" className="block py-2 px-4 font-semibold text-black hover:text-blue-600 hover:bg-gray-200 transition-colors duration-300">
                            Courses
                        </Link>

                        {/* Conditional Links based on isLoggedIn */}

                        {isLoggedIn && (
                            <>
                                <Link to="/subjects" className="block py-2 px-4 font-semibold text-black hover:text-blue-600 hover:bg-gray-200 transition-colors duration-300">
                                    Subjects
                                </Link>
                                <Link to="/test-history" className="block py-2 px-4 font-semibold text-black hover:text-blue-600 hover:bg-gray-200 transition-colors duration-300">
                                    Test History
                                </Link>
                            </>
                        )}

                        <Link to="/upcoming-test" className="block py-2 px-4 font-semibold text-black hover:text-blue-600 hover:bg-gray-200 transition-colors duration-300">
                            Upcoming Test
                        </Link>

                        {!isLoggedIn && (
                            <>
                                <Link to="/pricing" className="block py-2 px-4 font-semibold text-black hover:text-blue-600 hover:bg-gray-200 transition-colors duration-300">
                                    Pricing
                                </Link>
                                <Link to="/support" className="block py-2 px-4 font-semibold text-black hover:text-blue-600 hover:bg-gray-200 transition-colors duration-300">
                                    Support
                                </Link>
                                <Link to="/login" className="block py-2 px-4 font-semibold text-[#2563EB] hover:text-blue-600 hover:bg-gray-200 transition-colors duration-300">
                                    Get Started
                                </Link>
                            </>
                        )}

                        {isLoggedIn && <DropdownMenu isLoggedIn={isLoggedIn} />}
                    </div>
                </div>

                {/* Mobile screen - Overlay */}
                {isMenuOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu}></div>
                )}

            </header>
        </div>
    );
};

export default Header;
