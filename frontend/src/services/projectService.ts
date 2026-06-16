import { apiClient } from "../api/client";

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export const projectService = {
  getProjects: async (): Promise<ApiResponse<Project[]>> => {
    const response = await apiClient.get<ApiResponse<Project[]>>("/projects");
    return response.data;
  },

  getProject: async (id: number): Promise<ApiResponse<Project | null>> => {
    const response = await apiClient.get<ApiResponse<Project>>(`/projects/${id}`);
    return response.data;
  },

  createProject: async (data: Omit<Project, "id" | "createdAt">): Promise<ApiResponse<Project>> => {
    const response = await apiClient.post<ApiResponse<Project>>("/projects", data);
    return response.data;
  },

  updateProject: async (id: number, data: Partial<Project>): Promise<ApiResponse<Project>> => {
    const response = await apiClient.put<ApiResponse<Project>>(`/projects/${id}`, data);
    return response.data;
  },

  deleteProject: async (id: number): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete<ApiResponse<null>>(`/projects/${id}`);
    return response.data;
  },
};
