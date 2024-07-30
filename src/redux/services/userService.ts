import { RootState } from "../reducer";
import { apiBaseService } from "./apiBaseService";

interface User {
  email: string;
  username: string;
}

/**
 * Represents the user API service.
 */
const userService = apiBaseService.injectEndpoints({
  endpoints: (builder) => ({
    /*
     * Retrieves the user data.
     */
    getUserData: builder.query<User, void>({
      query: () => "",
    }),
    /*
     * Updates the user data.
     */
    updateUserData: builder.mutation<void, Partial<User>>({
      query: (userData) => ({
        url: "",
        method: "PUT",
        body: userData,
      }),
    }),
  }),
});

export const { useGetUserDataQuery, useUpdateUserDataMutation } = userService;
export default userService;
