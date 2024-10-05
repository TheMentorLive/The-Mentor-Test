import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const Payment = () => {
  // Dummy data for cart
  const dummyCart = [
    {
      productId: {
        name: "Selenium WebDriver with Java-Basics to Advanced + Frameworks",
        price: 455,
        originalPrice: 3499,
      },
    },
    {
      productId: {
        name: "React - The Complete Guide (incl Hooks, React Router, Redux)",
        price: 299,
        originalPrice: 2499,
      },
    },
  ];

  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [securityCode, setSecurityCode] = useState("");

  // Calculate the total price using dummy data
  useEffect(() => {
    const total = dummyCart.reduce((acc, el) => acc + el.productId.price, 0);
    setPrice(total);
  }, []);

  const navigate = useNavigate();

  const handlePayment = () => {
    if (!nameOnCard || !cardNumber || !expiryMonth || !expiryYear || !securityCode) {
      alert("Please fill all the fields.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      alert("Payment Success");
      navigate("/");
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Right part */}
        <div className="w-full lg:w-2/3 bg-white shadow-md p-6 rounded-md">
          <h1 className="text-2xl font-bold mb-4">Checkout</h1>
          <p className="font-semibold text-lg mb-4">Billing Address</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <select className="w-full p-2 border rounded-md">
                <option value="india">India</option>
                <option value="united-states">United States</option>
                <option value="europe">Europe</option>
              </select>
            </div>
            <div>
              <select className="w-full p-2 border rounded-md">
                <option value="disabled">Please select...</option>
                <option value="karnataka">Karnataka</option>
                <option value="maharashtra">Maharashtra</option>
                <option value="kerala">Kerala</option>
              </select>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {[{ name: "Credit/Debit Card", icon: "card-mastercard.svg" },
              { name: "UPI", icon: "hpp-upi.svg" },
              { name: "PayTM", icon: "hpp-paytm.svg" },
              { name: "Net Banking", icon: "hpp-billdesk-online.svg" },
              { name: "Mobile Wallets" }].map((option, index) => (
              <div key={index} className="flex items-center gap-4">
                <input type="radio" name="payment" className="w-4 h-4" />
                <span className="font-semibold">{option.name}</span>
                {option.icon && (
                  <img
                    src={`https://www.udemy.com/staticx/udemy/images/v9/${option.icon}`}
                    alt={option.name}
                    className="h-6"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-6">
            <input
              className="w-full p-2 border rounded-md mb-4"
              type="text"
              placeholder="Name on Card"
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
            />
            <input
              className="w-full p-2 border rounded-md mb-4"
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />

            <div className="grid grid-cols-3 gap-4">
              <select className="w-full p-2 border rounded-md" value={expiryMonth} onChange={(e) => setExpiryMonth(e.target.value)}>
                <option value="">MM</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i + 1}>{i + 1}</option>
                ))}
              </select>

              <select className="w-full p-2 border rounded-md" value={expiryYear} onChange={(e) => setExpiryYear(e.target.value)}>
                <option value="">YYYY</option>
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i} value={2023 + i}>{2023 + i}</option>
                ))}
              </select>

              <input
                className="w-full p-2 border rounded-md"
                type="text"
                placeholder="Security Code"
                value={securityCode}
                onChange={(e) => setSecurityCode(e.target.value)}
              />
            </div>

            <div className="flex items-center mt-4">
              <input type="checkbox" className="mr-2" />
              <label>Remember this card</label>
            </div>
          </div>
        </div>

        {/* Left part */}
        <div className="w-full lg:w-1/3 bg-gray-100 shadow-md p-6 rounded-md">
          <h2 className="text-xl font-bold mb-4">Summary</h2>

          <table className="w-full text-left mb-6">
            <tbody>
              <tr>
                <td>Original price:</td>
                <td className="text-right">₹{price}</td>
              </tr>
              <tr>
                <td>Coupon discounts:</td>
                <td className="text-right">- ₹{(price * 0.1).toFixed(2)}</td>
              </tr>
              <tr>
                <td className="font-bold">Total:</td>
                <td className="text-right font-bold">₹{(price - price * 0.1).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <p className="text-sm mb-4">
            Udemy is required by law to collect applicable transaction taxes for
            purchases made in certain tax jurisdictions.
          </p>

          <div className="text-sm mb-4">
            By completing your purchase you agree to these{" "}
            <a href="#" className="text-blue-500 underline">
              Terms of Service
            </a>
          </div>

          {loading ? (
            <CircularProgress />
          ) : (
            <button
              onClick={handlePayment}
              className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Complete Payment
            </button>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        {dummyCart.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-white shadow-md rounded-md mb-4"
          >
            <div>
              <img
                src="https://img-c.udemycdn.com/course/240x135/1332252_2df7_7.jpg"
                alt="course"
                className="h-16"
              />
            </div>
            <div className="flex-1 px-4">
              <h5 className="font-semibold">{item.productId.name}</h5>
            </div>
            <div className="text-right">
              <p className="font-bold">₹{item.productId.price}</p>
              <s className="text-gray-500">₹{item.productId.originalPrice}</s>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payment;
