import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartDetails, removeCartItem } from '/src/redux/CartDetailsSlice'; // Adjust path
import { FaTimes, FaShoppingCart, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { mainContext } from '/src/context/mainContex';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import axios from 'axios';
import { USERENDPOINTS } from '/src/constants/ApiConstants';

const CartSidebar = ({ isCartOpen, toggleCart, user }) => {
    const dispatch = useDispatch();
    const { items: cartItems, loading, error } = useSelector((state) => state.cartDetails);
    const { token } = useContext(mainContext);


 
    useEffect(() => {
      
            dispatch(fetchCartDetails(token));
        
    }, []);

    const totalPrice = cartItems.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);

    const handleRemoveItem = async (id) => {
        console.log(id);
        
        // Show confirmation dialog using SweetAlert
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, keep it",
          reverseButtons: true,
        });
      
        // Proceed with removal if confirmed
        if (result.isConfirmed) {
          // Check if ID is valid
          if (!id) {
            console.error("Item ID is undefined");
            return;
          }
      
          try {
            // Remove item from the state immediately (optimistic update)
            // const updatedItems = items.filter((item) => item._id !== id);
            // setItems(updatedItems);
      
            // Update backend or localStorage
            if (token) {
              await axios.delete(`${USERENDPOINTS.REMOVE_FROM_CART}/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              // Refetch the cart data after successful deletion
              dispatch(fetchCartDetails(token));
              // Show success toast message
              toast.success("Item removed from cart successfully!");
            } else {
            //   localStorage.setItem("cart", JSON.stringify(updatedItems));
              // Show success toast message for localStorage
              toast.success("Item removed from cart!");
            }
          } catch (error) {
            console.error("Error removing item from backend:", error);
            // Revert the item removal in case of error
            // Revert state to original items if error occurs
            dispatch(fetchCartDetails(token)); // Refetch cart to restore previous state
            toast.error("Error removing item from cart.");
          }
        } else {
          // If the user canceled the operation
          toast.info("Item removal canceled.");
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
                    <button onClick={toggleCart} className="self-end text-black text-2xl" aria-label="Close cart sidebar">
                        <FaTimes />
                    </button>
                    <h2 className="text-xl font-bold mb-4">Your Cart</h2>

                    {/* Loading and Error State */}
                    {loading ? (
                        <p className="text-center text-gray-600">Loading...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : (
                        <>
                            {/* Course Items */}
                            <div className="flex-1 overflow-y-auto space-y-4">
                                {cartItems.length === 0 ? (
                                    <p className="text-center text-gray-600">Your cart is empty.</p>
                                ) : (
                                    cartItems.map((item) => (
                                        <div
                                            key={item._id}
                                            className="course-item flex items-start border-b pb-2 hover:shadow-lg transition p-2 rounded-lg"
                                        >
                                            <img
                                                src={
                                                    item.image ||
                                                    'https://img.freepik.com/premium-vector/test-icon-illustration_430232-32.jpg'
                                                }
                                                alt={item.title}
                                                className="w-16 h-16 rounded-md mr-3"
                                            />
                                            <div className="flex-1">
                                                <h3 className="text-md font-semibold">{item.title}</h3>
                                                <p className="text-xs text-gray-600">Category: {item.category}</p>
                                                <p className="text-xs text-gray-600">Price: ₹{item.price}</p>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveItem(item.id)}
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
                                <div>
                                    <h3 className="text-lg font-semibold">Total: ₹{totalPrice}</h3>
                                </div>
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

            {/* Overlay */}
            {isCartOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleCart}></div>
            )}
        </>
    );
};

export default CartSidebar;
