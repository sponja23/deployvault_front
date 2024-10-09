import { useQuery } from "@tanstack/react-query";
import { apiQuery } from "../../api/apiQueries";
import useAuth from "../../auth/useAuth";
import { PackageInfo } from "../package";

export type GrantedPackage = PackageInfo & {
  owner: { id: string; email: string };
};

export default function useGrantedPackages() {
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["shared-packages", user?.email],
    queryFn: () => apiQuery<GrantedPackage[]>("/me/shared-packages"),
  });

  return {
    packages: data,
    isLoading,
    error,
  };
}
