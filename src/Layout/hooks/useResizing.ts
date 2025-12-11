import { useState, useCallback, useEffect, useRef } from 'react';
import { useResize, useTree } from '../../stores/Treestore';
import { TreeNode } from '@/types';

export interface ResizingState {
  parentId: string;
  isVertical: boolean;
}

export function useResizing() {
  const tree = useTree();
  const resizeNode = useResize();

  const [resizing, setResizing] = useState<ResizingState | null>(null);
  const [startPos, setStartPos] = useState(0);
  const [startRatio, setStartRatio] = useState<[number, number]>([0, 0]);
  const [localRatio, setLocalRatio] = useState<number | null>(null);

  const containerRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, parentId: string, isVertical: boolean) => {
      e.preventDefault();
      e.stopPropagation();

      const findNode = (node: TreeNode): TreeNode | null => {
        if (node.id === parentId) return node;
        if (node.type === 'container' && node.children) {
          for (let child of node.children) {
            const found = findNode(child);
            if (found) return found;
          }
        }
        return null;
      };

      const parentNode = findNode(tree.root);
      if (!parentNode || parentNode.type !== 'container' || !parentNode.children || parentNode.children.length !== 2)
        return;

      setResizing({ parentId, isVertical });
      setStartPos(isVertical ? e.clientX : e.clientY);
      setStartRatio([parentNode.children[0].ratio, parentNode.children[1].ratio]);
      setLocalRatio(parentNode.children[0].ratio);

      document.body.style.cursor = isVertical ? 'col-resize' : 'row-resize';
      document.body.style.userSelect = 'none';
    },
    [tree]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!resizing) return;

      const containerRef = containerRefs.current[resizing.parentId];
      if (!containerRef) return;

      const rect = containerRef.getBoundingClientRect();
      const currentPos = resizing.isVertical ? e.clientX : e.clientY;
      const delta = currentPos - startPos;

      const containerSize = resizing.isVertical ? rect.width : rect.height;
      const deltaRatio = (delta / containerSize) * 100;

      let newRatio1 = startRatio[0] + deltaRatio;
      let newRatio2 = 100 - newRatio1;

      if (newRatio1 < 20) {
        newRatio1 = 20;
        newRatio2 = 80;
      } else if (newRatio1 > 80) {
        newRatio1 = 80;
        newRatio2 = 20;
      }

      setLocalRatio(newRatio1);

      requestAnimationFrame(() => {
        resizeNode(resizing.parentId, newRatio1, newRatio2);
      });
    },
    [resizing, startPos, startRatio, resizeNode]
  );

  const handleMouseUp = useCallback(() => {
    if (resizing) {
      setResizing(null);
      setLocalRatio(null);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
  }, [resizing]);

  useEffect(() => {
    if (resizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [resizing, handleMouseMove, handleMouseUp]);

  return {
    resizing,
    localRatio,
    containerRefs,
    handleMouseDown,
  };
}
