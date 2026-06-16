import { downloadFile, viewResume } from "../services/downloadService";

export const useDownload = () => {
  return {
    view: async () => viewResume(),
    download: async (title: string) => downloadFile(title),
  };
};
