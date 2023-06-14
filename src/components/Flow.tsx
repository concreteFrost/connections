
import ReactFlow, { Background } from 'react-flow-renderer';
import { shallow } from 'zustand/shallow';
import useStore from '../store/store';
import PointerNode from './CustomNodes/PointerNode';

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
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow);

  return (

    <div style={{ height: 1320 }} >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      ><Background ></Background></ReactFlow>

    </div>
  );
}

export default Flow;