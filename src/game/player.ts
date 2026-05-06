import { checkPlatformCollision, isOnPlatform } from "./collision";

export const updatePlayer = (
  playerX: number,
  playerY: number,
  velocityY: number,
  dropTimer: number,
  keys: Set<string>,
  speed: number,
  worldWidth: number,
  gravity: number,
  jumpForce: number,
  groundY: number,
  playerWidth: number,
  playerHeight: number,
  platforms: any[],
  isDropping: boolean,
  delta: number
) => {
  let newX = playerX;
  let newY = playerY;
  let newVelocityY = velocityY;
  let newDropTimer = dropTimer;

  const prevY = playerY;

  const isMovingLeft = keys.has("KeyA");
  const isMovingRight = keys.has("KeyD");
  const isJumping = keys.has("Space");

  // movement
  if (isMovingLeft) newX -= speed;
  if (isMovingRight) newX += speed;

  const minX = 0;
  const maxX = worldWidth - playerWidth;
  newX = Math.max(minX, Math.min(maxX, newX));

  // ground / platform
  const onGround = newY <= groundY;
  const onPlatform = isOnPlatform(
    newX,
    newY,
    playerWidth,
    playerHeight,
    platforms
  );

  const isGrounded = onGround || onPlatform;

  // ✅ FIX: drop only once
  if (isDropping && onPlatform && newDropTimer <= 0) {
    newDropTimer = 10;
  }

  // ✅ FIX: jump only when velocity = 0
  if (isJumping && isGrounded && newVelocityY === 0) {
    newVelocityY = jumpForce;
  }

  // gravity
  newVelocityY -= gravity;
  newY += newVelocityY;

  // ground collision
  if (newY < groundY) {
    newY = groundY;
    newVelocityY = 0;
  }

  // ลด timer
  if (newDropTimer > 0) {
    newDropTimer -= delta;
  }

  // platform collision
  if (newVelocityY <= 0 && newDropTimer <= 0) {
    const platformHit = checkPlatformCollision(
      newX,
      newY,
      prevY,
      newVelocityY,
      playerWidth,
      playerHeight,
      platforms
    );

    if (platformHit.collided) {
      newY = platformHit.y;
      newVelocityY = 0;
    }
  }

  return {
    x: newX,
    y: newY,
    velocityY: newVelocityY,
    dropTimer: newDropTimer,
  };
};