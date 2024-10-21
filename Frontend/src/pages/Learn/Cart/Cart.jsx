import React, { useEffect, useRef, useState } from "react";
import { Dialog, CircularProgress, Snackbar } from "@mui/material";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";

const dummyData = [
  {
    productId: {
      title: "React for Beginners",
      price: 299,
      image: "https://img-c.udemycdn.com/course/240x135/965528_737d_7.jpg",
      _id: "1",
      level: "Beginner",
      author: "John Doe",
      rating: 4.5,
    },
  },
  {
    productId: {
      title: "Advanced JavaScript",
      price: 499,
      image: "https://img-c.udemycdn.com/course/240x135/756150_c033_4.jpg",
      _id: "2",
      level: "Advanced",
      author: "Jane Smith",
      rating: 4.7,
    },
  },
];

export const CartPage = () => {
  const [data, setData] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [notification, setNotification] = useState({ open: false, message: "" });
  const [openDialog, setOpenDialog] = useState(false); // Confirmation dialog
  const [selectedProduct, setSelectedProduct] = useState(null);
  const loading = useRef(true);
  const navigate = useNavigate();

  useEffect(() => {
    loading.current = false;
    setData(dummyData); // Set dummy data as cart items
  }, []);

  const applyCoupon = () => {
    if (coupon.toLowerCase() === "keeplearning") {
      setNotification({ open: true, message: "Coupon applied successfully!" });
    } else {
      setNotification({ open: true, message: "Invalid coupon!" });
    }
  };

  const removeFromCart = (productId) => {
    setData((prev) => prev.filter((item) => item.productId._id !== productId));
    setNotification({ open: true, message: "Item removed from cart." });
  };

  const handleCloseNotification = () => {
    setNotification({ open: false, message: "" });
  };

  // Razorpay Payment Integration
  const handlePayment = async () => {
    const totalAmount = data.reduce((acc, el) => acc + el.productId.price, 0);

    const options = {
      key: "rzp_test_UpMbeMfb2X5DTf", // Your Razorpay test key
      amount: totalAmount * 100, // Amount in paisa
      currency: "INR",
      name: "Online Learning Platform",
      description: "Test Transaction",
      handler: (response) => {
        // Handle success here (paymentId, orderId, signature)
        console.log(response);
        setNotification({ open: true, message: "Payment Successful!" });
        // Navigate to success page or handle further logic
        navigate("/success");
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-center my-8">Shopping Cart</h1>

      {loading.current ? (
        <CircularProgress size={"8rem"} className="flex justify-center items-center my-8" />
      ) : (
        <div className="cart-body mx-auto px-4 lg:px-40">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="cart-items w-full md:w-2/3">
              <p className="text-lg font-semibold mb-4">Courses in Cart</p>
              <div className="space-y-4">
                {data.map((el) => (
                  <CartProdCard
                    db={el.productId}
                    key={el.productId._id}
                    remove={() => {
                      setSelectedProduct(el.productId._id);
                      setOpenDialog(true);
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="w-full md:w-1/3">
              <div className="bg-gray-100 p-4 rounded-md shadow-md">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold">Total: </p>
                  <h1 className="text-2xl font-bold">
                    ₹<TotalPrice db={data} />
                  </h1>
                </div>

                <div className="mt-4">
                  <button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
                    onClick={handlePayment}
                  >
                    <h4>Checkout</h4>
                  </button>
                </div>

                <div className="mt-6">
                  <div className="mt-4 flex">
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-l-md p-2"
                      placeholder="Enter Coupon"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                    />
                    <button
                      className="bg-blue-500 text-white rounded-r-md px-4 py-2 hover:bg-blue-600"
                      onClick={applyCoupon}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Snackbar for Notifications */}
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        message={notification.message}
      />

      {/* Confirmation Dialog for Removing Items */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <div className="p-4">
          <h4>Are you sure you want to remove this item from the cart?</h4>
          <div className="flex mt-4 justify-end gap-2">
            <button
              className="bg-gray-300 text-gray-700 py-1 px-2 rounded-md"
              onClick={() => setOpenDialog(false)}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 text-white py-1 px-2 rounded-md"
              onClick={() => {
                removeFromCart(selectedProduct);
                setOpenDialog(false);
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

const CartProdCard = ({ db, remove }) => {
  const { title, price, image, author, level, rating } = db;

  return (
    <div className="p-4 bg-white border border-gray-300 rounded-md shadow-md">
      <div className="flex gap-4">
        <img src={image} alt={title} className="w-24 h-24 object-cover rounded-md" />
        <div className="flex flex-col w-full">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-600">{author} - {level}</p>
          <Rating value={rating} precision={0.5} readOnly size="small" />
          <div className="flex justify-between items-center mt-2">
            <p className="text-xl font-bold">₹{price}</p>
            <button
              className="bg-red-500 text-white rounded-md px-4 py-1 hover:bg-red-600"
              onClick={remove}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TotalPrice = ({ db }) => {
  const total = db.reduce((acc, el) => acc + el.productId.price, 0);
  return total;
};
