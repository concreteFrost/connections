import { NodeProps } from "react-flow-renderer";
import GenericNode from "../GenericNode";

function DestinationNode({ data }: NodeProps) {
  return <GenericNode type="destination" node={data}></GenericNode>;
}

export default DestinationNode;
