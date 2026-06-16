import { create } from "zustand";
import { authService, type UserResponse } from "../services/authService";

interface AuthState {
  user: UserResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.login({ email, password });
      if (response.success && response.data) {
        set({ user: response.data, isAuthenticated: true, isLoading: false });
        return true;
      }
      set({ error: response.message, isLoading: false });
      return false;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Login failed";
      set({ error: message, isLoading: false });
      return false;
    }
  },

  register: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.register({ email, password });
      if (response.success) {
        set({ isLoading: false });
        return true;
      }
      set({ error: response.message, isLoading: false });
      return false;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Registration failed";
      set({ error: message, isLoading: false });
      return false;
    }
  },

  logout: async () => {
    try {
      await authService.logout();
    } catch {
      // Even if logout API fails, clear local state
    }
    set({ user: null, isAuthenticated: false, error: null });
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const response = await authService.getMe();
      if (response.success && response.data) {
        set({ user: response.data, isAuthenticated: true, isLoading: false });
      } else {
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
