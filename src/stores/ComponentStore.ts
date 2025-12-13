import { create } from 'zustand';
import { FLEXBIT_REGISTRY } from './flexbitRegistry';
import { FlexbitConfig, FlexbitType } from '@/types';

/**
 * ComponentData represents the data stored for each leaf component
 * It contains the component type and its configuration/settings
 */
export interface ComponentData {
  id: string;
  type: string; // Component type name (e.g., "Clock", "Calendar", "GoogleSearch")
  flexbitType: FlexbitType; // 'native' | 'remote' | 'exclusive'
  config: FlexbitConfig; // Full configuration including component function
  settings?: Record<string, any>; // Component-specific settings (e.g., theme, colors)
  createdAt: number; // Timestamp of component creation
}

/**
 * ComponentStore State
 */
interface ComponentStoreState {
  // Map of component ID to its full data
  components: Map<string, ComponentData>;

  // Actions
  addComponent: (id: string, componentType: string, settings?: Record<string, any>) => boolean;
  removeComponent: (id: string) => boolean;
  updateComponentSettings: (id: string, settings: Record<string, any>) => boolean;
  getComponent: (id: string) => ComponentData | undefined;
  getAllComponents: () => ComponentData[];
  getComponentsByType: (componentType: string) => ComponentData[];
  getComponentConfig: (componentType: string) => FlexbitConfig | undefined;
  clearAllComponents: () => void;
  getComponentCount: () => number;
}

/**
 * Create the Zustand store for managing leaf components
 */
export const useComponentStore = create<ComponentStoreState>((set, get) => ({
  components: new Map(),

  /**
   * Add a new component to the store
   * @param id - Unique identifier for the component instance
   * @param componentType - Type of component (must exist in registry)
   * @param settings - Optional component-specific settings
   * @returns true if successful, false if component type not found or ID already exists
   */
  addComponent: (id: string, componentType: string, settings?: Record<string, any>) => {
    const config = FLEXBIT_REGISTRY[componentType];
    
    if (!config) {
      console.warn(`Component type "${componentType}" not found in registry`);
      return false;
    }

    const state = get();
    if (state.components.has(id)) {
      console.warn(`Component with ID "${id}" already exists`);
      return false;
    }

    const componentData: ComponentData = {
      id,
      type: componentType,
      flexbitType: config.type,
      config,
      settings: settings || config.defaultSettings || {},
      createdAt: Date.now(),
    };

    set((state) => {
      const newComponents = new Map(state.components);
      newComponents.set(id, componentData);
      return { components: newComponents };
    });

    return true;
  },

  /**
   * Remove a component from the store
   * @param id - Component ID to remove
   * @returns true if successful, false if component not found
   */
  removeComponent: (id: string) => {
    const state = get();
    if (!state.components.has(id)) {
      console.warn(`Component with ID "${id}" not found`);
      return false;
    }

    set((state) => {
      const newComponents = new Map(state.components);
      newComponents.delete(id);
      return { components: newComponents };
    });

    return true;
  },

  /**
   * Update settings for an existing component
   * @param id - Component ID to update
   * @param settings - New settings to merge
   * @returns true if successful, false if component not found
   */
  updateComponentSettings: (id: string, settings: Record<string, any>) => {
    const state = get();
    const component = state.components.get(id);

    if (!component) {
      console.warn(`Component with ID "${id}" not found`);
      return false;
    }

    set((state) => {
      const newComponents = new Map(state.components);
      const updatedComponent = {
        ...component,
        settings: {
          ...component.settings,
          ...settings,
        },
      };
      newComponents.set(id, updatedComponent);
      return { components: newComponents };
    });

    return true;
  },

  /**
   * Retrieve a specific component by ID
   * @param id - Component ID
   * @returns ComponentData if found, undefined otherwise
   */
  getComponent: (id: string) => {
    return get().components.get(id);
  },

  /**
   * Get all components in the store
   * @returns Array of all ComponentData objects
   */
  getAllComponents: () => {
    return Array.from(get().components.values());
  },

  /**
   * Get all components of a specific type
   * @param componentType - Component type to filter by
   * @returns Array of ComponentData objects matching the type
   */
  getComponentsByType: (componentType: string) => {
    return Array.from(get().components.values()).filter(
      (component) => component.type === componentType
    );
  },

  /**
   * Get the configuration for a component type
   * @param componentType - Component type name
   * @returns FlexbitConfig if found, undefined otherwise
   */
  getComponentConfig: (componentType: string) => {
    return FLEXBIT_REGISTRY[componentType];
  },

  /**
   * Clear all components from the store
   */
  clearAllComponents: () => {
    set({ components: new Map() });
  },

  /**
   * Get the total count of components in the store
   * @returns Number of components
   */
  getComponentCount: () => {
    return get().components.size;
  },
}));
