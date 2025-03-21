import { NodeType } from "store/interfaces/INode";
import s from "./NodeListItem.module.scss";
import { connectionsIcons } from "assets/icons/icons";
import useStore from "store/store";

import { useNodeDrag, useNodeDrop } from "hooks/useNodeDrop";

interface NodeProps {
  nodeType: NodeType;
  leftPanelRef: any;
}

function NodeListItem(props: NodeProps) {
  const { setTooltipText } = useStore(
    (state) => state.designerVisualElementsSlice
  );

  const [onDragStart, onDragEnd] = useNodeDrag(props);

  // Returns the icon if icon names match with any of nodeIcons in connectionsIcons object
  const matchedIcon: any = Object.entries(connectionsIcons.nodeIcons).find(
    ([key]) => key === props.nodeType.visualData.icon.toLowerCase()
  )?.[1];

  useNodeDrop();

  return (
    <div
      className="tooltip-item"
      data-tooltip-delay-show={1000}
      onMouseEnter={() => setTooltipText(props.nodeType.data.description)}
    >
      <button
        className={s.node_list_btn}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        draggable
      >
        <span> {props.nodeType.data.name}</span>

        <span className={s.node_list_icon}>
          {matchedIcon ? matchedIcon : "*"}
        </span>
      </button>
    </div>
  );
}

export default NodeListItem;
