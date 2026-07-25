import { create } from "zustand";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "member";
}

interface AuthState {
  user: User | null;
  token: string | null;

  login: (user: User, token: string) => void;

  logout: () => void;
}

const getInitialUser = (): User | null => {
  try {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  } catch {
    return null;
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  user: getInitialUser(),

  token: localStorage.getItem("token"),

  login: (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    set({
      user,
      token,
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    set({
      user: null,
      token: null,
    });
  },
}));