import React from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import "reactflow/dist/style.css";
import s from "./GenericNode.module.scss";

function SourceNode({ data }: NodeProps) {
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
      <div style={{ fontSize: 12 }}>{data.label}</div>
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#007bff" }}
        className={`${s.handle} ${s.right}`}
      />
    </div>
  );
}

export default React.memo(SourceNode);
