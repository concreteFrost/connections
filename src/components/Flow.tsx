import ReactFlow, { Background } from "react-flow-renderer";
import { shallow } from "zustand/shallow";
import useStore from "../store/store";
import PointerNode from "./CustomNodes/PointerNode";

const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const nodeTypes = {
  pointer: PointerNode,
};

function Flow() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(
    selector,
    shallow
  );
  const setSelectedNode = useStore((state) => state.setSelectedNodeID);
  const bgView = useStore((state) => state.view);
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
        snapToGrid={true}
        snapGrid={[16,16]}
        fitView
      >
        <Background variant={bgView}></Background>
      </ReactFlow>
    </div>
  );
}

export default Flow;
