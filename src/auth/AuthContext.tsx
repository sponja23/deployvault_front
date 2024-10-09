import { ReactNode, createContext, useState } from "react";
import { apiMutation } from "../api/apiQueries";
import Cookies from "js-cookie";

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
  const [user, setUser] = useState<User | null>(null);

  const setToken = (token: string) => {
    Cookies.set("authToken", token, { expires: 1 });
  };

  const login = async (email: string, password: string) => {
    const response = await apiMutation<
      Credentials,
      User & { access_token: string }
    >("/login", {
      email: email,
      password: password,
    });

    setUser({
      email, // TODO: Change this to response.email once the API is updated
    });
    setToken(response.access_token);
  };

  const logout = () => {
    Cookies.remove("authToken");
    setUser(null);
  };

  const register = async (
    username: string,
    email: string,
    password: string,
  ) => {
    await apiMutation<Credentials, never>("/signup", {
      email: email,
      password: password,
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
