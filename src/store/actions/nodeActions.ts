
import {
  NodeChange,
  applyNodeChanges,
} from "react-flow-renderer";
import { RFState } from "../types/rfState";
import groupActions from "./groupActions";
import blockActions from "./blockActions";

export const onBlocksChange =
  (get: () => RFState, set: any) => (changes: NodeChange[]) => {
 
    changes.forEach((change: NodeChange) => {
      // if (change.type === 'remove') {
      //   // groupActions.deleteGroup(get().flowSlice.flow.visual.blocks, change)
      //   blockActions.deleteBlock(get, set)()
      // }
      if (change.type === "select") {
        if (change.selected) {
          blockActions.setSelectedBlockId(get, set)(change.id)
         
        }
        else {
          blockActions.removeSelectedBlockId(get, set)(change.id)
        }

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
  onBlocksChange: onBlocksChange,
};

export default nodeActions;

