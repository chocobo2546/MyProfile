export type Platform = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Partition = {
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

export type Portal = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  targetWorld: "lava-world" | "ice-world" | string;
  label?: string;
};

export type WorldData = {
  id: "lava-world" | "ice-world" | string;

  worldWidth: number;

  background: string;
  farBackground?: string;
  nearBackground?: string;

  spawnX: number;
  spawnY: number;

  platforms: Platform[];
  partitions: Partition[];
  targets: Target[];
  portals: Portal[];
};

export type PlayerState = {
  x: number;
  y: number;

  velocityY: number;
//   dropTimer: number;

  isGrounded: boolean;
};

export type CameraState = {
  current: number;
  target: number;
};

export type AnimationState =
  | "idle"
  | "walk"
  | "run"
  | "jump"
  | "fall";