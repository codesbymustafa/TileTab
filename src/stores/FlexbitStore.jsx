import { create } from "zustand";
import data from "../Database/Flexbits";

const componentMap = data.flexbitlist;

const useFlexbitStore = create(() => ({
  map: componentMap
}))


export default useFlexbitStore;

const useComponentMap = () => {
  return useFlexbitStore((state) => state.map);
}

const useFlexbitByName = (name) => {

  return useFlexbitStore((state) => state.map.find(flexbit => flexbit.name === name));

}

export { useComponentMap , useFlexbitByName};