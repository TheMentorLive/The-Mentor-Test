import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([
    {
      _id: 1,
      title: "AWS Certified Developer",
      category: "AWS",
      image: "https://via.placeholder.com/40",
      updatedAt: "2023-10-01",
    },
    {
      _id: 2,
      title: "React Developer Certification",
      category: "React",
      image: "https://via.placeholder.com/40",
      updatedAt: "2023-11-15",
    },
    {
      _id: 3,
      title: "JavaScript Fundamentals",
      category: "JavaScript",
      image: "https://via.placeholder.com/40",
      updatedAt: "2023-09-21",
    },
    {
      _id: 4,
      title: "Data Analysis with Python",
      category: "Data Analysis",
      image: "https://via.placeholder.com/40",
      updatedAt: "2023-12-01",
    },
  ]);

  const handleRemoveFromWishlist = (id) => {
    const updatedItems = wishlistItems.filter((item) => item._id !== id);
    setWishlistItems(updatedItems);
  };

  return (
    <section className="py-4 mt-8 mb-4 flex flex-col items-center justify-center md:ml-[140px] lg:ml-[75px] lg:mr-[100px]">
        <div className="container mx-auto px-4">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Your Wishlist</h2>
        <div className="flex flex-row overflow-x-auto space-x-4 w-full">
          {wishlistItems.map((item) => (
            <div
              className="bg-white border border-gray-500 border-opacity-20 rounded-lg flex flex-col justify-between min-w-[180px] sm:w-[220px] flex-shrink-0"
              key={item._id}
            >
              <div>
                <div className="bg-[#2563EB] p-2 py-1 mb-3 border rounded-t-lg flex justify-between items-center">
                  <h3 className="text-md text-white font-bold">{item.category}</h3>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-10 w-10 rounded-full"
                  />
                </div>
                <div className="mb-1 p-3 h-24">
                  <p className="text-xs sm:text-sm">{item.title}</p>
                  <p className="mt-4 text-sm text-gray-600">
                    Last Updated: {moment(item.updatedAt).format("DD MMM YYYY")}
                  </p>
                </div>
              </div>
              <div className="flex flex-row space-x-2 p-3 mt-auto">
                <Link to={`/details/${item._id}`}>
                  <button className="border border-gray-300 text-gray-700 py-1 px-2 rounded-md lg:text-[12px] md:text-[12px] text-[9px]">
                    Learn More
                  </button>
                </Link>
                <button
                  className="bg-red-600 text-white border border-gray-300  py-1 px-2 rounded-md lg:text-[12px] md:text-[12px] text-[9px]"
                  onClick={() => handleRemoveFromWishlist(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
