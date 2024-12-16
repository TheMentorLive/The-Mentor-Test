import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { mainContext } from "/src/context/mainContex";
import Swal from "sweetalert2";
import axios from "axios";
import { USERENDPOINTS } from "/src/constants/ApiConstants";

export default function Wishlist() {
  const { token } = useContext(mainContext);
  const [loading, setLoading] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);

  // Fetch wishlist items from backend
  const fetchWishlist = async () => {
    setLoading(true);
    try {
      if (token) {
        const response = await axios.get(USERENDPOINTS.GET_WISHLIST_DETAILS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setWishlistItems(response.data.wishlistDetails || []);
        } else {
          console.error("Failed to fetch wishlist from backend.");
        }
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [token]);

  // Remove item from wishlist
  const removeItem = async (id) => {
    if (!id) {
      console.error("Item ID is undefined");
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        // Optimistic update
        const updatedItems = wishlistItems.filter((item) => item.id !== id);
        setWishlistItems(updatedItems);

        // Call API to remove item from the backend
        const response = await axios.delete(
          `${USERENDPOINTS.REMOVE_FROM_WISHLIST}/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const updatedItems = wishlistItems.filter((item) => item.id !== id);
          setWishlistItems(updatedItems);
          Swal.fire({
            icon: "success",
            title: "Item removed",
            text: "The item has been removed from your wishlist.",
          });

        } else {
          throw new Error("Failed to remove item from backend.");
        }
      } catch (error) {
        console.error("Error removing item:", error);

        // Revert the optimistic update
        fetchWishlist();

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to remove item. Please try again later.",
        });
      }
    }
  };

  return (
    <section className="py-4 mt-8 mb-4 flex flex-col items-center justify-center md:ml-[140px] lg:ml-[75px] lg:mr-[100px]">
      <div className="container mx-auto px-4">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Your Wishlist</h2>
        {loading ? (
          <p>Loading wishlist...</p>
        ) : wishlistItems.length > 0 ? (
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
                      src={
                        item.image ||
                        "https://img.freepik.com/premium-vector/test-icon-illustration_430232-32.jpg"
                      }
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
                  <Link to={`/TestDetails?id=${item.testId}`}>
                    <button className="border border-gray-300 text-gray-700 py-1 px-2 rounded-md lg:text-[12px] md:text-[12px] text-[9px]">
                      Learn More
                    </button>
                  </Link>
                  <button
                    className="bg-red-600 text-white border border-gray-300 py-1 px-2 rounded-md lg:text-[12px] md:text-[12px] text-[9px]"
                    onClick={() => removeItem(item.testId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No items in your wishlist.</p>
        )}
      </div>
    </section>
  );
}
