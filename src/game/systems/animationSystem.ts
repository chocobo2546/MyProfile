import idle0 from "../../assets/player/idle/idle_0.png";
import idle1 from "../../assets/player/idle/idle_1.png";
import idle2 from "../../assets/player/idle/idle_2.png";
import idle3 from "../../assets/player/idle/idle_3.png";

import walk0 from "../../assets/player/walk/walk_0.png";
import walk1 from "../../assets/player/walk/walk_1.png";
import walk2 from "../../assets/player/walk/walk_2.png";
import walk3 from "../../assets/player/walk/walk_3.png";
import walk4 from "../../assets/player/walk/walk_4.png";

import run0 from "../../assets/player/run/run_0.png";
import run1 from "../../assets/player/run/run_1.png";
import run2 from "../../assets/player/run/run_2.png";
import run3 from "../../assets/player/run/run_3.png";

import jump0 from "../../assets/player/jump/jump_1.png";
import fall0 from "../../assets/player/fall/fall_0.png";

import type { AnimationState } from "../types/gameTypes";

export type AnimationFrame = {
  image: string;
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
};

export type AnimationClip = {
  fps: number;
  frames: AnimationFrame[];
};

export const PLAYER_ANIMATIONS: Record<
  AnimationState,
  AnimationClip
> = {
  idle: {
    fps: 2,
    frames: [
      {
        image: idle0,
        width: 90,
        height: 140,
        offsetX: 0,
        offsetY: -40,
      },
      {
        image: idle1,
        width: 90,
        height: 140,
        offsetX: 0,
        offsetY: -40,
      },
      {
        image: idle2,
        width: 90,
        height: 140,
        offsetX: 0,
        offsetY: -40,
      },
      {
        image: idle3,
        width: 90,
        height: 140,
        offsetX: 0,
        offsetY: -40,
      },
    ],
  },

  walk: {
    fps: 5,
    frames: [
      {
        image: walk0,
        width: 100,
        height: 130,
        offsetX: 0,
        offsetY: -35,
      },
      {
        image: walk1,
        width: 100,
        height: 130,
        offsetX: 0,
        offsetY: -35,
      },
      {
        image: walk2,
        width: 100,
        height: 130,
        offsetX: 0,
        offsetY: -35,
      },
      {
        image: walk3,
        width: 100,
        height: 130,
        offsetX: 0,
        offsetY: -35,
      },
      {
        image: walk4,
        width: 100,
        height: 130,
        offsetX: 0,
        offsetY: -35,
      },
    ],
  },

  run: {
    fps: 6,
    frames: [
      {
        image: run0,
        width: 150,
        height: 130,
        offsetX: 0,
        offsetY: -35,
      },
      {
        image: run1,
        width: 150,
        height: 130,
        offsetX: 0,
        offsetY: -35,
      },
      {
        image: run2,
        width: 150,
        height: 130,
        offsetX: 0,
        offsetY: -35,
      },
      {
        image: run3,
        width: 150,
        height: 130,
        offsetX: 0,
        offsetY: -35,
      },
    ],
  },

  jump: {
    fps: 5,
    frames: [
      {
        image: jump0,
        width: 140,
        height: 160,
        offsetX: 0,
        offsetY: -35,
      },
    ],
  },

  fall: {
    fps: 5,
    frames: [
      {
        image: fall0,
        width: 150,
        height: 180,
        offsetX: 0,
        offsetY: -35,
      },
    ],
  },
};

type AnimationParams = {
  isGrounded: boolean;
  velocityY: number;
  isMoving: boolean;
  isRunning: boolean;
};

export const resolveAnimationState = ({
  isGrounded,
  velocityY,
  isMoving,
  isRunning,
}: AnimationParams): AnimationState => {
  if (!isGrounded) {
    if (velocityY > 0.15) return "jump";
    return "fall";
  }

  if (isMoving && isRunning) return "run";
  if (isMoving) return "walk";

  return "idle";
};