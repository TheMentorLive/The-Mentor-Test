import React, { useState, useEffect, useContext } from 'react';
import { FaTimes, FaShoppingCart, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { USERENDPOINTS } from '/src/constants/ApiConstants';
import { mainContext } from '/src/context/mainContex';


const CartSidebar = ({ isCartOpen, toggleCart, user }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const {token}= useContext(mainContext)

    // Fetch cart items based on login state
    const fetchCart = async () => {
        setLoading(true);
        try {
            if (token) {
                // Fetch cart from backend
                const response = await axios.get(USERENDPOINTS.GET_CART_DETAILS, {
                    headers: {
                        Authorization: `Bearer ${token}` // Include the token in the header
                    }
                });
                console.log(response.data);
                
                if (response.status === 200) {
                    setCartItems(response.data.cartDetails || []);
                } else {
                    console.error('Failed to fetch cart from backend.');
                }
            } else {
                // Fetch cart from local storage
                const localCart = JSON.parse(localStorage.getItem('cart')) || [];
                setCartItems(localCart);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [token]); // Refetch cart if the user changes

    // Listen for local storage changes
    useEffect(() => {
        const handleStorageChange = () => {
            if (!user || !user._id) {
                fetchCart();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [user]);

    // Calculate total price
   // Calculate total price
   let totalPrice = 0;
   cartItems.forEach((item) => {
       const itemPrice = parseFloat(item.price) || 0; // Ensure price is a valid number
       totalPrice += itemPrice; // Add the item's price to the total
   });

    // Handle item removal
    const handleRemoveItem = async (courseId) => {
        try {
            if (user && user._id) {
                // Remove from backend
                const response = await axios.delete(`/api/cart/${user._id}/${courseId}`);
                if (response.status === 200) {
                    setCartItems((prev) => prev.filter((item) => item._id !== courseId));
                } else {
                    console.error('Failed to remove item from backend cart.');
                }
            } else {
                // Remove from local storage
                const updatedCart = cartItems.filter((item) => item._id !== courseId);
                setCartItems(updatedCart);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                window.dispatchEvent(new Event('storage')); // Trigger local storage event
            }
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    return (
        <>
            {/* Cart Sidebar */}
            <div
                className={`fixed top-0 right-0 w-[450px] h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
                    isCartOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex flex-col py-4 px-6 h-full">
                    {/* Close button */}
                    <button
                        onClick={toggleCart}
                        className="self-end text-black text-2xl"
                        aria-label="Close cart sidebar"
                    >
                        <FaTimes />
                    </button>
                    <h2 className="text-xl font-bold mb-4">Your Cart</h2>

                    {/* Loading State */}
                    {loading ? (
                        <p className="text-center text-gray-600">Loading...</p>
                    ) : (
                        <>
                            {/* Course Items */}
                            <div className="flex-1 overflow-y-auto space-y-4">
                                {cartItems.length === 0 ? (
                                    <p className="text-center text-gray-600">Your cart is empty.</p>
                                ) : (
                                    cartItems.map((test) => (
                                        <div
                                            key={test.id || test._id}
                                            className="course-item flex items-start border-b pb-2 hover:shadow-lg transition p-2 rounded-lg"
                                        >
                                            <img
                                                src={test.image||"https://img.freepik.com/premium-vector/test-icon-illustration_430232-32.jpg"}
                                                alt={test.title}
                                                className="w-16 h-16 rounded-md mr-3"
                                            />
                                            <div className="flex-1">
                                                <h3 className="text-md font-semibold">{test.title}</h3>
                                                <p className="text-xs text-gray-600">Category: {test.category}</p>
                                                <p className="text-xs text-gray-600">Price: ₹{test.price}</p>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveItem(test.id || test._id)}
                                                className="p-1 text-red-500 hover:text-red-700"
                                                aria-label="Remove item"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Sticky Bottom Section */}
                            <div className="sticky bottom-0 bg-gray-50 py-4 space-y-4">
                                {/* Total Price Summary */}
                                <div>
                                    <h3 className="text-lg font-semibold">Total: ₹{totalPrice}</h3>
                                </div>

                                {/* Checkout Button */}
                                <div>
                                    <Link to="/cart">
                                        <button className="w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 flex items-center justify-center transition ease-in-out duration-300">
                                            <FaShoppingCart className="mr-2" /> Proceed to Checkout
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Cart Overlay (for closing the cart when clicking outside) */}
            {isCartOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleCart}
                ></div>
            )}
        </>
    );
};

export default CartSidebar;
