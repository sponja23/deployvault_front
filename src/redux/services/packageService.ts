import { useAppSelector } from "../hooks";
import { GrantedPackage, UploadedPackage, clearFirstFetch, setFirstFetch, setGrantedPackages, setUploadedPackages } from "../slices/packageSlice";
import { setIsError, setIsLoading } from "../slices/uiSlice";
import { apiBaseService } from "./apiBaseService";

/**
 * API service for packages.
 */
const packageService = apiBaseService.injectEndpoints({
  endpoints: (builder) => ({
    getUploadedRepos: builder.mutation<UploadedPackage[], string>({
      query: (userName) => ({
        url: `/uploaded_packages_list/${userName}`,
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          dispatch(setIsLoading(true));
          const { data } = await queryFulfilled;
          dispatch(setUploadedPackages(data));
        } catch (error) {
          dispatch(setIsError(true));
          throw error;
        } finally {
          dispatch(setIsLoading(false));
        }
      },
    })
    ,
    getAccessibleRepos: builder.query<GrantedPackage[], void>({
      query: () => ({
        url: "/accessible_package_list",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          dispatch(setIsLoading(true));
          const { data } = await queryFulfilled;
          dispatch(setGrantedPackages(data));
        } catch (error) {
          throw error;
        } finally {
          dispatch(setIsLoading(false));
        }
      },
    }),
    addAccessPackageConfig: builder.mutation<any, { package_name: string; user_name: string; grant_access: boolean }>({
      query: ({ package_name, user_name, grant_access }) => ({
        url: "/access_pkg_config",
        method: "POST",
        body: { package_name, user_name, grant_access },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          dispatch(setIsLoading(true));
          await queryFulfilled;
        } catch (error) {
          throw new Error(`Error: ${error}`);
        } finally {
          dispatch(setIsLoading(false));
        }
      },
    }),
    getSharedPackagesList: builder.mutation<GrantedPackage[], string>({
      query: (user_name) => ({
        url: "/shared_packages_list/",
        method: "POST",
        body: { user_name },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          dispatch(setIsLoading(true));
          const { data } = await queryFulfilled;
          const isEmpty = data.length === 0;
          if (isEmpty) {
            dispatch(setFirstFetch());
          }
          dispatch(setGrantedPackages(data));
        } catch (error) {
          throw error;
          dispatch(setIsError(true));
        } finally {
          dispatch(setIsLoading(false));
        }
      },
    }),
  }),
});
export const { useGetUploadedReposMutation, useGetAccessibleReposQuery, useAddAccessPackageConfigMutation, useGetSharedPackagesListMutation } = packageService;
export default packageService;
