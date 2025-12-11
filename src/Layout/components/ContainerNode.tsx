import React from 'react';
import { TreeNode } from '@/types';
import LeafNode from './LeafNode';
import { ResizingState } from '../hooks/useResizing';
import { ResizeHandle } from './ResizeHandle';

interface ContainerNodeProps {
  node: TreeNode;
  style: React.CSSProperties;
  resizing: ResizingState | null;
  localRatio: number | null;
  containerRefs: React.RefObject<Record<string, HTMLDivElement | null>>;
  renderNode: (node: TreeNode) => React.ReactNode;
  handleMouseDown: (e: React.MouseEvent, parentId: string, isVertical: boolean) => void;
  padding: number;
}

export const ContainerNode: React.FC<ContainerNodeProps> = ({
  node,
  style,
  resizing,
  localRatio,
  containerRefs,
  renderNode,
  handleMouseDown,
  padding,
}) => {
  if (node.type === 'leaf') {
    return <LeafNode key={node.id} node={node} style={style} padding={padding} />;
  }

  const isVerticalSplit = node.split === 'vertical';

  const firstChildRatio =
    resizing?.parentId === node.id && localRatio !== null
      ? localRatio
      : node.children[0]?.ratio || 50;

  return (
    <div
      key={node.id}
      ref={(el) => {
        containerRefs.current[node.id] = el;
      }}
      className={`flex ${isVerticalSplit ? 'flex-row' : 'flex-col'} relative `}
      style={style}
    >
      {node.children && node.children[0] && renderNode(node.children[0])}

      {node.children && node.children[1] && renderNode(node.children[1])}

      {node.children && node.children.length === 2 && (
        <ResizeHandle
          nodeId={node.id}
          isVerticalSplit={isVerticalSplit}
          firstChildRatio={firstChildRatio}
          resizing={resizing}
          onMouseDown={handleMouseDown}
        />
      )}
    </div>
  );
};
