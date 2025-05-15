import { User } from "../types/user";
import api from "../utils/api.utils";

export const AuthService = {
  login: async (
    email: string,
    password: string
  ): Promise<{ token: string }> => {
    try {
      const { data } = await api.post("/api/admin/auth/login", {
        email,
        password,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },

  verifyToken: async (token: string): Promise<{ user: User }> => {
    try {
      const { data } = await api.get("/api/admin/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  },

  register: async (
    fullName: string,
    email: string,
    password: string
  ): Promise<{ token: string; user: User }> => {
    try {
      const { data } = await api.post("/api/admin/auth/register", {
        fullName,
        email,
        password,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
};
