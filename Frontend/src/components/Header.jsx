import { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai"; // Cart Icon
import { FaTimes } from "react-icons/fa"; // Close icon
import { FiUser } from "react-icons/fi";
import MenuIcon from "@mui/icons-material/Menu"; // Mobile menu icon
import { mainContext } from "../context/mainContex";
import DropdownMenu from "./userComponent/DropDownMenu";
import CartSidebar from "./cart/CartSidebar"; // Cart Sidebar Component
import TopHeader from "./userComponent/landingpageComponents/TopHeader";

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
           <header className="fixed top-0 left-0 w-full bg-white lg:h-[48px]  z-50  ">
    {/* Top Header */}
    {/* <TopHeader /> */}

    {/* Main Header */}
    <div className="flex items-center justify-between px-4 py-2 sm:px-8 md:px-16 lg:px-24 ">
        {/* Logo */}
        <Link to="/" className="flex items-center -mt-2">
            <img
                src="/logo.webp"
                alt="Logo"
                className="h-12 w-auto "
            />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex space-x-6">
            {["Live", "Learn", "Tests", "Jobs", "About"].map((page) => (
                <Link
                    key={page}
                    to={`/${page}`}
                    className={`text-sm font-medium py-1 px-3 rounded transition-colors duration-300 ${
                        location.pathname === `/${page}`
                            ? "font-bold text-blue-600"
                            : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                    }`}
                >
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                </Link>
            ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-3">
            {location.pathname === "/learn" && (
                <button onClick={toggleCart} className="relative">
                    <AiOutlineShoppingCart className="text-xl text-gray-700" />
                </button>
            )}
            {!isLoggedIn ? (
                <>
                    <Link
                        to="/login"
                        className="flex items-center text-sm px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-100 transition"
                    >
                        <FiUser className="mr-2" />
                        Sign In
                    </Link>
                    <Link
                        to="/register"
                        className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Sign Up
                    </Link>
                </>
            ) : (
                <DropdownMenu />
            )}
        </div>

        {/* Mobile Menu Icon */}
        <button
            onClick={toggleMenu}
            className="lg:hidden text-gray-700 text-2xl py-2 px-4"
            aria-label="Toggle navigation menu"
        >
            <MenuIcon />
        </button>
    </div>

    {/* Mobile Navigation Menu */}
    <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
    >
        <div className="flex flex-col py-4 px-5">
            <button
                onClick={toggleMenu}
                className="self-end text-gray-700 text-2xl"
                aria-label="Close navigation menu"
            >
                <FaTimes />
            </button>
            {["Live", "Learn", "Test", "Jobs", "About"].map((page) => (
                <Link
                    key={page}
                    to={`/${page}`}
                    onClick={toggleMenu}
                    className={`block py-2 px-4 mb-2 text-lg font-medium ${
                        location.pathname === `/${page}`
                            ? "text-blue-600 font-bold"
                            : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                    }`}
                >
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                </Link>
            ))}
            <Link
                to="/login"
                className="block py-2 px-4 text-lg text-blue-500 font-medium hover:bg-blue-100 transition"
            >
                Sign In
            </Link>
            <Link
                to="/register"
                className="block py-2 px-4 mt-2 text-lg bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition"
            >
                Sign Up
            </Link>
        </div>
    </div>
</header>


            {/* Cart Sidebar */}
            {isCartOpen && <CartSidebar onClose={toggleCart} />}
        </div>
    );
};

export default Header;
