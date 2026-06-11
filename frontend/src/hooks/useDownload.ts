import { viewFile, downloadFile } from "../services/downloadService";

export const useDownload = () => {
  return {
    view: viewFile,
    download: downloadFile,
  };
};