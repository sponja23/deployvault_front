import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

/**
 * The base query for making API requests.
 */
const baseQuery = fetchBaseQuery({
  // baseUrl: "https://deployvault0-2a449bf8dc4e.herokuapp.com",
  baseUrl: "http://localhost:8000",
  // credentials: "same-origin",
  prepareHeaders: (headers, { getState }) => {
    // Optional: Get token from state and set it in headers
    //@ts-ignore
    const token = Cookies.get("authToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    headers.set("Content-Type", "application/json");
    headers.set("Accept", "*/*");
    headers.set("Access-Control-Allow-Origin", "*");
    return headers;
  },
});

/**
 * Executes a base query with reauthentication logic.
 * If the result of the base query returns a 403 error status, the refresh token logic is implemented.
 * @param args - The arguments for the base query.
 * @param api - The API object used for the base query.
 * @param extraOptions - Extra options for the base query.
 * @returns The result of the base query.
 */
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  const { meta } = result;

  if (meta?.response?.status === 401) {
    //TODO 2024-07-29 Mariano: Implement refresh token logic
  }
  return result;
};

/**
 * The API base service.
 */
export const apiBaseService = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
