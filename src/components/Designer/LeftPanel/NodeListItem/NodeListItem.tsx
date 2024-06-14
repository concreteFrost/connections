import { NodeType } from "store/interfaces/INode";
import s from "./NodeListItem.module.scss";
import { connectionsIcons } from "../../../../assets/icons/icons";
import useStore from "store/store";
import { canDrop, positionInViewport } from "../../../../utils/draggableUtils";
import { useEffect } from "react";

interface NodeProps {
  nodeType: NodeType;
  leftPanelRef: any;
}

function NodeListItem(props: NodeProps) {
  const addBlock = useStore((state) => state.flowSlice.addBlock);
  const { reactFlowInstance, reactFlowWrapper } = useStore((state) => state.designerVisualElementsSlice);
  const setTooltipText = useStore((state) => state.designerVisualElementsSlice.setTooltipText);

  // Returns the icon if icon names match with any of nodeIcons in connectionsIcons object
  const matchedIcon = Object.entries(connectionsIcons.nodeIcons).find(
    ([key]) => key === props.nodeType.visualData.icon.toLowerCase()
  )?.[1];

  useEffect(() => {
    const handleDragOver = (event:any) => {
      event.preventDefault();
    };

    const handleDrop = (event:any ) => {
      event.preventDefault();
    };

    document.addEventListener("dragover", handleDragOver);
    document.addEventListener("drop", handleDrop);

    return () => {
      document.removeEventListener("dragover", handleDragOver);
      document.removeEventListener("drop", handleDrop);
    };
  }, []);

  function onDragEnd(event:any) {
    if (canDrop(event, props.leftPanelRef)) {
      const pos = {
        x: positionInViewport(event, reactFlowInstance, reactFlowWrapper).x,
        y: positionInViewport(event, reactFlowInstance, reactFlowWrapper).y,
      };
      addBlock(props.nodeType, pos.x, pos.y);
    }
  }

  function onDragStart(event:any) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", JSON.stringify(props.nodeType)); // Firefox requires data to be set
  }

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
        <span className={s.node_list_icon}>
          {matchedIcon ? matchedIcon : "*"}
        </span>
        {props.nodeType.data.name}
      </button>
    </div>
  );
}

export default NodeListItem;
