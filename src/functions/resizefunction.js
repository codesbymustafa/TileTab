// Add to your Treestore.jsx
export default function resize(tree ,containerId , ratio1, ratio2) {
    const newTree = JSON.parse(JSON.stringify(tree));
    
    // Recursive function to find and update the container
    const findAndUpdate = (node) => {
      if (node.id === containerId && node.children && node.children.length === 2) {
          node.children[0].ratio = ratio1;
          node.children[1].ratio = ratio2;
        return true;
      }

      if (node.children) {
        for (let child of node.children) {
          if (findAndUpdate(child)) return true;
        }
      }
      
      return false;
    };
    
    findAndUpdate(newTree.root);

    return newTree ;

}