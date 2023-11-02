import ReactFlow, { Background, BackgroundVariant, MiniMap } from "react-flow-renderer";
import { shallow } from "zustand/shallow";
import useStore from "../../store/store";
import PointerNode from "./CustomNodes/PointerNode";
import NodeGroup from "./CustomNodes/NodeGroup";

const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  onBlocksChange: state.onBlocksChange,
  onGroupDelete: state.deleteGroup,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const nodeTypes = {
  pointer: PointerNode,
  group: NodeGroup
};

function Flow(props: any) {
  const { onBlocksChange, onEdgesChange, onConnect } = useStore(
    selector,
    shallow
  );
  const nodes = useStore((state) => state.flowSlice.flow.visual.blocks)
  const edges = useStore((state) => state.flowSlice.flow.visual.edges)
  const bgView = useStore((state) => state.view);
  const snapToGrid = useStore((state) => state.topPanelSlice.settings.snapToGrid)
  const snapStep = useStore((state) => state.topPanelSlice.settings.snapStep)
  const showMinimap = useStore((state) => state.topPanelSlice.settings.showMiniMap)
  return (
    <div style={{ height: 930 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onBlocksChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onClick={props.resetselectedBlockID}
        snapToGrid={snapToGrid}
        snapGrid={[snapStep[0], snapStep[1]]}

      >
        <Background color={`rgb(74, 148, 190,${bgView === BackgroundVariant.Dots ? 1 : 0.5})`} variant={bgView}></Background>
        {/* <MiniMap nodeStrokeColor={"black"} nodeStrokeWidth={10} className={s.minimap} nodeColor={'rgb(74, 120, 190)'} style={{ display: showMinimap ? "block" : "none" }} ></MiniMap> */}
      </ReactFlow>
    </div>
  );
}

export default Flow;
