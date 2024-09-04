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
    const [isScrolled, setIsScrolled] = useState(false);
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
            if (window.scrollY > 50) {  // Adjust the value as needed
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className={`fixed top-0 mr-32 md:ml-36 md:mr-36 lg:ml-36 lg:mr-36 text-black z-50 ${isScrolled ? "bg-white shadow-lg" : "bg-transparent"}`}>
            <div className="flex items-center justify-between py-1 px-4 text-xs font-bold">
                <div className="flex items-center gap-2 w-full overflow-hidden">
                    <CampaignIcon className="w-4 h-4" />
                    <marquee className="text-xs font-bold" style={{ fontFamily: "Courier New, monospace" }}>
                        JEE 2023 Exam Date Announced - The JEE 2023 exam will be held on April 2, 2023. Registration will open on February 1, 2023. New JEE Preparation Courses Available - Enroll now for early bird discounts.
                    </marquee>
                </div>
            </div>
            <div className="flex items-center md:mr-10 lg:mr-10 justify-between py-2 px-4">
                {/* Mobile screen - Menu icon */}
                <button onClick={toggleMenu} className="lg:hidden text-black text-2xl mr-4" aria-label="Toggle navigation menu">
                    <MenuIcon />
                </button>
                <Link to="/" className="flex items-center space-x-2">
                    <img src="/logo.webp" alt="Logo" className="h-11 ml-36 sm:ml-10 w-auto md:h-11 sm:h-11 lg:h-11" />
                </Link>
                {/* Desktop screen - Navigation links */}
                <nav className="hidden lg:flex  text-sm justify-center items-center">
                    <Link to="/" className="flex items-center space-x-1 py-2 px-3 font-semibold text-gray-900 hover:text-blue-600 hover:bg-gray-100 rounded transition-colors duration-300">
                        <HomeRoundedIcon />
                        <span>Home</span>
                    </Link>
                    <Link to="/courses" className="flex items-center space-x-1 py-2 px-3 font-semibold text-gray-900 hover:text-blue-600 hover:bg-gray-100 rounded transition-colors duration-300">
                        <span>Courses</span>
                    </Link>
                    {!isLoggedIn && (
                        <>
                            <Link to="/pricing" className="flex items-center space-x-1 py-2 px-3 font-semibold text-gray-900 hover:text-blue-600 hover:bg-gray-100 rounded transition-colors duration-300">
                                <span>Pricing</span>
                            </Link>
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
                    <Link to="/upcoming-test" className="flex items-center space-x-1 py-2 px-3 font-semibold text-gray-900 hover:text-blue-600 hover:bg-gray-100 rounded transition-colors duration-300">
                        <span>Upcoming Test</span>
                    </Link>
                    {isLoggedIn && <DropdownMenu isLoggedIn={isLoggedIn} />}
                </nav>
                {!isLoggedIn && (
                    <Link to="/login" className="hidden lg:block py-2 px-4 bg-blue-600 text-white hover:bg-blue-800 rounded transition-colors duration-300">
                        Get Started
                    </Link>
                )}
            </div>
            {/* Mobile screen - Slide-out navigation menu */}
            <div className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out}`}>
                <div className="flex flex-col py-4 px-6">
                    {/* Mobile screen - Close menu button */}
                    <button onClick={toggleMenu} className="self-end text-black text-2xl" aria-label="Close navigation menu">
                        <FaTimes />
                    </button>
                    <div className="flex justify-center py-4">
                        <Link to="/" className="flex items-center space-x-2 py-2 px-4 text-black hover:bg-gray-200 transition-colors duration-300">
                            <img src="/logo.webp" alt="Logo" className="h-8 w-auto mr-40 md:h-6 transition-all duration-300" />
                        </Link>
                    </div>
                    <Link to="/courses" className="block py-2 px-4 font-semibold text-black hover:text-blue-600 hover:bg-gray-200 transition-colors duration-300">
                        Courses
                    </Link>
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
                            <Link to="/login" className="block py-2 px-4 font-semibold text-blue-500 hover:text-blue-600 hover:bg-gray-200 transition-colors duration-300">
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
    );
};

export default Header;
