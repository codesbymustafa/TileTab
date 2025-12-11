import { create } from "zustand";
import { persist } from "zustand/middleware";
import deleteLeaf from "../functions/deletefunction";
import splitLeaf from "../functions/splitfunction";
import resize from "../functions/resizefunction";
import { TreeStructure, TreeNode } from "@/types";

export interface TreeActions {
  splitNode: (leafId: string, splitType: 'horizontal' | 'vertical', position: 'top' | 'bottom' | 'left' | 'right', newComponent: string) => void;
  deleteNode: (leafId: string) => void;
  resizeNode: (containerId: string, ratio1: number, ratio2: number) => void;
}

export interface TreeStoreState {
  tree: TreeStructure;
  actions: TreeActions;
}

const useTreeStore = create<TreeStoreState>()(
    persist(
        (set) => ({
            tree: {
                all_leaves: [
                    {
                        id: "0",
                        component: "Google Search",
                    },
                ],

                root: {
                    id: "0",
                    ratio: 100,
                    type: "leaf",
                    component_connected: "Google Search",
                },
            },

            actions: {
                splitNode: (leafId, splitType, position, newComponent) =>
                    set((state) => ({
                        tree: splitLeaf(
                            state.tree,
                            leafId,
                            splitType,
                            position,
                            newComponent
                        ),
                    })),

                deleteNode: (leafId) =>
                    set((state) => ({
                        tree: deleteLeaf(state.tree, leafId),
                    })),

                resizeNode: (containerId, ratio1, ratio2) =>
                    set((state) => ({
                        tree: resize(state.tree, containerId, ratio1, ratio2),
                    })),
            },
        }),
        {
            name: "tree-storage-v1",
            partialize: (state) => ({ tree: state.tree }),
        }
    )
);

const useTree = (): TreeStructure => {
    return useTreeStore((state) => state.tree);
};

const useAll_leaves = (): TreeStructure['all_leaves'] => {
    return useTreeStore((state) => state.tree.all_leaves);
};

const useNodeById = (id: string): TreeNode | undefined => {
    const findNode = (node: TreeNode, id: string): TreeNode | undefined => {
        if (node.id === id) return node;
        if (node.type === 'container' && node.children) {
            for (let child of node.children) {
                const found = findNode(child, id);
                if (found) return found;
            }
        }
        return undefined;
    };

    return useTreeStore((state) => findNode(state.tree.root, id));
};

const useDelete = (): TreeActions['deleteNode'] => useTreeStore((state) => state.actions.deleteNode);

const useSplit = (): TreeActions['splitNode'] => useTreeStore((state) => state.actions.splitNode);

const useResize = (): TreeActions['resizeNode'] => useTreeStore((state) => state.actions.resizeNode);

export { useTree, useAll_leaves, useNodeById, useDelete, useSplit, useResize };

export default useTreeStore;
