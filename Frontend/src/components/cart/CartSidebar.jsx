import React, { useState } from 'react';
import { FaTimes, FaShoppingCart, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CartSidebar = ({ isCartOpen, toggleCart }) => {
    // Dummy cart items state
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'JEE Series: Physics Mastery',
            category: 'JEE Preparation',
            price: 15000, // Price in Rupees
            image: '/images/jee-physics.jpg',
        },
        {
            id: 2,
            name: 'NEET Series: Biology Essentials',
            category: 'NEET Preparation',
            price: 13500,
            image: '/images/neet-biology.jpg',
        },
        {
            id: 3,
            name: 'JEE Series: Chemistry Excellence',
            category: 'JEE Preparation',
            price: 14000,
            image: '/images/jee-chemistry.jpg',
        },
        {
            id: 4,
            name: 'NEET Series: Physics Crash Course',
            category: 'NEET Preparation',
            price: 12000,
            image: '/images/neet-physics.jpg',
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
                      

                        {/* Total Price Summary */}
                        <div>
                            <h3 className="text-lg font-semibold">Total: ₹{totalPrice}</h3>
                        </div>

                        {/* Checkout Button */}
                        <div>
                            <Link to="/Cart">
                            <button  className="w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 flex items-center justify-center transition ease-in-out duration-300">
                                <FaShoppingCart className="mr-2" /> Proceed to Checkout
                            </button>
                            </Link>
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
