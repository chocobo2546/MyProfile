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

export const CONFIG = {
  worldWidth: 3000,

  deadZoneLeft: 200,
  deadZoneRight: 400,

  speed: 5,
  sprintMultiplier: 2,

  gravity: 0.4,
  jumpForce: 12,
  groundY: 50,

  playerWidth: 50,
  playerHeight: 50,

  platforms: [
    { x: 300, y: 150, width: 120, height: 20 },
    { x: 300, y: 300, width: 120, height: 20 },
    { x: 500, y: 250, width: 150, height: 20 },
  ] as Platform[],

  targets: [
    {
      id: "t1",
      x: 500,
      y: 60,
      width: 20,
      height: 20,
      text: "Hello World",
    },
    {
      id: "t2",
      x: 700,
      y: 200,
      width: 30,
      height: 30,
      text: "Platform Area",
    },
  ] as Target[],
};