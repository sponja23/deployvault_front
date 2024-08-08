import { RootState } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export interface UserState {
  email: string | null;
  username: string | null;   
}

const initialState: UserState = {
  // email: Cookies.get("email") || "marianoo.14.md@mail.com",
  email: Cookies.get("email") || null,
  username: Cookies.get("username") || null,  
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
    setUser(state, action: PayloadAction<{ email: string, username:string}>) {
      const { email,username } = action.payload;
      state.email = email;
      state.username = username;      
      Cookies.set("email", email, { expires: 1 });
      Cookies.set("username", username, { expires: 1 });      
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
