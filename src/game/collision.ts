export const checkTriggerCollision = (
  playerX: number,
  playerY: number,
  playerWidth: number,
  playerHeight: number,
  triggerX: number,
  triggerY: number,
  triggerWidth: number,
  triggerHeight: number
) => {
  const playerLeft = playerX;
  const playerRight = playerX + playerWidth;
  const playerBottom = playerY;
  const playerTop = playerY + playerHeight;

  const triggerLeft = triggerX;
  const triggerRight = triggerX + triggerWidth;
  const triggerBottom = triggerY;
  const triggerTop = triggerY + triggerHeight;

  return (
    playerRight > triggerLeft &&
    playerLeft < triggerRight &&
    playerTop > triggerBottom &&
    playerBottom < triggerTop
  );
};

export const checkPlatformCollision = (
  playerX: number,
  playerY: number,
  prevY: number,
  velocityY: number,
  playerWidth: number,
  playerHeight: number,
  platforms: {
    x: number;
    y: number;
    width: number;
    height: number;
  }[]
) => {
  // ❌ ห้ามชนตอนกำลังขึ้น
  if (velocityY > 0) {
    return {
      collided: false,
      y: playerY,
    };
  }

  const playerLeft = playerX;
  const playerRight = playerX + playerWidth;

  const prevBottom = prevY;
  const currBottom = playerY;

  let closestPlatformY = -Infinity;
  let collided = false;

  for (const platform of platforms) {
    const platformTop = platform.y + platform.height;

    const withinX =
      playerRight > platform.x &&
      playerLeft < platform.x + platform.width;

    const crossed =
      prevBottom >= platformTop &&
      currBottom <= platformTop;

    if (withinX && crossed) {
      if (platformTop > closestPlatformY) {
        closestPlatformY = platformTop;
        collided = true;
      }
    }
  }

  if (collided) {
    return {
      collided: true,
      y: closestPlatformY,
    };
  }

  return {
    collided: false,
    y: playerY,
  };
};

export const isOnPlatform = (
  playerX: number,
  playerY: number,
  playerWidth: number,
  playerHeight: number,
  platforms: {
    x: number;
    y: number;
    width: number;
    height: number;
  }[]
) => {
  const playerLeft = playerX;
  const playerRight = playerX + playerWidth;
  const playerBottom = playerY;

  for (const platform of platforms) {
    const platformTop = platform.y + platform.height;

    const withinX =
      playerRight > platform.x &&
      playerLeft < platform.x + platform.width;

    // ✅ FIX: เพิ่ม tolerance
    const onTop =
      Math.abs(playerBottom - platformTop) < 3;

    if (withinX && onTop) {
      return true;
    }
  }

  return false;
};

export const checkTargetCollision = (
  playerX: number,
  playerY: number,
  playerWidth: number,
  playerHeight: number,
  targets: {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    text: string;
  }[]
) => {
  const playerLeft = playerX;
  const playerRight = playerX + playerWidth;
  const playerBottom = playerY;
  const playerTop = playerY + playerHeight;

  const collidedTargets: string[] = [];

  for (const t of targets) {
    const left = t.x;
    const right = t.x + t.width;
    const bottom = t.y;
    const top = t.y + t.height;

    const hit =
      playerRight > left &&
      playerLeft < right &&
      playerTop > bottom &&
      playerBottom < top;

    if (hit) {
      collidedTargets.push(t.id);
    }
  }

  return collidedTargets;
};