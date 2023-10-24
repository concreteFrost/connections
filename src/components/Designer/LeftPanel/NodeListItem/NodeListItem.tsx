
import { INodeType } from "../../../../store/interfaces/INode";
import s from "./NodeListItem.module.scss"
import { connectionsIcons } from "../../../../icons/icons";
import useStore from "../../../../store/store";

type onDragStart = (e: any) => void;
type onDragEnd = (e: any, nodeType: INodeType) => void;

interface NodeProps {
  onDragStart: onDragStart,
  onDragEnd: onDragEnd,
  nodeType: any,
}

function NodeListItem(props: NodeProps) {

  const setTooltipText = useStore((state) => state.setTooltipText);
  const matchedIcon = Object.entries(connectionsIcons.nodeIcons).find(
    ([key]) => key === props.nodeType.visualData.icon.toLowerCase()
  )?.[1];

  return (
    <div className='nodelist-body-elemet' data-tooltip-delay-show={1000} onMouseEnter={() => setTooltipText(props.nodeType.data.description)}>

      <button className={s.node_list_btn}
        onDragEnd={(event) => {
          props.onDragEnd(event, props.nodeType);
        }}
        onDragStart={props.onDragStart}
        draggable
      >
        <span className={s.node_list_icon}>
          {matchedIcon ? matchedIcon : "*"}
        </span>
        {props.nodeType.data.name}
      </button>


    </div>

  )
}
export default NodeListItem;