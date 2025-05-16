import React, { createContext, useContext, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { AuthService } from "../service/auth.service";
import { User } from "../types/user";

// Define Context Type
interface AuthContextType {
  user: User | null;
  token: string | null;
  isUserStoreOwner: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  verifyUser: () => Promise<void>;
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();
  const token = Cookies.get("store-token");
  // React Query: Verify User
  const {
    refetch: verifyUser,
    data: user = null,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => AuthService.verifyToken(token!),
    enabled: !!token,
    select: (user) => user.user,
    retry: 3,
  });

  useEffect(() => {
    if (isError) logout();
  }, [isError]);

  useEffect(() => {
    if (user?.role) verifyUser();
  }, [user?.role]);

  // Mutation for Login
  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      AuthService.login(email, password),
    onSuccess: (data) => {
      toast.success("Login Successfully");
      Cookies.set("store-token", data.token, { sameSite: "strict" });
      verifyUser();
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (data: any) => {
      toast.error(data.response.data.message);
    },
  });
  // Mutation for Login
  const registerMutation = useMutation({
    mutationFn: ({
      fullName,
      email,
      password,
    }: {
      fullName: string;
      email: string;
      password: string;
    }) => AuthService.register(fullName, email, password),
    onSuccess: (data) => {
      toast.success("Register Successfully");
      Cookies.set("store-token", data.token, { sameSite: "strict" });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      verifyUser();
    },
    onError: (data: any) => {
      toast.error(data.response.data.message);
    },
  });

  // Auth Functions
  const login = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password });
  };

  const register = async (
    fullName: string,
    email: string,
    password: string
  ) => {
    await registerMutation.mutateAsync({ fullName, email, password });
  };

  const logout = async () => {
    Cookies.remove("store-token");
    queryClient.invalidateQueries({ queryKey: ["user"] });
    queryClient.removeQueries({ queryKey: ["user"] });
    verifyUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token: token || Cookies.get("store-token")!,
        isUserStoreOwner: user?.role === "store-owner" || false,
        isAuthenticated: !!user && !!Cookies.get("store-token"),
        isLoading:
          isLoading || loginMutation.isPending || registerMutation.isPending,
        login,
        register,
        logout,
        verifyUser: async () => {
          await verifyUser();
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
