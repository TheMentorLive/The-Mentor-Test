import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import Hero from "./hero";
import Part2 from "./part2";
import Part3 from "./part3";
import Header from "../../../components/Header";
import ExploreTests from "./tests";
import Footer from "../../../components/Footer";
import { GEUESTENDPOINTS } from "/src/constants/ApiConstants";

// Example function to fetch test details using axios
const fetchTestById = (id) => {
  return axios.get(GEUESTENDPOINTS.GUESTTESTDETAIL_BY_ID,{
    params: { id } // Pass the ID as a query parameter
  })
    .then((response) => response.data) // Extract the data from the response
    .catch((error) => {
      console.error('Error fetching test:', error);
      throw error; // Throw error if API call fails
    });
};

const TestdetailpgMain = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const testId = queryParams.get("id"); // Get the 'id' query parameter
  

  console.log(testId);
  
  const [testDetails, setTestDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (testId) {
      setLoading(true);
      setError(null);
      fetchTestById(testId)
        .then((data) => {
          setTestDetails(data);
          setLoading(false); // Data fetched, set loading to false
        })
        .catch((err) => {
          setError("Error fetching test details.");
          setLoading(false); // Set loading to false on error
        });
    }
  }, [testId]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
  </div>
   // Show loading state while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Show error message if there was an issue fetching data
  }

  return (
    <div>
      <Header />
      <Hero testDetails={testDetails} />
      <div className="lg:mr-7 lg:ml-11">
        <Part2 testDetails={testDetails} />
        <Part3 testDetails={testDetails} />
        <ExploreTests testDetails={testDetails} />
      </div>
      <Footer />
    </div>
  );
};

export default TestdetailpgMain;
