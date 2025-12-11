import { JSX, memo } from 'react';
import SplitControls from '../Controls/SplitControls';
import DeleteControls from '../Controls/DeleteControls';
import FlexbitList from '../FlexbitList';
import Tree from './Tree';
import { useLayoutStore } from '../stores/LayoutStore';

const SideBarContent = memo((): JSX.Element => {
  const padding = useLayoutStore((state) => state.padding);
  const setPadding = useLayoutStore((state) => state.setPadding);
  const handleWidth = useLayoutStore((state) => state.handleWidth);
  const setHandleWidth = useLayoutStore((state) => state.setHandleWidth);

  return (
    <div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500">
      <p className="mt-0 text-gray-300">Your sidebar content goes here...</p>
      
      
      <div className="space-y-4">
        <div className="p-3 bg-gray-800 rounded border border-gray-700 flex flex-col gap-2">
          <label className="text-gray-300 text-sm font-medium">Tile Padding</label>
          <input
            type="range"
            min={0}
            max={32}
            value={padding}
            onChange={(e) => setPadding(Number(e.target.value))}
            className="w-full"
          />
          <span className="text-gray-400 text-xs">Current: {padding}px</span>
        </div>
        <div className="p-3 bg-gray-800 rounded border border-gray-700 flex flex-col gap-2">
          <label className="text-gray-300 text-sm font-medium">Handle Width</label>
          <input
            type="range"
            min={1}
            max={Math.max(1, padding)}
            value={Math.min(handleWidth, padding || 1)}
            onChange={(e) => setHandleWidth(Number(e.target.value))}
            className="w-full"
          />
          <span className="text-gray-400 text-xs">Current: {Math.min(handleWidth, padding || 1)}px (≤ padding)</span>
        </div>
        <div className="pl-4 bg-gray-800 rounded border border-gray-700">
          <FlexbitList/>
        </div>
        <div className="p-3 bg-gray-800 rounded border border-gray-700">
          <SplitControls />
          <DeleteControls />
        </div>
        <Tree />
      </div>
    </div>
  );
});

export default SideBarContent;