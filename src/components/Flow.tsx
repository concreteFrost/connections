
import ReactFlow, { Background } from 'react-flow-renderer';
import { shallow } from 'zustand/shallow';
import useStore from '../store/store';
import ColorChooserNode from "./CustomNodes/testNodes/ColorChooserNode";
import ColorReceiverNode from './CustomNodes/testNodes/ColorReceiverNode';
import ToUpperCaseNode from './CustomNodes/testNodes/ToUpperCaseNode';
import TextOutputNode from './CustomNodes/testNodes/TextOutputNode';
import MathOperationNode from './CustomNodes/testNodes/MathOperationNode';
import NumberSetterNode from './CustomNodes/testNodes/NumberSetterNode';
import PointerNode from './CustomNodes/PointerNode';

const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const nodeTypes = {
  colorSetter: ColorChooserNode,
  colorGetter: ColorReceiverNode,
  textSetter: ToUpperCaseNode,
  textGetter: TextOutputNode,
  mathOperation: MathOperationNode,
  numberSetter: NumberSetterNode,
  pointer: PointerNode,
};

function Flow() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow);

  return (
    <div style={{ height: 1320 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      ><Background></Background></ReactFlow>
    </div>
  );
}

export default Flow;