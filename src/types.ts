// 1. Base Node (Shared Props)
interface BaseNode {
  id: string;
  ratio: number;
}

// 2. Leaf Node (Holds Content)
export interface LeafNode extends BaseNode {
  type: 'leaf';
  component_connected: string; // Required for leaves
  
  // Explicitly disallow container props to catch bugs
  children?: never;
  split?: never;
}

// 3. Container Node (Holds Splits)
export interface ContainerNode extends BaseNode {
  type: 'container';
  split: 'horizontal' | 'vertical'; // Required for containers
  children: [TreeNode, TreeNode];   // Tuple: Always exactly 2 children
  
  // Explicitly disallow leaf props
  component_connected?: never;
}

// 4. The Union (The Master Type)
export type TreeNode = LeafNode | ContainerNode;

// 5. The Full Tree State
export interface TreeStructure {
  root: TreeNode;
  all_leaves: Array<{ id: string; component: string }>;
}

// 6. Flexbit Config (Registry)
export type FlexbitType = 'native' | 'remote' | 'exclusive';

export interface FlexbitConfig {
  type: FlexbitType;
  component: React.ComponentType<any>;
  url?: string;
  permissions?: string[];
  defaultSettings?: Record<string, any>;
}