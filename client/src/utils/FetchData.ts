const fetchData = async <T>(
  url: string,
  method = 'GET',
  body?: any
): Promise<T | null> => {
  console.log('fetch data body', body);
  try {
    const response = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: body,
    });
    if (!response.ok) throw new Error(response.status.toString());

    //! KAN VI KOLLA DETTA PÅ ANNAT SÄTT?
    if (response.statusText === 'No Content') return null;
    const data = await response.json();

    return data;
  } catch (error) {
    throw error as Error;
  }
};

export default fetchData;
