import type {
  Platform,
  Partition,
  Target,
  Portal,
} from "../types/gameTypes";

// =========================================
// PLATFORM
// =========================================

export const isOnPlatform = (
  playerX: number,
  playerY: number,
  playerWidth: number,
  _playerHeight: number,
  platforms: Platform[]
) => {
  const playerLeft = playerX;
  const playerRight = playerX + playerWidth;
  const playerBottom = playerY;

  for (const p of platforms) {
    const platformTop = p.y + p.height;

    const withinX =
      playerRight > p.x &&
      playerLeft < p.x + p.width;

    const touchingTop =
      Math.abs(playerBottom - platformTop) <= 2;

    if (withinX && touchingTop) {
      return true;
    }
  }

  return false;
};

// =========================================
// PLATFORM COLLISION
// =========================================

export const checkPlatformCollision = (
  playerX: number,
  playerY: number,
  prevX: number,
  prevY: number,
  playerWidth: number,
  playerHeight: number,
  platforms: Platform[]
) => {
  let newX = playerX;
  let newY = playerY;

  let grounded = false;

  for (const p of platforms) {
    const hit =
      newX + playerWidth > p.x &&
      newX < p.x + p.width &&
      newY + playerHeight > p.y &&
      newY < p.y + p.height;

    if (!hit) continue;

    const prevRight = prevX + playerWidth;
    const prevLeft = prevX;
    const prevTop = prevY + playerHeight;
    const prevBottom = prevY;

    const platformRight = p.x + p.width;
    const platformTop = p.y + p.height;

    // =====================================
    // ชนจากซ้าย
    // =====================================

    if (prevRight <= p.x) {
      newX = p.x - playerWidth;
    }

    // =====================================
    // ชนจากขวา
    // =====================================

    else if (prevLeft >= platformRight) {
      newX = platformRight;
    }

    // =====================================
    // ตกลงด้านบน
    // =====================================

    else if (prevBottom >= platformTop) {
      newY = platformTop;
      grounded = true;
    }

    // =====================================
    // ชนด้านล่าง
    // =====================================

    else if (prevTop <= p.y) {
      newY = p.y - playerHeight;
    }
  }

  return {
    x: newX,
    y: newY,
    grounded,
  };
};

// =========================================
// PARTITION
// =========================================

export const isOnPartition = (
  playerX: number,
  playerY: number,
  playerWidth: number,
  _playerHeight: number,
  partitions: Partition[]
) => {
  const playerLeft = playerX;
  const playerRight = playerX + playerWidth;
  const playerBottom = playerY;

  for (const p of partitions) {
    const partitionTop = p.y + p.height;

    const withinX =
      playerRight > p.x &&
      playerLeft < p.x + p.width;

    const touchingTop =
      Math.abs(playerBottom - partitionTop) <= 2;

    if (withinX && touchingTop) {
      return true;
    }
  }

  return false;
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

  let grounded = false;

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

    const wallRight =
      wall.x + wall.width;

    const wallTop =
      wall.y + wall.height;

    // =====================================
    // ชนจากซ้าย
    // =====================================

    if (prevRight <= wall.x) {
      newX = wall.x - playerWidth;
    }

    // =====================================
    // ชนจากขวา
    // =====================================

    else if (prevLeft >= wallRight) {
      newX = wallRight;
    }

    // =====================================
    // ยืนด้านบน
    // =====================================

    else if (prevBottom >= wallTop) {
      newY = wallTop;
      grounded = true;
    }

    // =====================================
    // ชนด้านล่าง
    // =====================================

    else if (prevTop <= wall.y) {
      newY = wall.y - playerHeight;
    }
  }

  return {
    x: newX,
    y: newY,
    grounded,
  };
};

// =========================================
// TARGET
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

    if (hit) {
      hits.push(t.id);
    }
  }

  return hits;
};

// =========================================
// PORTAL
// =========================================

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

    if (hit) {
      return portal;
    }
  }

  return null;
};