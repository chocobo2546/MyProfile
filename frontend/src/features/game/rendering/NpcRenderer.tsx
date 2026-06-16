import type { Npc } from "../types/gameTypes";

interface NpcRendererProps {
  npc: Npc;
  isActive: boolean;
  dialogueIndex: number;
}

export const NpcRenderer = ({ npc, isActive, dialogueIndex }: NpcRendererProps) => {
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
      {npc.imageUrl ? (
        <img
          src={npc.imageUrl}
          alt={npc.name}
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            pointerEvents: "none",
            userSelect: "none",
            imageRendering: "auto",
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#e3342f",
            border: "2px solid #cc1f1a",
            borderRadius: 4,
            boxShadow: "0 0 12px rgba(227, 52, 47, 0.6)",
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          top: -22,
          left: "50%",
          transform: "translateX(-50%)",
          padding: "2px 8px",
          borderRadius: 4,
          backgroundColor: "rgba(0,0,0,0.7)",
          color: "#fff",
          fontSize: 12,
          fontWeight: 600,
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {npc.name}
      </div>

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
