// =========================================
// IDLE
// =========================================

import idle0 from "../assets/player/idle/idle_0.png";
import idle1 from "../assets/player/idle/idle_1.png";
import idle2 from "../assets/player/idle/idle_2.png";
import idle3 from "../assets/player/idle/idle_3.png";

// =========================================
// WALK
// =========================================

import walk0 from "../assets/player/walk/walk_0.png";
import walk1 from "../assets/player/walk/walk_1.png";
import walk2 from "../assets/player/walk/walk_2.png";
import walk3 from "../assets/player/walk/walk_3.png";
import walk4 from "../assets/player/walk/walk_4.png";
// =========================================
// RUN
// =========================================

import run0 from "../assets/player/run/run_0.png";
import run1 from "../assets/player/run/run_1.png";
import run2 from "../assets/player/run/run_2.png";
import run3 from "../assets/player/run/run_3.png";
// import run4 from "../assets/player/run/run_4.png";
// import run5 from "../assets/player/run/run_5.png";
// import run6 from "../assets/player/run/run_6.png";
// import run7 from "../assets/player/run/run_7.png";

// =========================================
// JUMP
// =========================================

// import jump0 from "../assets/player/jump/jump_0.png";
import jump1 from "../assets/player/jump/jump_1.png";

// =========================================
// FALL
// =========================================

import fall0 from "../assets/player/fall/fall_0.png";
// import fall1 from "../assets/player/fall/fall_1.png";

// =========================================
// TYPES
// =========================================

export type AnimationState =
  | "idle"
  | "walk"
  | "run"
  | "jump"
  | "fall";

export type FrameData = {
  image: string;

  width: number;
  height: number;

  offsetX: number;
  offsetY: number;
};

export type AnimationData = {
  fps: number;
  frames: FrameData[];
};

// =========================================
// ANIMATIONS
// =========================================

export const PLAYER_ANIMATIONS: Record<
  AnimationState,
  AnimationData
> = {
  // =====================================
  // IDLE
  // =====================================

  idle: {
    fps: 2,

    frames: [
      {
        image: idle0,
        width: 90,
        height: 140,

        offsetX: 0,
        offsetY: -25,
      },

      {
        image: idle1,
        width: 90,
        height: 140,

        offsetX: 0,
        offsetY: -25,
      },

      {
        image: idle2,
        width: 90,
        height: 140,

        offsetX: 0,
        offsetY: -25,
      },

      {
        image: idle3,
        width: 90,
        height: 140,

        offsetX: 0,
        offsetY: -25,
      },
    ],
  },

  // =====================================
  // WALK
  // =====================================

  walk: {
    fps: 5,

    frames: [
      {
        image: walk0,
        width: 100,
        height: 130,

        offsetX: 0,
        offsetY: -20,
      },

      {
        image: walk1,
        width: 100,
        height: 130,

        offsetX: 0,
        offsetY: -20,
      },

      {
        image: walk2,
        width: 100,
        height: 130,

        offsetX: 0,
        offsetY: -20,
      },

      {
        image: walk3,
        width: 100,
        height: 130,

        offsetX: 0,
        offsetY: -20,
      },

      {
        image: walk4,
        width: 100,
        height: 130,

        offsetX: 0,
        offsetY: -20,
      },
    ],
  },

  // =====================================
  // RUN
  // =====================================

  run: {
    fps: 6,

    frames: [
      {
        image: run0,
        width: 150,
        height: 130,

        offsetX: 0,
        offsetY: -20,
      },

      {
        image: run1,
        width: 150,
        height: 130,

        offsetX: 0,
        offsetY: -20,
      },

      {
        image: run2,
        width: 150,
        height: 130,

        offsetX: 0,
        offsetY: -20,
      },

      {
        image: run3,
        width: 150,
        height: 130,

        offsetX: 0,
        offsetY: -20,
      },
    ],
  },

  // =====================================
  // JUMP
  // =====================================

  jump: {
    fps: 1,

    frames: [
      {
        image: jump1,
        width: 140,
        height: 160,

        offsetX: 0,
        offsetY: -20,
      },
    ],
  },

  // =====================================
  // FALL
  // =====================================

  fall: {
    fps: 1,

    frames: [
      {
        image: fall0,
        width: 150,
        height: 180,

        offsetX: 0,
        offsetY: -20,
      },
    ],
  },
};