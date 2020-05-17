import { fetcherFn } from "swr/dist/types";

/**
 * Fetches data from the API server.
 * @param url The url to fetch
 * @returns A promise of the returned JSON.
 */
export const fetcher: fetcherFn<any> = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
