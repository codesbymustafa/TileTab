import React from 'react'
import {useSplit, useTree} from '/src/stores/Treestore';
import {enableMapSet } from 'immer';
enableMapSet();
export default function SplitControls() {

  const treeData = useTree();
  const splitNode = useSplit();
  const [selectedLeaf, setSelectedLeaf] = React.useState("");
  const [splitType, setSplitType] = React.useState("horizontal");
  const [position, setPosition] = React.useState("top");
  const [newComponent, setNewComponent] = React.useState("");
  
  // Handle split operation
  const handleSplit = () => {
    if (!selectedLeaf || !newComponent) {
      alert("Please select a leaf and enter a component name");
      return;
    }

    splitNode(selectedLeaf, splitType, position, newComponent);  
    // Reset form
    setSelectedLeaf("");
    setNewComponent("");
  };


  return (
    <div className="mb-3">
    
          <h4 className="text-gray-300 text-sm mb-2">Split Node</h4>
          <div className="flex gap-3 items-end flex-wrap">
            {/* Leaf Selection */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 text-xs">Select Leaf</label>
              <select 
                value={selectedLeaf}
                onChange={(e) => setSelectedLeaf(e.target.value)}
                className="px-3 py-1.5 bg-gray-700 text-white rounded text-sm border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                <option value="">-- Select --</option>
                {treeData.all_leaves.map(leafId => (
                  <option key={leafId.id} value={leafId.id}>
                    {leafId.component}
                  </option>
                ))}
              </select>
            </div>

            {/* Split Type */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 text-xs">Split Type</label>
              <select 
                value={splitType}
                onChange={(e) => setSplitType(e.target.value)}
                className="px-3 py-1.5 bg-gray-700 text-white rounded text-sm border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                <option value="horizontal">Horizontal</option>
                <option value="vertical">Vertical</option>
              </select>
            </div>

            {/* Position */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 text-xs">Position</label>
              <select 
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="px-3 py-1.5 bg-gray-700 text-white rounded text-sm border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                {splitType === "horizontal" ? (
                  <>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                  </>
                ) : (
                  <>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </>
                )}
              </select>
            </div>

            {/* Component Name */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 text-xs">New Component</label>
              <input 
                type="text"
                value={newComponent}
                onChange={(e) => setNewComponent(e.target.value)}
                placeholder="Component name"
                className="px-3 py-1.5 bg-gray-700 text-white rounded text-sm border border-gray-600 focus:border-blue-500 focus:outline-none placeholder-gray-500"
              />
            </div>

            {/* Split Button */}
            <button 
              onClick={handleSplit}
              className="px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium"
            >
              Split
            </button>
          </div>
        </div>
  )
}
