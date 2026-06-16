import { apiClient } from "../api/client";

export const downloadResume = async (): Promise<Blob> => {
  const response = await apiClient.get("/downloads/resume", {
    responseType: "blob",
  });
  return response.data;
};

export const viewResume = async (): Promise<void> => {
  const blob = await downloadResume();
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank", "noopener,noreferrer");
  setTimeout(() => URL.revokeObjectURL(url), 60000);
};

export const downloadFile = async (title: string): Promise<void> => {
  const blob = await downloadResume();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = title.replace(/\s+/g, "_") + ".pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 60000);
};
