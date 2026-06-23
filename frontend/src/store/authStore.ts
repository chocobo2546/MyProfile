import { create } from "zustand";
import { authService, type UserResponse, type ValidationError } from "../services/authService";

interface AuthState {
  user: UserResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  fieldErrors: Record<string, string>;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
  clearFieldError: (field: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  fieldErrors: {},

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null, fieldErrors: {} });
    try {
      const response = await authService.login({ email, password });
      if (response.success && response.data) {
        set({ user: response.data, isAuthenticated: true, isLoading: false });
        return true;
      }
      const fieldErrors: Record<string, string> = {};
      response.errors?.forEach((e: ValidationError) => {
        fieldErrors[e.field] = e.message;
      });
      set({
        error: Object.keys(fieldErrors).length > 0 ? null : response.message,
        fieldErrors,
        isLoading: false,
      });
      return false;
    } catch (err: unknown) {
      let message = "Something went wrong";
      const fieldErrors: Record<string, string> = {};
      if (err && typeof err === "object" && "response" in err) {
        const axiosErr = err as {
          response?: {
            data?: {
              message?: string;
              errors?: { field: string; message: string }[];
            };
          };
        };
        const data = axiosErr.response?.data;
        if (data) {
          data.errors?.forEach((e) => {
            fieldErrors[e.field] = e.message;
          });
          if (Object.keys(fieldErrors).length > 0) {
            message = "";
          } else if (data.message) {
            message = data.message;
          }
        }
      }
      set({ error: message || null, fieldErrors, isLoading: false });
      return false;
    }
  },

  register: async (email: string, password: string) => {
    set({ isLoading: true, error: null, fieldErrors: {} });
    try {
      const response = await authService.register({ email, password });
      if (response.success) {
        set({ isLoading: false });
        return true;
      }
      const fieldErrors: Record<string, string> = {};
      response.errors?.forEach((e: ValidationError) => {
        fieldErrors[e.field] = e.message;
      });
      set({
        error: Object.keys(fieldErrors).length > 0 ? null : response.message,
        fieldErrors,
        isLoading: false,
      });
      return false;
    } catch (err: unknown) {
      let message = "Something went wrong";
      const fieldErrors: Record<string, string> = {};
      if (err && typeof err === "object" && "response" in err) {
        const axiosErr = err as {
          response?: {
            data?: {
              message?: string;
              errors?: { field: string; message: string }[];
            };
          };
        };
        const data = axiosErr.response?.data;
        if (data) {
          data.errors?.forEach((e) => {
            fieldErrors[e.field] = e.message;
          });
          if (Object.keys(fieldErrors).length > 0) {
            message = "";
          } else if (data.message) {
            message = data.message;
          }
        }
      }
      set({ error: message || null, fieldErrors, isLoading: false });
      return false;
    }
  },

  logout: async () => {
    try {
      await authService.logout();
    } catch {
      // Even if logout API fails, clear local state
    }
    set({ user: null, isAuthenticated: false, error: null, fieldErrors: {} });
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

  clearError: () => set({ error: null, fieldErrors: {} }),
  clearFieldError: (field: string) =>
    set((state) => {
      const { [field]: _, ...rest } = state.fieldErrors;
      return { fieldErrors: rest };
    }),
}));
