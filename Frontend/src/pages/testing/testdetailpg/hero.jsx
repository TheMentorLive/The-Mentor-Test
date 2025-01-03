import React, { useContext, useEffect, useMemo, useState, useRef } from "react";
import { IconShoppingCart, IconCreditCard, IconLoader } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { mainContext } from "/src/context/mainContex";
import { toast } from "react-toastify";
import axios from "axios";
import { USERENDPOINTS } from "/src/constants/ApiConstants";
import Swal from "sweetalert2";
import { List } from "lucide-react";
import { usePaidTests } from "/src/hooks/usePaidTest";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart } from "../../../redux/Cartslice";
import { fetchCartDetails } from "../../../redux/CartDetailsSlice";

export default function Hero({ testDetails }) {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user, token } = useContext(mainContext);
  const { paidTests, refetch } = usePaidTests(token);

  const dispatch = useDispatch();
  const { items: usercart } = useSelector((state) => state.cart);

  const cardRef = useRef(null);

  useEffect(() => {
    if (token) {
      dispatch(fetchCart(token));
    }
  }, [dispatch, token]);

  const userCartIncludes = useMemo(() => usercart.includes(testDetails?._id), [usercart, testDetails?._id]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    if (!user) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    const handleScroll = () => {
      const card = cardRef.current;
      const scrollTop = window.scrollY;
      const offsetTop = card.parentElement.offsetTop;

      if (card) {
        if (scrollTop > offsetTop && scrollTop < 670) {
          card.style.position = 'fixed';
          card.style.top = '60px';
          card.style.right = '87px';
        } else if (scrollTop >= 670) {
          card.style.position = 'absolute';
          card.style.top = '670px';
          card.style.right = '14px';
        } else {
          card.style.position = 'relative';
          card.style.top = '0';
          card.style.right = '0';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const addToCart = async (item) => {
    setIsLoading(true);
    try {
      if (user._id) {
        const response = await axios.post(
          USERENDPOINTS.ADD_TO_CART,
          { testId: item._id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          toast.success(response.data.message);
          dispatch(fetchCart(token));
          dispatch(fetchCartDetails(token));
          setIsLoading(false);
        } else {
          toast.error("Failed to add item to the cart. Please try again.");
        }
      } else {
        const newCart = [...cart, item];
        setCart(newCart);
        const cartWithoutQuestions = newCart.map(({ questions, ...rest }) => rest);
        localStorage.setItem("cart", JSON.stringify(cartWithoutQuestions));
        toast.success(`${item.title} added to cart!`);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
      console.error("Add to Cart Error:", error);
    }
  };

  const isItemInCart = (item) => {
    return cart.some((cartItem) => cartItem._id === item._id);
  };

  const handleBuyNow = async (testId) => {
    if (!token) {
      Swal.fire({
        title: "Login Required",
        text: "You must log in to purchase this test.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Go to Login",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
      return;
    }

    try {
      const response = await axios.post(USERENDPOINTS.CREATEPAYMENT, { testId });
      const data = response.data;

      if (data && data.order && data.order.id && data.order.amount) {
        const { id, amount } = data.order;
        const options = {
          key: "rzp_test_AVLwAyEyI2Fn5Q",
          amount: amount,
          currency: "INR",
          order_id: id,
          name: "The Mentor Payment",
          description: "Purchase Test",
          image: "https://thementor.live/wp-content/uploads/2021/10/Google-Logo-300x124.png",
          handler: function (response) {
            axios.post(USERENDPOINTS.VERIFYPAYMENT, {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
              testId: testId
            }, {
              headers: {
                Authorization: `Bearer ${token}`,
              }
            }).then((res) => {
              console.log("Payment verified:", res.data);
              refetch();
            }).catch((err) => {
              console.error("Payment verification failed:", err);
            });
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact: user.contact,
          },
          notes: {
            address: "Test address",
          },
          theme: {
            color: "#FF5722",
          },
        };

        if (window.Razorpay) {
          const rzp = new window.Razorpay(options);
          rzp.open();
        } else {
          console.error("Razorpay script not loaded.");
        }
      } else {
        console.error("Invalid response: Missing orderId or amount");
      }
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
    }
  };

  const isTestPurchased = paidTests.includes(testDetails?._id);

  return (
    <section className="relative flex flex-col md:flex-row items-center justify-center mb-10 md:mt-11 h-auto md:h-[400px] mr-[54px] ">
      {/* Background Image */}
      <img
        src="./test/test-hero.png"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between w-full px-4 md:px-8 space-y-8 md:space-y-0">
        {/* Hero Content */}
        <div className="text-white lg:mx-16 flex flex-col items-center md:items-start space-y-6">
          <h1 className="text-[24px] sm:text-[30px] md:text-[40px] lg:text-[48px] p-2 font-bold tracking-tight leading-tight text-center md:text-left">
            {testDetails.category}
          </h1>
          <p className="max-w-[550px] text-gray-400 text-center md:text-left p-2 text-sm md:text-base hidden md:block">
            {testDetails.description}
          </p>
          <div className="py-2">
            {isTestPurchased ? (
              <Link to="/Tests">
                <button
                  type="button"
                  className="w-full max-w-[180px] bg-[#2563EB] hover:bg-blue-500 p-2 text-white font-medium py-2 px-4 rounded hidden md:block"
                >
                  Explore More
                </button>
              </Link>
            ) : (
              <Link to="/register">
                <button
                  type="button"
                  className="w-full max-w-[180px] bg-[#2563EB] hover:bg-blue-500 p-2 text-white font-medium py-2 px-4 rounded hidden md:block"
                >
                  Get Started
                </button>
              </Link>
            )}
          </div>
        </div>

        <div
          ref={cardRef}
          className="bg-white rounded-lg shadow-lg h-fit p-4 md:ml-auto w-full md:w-[300px] lg:w-[350px] mr-12 sm:mr-0"
        >
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
            <div className="flex flex-col sm:flex-row gap-3">
              {isItemInCart(testDetails) || userCartIncludes ? (
                <Link to="/cart">
                  <button className="w-full flex items-center justify-center bg-gray-200 text-gray-800 py-2 px-8 rounded-lg text-sm hover:bg-gray-300">
                    <IconShoppingCart size={16} />
                    Go To Cart
                  </button>
                </Link>
              ) : (
                <>
                  {isTestPurchased ? (
                    <Link to="/dashboard">
                      <button
                        className="w-full flex items-center justify-center bg-gray-200 text-gray-800 py-2 px-3 rounded-lg text-sm hover:bg-gray-300 gap-2"
                      >
                        <List size={16} />
                        Go To Learnings
                      </button>
                    </Link>
                  ) : (
                    <button
                      className={`w-full flex items-center justify-center bg-gray-200 text-gray-800 py-2 px-3 rounded-lg text-sm hover:bg-gray-300 gap-2 ${isLoading ? "cursor-not-allowed opacity-50" : ""
                        }`}
                      onClick={() => addToCart(testDetails)}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <IconLoader className="animate-spin" size={16} />
                      ) : (
                        <IconShoppingCart size={16} />
                      )}
                      {isLoading ? "Adding..." : "Add to Cart"}
                    </button>
                  )}

                  {isTestPurchased ? (
                    <p className="text-green-500">You own this test.</p>
                  ) : (
                    <button
                      className="w-full flex items-center justify-center bg-blue-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-700 gap-2"
                      onClick={() => handleBuyNow(testDetails._id)}
                    >
                      <IconCreditCard size={16} />
                      Checkout
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}