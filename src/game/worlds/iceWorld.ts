import type { WorldData } from "../types/gameTypes";

import skyBg from "../../assets/background/backgroundSky.png";
import farMountain from "../../assets/background/farMountain.png";
import nearMountain from "../../assets/background/nearMoutain.png";
import landGrass from "../../assets/background/landGrass.png";

export const iceWorld: WorldData = {
  id: "ice-world",

  worldWidth: 4200,

  // =====================================
  // BACKGROUNDS
  // =====================================

  skyBackground: skyBg,

  farBackground: farMountain,

  nearBackground: nearMountain,

  landBackground: landGrass,

  spawnX: 200,
  spawnY: 60,
  
  decorations: [],

  platforms: [
    { x: 0, y: 0, width: 800, height: 60 },
    { x: 1000, y: 220, width: 400, height: 50 },
    { x: 1800, y: 420, width: 500, height: 50 },
  ],

  partitions: [
    { x: 500, y: 100, width: 500, height: 60 },
  ],

  targets: [
    {
      id: "ice",
      x: 300,
      y: 60,
      width: 50,
      height: 50,
      text:
        "Ice World\n\n" +
        "This world can contain\n" +
        "different projects and themes.",
    },
  ],

  portals: [
    {
      id: "to-lava",
      x: 400,
      y: 60,
      width: 80,
      height: 80,
      targetWorld: "lava-world",
      label: "Lava World",
    },
  ],
};