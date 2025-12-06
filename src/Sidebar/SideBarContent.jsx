import React, { memo } from 'react';
import SplitControls from '/src/Controls/SplitControls';
import DeleteControls from '/src/Controls/DeleteControls';
import FlexbitList from '/src/FlexbitList';
import Tree from './Tree.jsx';

const SideBarContent = memo(() => {
  return (
    <div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500">
      <p className="mt-0 text-gray-300">Your sidebar content goes here...</p>
      
      
      <div className="space-y-4">
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