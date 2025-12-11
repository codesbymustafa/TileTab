import { create } from "zustand";

interface LayoutState {
  padding: number;
  setPadding: (value: number) => void;
  handleWidth: number;
  setHandleWidth: (value: number) => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  padding: 4,
  setPadding: (value: number) => set({ padding: value }),
  handleWidth: 4,
  setHandleWidth: (value: number) => set({ handleWidth: value }),
}));
