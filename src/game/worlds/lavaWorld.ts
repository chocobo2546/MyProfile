import type { WorldData } from "../types/gameTypes";

import skyBg from "../../assets/background/backgroundSky.png";
import farMountain from "../../assets/background/farMountain.png";
import nearMountain from "../../assets/background/nearMoutain.png";
import landGrass from "../../assets/background/landGrass.png";

import treeBig from "../../assets/decorations/bigTree.png";
import treeOak from "../../assets/decorations/oakTree.png";

export const lavaWorld: WorldData = {
  id: "lava-world",

  worldWidth: 3000,

  // =====================================
  // BACKGROUNDS
  // =====================================

  skyBackground: skyBg,

  farBackground: farMountain,

  nearBackground: nearMountain,

  landBackground: landGrass,

  spawnX: 200,
  spawnY: 500,

    backgroundLayers: [
    // SKY
    {
      image: skyBg,

      speed: 0,

      repeatX: true,

      size: "auto 100%",

      y: 0,

      zIndex: 0,
    },

    // FAR MOUNTAIN
    {
      image: farMountain,

      speed: 0.1,

      repeatX: true,

      size: "auto 500px",

      y: 100,

      opacity: 0.8,

      zIndex: 1,
    },

    // NEAR MOUNTAIN
    {
      image: nearMountain,

      speed: 0.25,

      repeatX: true,

      size: "auto 600px",

      y: -20,

      zIndex: 2,
    },

    // LAND GRASS
    {
      image: landGrass,

      speed: 0.5,

      repeatX: true,

      size: "auto 280px",

      y: 80,

      zIndex: 3,
    },
        {
      image: landGrass,

      speed: 0.5,

      repeatX: true,

      size: "auto 280px",

      y: 80,

      zIndex: 4,
    },
  ],

  decorations: [
    {
      id: "tree-1",

      image: treeBig,

      x: -500,
      y: -160,

      width: 1000,
      height: 1000,

      zIndex: 1,
      parallax: 0.05,
    },

    // {
    //   id: "tree-2",

    //   image: treeOak,

    //   x: 100,
    //   y: 40,

    //   width: 260,
    //   height: 320,

    //   zIndex: 1,
    //   parallax: 0.4,
    // },
  ],

  platforms: [
    { x: -10, y: 50, width: 3000, height: 60 },
    { x: 800, y: 150, width: 500, height: 60 },
    { x: 1500, y: 300, width: 400, height: 60 },
  ],

  partitions: [
    { x: -10, y: 0, width: 3000, height: 50 },
  ],

  targets: [
    {
      id: "welcome",
      x: 200,
      y: 80,
      width: 80,
      height: 80,
      text:
        "Welcome to my interactive portfolio!\n\n" +
        "Explore the world to discover\n" +
        "my projects and skills.",
    },
  ],

  portals: [
    {
      id: "to-ice",
      x: 2500,
      y: 60,
      width: 80,
      height: 80,
      targetWorld: "ice-world",
      label: "Ice World",
    },
  ],
};