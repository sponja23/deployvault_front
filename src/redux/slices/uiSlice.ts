import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface UiState {
  isLoading: boolean;
  menu: boolean;
  currentMenu: string;
  isError: boolean;
}

const initialState: UiState = { isLoading: false, menu: false, currentMenu: "", isError: false };
/**
 * Represents the UI slice of the Redux store.
 */
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    /**
     * Sets the loading state of the application.
     * @param state - The current state of the UI slice.
     * @param action - The payload action containing the loading state.
     */
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    /**
     * Sets the menu state of the application.
     * @param state - The current state of the UI slice.
     * @param action - The payload action containing the menu state.
     */
    setMenu: (state, action) => {
      state.menu = action.payload;
    },
    /**
     * Sets the current menu state of the application.
     * @param state - The current state of the UI slice.
     * @param action - The payload action containing the current menu state.
     */
    setCurrentMenu: (state, action) => {
      state.currentMenu = action.payload;
    },
    /**
     * Sets the error state of the application.
     * @param state - The current state of the UI slice.
     * @param action - The payload action containing the error state.
     */
    setIsError: (state, action) => {
      state.isError = action.payload;
    },
  },
});

export const { setIsLoading, setMenu, setCurrentMenu, setIsError } = uiSlice.actions;
export default uiSlice.reducer;

export const selectIsLoading = (state: RootState) => state.global.ui.isLoading;
export const selectCurrentMenu = (state: RootState) => state.global.ui.currentMenu;
export const selectMenu = (state: RootState) => state.global.ui.menu;
