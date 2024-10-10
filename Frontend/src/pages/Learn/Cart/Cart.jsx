import React, { useEffect, useRef, useState } from "react";
import { Dialog } from "@mui/material"; // For confirmation dialog
import { CircularProgress, Rating, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

// Dummy data to replace backend API call
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
                  <Link to="/Payment">
                  <button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
                    onClick={() => navigate("/payment")}
                  >
                    <h4>Checkout</h4>
                  </button>
                  </Link>
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
  const { title, price, image, level, author, rating } = db;
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center bg-white p-4 rounded-md shadow-md">
      <div className="w-full md:w-1/4">
        <img className="rounded-md" src={image} alt={title} />
      </div>
      <div className="md:ml-4 flex-1 mt-4 md:mt-0">
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-gray-600">{author}</p>
        <div className="flex items-center space-x-2 mt-2">
          <button className="bg-yellow-300 text-yellow-900 py-1 px-2 rounded-md">
            Bestseller
          </button>
          <div className="flex items-center">
            <span className="text-yellow-500 font-semibold">{rating || 4.5}</span>
            <Rating name="read-only" size="small" precision={0.5} value={rating || 4.5} readOnly />
            <span className="text-sm text-gray-500">(1200)</span>
          </div>
        </div>
        <ul className="list-disc list-inside mt-2 text-sm text-gray-700">
          <li>2.5 total hours</li>
          <li>33 lectures</li>
          <li>{level}</li>
        </ul>
        <h4 className="mt-4 text-lg font-bold">₹{price || 0}</h4>
      </div>
      <div className="ml-auto mt-4 md:mt-0">
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          onClick={remove}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

const TotalPrice = ({ db }) => {
  const total = db.reduce((acc, el) => acc + el.productId.price, 0);
  return <>{total}</>;
};
