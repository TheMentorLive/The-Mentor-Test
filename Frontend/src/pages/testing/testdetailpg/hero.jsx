import React, { useContext, useEffect, useMemo, useState } from "react";
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
import { fetchCartDetails, removeCartItem } from "../../../redux/CartDetailsSlice"

export default function Hero({ testDetails }) {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
 // State to hold cart data
//  const [userCart, setuserCart] = useState([]);
//   const [isInCart, setIsInCart] = useState(false);

  const { user,token } = useContext(mainContext);
  const { paidTests, loading: paidTestsLoading, error: paidTestsError,refetch } =
  usePaidTests(token);

  const dispatch = useDispatch();
  const { items: usercart, loading, error } = useSelector((state) => state.cart);
 

  React.useEffect(() => {
    if (token) {
      dispatch(fetchCart(token));
    }
  }, [dispatch, token]);
  
  const userCartIncludes = useMemo(() => usercart.includes(testDetails?._id), [usercart, testDetails?._id]);

  
  // useEffect(() => {
  //   if (user._id) {
  //     fetchCart();
  //   }
  // }, [user._id]);
  //   // Fetch cart data on component mount
  //   const fetchCart = async () => {
   
  //     try {
  //       const response = await axios.get(USERENDPOINTS.GET_CART, {
  //         headers: {
  //           Authorization: `Bearer ${token}`, // Include user's token
  //         },
  //       });
       
        

  //       if (response.status === 200) {
  //         setuserCart(response.data.testIds); // Set cart data
  //       } else {
  //         toast.error("Failed to fetch cart data.");
  //       }
  //     } catch (error) {
  //       toast.error("An error occurred while fetching cart data.");
  //       console.error(error);
  //     }
  //   };

    
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
    setIsLoading(true);
    try {
      if (user._id) {
        // Send request to the backend
        const response = await axios.post(
          USERENDPOINTS.ADD_TO_CART,
          { testId: item._id }, // Only send the required test ID
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the user's token for authentication
              "Content-Type": "application/json", // Set content type
            },
          }
        );
  
        // Check response status and display message
        if (response.status === 200) {
          toast.success(response.data.message); 
          
         dispatch( fetchCart(token));
         dispatch( fetchCartDetails(token));
         setIsLoading(false);// Show success message from the backend
        } else {
          toast.error("Failed to add item to the cart. Please try again."); // Handle unexpected status
        }
      } else {
        // Handle case for unauthenticated users (local storage logic)
        const newCart = [...cart, item];
        setCart(newCart);
        const cartWithoutQuestions = newCart.map(({ questions, ...rest }) => rest);
        localStorage.setItem("cart", JSON.stringify(cartWithoutQuestions));
        toast.success(`${item.title} added to cart!`);
      }
    } catch (error) {
      // Show the backend error message or a generic fallback
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message); // Backend message
      } else if (error.message) {
        toast.error(`Error: ${error.message}`); // General Axios/network error
      } else {
        toast.error("An unexpected error occurred. Please try again."); // Fallback
      }
  
      console.error("Add to Cart Error:", error);
    }
  };
  

  const isItemInCart = (item) => {
    return cart.some((cartItem) => cartItem._id === item._id);
  };




  const handleBuyNow = async (testId) => {
    if (!token) {
      // Show SweetAlert2 popup for login
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
          // Redirect to login page
          window.location.href = "/login"; // Update with your actual login page route
        }
      });
  
      return; // Exit the function if the user is not logged in
    }
    
    try {
      // Make a request to your backend to create a Razorpay order using axios
      const response = await axios.post(USERENDPOINTS.CREATEPAYMENT, { testId });
  
      const data = response.data;
      // Check if the backend response contains order details
      if (data && data.order && data.order.id && data.order.amount) {
        const { id, amount } = data.order;    
        // Razorpay options for checkout
        const options = {
          key: "rzp_test_AVLwAyEyI2Fn5Q", // Replace with your Razorpay API key
          amount: amount, // The amount to be charged (in paise)
          currency: "INR", // Currency
          order_id: id, // The order ID created in the backend
          name: "The Mentor Payment", // Your company or test name
          description: "Purchase Test",
          image: "https://thementor.live/wp-content/uploads/2021/10/Google-Logo-300x124.png", // Your company logo
  
          handler: function (response) {
            // Send the payment details to your backend for verification
            axios.post(USERENDPOINTS.VERIFYPAYMENT, {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
               // Pass the logged-in user's ID
              testId: testId
            },{
              headers: {
                Authorization: `Bearer ${token}`,} // Send the token as Bearer token
              }).then((res) => {
                    // Reload the page after successful payment verification
          
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
  
        // Ensure Razorpay is loaded before calling the checkout
        if (window.Razorpay) {
          const rzp = new window.Razorpay(options);
          rzp.open(); // Open Razorpay checkout
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
  // const userCar = useMemo(() => new Set(userCart), [userCart]);

  const isTestPurchased = paidTests.includes(testDetails?._id);
  // const userCartIncludes = userCart.includes(testDetails?._id)
  // const userCartIncludes = useMemo(() => userCart.has(testDetails?._id), [userCart, testDetails?._id]);


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
            {isTestPurchased ?(  
               <Link to="/Tests">
 <button
 type="button"
 className="w-full max-w-[180px] bg-[#2563EB] hover:bg-blue-500 p-2 text-white font-medium py-2 px-4 rounded hidden md:block"
>
Explore More

</button>
</Link>

            ):(
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
  {isItemInCart(testDetails)||userCartIncludes ? (
    <Link to="/cart">
      <button className="w-full flex items-center justify-center bg-gray-200 text-gray-800 py-2 px-8 rounded-lg text-sm hover:bg-gray-300 ml-12">
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
        className={`w-full flex items-center justify-center bg-gray-200 text-gray-800 py-2 px-3 rounded-lg text-sm hover:bg-gray-300 gap-2 ${
          isLoading ? "cursor-not-allowed opacity-50" : ""
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
       
     
<button className="w-full flex items-center justify-center bg-blue-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-700 gap-2"onClick={() => handleBuyNow(testDetails._id)}>
<IconCreditCard size={16} />
Checkout
</button>
 )}
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
