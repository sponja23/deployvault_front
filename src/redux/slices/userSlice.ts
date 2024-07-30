import { RootState } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export interface UserState {
  email: string | null;
}

const initialState: UserState = {
  // email: Cookies.get("email") || "marianoo.14.md@mail.com",
  email: Cookies.get("email") || null,
};

/**
 * Redux slice for managing user state.
 */
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /**
     * Action to set the user's username and email.
     * @param state - The current state.
     * @param action - The action containing the payload with the username and email.
     */
    setUser(state, action: PayloadAction<{ email: string }>) {
      const { email } = action.payload;
      state.email = email;
      Cookies.set("email", email, { expires: 1 });
    },
    /**
     * Action to clear the user's username and email.
     * @param state - The current state.
     */
    clearUser(state) {
      state.email = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const selectCurrentUser = (state: RootState) => state.global.user;
export default userSlice.reducer;
