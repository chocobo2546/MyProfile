import { CONTROLS } from "../engine/InputManager";
import {
  checkPlatformCollision,
  checkPartitionCollision,
  isOnPlatform,
  isOnPartition,
} from "./CollisionSystem";
import type { Partition, Platform, PlayerState } from "../types/gameTypes";

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
  _delta: number; // kept for compatibility but not used
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
}: Params): PlayerState => {
  let newX = player.x;
  let newY = player.y;
  let velocityY = player.velocityY;

  const prevX = player.x;
  const prevY = player.y;

  let isGrounded = false;

  const moveLeft = keys.has(CONTROLS.moveLeft);
  const moveRight = keys.has(CONTROLS.moveRight);
  const jump = keys.has(CONTROLS.jump);

  if (moveLeft) newX -= speed;
  if (moveRight) newX += speed;

  const maxX = Math.max(0, worldWidth - playerWidth);
  newX = Math.max(0, Math.min(maxX, newX));

  const onPlatform = isOnPlatform(newX, newY, playerWidth, playerHeight, platforms);
  const onPartition = isOnPartition(newX, newY, playerWidth, playerHeight, partitions);
  isGrounded = onPlatform || onPartition;

  if (jump && isGrounded) {
    velocityY = jumpForce;
    isGrounded = false;
  }

  velocityY -= gravity;
  newY += velocityY;

  const platformHit = checkPlatformCollision(
    newX, newY, prevX, prevY, playerWidth, playerHeight, platforms
  );
  newX = platformHit.x;
  newY = platformHit.y;
  if (platformHit.grounded) {
    velocityY = 0;
    isGrounded = true;
  }

  const partitionHit = checkPartitionCollision(
    newX, newY, prevX, prevY, playerWidth, playerHeight, partitions
  );
  newX = partitionHit.x;
  newY = partitionHit.y;
  if (partitionHit.grounded) {
    velocityY = 0;
    isGrounded = true;
  }

  if (newY <= deathY) {
    return {
      x: spawnX,
      y: spawnY,
      velocityY: 0,
      isGrounded: false,
    };
  }

  return {
    x: newX,
    y: newY,
    velocityY,
    isGrounded,
  };
};