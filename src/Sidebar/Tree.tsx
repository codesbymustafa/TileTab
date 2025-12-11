import { useState, useEffect, useRef } from 'react';
import useTreeStore , { useTree } from '../stores/Treestore';

const Tree = () => {
  const tree = useTree();
  const [isModified, setIsModified] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Update textarea when tree changes from other sources
  useEffect(() => {
    const treeJson = JSON.stringify(tree, null, 2);
    if (textareaRef.current) {
      textareaRef.current.value = treeJson;
      setIsModified(false);
    }
  }, [tree]);

  const handleSave = () => {
    if (!textareaRef.current) return;
    try {
      const parsedTree = JSON.parse(textareaRef.current.value);
      useTreeStore.setState({ tree: parsedTree });
      setIsModified(false);
    } catch (error) {
      alert('Invalid JSON format. Please check your input.');
      console.error('JSON Parse Error:', error);
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded border border-gray-700">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-white font-semibold">Tree Structure</h4>
        <button
          onClick={handleSave}
          disabled={!isModified}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            isModified
              ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          Save
        </button>
      </div>
      
      <textarea
        ref={textareaRef}
        defaultValue={JSON.stringify(tree, null, 2)}
        onChange={() => setIsModified(true)}
        className="w-full field-sizing-content bg-gray-900 text-gray-300 text-xs font-mono p-3 rounded border border-gray-600 resize-none focus:outline-none focus:border-blue-500 transition-colors"
        placeholder="Enter tree JSON structure..."
        spellCheck={false}
      />
      
      {isModified && (
        <p className="text-yellow-400 text-xs mt-2">
          ⚠️ You have unsaved changes
        </p>
      )}
    </div>
  );
};

export default Tree;