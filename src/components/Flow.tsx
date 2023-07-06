import ReactFlow, { Background, BackgroundVariant, ConnectionMode } from "react-flow-renderer";
import { shallow } from "zustand/shallow";
import useStore from "../store/store";
import PointerNode from "./CustomNodes/PointerNode";
import NodeGroup from "./CustomNodes/NodeGroup";
import { deleteGroup } from "../store/actions/groupActions";

const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onGroupDelete: state.deleteGroup,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const nodeTypes = {
  pointer: PointerNode,
  group: NodeGroup
};

function Flow() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(
    selector,
    shallow
  );

  const setSelectedNode = useStore((state) => state.setSelectedNodeID);
  const bgView = useStore((state) => state.view);
  const snapToGrid = useStore((state) => state.topPanel.settings.snapToGrid)
  const snapStep = useStore((state) => state.topPanel.settings.snapStep)
  const hideAllTopDropdowns = useStore((state) => state.hideAllTopMenus);

  const resetSelectedNode = (event: any) => {
    const isContainer = event.target.classList.contains(
      "react-flow__container"
    );

    if (isContainer) {
      setSelectedNode("-1");
    }
    hideAllTopDropdowns();
  };

  return (
    <div style={{ height: 1320 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onClick={resetSelectedNode}
        snapToGrid={snapToGrid}
        snapGrid={[snapStep[0], snapStep[1]]}

      >
        <Background color={`rgb(74, 148, 190,${bgView === BackgroundVariant.Dots ? 1 : 0.5})`} variant={bgView}></Background>
      </ReactFlow>
    </div>
  );
}

export default Flow;
