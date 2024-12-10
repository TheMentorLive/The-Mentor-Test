import { useEffect, useState } from "react";
import axios from "axios";
import { USERENDPOINTS } from "../constants/ApiConstants";


export const usePaidTests = (token) => {
  const [paidTests, setPaidTests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      const fetchPaidTests = async () => {
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
        } catch (err) {
          setError(err.message || "Error fetching paid tests.");
        } finally {
          setLoading(false);
        }
      };

      fetchPaidTests();
    }
  }, [token]);

  return { paidTests, loading, error };
};
