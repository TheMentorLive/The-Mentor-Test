import React, { useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { Trash, Bookmark } from "lucide-react";

export default function CartMain() {
  const initialItems = [
    {
      id: 1,
      title: "JEE Physics Mastery 2024",
      instructor: "Dr. Ramesh Gupta",
      image: "/images/jee-physics.jpg",
      price: 15000,
    },
    {
      id: 2,
      title: "NEET Biology Essentials 2024",
      instructor: "Dr. Anjali Sharma",
      image: "/images/neet-biology.jpg",
      price: 13500,
    },
    {
      id: 3,
      title: "JEE Chemistry Excellence 2024",
      instructor: "Dr. Pankaj Verma",
      image: "/images/jee-chemistry.jpg",
      price: 14000,
    },
  ];

  const [items, setItems] = useState(initialItems);
  const removeItem = (id) => setItems(items.filter((item) => item.id !== id));
  const saveForLater = (id) => console.log("Save for later:", id);
  const handleCheckout = () => console.log("Proceeding to checkout");
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <Header />
      <div className="bg-background mt-14 lg:ml-20 lg:mr-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-baseline mb-8">
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <p className="text-muted-foreground">
              {items.length} Course{items.length !== 1 ? "s" : ""} in Cart
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {items.length > 0 ? (
                <div className="space-y-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 py-6 border-b bg-white shadow rounded">
                      <img
                        src={item.image}
                        alt={item.title}
                        width={160}
                        height={90}
                        className="object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg leading-tight line-clamp-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">By {item.instructor}</p>
                        <div className="flex gap-4 mt-4">
                          <button
                            className="flex items-center gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 px-2 py-1 rounded transition duration-200"
                            onClick={() => removeItem(item.id)}
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
                      <div className="text-lg font-semibold">₹{item.price.toFixed(2)}</div>
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
                  <span>₹{subtotal.toFixed(2)}</span>
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
