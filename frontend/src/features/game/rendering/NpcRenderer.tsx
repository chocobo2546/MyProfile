import { useEffect, useState } from "react";
import type { Npc } from "../types/gameTypes";
import { NPC_IDLE_ANIMATION } from "../engine/PhysicsManager";

interface NpcRendererProps {
  npc: Npc;
  isActive: boolean;
  dialogueIndex: number;
}

export const NpcRenderer = ({ npc, isActive, dialogueIndex }: NpcRendererProps) => {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const interval = 1000 / NPC_IDLE_ANIMATION.fps;
    const id = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % NPC_IDLE_ANIMATION.frames.length);
    }, interval);
    return () => clearInterval(id);
  }, []);

  const frame = NPC_IDLE_ANIMATION.frames[frameIndex % NPC_IDLE_ANIMATION.frames.length];

  const dialogues = npc.dialogues;
  const hasDialogues = dialogues && dialogues.length > 0;
  const currentDialogue = hasDialogues ? dialogues[dialogueIndex % dialogues.length] : null;
  const showHint = isActive && hasDialogues && dialogues.length > 1;

  return (
    <div
      style={{
        position: "absolute",
        left: npc.x,
        bottom: npc.y,
        width: npc.width,
        height: npc.height,
        zIndex: 60,
        transition: "left 0.1s, bottom 0.1s",
      }}
    >
      <img
        src={frame.image}
        draggable={false}
        style={{
          position: "absolute",
          left: `calc(50% + ${frame.offsetX}px)`,
          bottom: frame.offsetY,
          width: frame.width,
          height: frame.height,
          transform: "translateX(-50%)",
          pointerEvents: "none",
          userSelect: "none",
          imageRendering: "pixelated",
        }}
      />

      {isActive && currentDialogue && (
        <div
          style={{
            position: "absolute",
            bottom: npc.height + 8,
            left: "50%",
            transform: "translateX(-50%)",
            minWidth: 180,
            maxWidth: 260,
            padding: "10px 14px",
            borderRadius: 10,
            backgroundColor: "rgba(0,0,0,0.85)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#f0f0f0",
            fontSize: 13,
            lineHeight: 1.5,
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 70,
          }}
        >
          <p style={{ margin: 0 }}>{currentDialogue.message}</p>

          {showHint && (
            <p
              style={{
                margin: "6px 0 0",
                fontSize: 11,
                opacity: 0.5,
                textAlign: "right",
              }}
            >
              [F] {dialogueIndex + 1}/{dialogues.length}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
