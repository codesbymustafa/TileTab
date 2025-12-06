import { useState, useCallback, useEffect, useRef } from 'react';
import { useResize, useTree } from '/src/stores/Treestore';
import LeafNode from '/src/Layout/components/LeafNode';

export default function LayoutRenderer() {
  const tree = useTree();
  const resizeNode = useResize();
  
  const [resizing, setResizing] = useState(null);
  const [startPos, setStartPos] = useState(0);
  const [startRatio, setStartRatio] = useState([0, 0]);
  const [localRatio, setLocalRatio] = useState(null);
  
  const containerRefs = useRef({});

  const handleMouseDown = useCallback((e, parentId, isVertical) => {
    e.preventDefault();
    e.stopPropagation();
    
    const findNode = (node) => {
      if (node.id === parentId) return node;
      if (node.children) {
        for (let child of node.children) {
          const found = findNode(child);
          if (found) return found;
        }
      }
      return null;
    };
    
    const parentNode = findNode(tree.root);
    if (!parentNode || !parentNode.children || parentNode.children.length !== 2) return;
    
    setResizing({ parentId, isVertical });
    setStartPos(isVertical ? e.clientX : e.clientY);
    setStartRatio([parentNode.children[0].ratio, parentNode.children[1].ratio]);
    setLocalRatio(parentNode.children[0].ratio);
    
    document.body.style.cursor = isVertical ? 'col-resize' : 'row-resize';
    document.body.style.userSelect = 'none';
  }, [tree]);

  const handleMouseMove = useCallback((e) => {
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
    
    // Enforce bounds
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
  }, [resizing, startPos, startRatio, resizeNode]);

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

  const renderNode = useCallback((node) => {
    if (!node) return null;

    const style = node.ratio === 100 ? {
      width: '100%',
      height: '100%',
      position: 'relative',
      boxSizing: 'border-box',
    } : {
      flexBasis: `${node.ratio}%`,
      flexGrow: 0,
      flexShrink: 0,
      position: 'relative',
      boxSizing: 'border-box',
      minWidth: 0,
      minHeight: 0
    };

    if (node.type === 'leaf') {
      return (
        <LeafNode
          node = {node}
          style = {style}
        />
      );
    }

    if (node.type === 'container') {
      const isVerticalSplit = node.split === 'vertical' || node.split === 'verticaly';
      
      // Use local ratio for active resize, otherwise use node ratio
      const firstChildRatio = resizing?.parentId === node.id && localRatio !== null
        ? localRatio
        : node.children[0]?.ratio || 50;
      
      return (
        <div
          key={node.id}
          
          ref={el => containerRefs.current[node.id] = el}

          className={`flex ${isVerticalSplit ? 'flex-row' : 'flex-col'} relative `}

          style={style}
        >
          {/* First child */}
          {node.children && node.children[0] && renderNode(node.children[0])}
          
          {/* Second child */}
          {node.children && node.children[1] && renderNode(node.children[1])}
          
          {/* Resize handle - positioned absolutely */}
          {node.children && node.children.length === 2 && (
            <div
              className={`
                absolute z-20 
                group
                ${isVerticalSplit 
                  ? 'cursor-col-resize' 
                  : 'cursor-row-resize'
                }
                transition-colors duration-150
              `}
              style={{
                ...(isVerticalSplit 
                  ? { 
                      left: `${firstChildRatio}%`,
                      top: '0',
                      bottom: '0',
                      width: '4px',
                      transform: 'translateX(-50%)'
                    } 
                  : { 
                      top: `${firstChildRatio}%`,
                      left: '0',
                      right: '0',
                      height: '4px',
                      transform: 'translateY(-50%)'
                    }
                )
              }}
              onMouseDown={(e) => handleMouseDown(e, node.id, isVerticalSplit)}
            >
              {/* Visual handle - small dash that expands on hover */}
              <div 
                className={`
                  absolute overflow-hidden
                  ${isVerticalSplit 
                    ? 'w-[1px] h-[30px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:h-full ' 
                    : 'h-[1px] w-[30px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:w-full'
                  }
                  ${resizing?.parentId === node.id 
                    ? 'bg-blue-500 h-full w-full' 
                    : 'bg-gray-500 group-hover:bg-gray-400'
                  }
                  transition-all duration-200 ease-out
                `}
              />
            </div>
          )}
        </div>
      );
    }

    return null;
  }, [handleMouseDown, resizing, localRatio]);

  return (
    <div className="w-full h-screen p-0">
      <div className="w-full h-full relative">
        {tree && tree.root && renderNode(tree.root)}
      </div>
    </div>
  );
}