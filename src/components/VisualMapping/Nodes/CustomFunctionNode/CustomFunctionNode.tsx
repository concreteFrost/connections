import React from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import "reactflow/dist/style.css";
import s from "./CustomFunctionNode.module.scss";

function CustomFunctionNode({ data }: NodeProps) {
  return (
    <div className={s.wrapper}>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "black" }}
        className={`${s.handle} ${s.left}`}
      />

      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "black" }}
        className={`${s.handle} ${s.right}`}
      />
      <div>{data.Name}</div>
    </div>
  );
}

export default React.memo(CustomFunctionNode);
