import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiMutation, apiQuery } from "../../api/apiQueries";
import useAuth from "../../auth/useAuth";

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

export default function useUploadedPackages() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["uploaded-packages", user?.username],
    queryFn: () =>
      apiQuery<UploadedPackage[]>(
        `/uploaded_packages_list/${user?.username}`, // TODO: This shouldn't be necessary, the API should identify the user from the token
      ),
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
        queryKey: ["uploaded-packages", user?.username],
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
