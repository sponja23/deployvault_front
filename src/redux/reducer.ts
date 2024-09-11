import { combineReducers } from "@reduxjs/toolkit";
import packagesReducer, { PackageState } from "./slices/packageSlice";
import uiReducer, { UiState } from "./slices/uiSlice";

/**
 * Root reducer function that combines all the individual reducers into a single reducer.
 * @returns The combined reducer function.
 */
const rootReducer = combineReducers({
  packages: packagesReducer,
  ui: uiReducer,
});

export type RootState = {
  package: PackageState;
  ui: UiState;
};

export default rootReducer;
