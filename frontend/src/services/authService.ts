import { apiClient } from "../api/client";

export interface ValidationError {
  field: string;
  message: string;
}

export interface UserResponse {
  id: number;
  email: string;
  role: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: ValidationError[];
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
}

export const authService = {
  login: async (credentials: LoginRequest): Promise<ApiResponse<UserResponse>> => {
    const response = await apiClient.post<ApiResponse<UserResponse>>("/auth/login", credentials);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<ApiResponse<void>> => {
    const response = await apiClient.post<ApiResponse<void>>("/auth/register", data);
    return response.data;
  },

  logout: async (): Promise<ApiResponse<void>> => {
    const response = await apiClient.post<ApiResponse<void>>("/auth/logout");
    return response.data;
  },

  getMe: async (): Promise<ApiResponse<UserResponse>> => {
    const response = await apiClient.get<ApiResponse<UserResponse>>("/auth/me");
    return response.data;
  },
};
