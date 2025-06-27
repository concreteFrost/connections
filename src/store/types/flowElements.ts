import PointerNode from "components/Designer/CustomNodes/PointerNode";
import ButtonEdge from "components/Designer/CustomEdge/ButtonEdge";
import { NodeTypes, EdgeTypes } from "react-flow-renderer";
import SourceNode from "components/VisualMapping/Nodes/ParameterNodes/SourceNode";
import DestinationNode from "components/VisualMapping/Nodes/ParameterNodes/DestinationNode";
import CustomFunctionNode from "components/VisualMapping/Nodes/CustomFunctionNode/CustomFunctionNode";
import MappingGroupNode from "components/VisualMapping/Nodes/MappingGroupNode/MappingGroupNode";

export const nodeTypes: NodeTypes = {
  pointer: PointerNode,
  // group: NodeGroup,
  source: SourceNode,
  destination: DestinationNode,
  custom: CustomFunctionNode,
  mappingGroup: MappingGroupNode,
};

export const edgeTypes: EdgeTypes = {
  button: ButtonEdge,
};
