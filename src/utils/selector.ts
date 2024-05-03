
export const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  onBlocksChange: state.onBlocksChange,
  onGroupDelete: state.deleteGroup,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

