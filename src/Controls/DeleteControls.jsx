import React from 'react'
import {useTree , useDelete} from '/src/stores/Treestore';
import {enableMapSet } from 'immer';

export default function DeleteControls() {

  const treeData = useTree();
  const deleteNode = useDelete();

  const [selectedLeaf, setSelectedLeaf] = React.useState("");
  enableMapSet();
  // Handle delete operation
  const handledelete = () => {
    if (!selectedLeaf) {
      alert("Please select a leaf and enter a component name");
      return;
    }

    deleteNode(selectedLeaf);

    // Reset form
    setSelectedLeaf("");
  };


  return (
    <div className="mb-3">
    
          <h4 className="text-gray-300 text-sm mb-2">delete Node</h4>
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

            {/* delete Button */}
            <button 
              onClick={handledelete}
              className="px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium"
            >
              delete
            </button>
          </div>
        </div>
  )
}
