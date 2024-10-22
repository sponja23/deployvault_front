import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiMutation, apiQuery } from "../../api/apiQueries";
import useAuth from "../../auth/useAuth";
import { PackageInfo } from "../package";

export type UploadedPackage = PackageInfo & {
  shared_users?: { id: string; email: string }[];
};

export default function useUploadedPackages() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["owned-packages", user?.email],
    queryFn: () => apiQuery<UploadedPackage[]>("/me/owned-packages"),
  });

  const accessMutation = useMutation({
    mutationFn: (body: {
      package_name: string;
      user_name: string;
      action: "grant" | "revoke";
    }) => {
      return apiMutation<
        {
          package_name: string;
          user_name: string;
          grant_access: boolean;
        },
        { message: string }
      >("/access_pkg_config", {
        ...body,
        grant_access: body.action === "grant",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["owned-packages", user?.email],
      });
    },
  });

  const grantAccess = (package_name: string, user_name: string) => {
    accessMutation.mutate({
      package_name,
      user_name,
      action: "grant",
    });
  };

  const revokeAccess = (package_name: string, user_name: string) => {
    accessMutation.mutate({
      package_name,
      user_name,
      action: "revoke",
    });
  };

  return {
    packages: data,
    isLoading,
    error,
    grantAccess,
    revokeAccess,
  };
}
