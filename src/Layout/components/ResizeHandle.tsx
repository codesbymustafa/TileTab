import React from 'react';
import { ResizingState } from '../hooks/useResizing';
import { useLayoutStore } from '../../stores/LayoutStore';

interface ResizeHandleProps {
  nodeId: string;
  isVerticalSplit: boolean;
  firstChildRatio: number;
  resizing: ResizingState | null;
  onMouseDown: (e: React.MouseEvent, parentId: string, isVertical: boolean) => void;
}

export const ResizeHandle: React.FC<ResizeHandleProps> = ({
  nodeId,
  isVerticalSplit,
  firstChildRatio,
  resizing,
  onMouseDown,
}) => {
  const handleWidth = useLayoutStore((state) => state.handleWidth);

  return (
    <div
      className={`
        absolute z-20 
        group
        ${isVerticalSplit ? 'cursor-col-resize' : 'cursor-row-resize'}
        transition-colors duration-150
      `}
      style={{
        ...(isVerticalSplit
          ? {
              left: `${firstChildRatio}%`,
              top: '0',
              bottom: '0',
              width: `${handleWidth}px`,
              transform: 'translateX(-50%)',
            }
          : {
              top: `${firstChildRatio}%`,
              left: '0',
              right: '0',
              height: `${handleWidth}px`,
              transform: 'translateY(-50%)',
            }),
      }}
      onMouseDown={(e) => onMouseDown(e, nodeId, isVerticalSplit)}
    >
      <div
        className={`
          absolute overflow-hidden
          ${isVerticalSplit
            ? 'w-px h-[30px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:h-full '
            : 'h-px w-[30px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:w-full'}
          ${resizing?.parentId === nodeId
            ? 'bg-blue-500 h-full w-full'
            : 'bg-gray-500 group-hover:bg-gray-400'}
          transition-all duration-200 ease-out
        `}
      />
    </div>
  );
};
