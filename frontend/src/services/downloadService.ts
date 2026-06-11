export const viewFile = (filePath: string): void => {
  window.open(filePath, "_blank", "noopener,noreferrer");
};

export const downloadFile = (filePath: string, title: string): void => {
  const a = document.createElement("a");
  a.href = filePath;
  a.download = title.replace(/\s+/g, "_") + ".pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};