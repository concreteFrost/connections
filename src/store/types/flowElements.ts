import PointerNode from "components/Designer/CustomNodes/PointerNode";
import ButtonEdge from "components/Designer/CustomEdge/ButtonEdge";
import NodeGroup from "components/Designer/CustomNodes/NodeGroup";
import { NodeTypes, EdgeTypes } from "react-flow-renderer";
import SourceNode from "components/VisualMapping/Nodes/SourceNode";
import DestinationNode from "components/VisualMapping/Nodes/DestinationNode";
import CustomFunctionNode from "components/VisualMapping/Nodes/CustomFunctionNode";

export const nodeTypes: NodeTypes = {
  pointer: PointerNode,
  group: NodeGroup,
  source: SourceNode,
  destination: DestinationNode,
  custom: CustomFunctionNode,
};

export const edgeTypes: EdgeTypes = {
  button: ButtonEdge,
};
