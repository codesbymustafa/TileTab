import React, { useCallback } from 'react';
import { useTree } from '../stores/Treestore';
import { TreeNode } from '@/types';
import { useResizing } from './hooks/useResizing';
import { ContainerNode } from './components/ContainerNode';
import { useLayoutStore } from '../stores/LayoutStore';

export default function LayoutRenderer() {
  const tree = useTree();
  const padding = useLayoutStore((state) => state.padding);
  const { resizing, localRatio, containerRefs, handleMouseDown } = useResizing();

  const renderNode = useCallback(
    (node: TreeNode): React.ReactNode => {
      if (!node) return null;

      const style: React.CSSProperties =
        node.ratio === 100
          ? {
              width: '100%',
              height: '100%',
              position: 'relative',
              boxSizing: 'border-box',
            }
          : {
              flexBasis: `${node.ratio}%`,
              flexGrow: 0,
              flexShrink: 0,
              position: 'relative',
              boxSizing: 'border-box',
              minWidth: 0,
              minHeight: 0,
            };

      return (
        <ContainerNode
          key={node.id}
          node={node}
          style={style}
          resizing={resizing}
          localRatio={localRatio}
          containerRefs={containerRefs}
          renderNode={renderNode}
          handleMouseDown={handleMouseDown}
          padding={padding}
        />
      );
    },
    [resizing, localRatio, containerRefs, handleMouseDown]
  );

  return (
    <div className="w-full h-screen p-0">
      <div className="w-full h-full relative">
        {tree && tree.root && renderNode(tree.root)}
      </div>
    </div>
  );
}