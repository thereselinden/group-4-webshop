const fetchData = async <T>(
  url: string,
  method = 'GET',
  body?: any
): Promise<T> => {
  console.log('fetch data body', body);
  try {
    const response = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: body,
    });
    if (!response.ok) throw new Error(response.status.toString());
    console.log('fetch data response', response);

    const data = await response.json();
    return data;
  } catch (error) {
    throw error as Error;
  }
};

export default fetchData;
