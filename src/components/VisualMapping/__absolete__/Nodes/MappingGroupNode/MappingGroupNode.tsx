import { NodeProps, Handle, Position } from "react-flow-renderer";
import s from "./MappingGroupNode.module.scss";

export default function MappingGroupNode({ data }: NodeProps) {
  return (
    <>
      <div className={s.wrapper}>
        <strong>{data.label}</strong>
      </div>
    </>
  );
}
