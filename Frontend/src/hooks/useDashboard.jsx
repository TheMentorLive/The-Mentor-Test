import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { mainContext } from "../context/mainContex";
import { USERENDPOINTS } from "../constants/ApiConstants";

const useDashboardData = (token) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allTests, setAllTests] = useState([]);
  const [testsByCategory, setTestsByCategory] = useState({});
  const [testsByExamType, setTestsByExamType] = useState({});
  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(USERENDPOINTS.DASHBOARD_DATA, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
      });
      const { allTests, testsByCategory, testsByExamType } = response.data;

        setAllTests(allTests);
        setTestsByCategory(testsByCategory);
        setTestsByExamType(testsByExamType);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardData(); // Fetch only if token is available
    }
  }, [token]); // Refetch if token changes

  return { allTests, testsByCategory, testsByExamType, error  };
};

export default useDashboardData;
