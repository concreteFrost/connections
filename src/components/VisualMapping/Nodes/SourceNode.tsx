import React from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import "reactflow/dist/style.css";
import s from "./GenericNode.module.scss";

function SourceNode({ data }: NodeProps) {
  return (
    <div
      className={s.wrapper}
      style={{
        background: "#dfe8e8",
      }}
    >
      <div className={s.node_body}>
        <div className={s.label}>{data.Label}</div>
        {/* <span className={s.data_type}>{data.DataType}</span> */}
        {/* <input></input> */}
      </div>

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
