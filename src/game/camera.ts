export const updateCamera = (
  playerX: number,
  prevOffset: number,
  containerWidth: number,
  worldWidth: number,
  deadLeft: number,
  deadRight: number
) => {
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