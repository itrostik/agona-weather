import axios from 'axios';

export async function search(searchValue: string, path: string, params?: {}) {
  if (!searchValue) return [];
  const {data} = await axios.get(
    `${process.env.NEXT_PUBLIC_API_CITIES_URL}${path}`,
    {
      headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_X_RAPID_API_KEY,
        'X-RapidAPI-Host': process.env.NEXT_PUBLIC_X_RAPID_API_HOST,
      },
      params: {
        limit: 10,
        ...params,
      },
    },
  );
  return data.data;
}
