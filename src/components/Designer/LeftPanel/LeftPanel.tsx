import s from "./LeftPanel.module.scss";
import useStore from "../../../store/store";
import { INodeType } from "../../../store/interfaces/INode";
import { useRef, useState } from "react";
import Section from "./Section/Section";
import { nodeGroup } from "../../../store/constants/nodeConst";
import { connectionsIcons } from "../../../icons/icons";

function LeftPanel() {
  const flowIdentifier = useStore(
    (state) => state.flowSlice.flow.flowIdentifier
  );
  const leftPanelRef = useRef<HTMLDivElement>(null); //used to identify the borders of the left panel element
  const addBlock = useStore((state) => state.addBlock);
  const [isPanelActive, setIsPanelActive] = useState(true);
  const blockList = useStore((state) => state.blockList);

  //returns true if the block was dropped inside left panel element
  const isPositionInsideRect = (x: number, y: number, leftPanelElement: DOMRect) => {
    const isInsideCanvas =
      x >= leftPanelElement.left && x <= leftPanelElement.right && y >= leftPanelElement.top && y <= leftPanelElement.bottom;
    return isInsideCanvas;
  };

  //uncomment this if any error occurs
  // const onDragStart = (event: any) => {
  //   event.dataTransfer.setData("application/react-flow-renderer", event.target);
  //   event.dataTransfer.effectAllowed = "move";
  // };

  const onDragEnd = (event: any, newNode: INodeType) => {
    const { clientX, clientY } = event;
    const leftPanelRect = leftPanelRef.current?.getBoundingClientRect();
    if (leftPanelRect && isPositionInsideRect(clientX, clientY, leftPanelRect)) {
      return;
    }
    addBlock(newNode, clientX, clientY);
  };

  const wrapperClasses = `${s.wrapper} ${
    isPanelActive ? s["opened"] : s["closed"]
  }`;
  const toggleBtnClasses = `${s.toggle_btn} ${
    isPanelActive ? s["opened"] : s["closed"]
  }`;

  return (
    <div className={wrapperClasses} ref={leftPanelRef}>
      <div className={toggleBtnClasses}>
        <button onClick={()=>setIsPanelActive(!isPanelActive)}>
          {isPanelActive
            ? connectionsIcons.leftCaret
            : connectionsIcons.rightCaret}
        </button>
      </div>
      <div className={s.add_node_container}>
        <div className={s.header}>CREATE BLOCKS</div>
        {flowIdentifier ? (
          <div className={s.node_list_wrapper}>
            <div className={s.node_list}>
              <Section
                title="DATA STORE"
                onDragEnd={onDragEnd}
                nodeType={blockList}
                nodeGroup={nodeGroup.dataGroup}
              />
              <Section
                title="EXTERNAL"
                onDragEnd={onDragEnd}
                nodeType={blockList}
                nodeGroup={nodeGroup.externalGroup}
              />
              <Section
                title="FUNCTION"
                onDragEnd={onDragEnd}
                nodeType={blockList}
                nodeGroup={nodeGroup.functionGroup}
              />
              <Section
                title="INPUT"
                onDragEnd={onDragEnd}
                nodeType={blockList}
                nodeGroup={nodeGroup.inputGroup}
              />
              <Section
                title="OUTPUT"
                onDragEnd={onDragEnd}
                nodeType={blockList}
                nodeGroup={nodeGroup.outputGroup}
              />
            </div>
          </div>
        ) : null}

        {/*Uncomment this ones tested with SAVE/LOAD flow functionality */}
        {/* {flowIdentifier ? <div className={s.create_group}><button className={s.create_group_btn} onClick={() => { addBlockGroup() }}>CREATE GROUP</button></div> : null} */}
      </div>
    </div>
  );
}

export default LeftPanel;
