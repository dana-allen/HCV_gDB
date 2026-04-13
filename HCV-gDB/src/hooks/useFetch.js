import { useState, useEffect, useRef } from 'react';

function useFetch(url) {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const prevUrlRef = useRef();


    
  
  useEffect(() => {

    if (!url) return;
    
    if (prevUrlRef.current === url) return;
    prevUrlRef.current = url;

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log(url)
        const response = await fetch(url, {
          headers: { database: process.env.REACT_APP_DATABASE },
          signal: controller.signal
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Something went wrong");
        }

        setData(result);

      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();   // cancel previous request
    };

  }, [url]);

  return { data, loading, error };
}

export default useFetch;