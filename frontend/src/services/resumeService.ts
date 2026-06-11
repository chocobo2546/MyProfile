import { apiClient } from "../api/client";

export interface ResumeInfo {
  fileName: string;
  downloadUrl: string;
}

const mockResume: ResumeInfo = {
  fileName: "my-resume.pdf",
  downloadUrl: "/resume/forTest.pdf",
};

export const resumeService = {
  getResumeInfo: async () => {
    // Mock data
    return {
      success: true,
      message: "Resume info fetched",
      data: mockResume,
    };
  },
  uploadResume: async (file: File) => {
    // Mock: simulate upload
    return {
      success: true,
      message: "Resume uploaded successfully",
    };
  },
};