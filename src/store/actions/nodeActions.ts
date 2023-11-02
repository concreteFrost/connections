
import {
  NodeChange,
  applyNodeChanges,
} from "react-flow-renderer";

import actions from "./combinedActions";
import { RFState } from "../types/rfState";


export const setselectedBlockID = (get: () => RFState, set: any) => (nodeId: string) => {
  set({ selectedBlockID: nodeId });
};

export const onBlocksChange =
  (get: () => RFState, set: any) => (changes: NodeChange[]) => {

    changes.forEach((change: NodeChange) => {
      if (change.type === 'remove') {
        actions.groupActions.deleteGroup(get().flowSlice.flow.visual.blocks, change)
      }
    })

    set((state: RFState) => ({
      flowSlice: {
        ...state.flowSlice,
        flow: {
          ...state.flowSlice.flow,
          visual: {
            ...state.flowSlice.flow.visual,
            blocks: applyNodeChanges(changes, get().flowSlice.flow.visual.blocks)
          },
        }

      },
    }));

  };

