import { create } from "zustand";

export type WorldId = "lava-world" | "ice-world";

interface WorldState {
  worldId: WorldId;
  setWorldId: (id: WorldId) => void;
}

export const useWorldStore = create<WorldState>((set) => ({
  worldId: "lava-world",
  setWorldId: (id) => set({ worldId: id }),
}));