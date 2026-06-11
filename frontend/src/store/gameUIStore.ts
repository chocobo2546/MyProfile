import { create } from "zustand";

interface GameUIState {
  hideUI: boolean;
  setHideUI: (value: boolean | ((prev: boolean) => boolean)) => void;
  toggleHideUI: () => void;
}

export const useGameUIStore = create<GameUIState>((set) => ({
  hideUI: false,
  setHideUI: (value) =>
    set((state) => ({
      hideUI: typeof value === "function" ? value(state.hideUI) : value,
    })),
  toggleHideUI: () =>
    set((state) => ({ hideUI: !state.hideUI })),
}));