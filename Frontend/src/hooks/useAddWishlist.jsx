import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { USERENDPOINTS } from "../constants/ApiConstants";
import { fetchWishlist } from "../redux/Wishlistslice";
// Replace with your actual endpoints file

const useAddToWishlist = (token, user) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const addToWishlist = async (itemId) => {
    setIsLoading(true);
    try {
      if (!user?._id) {
        toast.error("User not logged in.");
        return;
      }

      // Send request to the backend
      const response = await axios.post(
        USERENDPOINTS.ADD_TO_WISHLIST,
        { testId: itemId }, // Send only the required test ID
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the user's token for authentication
            "Content-Type": "application/json", // Set content type
          },
        }
      );

      // Handle response
      if (response.status === 200) {
        toast.success(response.data.message); // Show success message
        dispatch(fetchWishlist(token)); // Update wishlist in Redux
      } else {
        toast.error("Failed to add item to the wishlist. Please try again.");
      }
    } catch (error) {
      // Show error messages from the backend or handle unexpected errors
      if (error.response?.data?.message) {
        toast.error(error.response.data.message); // Backend error message
      } else if (error.message) {
        toast.error(`Error: ${error.message}`); // Axios/network error
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
      console.error("Add to Wishlist Error:", error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return { addToWishlist, isLoading };
};

export default useAddToWishlist;
