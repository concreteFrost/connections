import ReactFlow, {
  Background,
  BackgroundVariant,
  applyNodeChanges,
} from "react-flow-renderer";
import useStore from "store/store";
import { ReactFlowProvider } from "reactflow";
import { nodeTypes } from "store/types/flowElements";

function Canvas(props: any) {
  const visualMappingSlice = useStore((state) => state.visualMappingSlice);
  const blocks = useStore((state) => state.visualMappingSlice.blocks);
  const edges = useStore((state) => state.visualMappingSlice.edges);

  return (
    <ReactFlowProvider>
      <ReactFlow
        style={{
          height: "100vh",
          overflowY: "hidden",
        }}
        nodes={blocks}
        edges={edges}
        onNodesChange={visualMappingSlice.onBlocksChange}
        nodeTypes={nodeTypes}
        onConnect={visualMappingSlice.onEdgesConnect}
        onEdgesChange={visualMappingSlice.onEdgesChange}
        panOnDrag={false}
        panOnScroll={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        draggable={false}
      >
        <Background variant={BackgroundVariant.Lines}></Background>
      </ReactFlow>
    </ReactFlowProvider>
  );
}

export default Canvas;
