import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { USERENDPOINTS } from "../constants/ApiConstants";

export const usePaidTests = (token) => {
  const [paidTests, setPaidTests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPaidTests = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await axios.get(USERENDPOINTS.PAIDTEST, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the user token
        },
      });
      const testIdsArray = Array.isArray(response.data?.testIds)
        ? response.data.testIds
        : [];
      setPaidTests(testIdsArray);
      setError(null); // Clear previous errors
    } catch (err) {
      setError(err.message || "Error fetching paid tests.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchPaidTests();
  }, [fetchPaidTests]);

  return { paidTests, loading, error, refetch: fetchPaidTests };
};
