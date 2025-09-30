import React from "react";
import { NodeProps } from "react-flow-renderer";
import GenericNode from "../GenericNode";

function SourceNode({ data }: NodeProps) {
  return <GenericNode type="source" node={data}></GenericNode>;
}

export default React.memo(SourceNode);
