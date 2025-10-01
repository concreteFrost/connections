import PointerNode from "components/Designer/CustomNodes/PointerNode";
import ButtonEdge from "components/Designer/CustomEdge/ButtonEdge";
import { NodeTypes, EdgeTypes } from "react-flow-renderer";

export const nodeTypes: NodeTypes = {
  pointer: PointerNode,
  // group: NodeGroup,
};

export const edgeTypes: EdgeTypes = {
  button: ButtonEdge,
};
