import { create } from "zustand";
import { persist } from "zustand/middleware";
import deleteLeaf from "../functions/deletefunction";
import splitLeaf from "../functions/splitfunction";
import resize from "../functions/resizefunction";

const useTreeStore = create(
  persist(
    (set) => ({
      tree: 
        {
          "all_leaves" : [
            {
              "id": "0",
              "component": "Google Search"
            }
          ],

          "root": {
            "id": "0",
            "ratio": 100,
            "type": "leaf",
            "component_connected": "Google Search"
          }
        },
        
        actions : {
          splitNode: (leafId, splitType, position, newComponent) =>
            set((state) => ({
              tree: splitLeaf(
                state.tree,
                leafId,
                splitType,
                position,
                newComponent
              )
            })
          ),

      deleteNode: (leafId) =>
            set((state) => ({
              tree: deleteLeaf(state.tree, leafId)
            })
          ),

      resizeNode:(containerId , ratio1, ratio2) => 
            set((state) => ({
              tree : resize(state.tree , containerId , ratio1, ratio2)
            })
          )
        }

      
        }
      ),
    {
      name: "tree-storage"
    }
  )
);



const useTree = () => {
  return useTreeStore((state) => state.tree);}

const useAll_leaves = () => {
  return useTreeStore((state) => state.tree.all_leaves);}


const useNodeById = (id) => {
  
  const findNode = (node, id) => {
    if (node.id === id) return node;
    if (node.children) {
      for (let child of node.children) {
        const found = findNode(child, id);
        if (found) return found;
      }
    }
  }

  return useTreeStore((state) => findNode(state.tree.root, id));

}


const useDelete = () => 
  useTreeStore((state) => state.actions.deleteNode);
  
const useSplit = () => 
  useTreeStore((state) => state.actions.splitNode);
    
const useResize = () =>
  useTreeStore((state) => state.actions.resizeNode);
      
export { useTree, useAll_leaves, useNodeById, useDelete, useSplit,useResize};

export default useTreeStore;