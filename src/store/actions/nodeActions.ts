
import {
  NodeChange,
  applyNodeChanges,
} from "react-flow-renderer";
import { RFState } from "../types/rfState";


export const onBlocksChange =
  (get: () => RFState, set: any) => (changes: NodeChange[]) => {
 
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

