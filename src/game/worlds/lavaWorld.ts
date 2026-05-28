import type { WorldData } from "../types/gameTypes";

import skyBg from "../../assets/background/sky.jpg";

export const lavaWorld: WorldData = {
  id: "lava-world",
  worldWidth: 4000,
  background: skyBg,
  spawnX: 200,
  spawnY: 60,

  platforms: [
    { x: 0, y: 0, width: 700, height: 60 },
    { x: 800, y: 150, width: 500, height: 50 },
    { x: 1500, y: 300, width: 400, height: 50 },
  ],

  partitions: [
    { x: 1900, y: 350, width: 60, height: 600 },
  ],

  targets: [
    {
      id: "welcome",
      x: 200,
      y: 60,
      width: 50,
      height: 50,
      text:
        "Welcome to my interactive portfolio!\n\n" +
        "Explore the world to discover\n" +
        "my projects and skills.",
    },
  ],

  portals: [
    {
      id: "to-ice",
      x: 400,
      y: 60,
      width: 80,
      height: 80,
      targetWorld: "ice-world",
      label: "Ice World",
    },
  ],
};