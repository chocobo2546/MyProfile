import { apiClient } from "../api/client";

export interface ResumeInfo {
  fileName: string;
  downloadUrl: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export const resumeService = {
  getResumeInfo: async (): Promise<ApiResponse<ResumeInfo>> => {
    const response = await apiClient.get<ApiResponse<ResumeInfo>>("/resume");
    return response.data;
  },

  uploadResume: async (file: File): Promise<ApiResponse<void>> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await apiClient.post<ApiResponse<void>>("/resume", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
};
