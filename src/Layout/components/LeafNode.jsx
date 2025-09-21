import React, { useMemo, memo } from 'react';
import { useFlexbitByName } from '../../stores/FlexbitStore';

// function createComponent(code, importsMap) {
//   const fn = new Function("React", ...Object.keys(importsMap),
//     `const { ${Object.keys(importsMap).join(", ")} } = arguments[1];
//     return ${code};`);
//   return fn(React, importsMap);
// }

const LeafNode = memo(({ node, style }) => {

  const padding = "4px";

  const flexbit = useFlexbitByName(node.component_connected);

  // const importsMap = useMemo(() => {
  //   if (!flexbit?.import) return {};
  //   return flexbit.import.reduce((acc, item) => {
  //     if (item.from === "react") {
  //       item.imports.forEach(name => { acc[name] = React[name]; });
  //     }
  //     // extend this for lucide-react, shadcn, etc
  //     return acc;
  //   }, {});
  // }, [flexbit?.import]);

  const flexbit_code = flexbit ? flexbit.code : `<div className='flex items-center justify-center h-full w-full text-gray-500 italic'>No Flexbit</div>`;

  // const flexbit_inside = useMemo(() => {
  //   if (!flexbit_code) return null;
  //   return createComponent(flexbit_code, importsMap);
  // }, [flexbit_code, importsMap]);

  return (
    <div
      key={node.id}
      className="bg-gray-900 flex items-center justify-center text-white font-mono text-sm overflow-hidden"
      style={{ ...style, padding: padding }}
    >
      <div className='flex justify-center p-0 border border-gray-700 rounded-2xl h-full w-full overflow-hidden '>

        <div className='bg-gray-800 w-full text-center h-7 flex items-center justify-center border-b border-gray-700'>

          <span className="text-blue-400 font-semibold">
            {node.component_connected || node.id}
          </span>

        </div>

        <flexbit_inside />

      </div>
    </div>
  );
});

export default LeafNode;