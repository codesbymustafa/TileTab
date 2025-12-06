import { TreeStructure, TreeNode } from "@/types";

// Add to your Treestore.jsx
export default function resize(tree: TreeStructure, containerId: string, ratio1: number, ratio2: number): TreeStructure {
    const newTree: TreeStructure = JSON.parse(JSON.stringify(tree));
    
    // Recursive function to find and update the container
    const findAndUpdate = (node: TreeNode): boolean => {
      if (node.id === containerId && node.type === 'container' && node.children && node.children.length === 2) {
          node.children[0].ratio = ratio1;
          node.children[1].ratio = ratio2;
        return true;
      }

      if (node.type === 'container' && node.children) {
        for (let child of node.children) {
          if (findAndUpdate(child)) return true;
        }
      }
      
      return false;
    };
    
    findAndUpdate(newTree.root);

    return newTree;

}