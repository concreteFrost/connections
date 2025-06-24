import { Handle, Position, NodeProps } from "react-flow-renderer";
import "reactflow/dist/style.css";
import s from "./GenericNode.module.scss";

function DestinationNode({ data }: NodeProps) {
  return (
    <div
      className={s.wrapper}
      style={{
        background: "#f8fae3",
      }}
    >
      <div className={s.node_body}>
        <div className={s.label}>{data.Label}</div>
        {/* <span className={s.data_type}>{data.DataType}</span> */}
        {/* <input></input> */}
      </div>
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
