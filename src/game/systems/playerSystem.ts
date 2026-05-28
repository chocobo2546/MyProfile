import { CONTROLS } from "../config/controls";
import {
  checkPlatformCollision,
  checkPartitionCollision,
  isOnPlatform,
} from "./collisionSystem";

import type {
  Partition,
  Platform,
  PlayerState,
} from "../types/gameTypes";

type Params = {
  player: PlayerState;
  keys: Set<string>;
  speed: number;
  worldWidth: number;

  gravity: number;
  jumpForce: number;
  deathY: number;

  spawnX: number;
  spawnY: number;

  playerWidth: number;
  playerHeight: number;

  platforms: Platform[];
  partitions: Partition[];

  // isDropping: boolean;
  // dropDuration: number;
  delta: number;
};

export const updatePlayer = ({
  player,
  keys,
  speed,
  worldWidth,
  gravity,
  jumpForce,
  deathY,
  spawnX,
  spawnY,
  playerWidth,
  playerHeight,
  platforms,
  partitions,
  // isDropping,
  // dropDuration,
  delta,
}: Params): PlayerState => {
  let newX = player.x;
  let newY = player.y;
  let velocityY = player.velocityY;
  // let dropTimer = Math.max(0, player.dropTimer);
  let isGrounded = false;

  const prevX = player.x;
  const prevY = player.y;

  const moveLeft = keys.has(CONTROLS.moveLeft);
  const moveRight = keys.has(CONTROLS.moveRight);
  const jump = keys.has(CONTROLS.jump);

  // =====================================
  // MOVE
  // =====================================

  if (moveLeft) newX -= speed;
  if (moveRight) newX += speed;

  const maxX = Math.max(0, worldWidth - playerWidth);
  newX = Math.max(0, Math.min(maxX, newX));

  // =====================================
  // PLATFORM CHECK
  // =====================================

  const onPlatform = isOnPlatform(
    newX,
    newY,
    playerWidth,
    playerHeight,
    platforms
  );

  isGrounded = onPlatform;

  // =====================================
  // DROP
  // =====================================

  // if (isDropping && onPlatform && dropTimer <= 0) {
  //   dropTimer = dropDuration;
  //   isGrounded = false;
  // }

  // =====================================
  // JUMP
  // =====================================

  if (jump && isGrounded && Math.abs(velocityY) < 0.01) {
    velocityY = jumpForce;
    isGrounded = false;
  }

  // =====================================
  // GRAVITY
  // =====================================

  velocityY -= gravity;
  newY += velocityY;

  // =====================================
  // RESPAWN
  // =====================================

  if (newY <= deathY) {
    const spawnGrounded = isOnPlatform(
      spawnX,
      spawnY,
      playerWidth,
      playerHeight,
      platforms
    );

    return {
      x: spawnX,
      y: spawnY,
      velocityY: 0,
      // dropTimer: 0,
      isGrounded: spawnGrounded,
    };
  }

  // =====================================
  // DROP TIMER
  // =====================================

  // if (dropTimer > 0) {
  //   dropTimer = Math.max(0, dropTimer - delta);
  // }

  // =====================================
  // PLATFORM COLLISION
  // =====================================

  // if (velocityY <= 0 && dropTimer <= 0) {
  if (velocityY <= 0) {
    const hit = checkPlatformCollision(
      newX,
      newY,
      prevY,
      velocityY,
      playerWidth,
      playerHeight,
      platforms
    );

    if (hit.collided) {
      newY = hit.y;
      velocityY = 0;
      isGrounded = true;
    }
  }

  // =====================================
  // PARTITION COLLISION
  // =====================================

  const partitionHit = checkPartitionCollision(
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
    velocityY,
    // dropTimer,
    isGrounded,
  };
};