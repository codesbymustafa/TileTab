import { create } from "zustand";
import { FLEXBIT_REGISTRY } from "./flexbitRegistry";
import { FlexbitConfig } from "@/types";

export interface FlexbitItem extends FlexbitConfig {
  name: string;
}

interface FlexbitStore {
  map: FlexbitItem[];
}

// Convert Registry Object to Array for the store
const componentMap: FlexbitItem[] = Object.entries(FLEXBIT_REGISTRY).map(([name, config]) => ({
  name,
  ...config
}));

const useFlexbitStore = create<FlexbitStore>(() => ({
  map: componentMap
}))


export default useFlexbitStore;

const useComponentMap = () => {
  return useFlexbitStore((state) => state.map);
}

const useFlexbitByName = (name: string) => {

  return useFlexbitStore((state) => state.map.find(flexbit => flexbit.name === name));

}

export { useComponentMap , useFlexbitByName};