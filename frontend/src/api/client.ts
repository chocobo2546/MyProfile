import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // for HttpOnly cookie
});

// Request interceptor (optional logging)
apiClient.interceptors.request.use((config) => {
  // You can add auth headers here later if needed
  return config;
});

// Response interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log error or handle globally
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);