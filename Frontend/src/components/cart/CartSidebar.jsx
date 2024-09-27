import React, { useState } from 'react';
import { FaTimes, FaShoppingCart, FaTrashAlt } from 'react-icons/fa';

const CartSidebar = ({ isCartOpen, toggleCart }) => {
    // Dummy cart items state
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Course 1: Introduction to Web Development',
            category: 'Web Development',
            price: 7900, // Price in Rupees
            image: '/images/web-development.jpg',
        },
        {
            id: 2,
            name: 'Course 2: Advanced Data Analysis Techniques',
            category: 'Data Analyst',
            price: 9999,
            image: '/images/data-analyst.jpg',
        },
        {
            id: 3,
            name: 'Course 3: React for Beginners',
            category: 'Frontend Development',
            price: 7200,
            image: '/images/react-beginners.jpg',
        },
    ]);

    // Calculate total price
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

    // Handle item removal
    const handleRemoveItem = (courseId) => {
        const updatedCart = cartItems.filter(item => item.id !== courseId);
        setCartItems(updatedCart);
        console.log(`Course ${courseId} removed from the cart.`);
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

                    {/* Course Items */}
                    <div className="flex-1 overflow-y-auto space-y-4">
                        {cartItems.length === 0 ? (
                            <p className="text-center text-gray-600">Your cart is empty.</p>
                        ) : (
                            cartItems.map((course) => (
                                <div key={course.id} className="course-item flex items-start border-b pb-2 hover:shadow-lg transition p-2 rounded-lg">
                                    <img
                                        src={course.image}
                                        alt={course.name}
                                        className="w-16 h-16 rounded-md mr-3"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-md font-semibold">{course.name}</h3>
                                        <p className="text-xs text-gray-600">Category: {course.category}</p>
                                        <p className="text-xs text-gray-600">Price: ₹{course.price}</p>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveItem(course.id)}
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
                        {/* Coupon Section */}
                        <div>
                            <label htmlFor="coupon" className="block text-sm font-medium text-gray-700">
                                Have a Coupon?
                            </label>
                            <input
                                id="coupon"
                                type="text"
                                placeholder="Enter Coupon Code"
                                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 w-full">
                                Apply Coupon
                            </button>
                        </div>

                        {/* Total Price Summary */}
                        <div>
                            <h3 className="text-lg font-semibold">Total: ₹{totalPrice}</h3>
                        </div>

                        {/* Checkout Button */}
                        <div>
                            <button className="w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 flex items-center justify-center transition ease-in-out duration-300">
                                <FaShoppingCart className="mr-2" /> Proceed to Checkout
                            </button>
                        </div>
                    </div>
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
