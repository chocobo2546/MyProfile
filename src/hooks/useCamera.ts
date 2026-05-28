import { useEffect, useState } from "react";

import {
  smoothCamera,
  updateCameraTarget,
} from "../game/systems/cameraSystem";

type Params = {
  playerX: number;

  worldWidth: number;

  containerWidth: number;

  deadZoneLeft: number;
  deadZoneRight: number;

  lerp: number;
};

export const useCamera = ({
  playerX,
  worldWidth,
  containerWidth,
  deadZoneLeft,
  deadZoneRight,
  lerp,
}: Params) => {
  const [cameraOffset, setCameraOffset] =
    useState(0);

  const [cameraTarget, setCameraTarget] =
    useState(0);

  // =========================================
  // TARGET
  // =========================================

  useEffect(() => {
    setCameraTarget((prev) =>
      updateCameraTarget(
        playerX,
        prev,
        containerWidth,
        worldWidth,
        deadZoneLeft,
        deadZoneRight
      )
    );
  }, [
    playerX,
    worldWidth,
    containerWidth,
    deadZoneLeft,
    deadZoneRight,
  ]);

  // =========================================
  // SMOOTH
  // =========================================

  useEffect(() => {
    let frame: number;

    const loop = () => {
      setCameraOffset((prev) =>
        smoothCamera(
          prev,
          cameraTarget,
          lerp
        )
      );

      frame =
        requestAnimationFrame(loop);
    };

    frame =
      requestAnimationFrame(loop);

    return () =>
      cancelAnimationFrame(frame);
  }, [cameraTarget, lerp]);

  return cameraOffset;
};