import { useState, useCallback } from "react";

function usePost() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = useCallback(async (url, body, options = {}) => {
    try {
      setLoading(true);
      setError(null);

      // Detect if body is FormData
      const isFormData = body instanceof FormData;

      const response = await fetch(url, {
        method: options.method || "POST",
        headers: {
          database: process.env.REACT_APP_DATABASE,
          // Only add Content-Type for JSON, not FormData
          ...(isFormData ? {} : { "Content-Type": "application/json" }),
          ...(options.headers || {}),
        },
        body: body, // JSON.stringify(...) already done by caller
      });
      console.log(process.env.REACT_APP_DATABASE)
      const result = await response.json();

      if (!response.ok) {
        console.log(result);
        throw new Error(result.error || "Something went wrong");
      }

      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, postData };
}

export default usePost;