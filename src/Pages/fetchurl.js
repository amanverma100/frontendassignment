const BASE_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

export const fetchData = async () => {
  try {
    const res = await fetch(BASE_URL);
    const Data = await res.json();
    return Data;
  } catch (e) {
    console.error('error in fetching data:', e);
    return null;
  }
};