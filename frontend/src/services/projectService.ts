import { apiClient } from "../api/client";

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

const mockProjects: Project[] = [
  {
    id: 1,
    title: "Game Portfolio CMS",
    description: "Interactive portfolio with 2D platformer game, CMS, and analytics.",
    imageUrl: "/images/project1.png",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with payment integration.",
    imageUrl: "/images/project2.png",
    createdAt: new Date().toISOString(),
  },
];

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export const projectService = {
  getProjects: async (): Promise<ApiResponse<Project[]>> => {
    return {
      success: true,
      message: "Projects fetched successfully",
      data: mockProjects,
    };
  },
  getProject: async (id: number): Promise<ApiResponse<Project | null>> => {
    const project = mockProjects.find(p => p.id === id);
    return {
      success: true,
      message: "Project fetched successfully",
      data: project || null,
    };
  },
  createProject: async (data: Omit<Project, "id" | "createdAt">): Promise<ApiResponse<Project>> => {
    return {
      success: true,
      message: "Project created successfully",
      data: { id: Date.now(), ...data, createdAt: new Date().toISOString() },
    };
  },
  updateProject: async (id: number, data: Partial<Project>): Promise<ApiResponse<Project>> => {
    return {
      success: true,
      message: "Project updated successfully",
      data: { id, ...data } as Project,
    };
  },
  deleteProject: async (id: number): Promise<ApiResponse<null>> => {
    return {
      success: true,
      message: "Project deleted successfully",
      data: null,
    };
  },
};