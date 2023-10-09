
import {
  NodeChange,
  applyNodeChanges,
} from "react-flow-renderer";

import actions from "./combinedActions";
import { RFState } from "../types/rfState";


export const setSelectedNodeID = (get: any, set: any) => (nodeId: string) => {
  set({ selectedNode: nodeId });
};

export const onNodesChange =
  (get: any, set: any) => (changes: NodeChange[]) => {

    changes.forEach((change: NodeChange) => {
      if (change.type === 'remove') {
        actions.groupActions.deleteGroup(get().flow.visual.blocks, change)
      }
    })

    set((state: RFState) => ({
      flow: {
        ...state.flow,
        visual: {
          ...state.flow.visual,
          blocks: applyNodeChanges(changes, get().flow.visual.blocks)
        },
      },
    }));

   
  };

