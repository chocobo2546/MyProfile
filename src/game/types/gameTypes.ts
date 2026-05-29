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

export type Decoration = {
  id: string;

  x: number;
  y: number;

  width: number;
  height: number;

  image: string;

  zIndex?: number;

  opacity?: number;

  parallax?: number;
};

export type BackgroundLayer = {
  image: string;

  speed?: number;

  y?: number;
  x?: number;

  height?: number;

  opacity?: number;

  repeatX?: boolean;

  size?: string;

  zIndex?: number;
};

export type WorldData = {
  id: "lava-world" | "ice-world" | string;

  worldWidth: number;

  skyBackground: string;

  farBackground?: string;

  nearBackground?: string;

  landBackground?: string;

  spawnX: number;
  spawnY: number;

  backgroundLayers?: BackgroundLayer[];
  platforms: Platform[];
  partitions: Partition[];
  targets: Target[];
  portals: Portal[];
  decorations: Decoration[];
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