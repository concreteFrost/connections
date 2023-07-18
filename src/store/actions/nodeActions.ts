
import {
  NodeChange,
  applyNodeChanges,
} from "react-flow-renderer";

import { groupActions } from "./combinedActions";


export const setSelectedNodeID = (get: any, set: any) => (nodeId: string) => {
  set({ selectedNode: nodeId });
};

export const onNodesChange =
  (get: any, set: any) => (changes: NodeChange[]) => {

    changes.forEach((change: NodeChange) => {
      if (change.type === 'remove') {
        groupActions.deleteGroup(get().flow.visual.blocks, change)
      }
    })

    set((state: any) => ({
      flow: {
        ...state.flow,
        visual: {
          ...state.flow.visual,
          blocks: applyNodeChanges(changes, get().flow.visual.blocks)
        },
      },
    }));

   
  };

