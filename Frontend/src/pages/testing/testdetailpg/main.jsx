import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Hero from "./hero";
import Part2 from "./part2";
import Part3 from "./part3";
import Header from "../../../components/Header";
import ExploreTests from "./tests";
import Footer from "../../../components/Footer";
import { GEUESTENDPOINTS, USERENDPOINTS } from "/src/constants/ApiConstants";
import { mainContext } from "/src/context/mainContex";

const fetchTestById = (id) => {
  return axios
    .get(GEUESTENDPOINTS.GUESTTESTDETAIL_BY_ID, {
      params: { id }, // Pass the ID as a query parameter
    })
    .then((response) => response.data) // Extract the data from the response
    .catch((error) => {
      console.error("Error fetching test:", error);
      throw error; // Throw error if API call fails
    });
};

// const fetchPaidTests = (token) => {
//   if (!token) {
//     return Promise.reject(new Error("User is not authenticated."));
//   }

//   return axios
//     .get(USERENDPOINTS.PAIDTEST, {
//       headers: {
//         Authorization: `Bearer ${token}`, // Pass the user token
//       },
//     })
//     .then((response) => response.data)
//     .catch((error) => {
//       console.error("Error fetching paid tests:", error);
//       throw error;
//     });
// };

const TestdetailpgMain = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const testId = queryParams.get("id"); // Get the 'id' query parameter

  // const { token } = useContext(mainContext);
  const [testDetails, setTestDetails] = useState(null);
  // const [paidTests, setPaidTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (testId) {
      setLoading(true);
      setError(null);

      const fetchAllData = async () => {
        try {
          const [testData, paidTestsData] = await Promise.all([
            fetchTestById(testId),
            // fetchPaidTests(token),
          ]);
          setTestDetails(testData);
        //   const testIdsArray = Array.isArray(paidTestsData?.testIds)
        //   ? paidTestsData.testIds
        //   : [];
        // setPaidTests(testIdsArray);
        } catch (err) {
          setError(err.message || "Error fetching data.");
        } finally {
          setLoading(false);
        }
      };

      fetchAllData();
    }
  }, [testId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }
 
  

  return (
    <div>
      <Header />
      <div>
        <Hero testDetails={testDetails} />
      </div>
      <div className="lg:mr-7 lg:ml-11">
        <Part2 testDetails={testDetails}  />
        <Part3 testDetails={testDetails} />
        <ExploreTests testDetails={testDetails} />
      </div>
      <Footer />
    </div>
  );
};

export default TestdetailpgMain;
