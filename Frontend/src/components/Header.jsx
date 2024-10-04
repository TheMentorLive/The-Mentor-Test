import { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai"; // Cart Icon
import { FaTimes } from "react-icons/fa"; // Close icon
import { FiUser } from "react-icons/fi";
import MenuIcon from "@mui/icons-material/Menu"; // Mobile menu icon
import { mainContext } from "../context/mainContex";
import DropdownMenu from "./userComponent/DropDownMenu";
import CartSidebar from "./cart/CartSidebar"; // Cart Sidebar Component

const Header = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false); // State for cart sidebar
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { user, setToken, signOut } = useContext(mainContext);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen); // Toggle cart state
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
            <header className="fixed top-0 left-0 w-full bg-white z-50 h-16 md:h-14 lg:h-[69px] md:-mt-2 lg:-mt-2">
                <div className="flex items-center justify-between py-2 px-4">
                    {/* Desktop Logo */}
                    <Link to="/" className="md:flex hidden lg:flex md:ml-[147px] lg:ml-[147px]">
                        <img src="/logo.webp" alt="Logo" className="md:h-16 lg:h-[61px] w-auto" />
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden lg:flex justify-center gap-5 items-center">
                        <Link
                            to="/live"
                            className={`flex text-[17px] items-center space-x-1 py-2 px-3 rounded transition-colors duration-300 ${location.pathname === '/live' ? 'font-bold text-blue-600' : 'text-gray-900 hover:text-blue-600 hover:bg-gray-100'}`}
                        >
                            <span>Live</span>
                        </Link>
                        <Link
                            to="/learn"
                            className={`flex text-[17px] items-center space-x-1 py-2 px-3 rounded transition-colors duration-300 ${location.pathname === '/learn' ? 'font-bold text-blue-600' : 'text-gray-900 hover:text-blue-600 hover:bg-gray-100'}`}
                        >
                            <span>Learn</span>
                        </Link>
                        <Link to="/pricing" className="flex text-[17px] hover:font-bold items-center space-x-1 py-2 px-3 text-gray-900 hover:text-blue-600 hover:bg-gray-100 rounded transition-colors duration-300">
                            <span>Jobs</span>
                        </Link>
                        {!isLoggedIn && (
                            <Link to="/support" className={`flex text-[17px] items-center space-x-1 py-2 px-3 rounded transition-colors duration-300 ${location.pathname === '/support' ? 'font-bold text-blue-600' : 'text-gray-900 hover:text-blue-600 hover:bg-gray-100'}`}
                            >
                                <span>Support</span>
                            </Link>
                        )}
                        {isLoggedIn && (
                            <>
                                <Link to="/subjects" className="flex hover:font-bold items-center space-x-1 py-2 px-3 text-gray-900 hover:text-blue-600 hover:bg-gray-100 rounded transition-colors duration-300">
                                    <span>Subjects</span>
                                </Link>
                                <Link to="/test-history" className="flex hover:font-bold items-center space-x-1 py-2 px-3 text-gray-900 hover:text-blue-600 hover:bg-gray-100 rounded transition-colors duration-300">
                                    <span>Test History</span>
                                </Link>
                            </>
                        )}
                        {isLoggedIn && <DropdownMenu isLoggedIn={isLoggedIn} />}
                    </nav>

                    {/* Desktop Sign In / Cart */}
                    <div className="hidden md:flex items-center space-x-2 md:mr-[134px] lg:mr-[134px]">
                        {/* Conditionally render Cart Icon on /learn page */}
                        {location.pathname === "/learn" && (
                            <button onClick={toggleCart} className="relative mr-3">
                                <AiOutlineShoppingCart className="text-2xl text-gray-700" />
                            </button>
                        )}
                        {!isLoggedIn && (
                            <>
                                <Link
                                    to="/login"
                                    className="flex items-center py-[10px] text-md px-2 bg-white text-gray-900 hover:bg-gray-300 border-blue-500 border rounded-lg transition-colors duration-300"
                                >
                                    <span className="mr-2">
                                        <FiUser />
                                    </span>
                                    <span>Sign In</span>
                                </Link>
                                <Link to="/register" className="py-[10px] text-md px-4 bg-blue-600 text-white hover:bg-blue-800 rounded-lg transition-colors duration-300">
                                    Sign Up
                                </Link>
                            </>
                        )}

                    </div>


                </div>






                {/* Mobile screen - Slide-out navigation menu */}
                <div className="flex items-center -mt-2 px-6">
                    <button
                        onClick={toggleMenu}
                        className="lg:hidden text-black mb-3 text-3xl mr-4" // Increase text size here
                        aria-label="Toggle navigation menu"
                    >
                        <MenuIcon className="h-8 w-8" />
                    </button>

                    <Link to="/" className="flex ml-[220px] lg:hidden md:hidden items-center space-x-2 py-2 text-black hover:bg-gray-200 transition-colors duration-300">
                        <img src="/logo.webp" alt="Logo" className="h-[45px] lg:hidden md:hidden w-auto" />
                    </Link>
                </div>

                <div className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}>
                    <div className="flex flex-col py-4 px-6">
                        <button onClick={toggleMenu} className="self-end text-black text-2xl" aria-label="Close navigation menu">
                            <FaTimes />
                        </button>

                        {/* Rest of your menu items */}


                        <Link to="/Live" className={`block py-2 px-4 -mb-5 font-semibold text-black hover:text-blue-600 hover:bg-gray-200 transition-colors duration-300 ${location.pathname === '/live' ? 'font-bold text-blue-600' : 'text-gray-900 hover:text-blue-600 hover:bg-gray-100'}`}
                        >
                            Live
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
                            {/* Upcoming Test */}
                        </Link>

                        {!isLoggedIn && (
                            <>
                                <Link to="/pricing" className="block py-2 px-4 font-semibold text-black hover:text-blue-600 hover:bg-gray-200 transition-colors duration-300">
                                    Learn
                                </Link>
                                <Link to="/support" className="block py-2 px-4 font-semibold text-black hover:text-blue-600 hover:bg-gray-200 transition-colors duration-300">
                                    Jobs
                                </Link>
                                <Link to="/login" className="block py-2 px-4 font-semibold text-[#2563EB] hover:text-blue-600 hover:bg-gray-200 transition-colors duration-300">
                                    Sign In
                                </Link>
                                <Link to="/register" className="block py-2 px-4 font-semibold text-[#2563EB] hover:text-blue-600 hover:bg-gray-200 transition-colors duration-300">
                                    Sign Up
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


            {/* Cart Sidebar Component */}
            <CartSidebar isCartOpen={isCartOpen} toggleCart={toggleCart} />
        </div>
    );
};

export default Header;
