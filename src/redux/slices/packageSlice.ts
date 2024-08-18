import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface UploadedPackage {
  package_id: string;
  package_name: string;
  description: string;
  version: string;
  size: number;
  public: boolean;
  created_at: string;
  shared_users?: { user_id: string }[];
}

export interface GrantedPackage {
  created_at: string;
  description: string;
  package_id: string;
  package_name: string;
  public: boolean;
  size: string;
  version: string;
}

export interface PackageState {
  uploadPackages: UploadedPackage[];
  grantedPackages: GrantedPackage[];
  selectedPackage: UploadedPackage | null;
}

const initialState: PackageState = {
  uploadPackages: [],
  grantedPackages: [],
  selectedPackage: null,
};

/**
 * Represents a Redux slice for managing packages.
 */
const packagesSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {
    /**
     * Sets the uploaded packages in the state.
     *
     * @param state - The current state.
     * @param action - The Redux action containing the payload.
     */
    setUploadedPackages(state, action: PayloadAction<UploadedPackage[]>) {
      state.uploadPackages = action.payload;
    },
    /**
     * Sets the granted packages in the state.
     * @param state - The current state.
     * @param action - The Redux action containing the payload.
     */
    setGrantedPackages(state, action: PayloadAction<GrantedPackage[]>) {
      state.grantedPackages = action.payload;
    },
    /**
     * Adds a package to the state.
     * @param state - The current state.
     * @param action - The payload action containing the package to add.
     */
    addUploadedPackage(state, action: PayloadAction<UploadedPackage>) {
      state.uploadPackages.push(action.payload);
    },
    /**
     * Removes a package from the state.
     * @param state - The current state.
     * @param action - The payload action containing the package to remove.
     */
    removeUploadedPackage(state, action: PayloadAction<UploadedPackage>) {
      state.uploadPackages = state.uploadPackages.filter((pkg) => pkg !== action.payload);
    },
    /**
     * Adds a selected package to the state.
     * @param state - The current state.
     * @param action - The payload action containing the selected package.
     */
    addSelectedPackage(state, action: PayloadAction<UploadedPackage>) {
      state.selectedPackage = action.payload;
    },
    /**
     * Removes the selected package from the state.
     * @param state - The current state.
     */
    removeSelectedPackage(state) {
      state.selectedPackage = null;
    },
    /**
     * Clears the granted packages from the state.
     * @param state - The current state.
     */
    clearGrantedPackages(state) {
      state.grantedPackages = [];
    },
    /**
     * Removes a granted package from the state.
     * @param state - The current state.
     * @param action - The payload action containing the granted package to remove.
     */
    removeGrantedPackage(state, action: PayloadAction<GrantedPackage>) {
      state.grantedPackages = state.grantedPackages.filter((pkg) => pkg !== action.payload);
    },
    /**
     * Clears the uploaded packages from the state.
     * @param state - The current state.
     */
    clearUploadedPackages(state) {
      state.uploadPackages = [];
    },
  },
});

export const {
  setUploadedPackages,
  setGrantedPackages,
  addUploadedPackage,
  removeUploadedPackage,
  addSelectedPackage,
  removeSelectedPackage,
  clearGrantedPackages,
  removeGrantedPackage,
  clearUploadedPackages,
} = packagesSlice.actions;

export const selectCurrentUploadedPackages = (state: RootState) => state.global.packages.uploadPackages;
export const selectCurrentUploadedPackageByName = (package_name: string) => (state: RootState) =>
  state.global.packages.uploadPackages.find((pkg: UploadedPackage) => pkg.package_name === package_name);
export const selectCurrentSelectedPackage = (state: RootState) => state.global.packages.selectedPackage;
export const selectGrantedPackages = (state: RootState) => state.global.packages.grantedPackages;
export default packagesSlice.reducer;
