import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import { apiMutation, apiQuery } from "../api/apiQueries";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";

export type User = {
  email: string;
};

type Credentials = {
  email: string;
  password: string;
};

export type UserContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
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
  logout: () => {},
  register: async () => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["me"],
    queryFn: () => apiQuery<User>("/me/"),
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
  const login = async (email: string, password: string) => {};

  const logout = () => {};

  const register = async (
    username: string,
    email: string,
    password: string,
  ) => {};

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
