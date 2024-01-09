
import {
  NodeChange,
  applyNodeChanges,
} from "react-flow-renderer";
import { RFState } from "../types/rfState";
import groupActions from "./groupActions";


export const setSelectedBlockId = (get: () => RFState, set: any) => (nodeId: string) => {
  set({ selectedBlockID: nodeId });
};

export const onBlocksChange =
  (get: () => RFState, set: any) => (changes: NodeChange[]) => {

    changes.forEach((change: NodeChange) => {
      if (change.type === 'remove') {
        groupActions.deleteGroup(get().flowSlice.flow.visual.blocks, change)
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

const nodeActions = {
  setSelectedBlockId: setSelectedBlockId,
  onBlocksChange: onBlocksChange,
};

export default nodeActions;

