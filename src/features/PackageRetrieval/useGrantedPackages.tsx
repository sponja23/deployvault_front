import { useQuery } from "@tanstack/react-query";
import { apiQuery } from "../../api/apiQueries";
import useAuth from "../../auth/useAuth";

export type GrantedPackage = {
  created_at: string;
  description: string;
  package_id: string;
  package_name: string;
  public: boolean;
  size: number;
  version: string;
};

export default function useGrantedPackages() {
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["granted-packages", user?.username],
    queryFn: () =>
      apiQuery<GrantedPackage[]>(`/shared_packages_list/${user?.username}`),
  });

  return {
    packages: data,
    isLoading,
    error,
  };
}
