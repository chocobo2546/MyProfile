import { useQuery, useMutation } from "@tanstack/react-query";
import { resumeService } from "../services/resumeService";

export const useResume = () => {
  return useQuery({
    queryKey: ["resume"],
    queryFn: () => resumeService.getResumeInfo().then(res => res.data),
  });
};

export const useUploadResume = () => {
  return useMutation({
    mutationFn: (file: File) => resumeService.uploadResume(file),
  });
};