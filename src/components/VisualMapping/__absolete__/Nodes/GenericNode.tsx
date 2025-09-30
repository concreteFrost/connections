import "reactflow/dist/style.css";
import s from "./GenericNode.module.scss";
import { Handle, Position } from "react-flow-renderer";
import clsx from "clsx";

interface Props {
  type: "source" | "destination";
  node: any;
}
function GenericNode({ type, node }: Props) {
  return (
    <div
      className={clsx(s.wrapper, type === "source" ? s.source : s.destination)}
    >
      <div className={s.node_body}>
        <div className={s.label}>{node.Label}</div>
      </div>

      {!node.isParent && (
        <Handle
          className={clsx(s.handle, type === "source" ? s.right : s.left)}
          type={type === "source" ? "source" : "target"}
          position={type === "source" ? Position.Right : Position.Left}
          style={{ background: "#007bff" }}
        />
      )}

      <Handle
        className={s.handle}
        id={`${node.Id}-top`}
        type="target"
        position={type === "source" ? Position.Left : Position.Right}
        style={{ opacity: 0 }}
        isConnectable={false}
      />

      <Handle
        className={s.handle}
        id={`${node.Id}-bottom`}
        type="source"
        position={Position.Bottom}
        style={{ opacity: 0 }}
        isConnectable={false}
      />
    </div>
  );
}

export default GenericNode;
