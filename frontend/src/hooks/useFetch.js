// useFetch.js
import { useState, useEffect } from "react";

export const useFetch = (fetchFunction, deps = []) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchFunction()
      .then((res) => setData(res))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, deps);

  return { data,setData, loading,setLoading, error,setError };
};
