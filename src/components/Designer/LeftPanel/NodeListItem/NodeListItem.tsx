import { INodeType } from "../../../../store/interfaces/INode";
import s from "./NodeListItem.module.scss";
import { connectionsIcons } from "../../../../icons/icons";
import useStore from "../../../../store/store";

interface NodeProps {
  onDragEnd: (e: any, nodeType: INodeType) => void;
  nodeType: INodeType
}

function NodeListItem(props: NodeProps) {
  const setTooltipText = useStore(
    (state) => state.designerVisualElementsSlice.setTooltipText
  );

  //returns the icon if icon names matches with any of nodeIcons in connectionsIcons object
  const matchedIcon = Object.entries(connectionsIcons.nodeIcons).find(
    ([key]) => key === props.nodeType.visualData.icon.toLowerCase()
  )?.[1];

  return (
    <div
      className="tooltip-item"
      data-tooltip-delay-show={1000}
      onMouseEnter={() => setTooltipText(props.nodeType.data.description)}
    >
      <button
        className={s.node_list_btn}
        onDragEnd={(event) => {
          props.onDragEnd(event, props.nodeType);
        }}
        draggable
      >
        <span className={s.node_list_icon}>
          {matchedIcon ? matchedIcon : "*"}
        </span>
        {props.nodeType.data.name}
      </button>
    </div>
  );
}
export default NodeListItem;
