import { RFState } from "store/types/rfState";

export const selector = (state: RFState) => ({
  nodes: state.flowSlice.flow.visual.blocks,
  edges: state.flowSlice.flow.visual.edges,
  onBlocksChange: state.flowSlice.onBlockChange,
  onGroupDelete: state.flowSlice.deleteGroupOnButtonClick,
  onEdgesChange: state.flowSlice.onChange,
  onConnect: state.flowSlice.onEdgesConnect,
});
