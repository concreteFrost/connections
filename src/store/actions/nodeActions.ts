import { Node, NodeChange, applyNodeChanges } from "react-flow-renderer";
import { RFState } from "../types/rfState";

export const onBlocksChange = (get: () => RFState, set: any) => (blocks:Node<any>[]) => {

    set((state: RFState) => ({
      flowSlice: {
        ...state.flowSlice,
        flow: {
          ...state.flowSlice.flow,
          visual: {
            ...state.flowSlice.flow.visual,
            blocks: blocks,
          },
        },
      },
    }));
  };

const nodeActions = {
  onBlocksChange,
};

export default nodeActions;
