import {
  checkPlatformCollision,
  isOnPlatform,
  checkPartitionCollision,
} from "./collision";

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
  deathY: number,
  spawnX: number,
  spawnY: number,
  playerWidth: number,
  playerHeight: number,
  platforms: any[],
  partitions: any[],
  isDropping: boolean,
  delta: number
) => {
  let newX = playerX;
  let newY = playerY;
  let newVelocityY = velocityY;
  let newDropTimer = dropTimer;

  const prevX = playerX;
  const prevY = playerY;

  const isMovingLeft = keys.has("KeyA");
  const isMovingRight = keys.has("KeyD");
  const isJumping = keys.has("Space");

  // =========================================
  // MOVEMENT
  // =========================================

  if (isMovingLeft) newX -= speed;
  if (isMovingRight) newX += speed;

  const minX = 0;
  const maxX = worldWidth - playerWidth;

  newX = Math.max(minX, Math.min(maxX, newX));

  // =========================================
  // GROUNDED CHECK
  // =========================================

  const onPlatform = isOnPlatform(
    newX,
    newY,
    playerWidth,
    playerHeight,
    platforms
  );

  let isGrounded = onPlatform;

  // =========================================
  // DROP PLATFORM
  // =========================================

  if (
    isDropping &&
    onPlatform &&
    newDropTimer <= 0
  ) {
    newDropTimer = 10;
    isGrounded = false;
  }

  // =========================================
  // JUMP
  // =========================================

  if (
    isJumping &&
    isGrounded &&
    Math.abs(newVelocityY) < 0.01
  ) {
    newVelocityY = jumpForce;
    isGrounded = false;
  }

  // =========================================
  // GRAVITY
  // =========================================

  newVelocityY -= gravity;
  newY += newVelocityY;

  // =========================================
  // RESPAWN
  // =========================================

  if (newY <= deathY) {
    return {
      x: spawnX,
      y: spawnY,
      velocityY: 0,
      dropTimer: 0,
      isGrounded: false,
    };
  }

  // =========================================
  // DROP TIMER
  // =========================================

  if (newDropTimer > 0) {
    newDropTimer -= delta;
  }

  // =========================================
  // PLATFORM COLLISION
  // =========================================

  if (
    newVelocityY <= 0 &&
    newDropTimer <= 0
  ) {
    const platformHit =
      checkPlatformCollision(
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
      isGrounded = true;
    }
  }

  // =========================================
  // PARTITION COLLISION
  // =========================================

  const partitionHit =
    checkPartitionCollision(
      newX,
      newY,
      prevX,
      prevY,
      playerWidth,
      playerHeight,
      partitions
    );

  newX = partitionHit.x;
  newY = partitionHit.y;

  return {
    x: newX,
    y: newY,
    velocityY: newVelocityY,
    dropTimer: newDropTimer,
    isGrounded,
  };
};