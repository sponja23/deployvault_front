import { combineReducers } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "./slices/authSlice";
import userReducer, { UserState } from "./slices/userSlice";
import packagesReducer, { PackageState } from "./slices/packageSlice";
import uiReducer, { UiState } from "./slices/uiSlice";

/**
 * Root reducer function that combines all the individual reducers into a single reducer.
 * @returns The combined reducer function.
 */
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  packages: packagesReducer,
  ui: uiReducer,
});

export type RootState = {
  auth: AuthState;
  user: UserState;
  package: PackageState;
  ui: UiState;
};

export default rootReducer;
