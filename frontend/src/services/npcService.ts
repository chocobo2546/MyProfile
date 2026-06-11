import { apiClient } from "../api/client";

export interface NPC {
  id: number;
  name: string;
  worldId: string;
}

export interface Dialogue {
  sequence: number;
  message: string;
}

const mockNPCs: NPC[] = [
  { id: 1, name: "Guide", worldId: "lava-world" },
  { id: 2, name: "Elder", worldId: "ice-world" },
];

const mockDialogues: Record<number, Dialogue[]> = {
  1: [
    { sequence: 1, message: "Hello, traveler!" },
    { sequence: 2, message: "Welcome to my portfolio world." },
  ],
  2: [
    { sequence: 1, message: "The ice world holds many secrets." },
    { sequence: 2, message: "Explore and discover." },
  ],
};

export const npcService = {
  getAllNPCs: async () => {
    return {
      success: true,
      message: "NPCs fetched",
      data: mockNPCs,
    };
  },
  getNPCById: async (id: number) => {
    const npc = mockNPCs.find(n => n.id === id);
    return {
      success: true,
      message: "NPC fetched",
      data: npc || null,
    };
  },
  getDialogues: async (npcId: number) => {
    const dialogues = mockDialogues[npcId] || [];
    return {
      success: true,
      message: "Dialogues fetched",
      data: dialogues,
    };
  },
  // Admin methods (placeholder)
  createNPC: async (data: Omit<NPC, "id">) => {
    return { success: true, message: "NPC created", data: { id: Date.now(), ...data } };
  },
  updateNPC: async (id: number, data: Partial<NPC>) => {
    return { success: true, message: "NPC updated" };
  },
  deleteNPC: async (id: number) => {
    return { success: true, message: "NPC deleted" };
  },
};