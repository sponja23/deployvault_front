import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiMutation, apiQuery } from "../../api/apiQueries";
import useAuth from "../../auth/useAuth";
import { PackageInfo } from "../package";

export type UploadedPackage = PackageInfo & {
  package_accesses?: { id: string; email: string }[];
};

export default function useUploadedPackages() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["owned-packages", user?.email],
    queryFn: () => apiQuery<UploadedPackage[]>("/me/owned-packages"),
  });

  const grantMutation = useMutation({
    mutationFn: (body: { package_name: string; user_name: string }) => {
      return apiMutation<null, { message: string }>(
        `/packages/${body.package_name}/members/${body.user_name}?access_type=READ`,
        null,
        "PUT",
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["owned-packages", user?.email],
      });
    },
  });

  const revokeMutation = useMutation({
    mutationFn: (body: { package_name: string; user_name: string }) => {
      return apiMutation<null, { message: string }>(
        `/packages/${body.package_name}/members/${body.user_name}?access_type=READ`,
        null,
        "DELETE",
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["owned-packages", user?.email],
      });
    },
  });

  const grantAccess = (package_name: string, user_name: string) => {
    grantMutation.reset();

    grantMutation.mutate({
      package_name,
      user_name,
    });
  };

  const revokeAccess = (package_name: string, user_name: string) => {
    revokeMutation.reset();

    revokeMutation.mutate({
      package_name,
      user_name,
    });
  };

  return {
    packages: data,
    isLoading,
    error,
    grantAccess,
    revokeAccess,
    grantPending: grantMutation.isPending,
    grantError: grantMutation.error,
    grantSuccess: grantMutation.isSuccess,
    grantReset: grantMutation.reset,
    revokePending: revokeMutation.isPending,
    revokeError: revokeMutation.error,
    revokeSuccess: revokeMutation.isSuccess,
    revokeReset: revokeMutation.reset,
  };
}
