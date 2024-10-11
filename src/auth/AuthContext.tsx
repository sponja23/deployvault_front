import { ReactNode, createContext, useMemo } from "react";
import { apiMutation, apiQuery } from "../api/apiQueries";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export type User = {
  email: string;
};

type Credentials = {
  email: string;
  password: string;
};

export type UserContextType = {
  user: User | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<UserContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    error,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["me"],
    queryFn: () => apiQuery<User>("/me/"),
    retry: false,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const user = useMemo(() => {
    if (error) {
      console.log("Error fetching user", error);
      return null;
    }

    if (isLoading) {
      return null;
    }
    return data ?? null;
  }, [data, isLoading, error]);

  // TODO: Remove this
  const login = async ({ email, password }: Credentials) => {
    // Call the login endpoint
    await apiMutation("/auth/login", { email, password });

    // TODO: Error handling

    // Fetch the user again
    await queryClient.invalidateQueries({
      queryKey: ["me"],
    });

    await refetchUser();
  };

  const logout = async () => {
    if (!user) {
      return;
    }

    // Call the logout endpoint
    await apiMutation("/auth/logout", {});

    // Fetch the user again
    await queryClient.invalidateQueries({
      queryKey: ["me"],
    });

    await refetchUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register: async () => {
          console.log("Register not implemented");
        },
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
