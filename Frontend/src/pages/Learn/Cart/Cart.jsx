import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { Trash, Bookmark, Clock, FileText } from "lucide-react"; // Added icons
import axios from "axios";

export default function CartMain({ user }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart from backend or local storage
  const fetchCart = async () => {
    setLoading(true);
    try {
      if (user && user._id) {
        // Fetch cart from backend
        const response = await axios.get(`/api/cart/${user._id}`);
        if (response.status === 200) {
          setItems(response.data.cartItems || []);
        } else {
          console.error("Failed to fetch cart from backend.");
        }
      } else {
        // Fetch cart from local storage
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        setItems(localCart);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]); // Refetch the cart if the user changes

  const removeItem = async (id) => {
    const newItems = items.filter((item) => item._id !== id);
    setItems(newItems);

    // Update backend or localStorage
    if (user && user._id) {
      try {
        await axios.delete(`/api/cart/${user._id}/${id}`);
      } catch (error) {
        console.error("Error removing item from backend:", error);
      }
    } else {
      localStorage.setItem("cart", JSON.stringify(newItems));
    }
  };

  const saveForLater = (id) => {
    console.log("Save for later:", id);
    // Add logic to save the item for later (backend or local storage)
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout");
    // Add logic for handling checkout
  };

  // Calculate total price
  let totalPrice = 0;
  items.forEach((item) => {
    const itemPrice = parseFloat(item.price) || 0; // Ensure price is a valid number
    totalPrice += itemPrice; // Add the item's price to the total
  });

  return (
    <div>
      <Header />
      <div className="bg-background mt-14 lg:ml-20 lg:mr-20 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-baseline mb-8">
            <h1 className="text-2xl font-semibold">Shopping Cart</h1>
            <p className="text-muted-foreground text-sm">
              {items.length} Course{items.length !== 1 ? "s" : ""} in Cart
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 overflow-y-auto max-h-[400px]"> {/* Scrollable area */}
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-xl text-muted-foreground">Loading cart...</p>
                </div>
              ) : items.length > 0 ? (
                <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4 border-b bg-white shadow-sm rounded-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      width={100}
                      height={60}
                      className="object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm leading-tight line-clamp-2">{item.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">By {item.category}</p>
                      
                      {/* Adding max-height and line-clamp to avoid overflow */}
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2 overflow-hidden">{item.description || "No description available."}</p>
                      
                      <div className="flex gap-3 mt-4 text-xs">
                        <button
                          className="flex items-center gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 px-2 py-1 rounded transition duration-200"
                          onClick={() => removeItem(item._id)}
                          aria-label={`Remove ${item.title} from cart`}
                        >
                          <Trash size={16} />
                          Remove
                        </button>
                        <button
                          className="flex items-center gap-2 hover:bg-muted/10 px-2 py-1 rounded transition duration-200"
                          onClick={() => saveForLater(item.id)}
                          aria-label={`Save ${item.title} for later`}
                        >
                          <Bookmark size={16} />
                          Save for later
                        </button>
                      </div>
                    </div>
                  
                    
                    {/* Adding fixed height and overflow properties */}
                    <div className="flex flex-col items-start text-xs text-muted-foreground mt-2">
  <div className="flex items-center gap-2">
    <Clock size={14} />
    <span>Duration: {item.duration || "N/A"}</span>
  </div>
  <div className="flex items-center gap-2 mt-1">
    <FileText size={14} />
    <span>Type: {item.examType || "Course"}</span>
  </div>

  {/* Price aligned with the icons */}
  <div className="flex items-center gap-2 mt-4 text-sm font-semibold">
    <span>₹{item.price}</span>
  </div>
</div>

                  </div>
                ))}
              </div>
              
                     
                 
              
              ) : (
                <div className="text-center py-12">
                  <p className="text-xl text-muted-foreground">Your cart is empty</p>
                </div>
              )}
            </div>
            <div className="lg:col-span-1">
              <div className="bg-card p-6 rounded-lg border space-y-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="space-y-2">
                  <input
                    className="w-full px-4 py-2 border rounded"
                    placeholder="Enter coupon code"
                  />
                  <button className="w-full border rounded py-2 disabled:bg-gray-300" disabled={!items.length}>
                    Apply Coupon
                  </button>
                </div>
                <button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 transition duration-200"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
                <p className="text-sm text-muted-foreground text-center mt-4">
                  30-Day Money-Back Guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
