import { useEffect, useRef } from "react";
import { CONTROLS } from "../engine/InputManager";

interface UsePlayerControlsParams {
  keys: Set<string>;
  toggleHideUI: () => void;
}

interface UsePlayerControlsReturn {
  keysRef: React.MutableRefObject<Set<string>>;
  facingRef: React.MutableRefObject<"left" | "right">;
}

export const usePlayerControls = ({ keys, toggleHideUI }: UsePlayerControlsParams): UsePlayerControlsReturn => {
  const keysRef = useRef<Set<string>>(keys);
  const facingRef = useRef<"left" | "right">("right");
  const previousKeysRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    keysRef.current = keys;

    if (keys.has(CONTROLS.moveLeft)) {
      facingRef.current = "left";
    }
    if (keys.has(CONTROLS.moveRight)) {
      facingRef.current = "right";
    }

    const wasHidePressed = previousKeysRef.current.has(CONTROLS.hideUI);
    const isHidePressed = keys.has(CONTROLS.hideUI);
    if (isHidePressed && !wasHidePressed) {
      toggleHideUI();
    }

    previousKeysRef.current = keys;
  }, [keys, toggleHideUI]);

  return { keysRef, facingRef };
};