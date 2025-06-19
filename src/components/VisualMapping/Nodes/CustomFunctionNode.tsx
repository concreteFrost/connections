import React from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import "reactflow/dist/style.css";
import s from "./GenericNode.module.scss";

function CustomFunctionNode({ data }: NodeProps) {
  return (
    <div
      className={s.wrapper}
      style={{
        padding: 8,
        background: "#fff",
        border: "1px solid #ccc",
        borderRadius: 6,
      }}
    >
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
      <div style={{ fontSize: 12 }}>{data.label}</div>
    </div>
  );
}

export default React.memo(CustomFunctionNode);
