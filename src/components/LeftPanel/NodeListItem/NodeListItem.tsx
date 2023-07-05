
import { NodeType } from "../../../store/types/nodeTypes";
import s from "./NodeListItem.module.scss"

type onDragStart = (e: any) => void;
type onDragEnd = (e: any, nodeType: NodeType) => void;

interface NodeProps {
  onDragStart: onDragStart,
  onDragEnd: onDragEnd,
  nodeType: NodeType,
}

function NodeListItem(props: any) {

  return (
    <button className={s.node_list_btn}
      onDragEnd={(event) => {
        props.onDragEnd(event, props.nodeType);
      }}
      onDragStart={props.onDragStart}
      draggable
    >
      <span className={s.node_list_icon}>
        {/* {props.nodeType.data.icon} */}
      </span>
      {props.nodeType.name}
    </button>

  )
}
export default NodeListItem;