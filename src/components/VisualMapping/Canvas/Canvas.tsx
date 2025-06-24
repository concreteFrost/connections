import ReactFlow, {
  Background,
  BackgroundVariant,
  applyNodeChanges,
} from "react-flow-renderer";
import useStore from "store/store";
import { ReactFlowProvider } from "reactflow";
import { nodeTypes } from "store/types/flowElements";

function Canvas() {
  const visualMappingSlice = useStore((state) => state.visualMappingSlice);
  const inputs = useStore((state) => state.visualMappingSlice.InputStructure);
  const outputs = useStore((state) => state.visualMappingSlice.OutputStructure);
  const transforms = useStore(
    (state) => state.visualMappingSlice.Visual.Transforms.Transform
  );
  const edges = useStore((state) => state.visualMappingSlice.Visual.Edges);

  return (
    <ReactFlowProvider>
      <ReactFlow
        style={{
          height: "100vh",
          overflowY: "hidden",
        }}
        nodes={[...inputs, ...outputs, ...transforms]}
        edges={edges}
        onNodesChange={visualMappingSlice.onBlocksChange}
        nodeTypes={nodeTypes}
        onConnect={visualMappingSlice.onEdgesConnect}
        onEdgesChange={visualMappingSlice.onEdgesChange}
      >
        <Background variant={BackgroundVariant.Lines}></Background>
      </ReactFlow>
    </ReactFlowProvider>
  );
}

export default Canvas;
