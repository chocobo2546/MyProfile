export type Platform = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Target = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
};

export type Partition = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type GameConfig = {
  worldWidth: number;

  deadZoneLeft: number;
  deadZoneRight: number;

  speed: number;
  sprintMultiplier: number;

  gravity: number;
  jumpForce: number;
  groundY: number;
  deathY: number;

  // =========================================
  // PLAYER HITBOX
  // =========================================

  playerWidth: number;
  playerHeight: number;

  // =========================================
  // SPAWN
  // =========================================

  spawnX: number;
  spawnY: number;

  // =========================================
  // MAP
  // =========================================

  platforms: Platform[];
  targets: Target[];
  partitions: Partition[];
};

export const CONFIG: GameConfig = {
  worldWidth: 4000,

  deadZoneLeft: 200,
  deadZoneRight: 400,

  speed: 5,
  sprintMultiplier: 2,

  gravity: 0.1,
  jumpForce: 5.2,

  groundY: 50,
  deathY: 10,

  // =========================================
  // PLAYER HITBOX
  // =========================================

  playerWidth: 60,
  playerHeight: 100,


  // =========================================
  // SPAWN
  // =========================================

  spawnX: 200,
  spawnY: 1000,

  // =========================================
  // PLATFORMS
  // =========================================

  platforms: [
    { x: 0, y: 0, width: 600, height: 60 },

    { x: 500, y: 150, width: 500, height: 50 },

    { x: 1200, y: 220, width: 100, height: 50 },
    { x: 1300, y: 300, width: 100, height: 50 },
    { x: 1400, y: 380, width: 490, height: 50 },

    { x: 1650, y: 260, width: 300, height: 50 },

    { x: 2100, y: 120, width: 1000, height: 50 },

    { x: 3200, y: 250, width: 180, height: 50 },
    { x: 3600, y: 160, width: 200, height: 50 },
  ],

  // =========================================
  // TARGETS
  // =========================================

  targets: [
    {
      id: "Welcome",
      x: 200,
      y: 50,
      width: 50,
      height: 50,
      text:
        "Welcome!\n\n" +
        "This game-style page is my interactive portfolio.\n" +
        "You can explore my skills, projects,\n" +
        "and experience by moving through the world.",
    },
  ],

  // =========================================
  // PARTITIONS
  // =========================================

  partitions: [
    {
      x: 1820,
      y: 420,
      width: 60,
      height: 600,
    },
  ],
};