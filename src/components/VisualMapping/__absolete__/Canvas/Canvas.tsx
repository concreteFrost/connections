import ReactFlow, {
  Background,
  BackgroundVariant,
  ReactFlowInstance,
  Controls,
} from "react-flow-renderer";
import useStore from "store/store";
import { nodeTypes } from "store/types/flowElements";
import { RFState } from "store/types/rfState";

type Props = {
  setCanvasInstance: (inst: ReactFlowInstance) => void;
  canvasWrapper: React.RefObject<HTMLDivElement>;
};
function Canvas({ setCanvasInstance, canvasWrapper }: Props) {
  const visualMappingSlice = useStore((state) => state.visualMappingSlice);
  const inputs = useStore((state) => state.visualMappingSlice.InputStructure);
  const outputs = useStore((state) => state.visualMappingSlice.OutputStructure);
  const transforms = useStore(
    (state) => state.visualMappingSlice.Visual.Transforms.Transform
  );
  const edges = useStore((state) => state.visualMappingSlice.Visual.Edges);
  const { InputStructureEdges, OutputStructureEdges } = useStore(
    (state: RFState) => state.visualMappingSlice
  );

  return (
    <div
      style={{
        height: "100vh",
        overflowY: "hidden",
      }}
      ref={canvasWrapper}
    >
      <ReactFlow
        onInit={setCanvasInstance}
        nodes={[...inputs, ...outputs, ...transforms]}
        edges={[...edges, ...InputStructureEdges, ...OutputStructureEdges]}
        onNodesChange={visualMappingSlice.onBlocksChange}
        nodeTypes={nodeTypes}
        onConnect={visualMappingSlice.onEdgesConnect}
        onEdgesChange={visualMappingSlice.onEdgesChange}
      >
        <Background variant={BackgroundVariant.Lines}></Background>
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Canvas;
