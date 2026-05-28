import type {
  Platform,
  Partition,
  Target,
  Portal,
} from "../types/gameTypes";

// =========================================
// PLATFORM HELPERS
// =========================================

export const isOnPlatform = (
  playerX: number,
  playerY: number,
  playerWidth: number,
  playerHeight: number,
  platforms: Platform[]
) => {
  const playerLeft = playerX;
  const playerRight = playerX + playerWidth;
  const playerBottom = playerY;
  const playerTop = playerY + playerHeight;

  for (const p of platforms) {
    const platformTop = p.y + p.height;

    const withinX =
      playerRight > p.x &&
      playerLeft < p.x + p.width;

    const touchingY =
      playerBottom <= platformTop + 4 &&
      playerTop >= platformTop - 4;

    if (withinX && touchingY) {
      return true;
    }
  }

  return false;
};

export const checkPlatformCollision = (
  playerX: number,
  playerY: number,
  prevY: number,
  velocityY: number,
  playerWidth: number,
  playerHeight: number,
  platforms: Platform[]
) => {
  if (velocityY > 0) {
    return {
      collided: false,
      y: playerY,
    };
  }

  const playerLeft = playerX;
  const playerRight = playerX + playerWidth;

  let collided = false;
  let bestY = playerY;

  for (const p of platforms) {
    const platformTop = p.y + p.height;

    const withinX =
      playerRight > p.x &&
      playerLeft < p.x + p.width;

    const crossedTop =
      prevY >= platformTop - 10 &&
      playerY <= platformTop + 10;

    if (withinX && crossedTop) {
      if (!collided || platformTop > bestY) {
        collided = true;
        bestY = platformTop;
      }
    }
  }

  return {
    collided,
    y: collided ? bestY : playerY,
  };
};

// =========================================
// PARTITION COLLISION
// =========================================

export const checkPartitionCollision = (
  playerX: number,
  playerY: number,
  prevX: number,
  prevY: number,
  playerWidth: number,
  playerHeight: number,
  partitions: Partition[]
) => {
  let newX = playerX;
  let newY = playerY;

  for (const wall of partitions) {
    const hit =
      newX + playerWidth > wall.x &&
      newX < wall.x + wall.width &&
      newY + playerHeight > wall.y &&
      newY < wall.y + wall.height;

    if (!hit) continue;

    const prevRight = prevX + playerWidth;
    const prevLeft = prevX;
    const prevTop = prevY + playerHeight;
    const prevBottom = prevY;

    // Prefer resolving by the side the player came from
    if (prevRight <= wall.x) {
      newX = wall.x - playerWidth;
    } else if (prevLeft >= wall.x + wall.width) {
      newX = wall.x + wall.width;
    } else if (prevBottom >= wall.y + wall.height) {
      newY = wall.y + wall.height;
    } else if (prevTop <= wall.y) {
      newY = wall.y - playerHeight;
    }
  }

  return {
    x: newX,
    y: newY,
  };
};

// =========================================
// TARGET / PORTAL
// =========================================

export const checkTargetCollision = (
  playerX: number,
  playerY: number,
  playerWidth: number,
  playerHeight: number,
  targets: Target[]
) => {
  const hits: string[] = [];

  for (const t of targets) {
    const hit =
      playerX + playerWidth > t.x &&
      playerX < t.x + t.width &&
      playerY + playerHeight > t.y &&
      playerY < t.y + t.height;

    if (hit) hits.push(t.id);
  }

  return hits;
};

export const checkPortalCollision = (
  playerX: number,
  playerY: number,
  playerWidth: number,
  playerHeight: number,
  portals: Portal[]
) => {
  for (const portal of portals) {
    const hit =
      playerX + playerWidth > portal.x &&
      playerX < portal.x + portal.width &&
      playerY + playerHeight > portal.y &&
      playerY < portal.y + portal.height;

    if (hit) return portal;
  }

  return null;
};