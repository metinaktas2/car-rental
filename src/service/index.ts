import type { CarsResponse } from "../components/types";

export const fetchCars = async (
  make: string,
  model: string,
  year: string,
  page: string
): Promise<CarsResponse> => {
  let url = `${import.meta.env.VITE_API_URL}/records?`;

  if (make) {
    url += `refine=make:"${make}"&`;
  }
  if (model) {
    url += `refine=model:"${model}"&`;
  }
  if (year) {
    url += `refine=year:"${year}"&`;
  }
  const limit = 10;
  const offset = (Number(page) - 1) * limit;

  url += `offset=${offset}&`;
  url += `limit=${limit}&`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
};
