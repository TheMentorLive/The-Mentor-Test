import React, { useContext, useEffect, useState } from "react";
import { IconShoppingCart, IconCreditCard } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { mainContext } from "/src/context/mainContex";
import { toast } from "react-toastify";
import axios from "axios";

export default function Hero({ testDetails }) {
  const [cart, setCart] = useState([]);
  const { user } = useContext(mainContext);

  // Load cart from local storage on initial render
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Update local storage whenever cart changes if no user is logged in
  useEffect(() => {
    if (!user) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = async (item) => {
    try {
      if (user._id) {
       
        
        // Store in backend if user is logged in
        const response = await axios.post("/api/cart", {
          userId: user.id,
          product: item,
        });

        if (response.status === 200) {
          toast.success(`${item.title} added to cart!`);
        } else {
          toast.error("Failed to add item to the cart. Please try again.");
        }
      } else {

        // Store in local storage if no user
        const newCart = [...cart, item];
        setCart(newCart);
        const cartWithoutQuestions = newCart.map(({ questions, ...rest }) => rest)
        // Immediately update local storage
        localStorage.setItem("cart", JSON.stringify(cartWithoutQuestions));
  
        toast.success(`${item.title} added to cart!`);
       
      }
    } catch (error) {
      toast.error("An error occurred while adding to the cart.");
      console.error(error);
    }
  };

  const isItemInCart = (item) => {
    return cart.some((cartItem) => cartItem._id === item._id);
  };

  return (
    <section className="relative flex flex-col md:flex-row items-center justify-center mb-10 md:mt-11 h-auto md:h-[400px]">
      {/* Background Image */}
      <img
        src="./test/test-hero.png"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between max-w-6xl w-full px-4 md:px-8 space-y-8 md:space-y-0">
        {/* Hero Content */}
        <div className="text-white md:w-2/4 flex flex-col items-center md:items-start lg:-ml-[110px] space-y-6">
          <h1 className="text-[24px] sm:text-[30px] md:text-[40px] lg:text-[48px] p-2 font-bold tracking-tight leading-tight text-center md:text-left">
            {testDetails.category}
          </h1>
          <p className="max-w-[550px] text-gray-400 text-center md:text-left p-2 text-sm md:text-base hidden md:block">
            {testDetails.description}
          </p>

          <div className="py-2">
            <Link to="/register">
              <button
                type="button"
                className="w-full max-w-[180px] bg-[#2563EB] hover:bg-blue-500 p-2 text-white font-medium py-2 px-4 rounded hidden md:block"
              >
                Get Started
              </button>
            </Link>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-lg h-fit p-4 md:ml-auto w-full md:w-[300px] lg:w-[350px]">
          <div className="space-y-3">
            <img
              src={testDetails.image}
              alt="Hexagonal pattern"
              className="rounded-lg object-cover w-full h-[150px]"
            />
            <h3 className="text-base font-bold">
              {testDetails.title} / {testDetails.category}
            </h3>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-bold">₹ {testDetails.price}/-</span>
              <span className="text-xs text-gray-500 line-through">₹1000</span>
              <span className="text-xs text-green-600">67% OFF</span>
            </div>
            <p className="text-xs text-gray-500">
              In at iaculis lorem. Praesent tempor dictum tellus ut molestie.
              Sed sed ullamcorper lorem
            </p>
            <div className="flex gap-3">
  {/* Conditional Rendering for Add to Cart or Go to Cart */}
  {isItemInCart(testDetails) ? (
    <Link to="/cart">
      <button className="w-full flex items-center justify-center bg-gray-200 text-gray-800 py-2 px-8 rounded-lg text-sm hover:bg-gray-300 ml-12">
        <IconShoppingCart size={16} />
        Go To Cart
      </button>
    </Link>
  ) : (
    <>
    <button
      className="w-full flex items-center justify-center bg-gray-200 text-gray-800 py-2 px-3 rounded-lg text-sm hover:bg-gray-300 gap-2"
      onClick={() => addToCart(testDetails)}
    >
      <IconShoppingCart size={16} />
      Add to Cart
    </button>

<button className="w-full flex items-center justify-center bg-blue-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-700 gap-2">
<IconCreditCard size={16} />
Checkout
</button>
</>
  )}

  {/* Checkout Button */}
 
</div>

          </div>
        </div>
      </div>
    </section>
  );
}
