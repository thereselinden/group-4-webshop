import { useState, useEffect } from 'react';

const useFetch = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          setData(data);
        } else {
          setErrorMessage(data);
        }
        setIsLoading(false);
      } catch (error) {
        // setErrorMessage(error.message);
        setErrorMessage((error as Error).message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, isLoading, errorMessage };
};

export default useFetch;
