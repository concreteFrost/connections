import { useNodesState } from "react-flow-renderer";
import { RFState } from "store/types/rfState";

export const selector = (state: RFState) => ({
  nodes: state.flowSlice.flow.visual.blocks,
  edges: state.flowSlice.flow.visual.edges,
  onBlocksChange: state.onBlocksChange,
  onGroupDelete: state.flowSlice.deleteGroupOnButtonClick,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

