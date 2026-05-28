export const updateCameraTarget = (
  playerX: number,
  prevOffset: number,
  containerWidth: number,
  worldWidth: number,
  deadLeft: number,
  deadRight: number
) => {
  if (worldWidth <= containerWidth) {
    return 0;
  }

  let offset = prevOffset;
  const screenX = playerX + offset;

  if (screenX > deadRight) {
    offset -= screenX - deadRight;
  } else if (screenX < deadLeft) {
    offset += deadLeft - screenX;
  }

  const minOffset = -(worldWidth - containerWidth);
  const maxOffset = 0;

  return Math.max(minOffset, Math.min(maxOffset, offset));
};

export const smoothCamera = (
  current: number,
  target: number,
  lerp: number
) => {
  const next =
    current + (target - current) * lerp;

  if (Math.abs(next - target) < 0.01) {
    return target;
  }

  return next;
};