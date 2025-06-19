import { Handle, Position, NodeProps } from "react-flow-renderer";
import "reactflow/dist/style.css";
import s from "./GenericNode.module.scss";

function DestinationNode({ data }: NodeProps) {
  return (
    <div
      className={s.wrapper}
      style={{
        padding: 10,
        background: "#fff",
        border: "1px solid #ccc",
        borderRadius: 6,
      }}
    >
      <div style={{ fontSize: 12 }}>{data.label}</div>
      <Handle
        type="target"
        position={Position.Left}
        id="in"
        className={`${s.handle} ${s.left}`}
      />
    </div>
  );
}

export default DestinationNode;
