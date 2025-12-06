import { create } from "zustand";

interface ComponentStore {
  map: Map<string, any>;
}

const componentMap = new Map<string, any>();

const useComponentStore = create<ComponentStore>(() => ({
  map: componentMap
}))


export default useComponentStore;