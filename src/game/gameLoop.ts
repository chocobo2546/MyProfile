export const calculateDelta = (
  time: number,
  lastTime: number
) => {
  if (!lastTime) return 1;
  return (time - lastTime) / 16;
};