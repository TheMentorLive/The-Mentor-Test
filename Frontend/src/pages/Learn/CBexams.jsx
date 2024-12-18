import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { useContext, useMemo, useState } from "react";
import { mainContext } from "/src/context/mainContex";
import Swal from "sweetalert2";
import { Heart } from 'lucide-react'; // Import Heart icon
import { toast } from "react-toastify";
import axios from "axios";
import { USERENDPOINTS } from "/src/constants/ApiConstants";
import useAddToWishlist from "/src/hooks/useAddWishlist";
import { useSelector, useDispatch } from "react-redux";
import { fetchWishlist } from "../../redux/Wishlistslice";
import React from "react";

export default function CompanyExams({ exams }) {
  const { user, token } = useContext(mainContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: userwishlist, loading, error } = useSelector((state) => state.wishlist);

  const { addToWishlist, isLoading } = useAddToWishlist(token, user);

  // Fetch wishlist on component mount if token exists
  React.useEffect(() => {
    if (token) {
      dispatch(fetchWishlist(token));
    }
  }, [dispatch, token]);

  const handleAddToWishlist = (examId) => {
    if (!token || !user) {
      Swal.fire({
        icon: "warning",
        title: "User Not Found",
        text: "Please log in to add items to your wishlist.",
        confirmButtonText: "OK",
      });
      return;
    }
    addToWishlist(examId).then(() => {
      dispatch(fetchWishlist(token)); // Refetch wishlist after adding to ensure state is updated
    });
  };

  const handleClick = () => {
    if (!user || !token) {
      Swal.fire({
        icon: "warning",
        title: "User Not Found",
        text: "Please log in to view all courses.",
        confirmButtonText: "OK",
      });
    } else {
      navigate("/all-in-one"); // Navigate to the all-in-one page
    }
  };


  return (
    <section className="py-4 mt-8 mb-4 flex items-center justify-center md:ml-[140px] lg:ml-[75px] lg:mr-[100px]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-start items-start mb-6 gap-24">
          {/* Left Section (Title and Subtitle) */}
          <div className="flex flex-col w-full md:w-[300px] mt-12 lg:mt-7 md:mt-0">
            <h2 className="text-lg sm:text-xl font-bold">Company-Based Exams</h2>
            <p className="text-gray-600 text-xs sm:text-sm">
              Prepare for the top Company-Based exams in your field.
            </p>
          
              <button
                className="mt-5 w-full md:w-[180px] md:mt-7 px-2 py-1 md:px-3 md:py-2 bg-[#2563EB] text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                onClick={handleClick}
              >
                View all Tests
              </button>
         
          </div>

          {/* Right Section (Cards or Message) */}
          <div className="overflow-x-auto flex space-x-4 md:space-x-6 lg:space-x-9 w-full">
            {exams.length === 0 ? (
              <div className="bg-white border border-gray-500 border-opacity-20 rounded-lg flex justify-center items-center w-full min-h-[200px]">
                <p className="text-sm text-gray-600">There are no tests available for this category.</p>
              </div>
            ) : (
              exams.map((exam) => (
                <div
                  className="bg-white border border-gray-500 border-opacity-20 rounded-lg flex flex-col justify-between min-w-[180px] w-[180px] sm:w-[220px] flex-shrink-0"
                  key={exam._id} // Use exam._id as key
                >
                  <div>
                    <div className="bg-[#2563EB] p-2 py-1 mb-3 border rounded-t-lg flex justify-between items-center">
                      <h3 className="text-md text-white font-bold">{exam.category}</h3>
                      <img
                        src={exam.image || "https://via.placeholder.com/40"}
                        alt="Exam"
                        className="h-10 w-10 rounded-full"
                      />
                    </div>
                    <div className="mb-1 p-3 h-24">
                      <p className="text-xs sm:text-sm">{exam.title}</p>
                      <p className="mt-4 text-sm text-gray-600">
                        Exam Created Date: {exam.updatedAt
                          ? moment(exam.updatedAt).format("DD MMM YYYY")
                          : "TBA"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row space-x-2 p-1 mt-auto">
                    <Link to={`/Testdetails?id=${exam._id}`}>
                      <button className="border border-gray-300 text-gray-700 py-1 px-2 rounded-md lg:text-[12px] md:text-[12px] text-[9px]">
                        Learn More
                      </button>
                    </Link>
                    <Link to="/register">
                      <button className="bg-blue-600 text-white py-1 px-2 rounded-md lg:text-[12px] md:text-[12px] text-[9px]">
                        Start Exam
                      </button>
                    </Link>

                    <button
  onClick={() => handleAddToWishlist(exam._id)}
  className={`relative p-2 rounded-full transition-all duration-200 ${
    userwishlist.includes(exam._id)
      ? "bg-red-100 text-red-700"
      : " text-gray-500 hover:bg-gray-200"
  }`}
>
  <Heart
    className={`h-6 w-6 transition-transform duration-300 ${
      userwishlist.includes(exam._id) ? "scale-110 fill-current" : "hover:scale-110"
    }`}
  />
</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
