import { clearAuth, setAuth } from "../slices/authSlice";
import { setIsLoading } from "../slices/uiSlice";
import { setUser } from "../slices/userSlice";
import { apiBaseService } from "./apiBaseService";

interface LoginRequest {
  email: string;
  password: string;
}

interface SignupRequest {
  username: string;
  email: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
  token_type: string;
}

/**
 * The authentication API service.
 */
const authService = apiBaseService.injectEndpoints({
  endpoints: (builder) => ({
    /*
     * Logs in a user.
     */
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(query, { dispatch, queryFulfilled }) {
        try {
          dispatch(setIsLoading(true));
          const { data } = await queryFulfilled;
          dispatch(setUser({ email: query.email }));
          dispatch(setAuth(data.access_token));
        } catch (error) {
          throw error;
        } finally {
          setTimeout(() => {
            1000;
          });
          dispatch(setIsLoading(false));
        }
      },
    }),
    /*
     * Signs up a new user.
     */
    signup: builder.mutation<AuthResponse, SignupRequest>({
      query: (credentials) => ({
        url: "/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    /*
     * Logs the user out.
     */
    logout: builder.mutation<void, void>({
      query: () => "/logout",
      async onQueryStarted(query, { dispatch, queryFulfilled }) {
        try {
          dispatch(setIsLoading(true));
          //TODO 2024-07-29 Mariano: Implement refresh token logic
          // await queryFulfilled;
          dispatch(clearAuth());
          dispatch(setUser({ email: "" }));
        } catch (error) {
          throw error;
        } finally {
          dispatch(setIsLoading(false));
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useSignupMutation, useLogoutMutation } = authService;

export default authService;
