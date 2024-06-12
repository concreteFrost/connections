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
  const {reactFlowInstance,reactFlowWrapper} = useStore((state)=>state.designerVisualElementsSlice);
  const setTooltipText = useStore(
    (state) => state.designerVisualElementsSlice.setTooltipText
  );
  
  //returns the icon if icon names matches with any of nodeIcons in connectionsIcons object
  const matchedIcon = Object.entries(connectionsIcons.nodeIcons).find(
    ([key]) => key === props.nodeType.visualData.icon.toLowerCase()
  )?.[1];

  useEffect(() => {
    document.addEventListener("dragover", (event) => {
      event.preventDefault();
    });

    return () => document.removeEventListener("dragover", (event) => {
      event.preventDefault()
    })
  }, [])

  function onDragEnd(event :any){
    if (canDrop(event, props.leftPanelRef)) {
      const pos={
        x: positionInViewport(event,reactFlowInstance,reactFlowWrapper).x,
        y: positionInViewport(event,reactFlowInstance,reactFlowWrapper).y
      }
      addBlock(props.nodeType,pos.x,pos.y);
    }
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
