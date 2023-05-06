const URL = "http://localhost:3000/api";
export const Fetch = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });
    // console.log(response.json());

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
export const FetchMyAPI = async (endpoint: string, options?: RequestInit) =>
  await Fetch(URL + endpoint, options);
