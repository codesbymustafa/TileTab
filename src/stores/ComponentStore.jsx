import { create } from "zustand";

const componentMap = new Map();

const useComponentStore = create(() => ({
  map: componentMap
}))


export default useComponentStore;