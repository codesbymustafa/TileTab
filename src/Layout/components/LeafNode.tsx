import React, { memo, CSSProperties } from "react";
import { LeafNode as LeafNodeType } from "@/types";

export interface LeafNodeProps {
    node: LeafNodeType;
    style: CSSProperties;
    padding: number;
}

const LeafNode = memo(({ node, style, padding }: LeafNodeProps) => {
    return (
        <div
            key={node.id}
            className="bg-gray-900 flex items-center justify-center text-white font-mono text-sm overflow-hidden"
            style={{ ...style, padding: `${padding}px` }}
        >
            <div className="flex justify-center p-0 border border-gray-700 rounded-2xl h-full w-full overflow-hidden ">
                <div className="bg-gray-800 w-full text-center h-7 flex items-center justify-center border-b border-gray-700">
                    <span className="text-blue-400 font-semibold">
                        {node.component_connected || node.id}
                    </span>
                </div>
            </div>
        </div>
    );
});

export default LeafNode;
