import { useQuery } from "@tanstack/react-query";
import useAPIQuery, { QueryResult } from "../api/useAPIQuery";
import useAuth from "../auth/useAuth";

export type UploadedPackage = {
    package_id: string;
    package_name: string;
    description: string;
    version: string;
    size: number;
    public: boolean;
    created_at: string;
    shared_users?: { user_id: string; username: string }[];
};

export type GrantedPackage = {
    created_at: string;
    description: string;
    package_id: string;
    package_name: string;
    public: boolean;
    size: string;
    version: string;
};

export default function usePackages() {
    const { query } = useAPIQuery();
    const { user } = useAuth();

    const uploadedPackages = useQuery({
        queryKey: ["uploaded-packages"],
        queryFn: () =>
            query<UploadedPackage[]>(
                `/uploaded_packages_list/${user?.username}` // TODO: This shouldn't be necessary, the API should identify the user from the token
            ),
    });

    const grantedPackages = useQuery({
        queryKey: ["granted-packages"],
        queryFn: () =>
            query<GrantedPackage[]>(`/shared_packages_list/${user?.username}`),
    });

    return {
        uploadedPackages: {
            data: uploadedPackages.data,
            isLoading: uploadedPackages.isLoading,
            isError: uploadedPackages.isError,
        } as QueryResult<UploadedPackage[]>,
        grantedPackages: {
            data: grantedPackages.data,
            isLoading: grantedPackages.isLoading,
            isError: grantedPackages.isError,
        } as QueryResult<GrantedPackage[]>,
    };
}
