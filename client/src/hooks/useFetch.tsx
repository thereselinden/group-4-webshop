import { useState, useEffect, Dispatch, SetStateAction } from 'react';

const useFetch = <T,>(
  url: string,
  method = 'GET',
  body?: string
): [
  [T | null, Dispatch<SetStateAction<T | null>>],
  [boolean, Dispatch<SetStateAction<boolean>>],
  [string | null, Dispatch<SetStateAction<string | null>>]
] => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(url, {
          method: method,
          headers: { 'Content-Type': 'application/json' },
          body: body,
        });
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

  // return { data, isLoading, errorMessage };
  return [
    [data, setData],
    [isLoading, setIsLoading],
    [errorMessage, setErrorMessage],
  ];
};

export default useFetch;
