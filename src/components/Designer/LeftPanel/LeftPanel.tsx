import s from "./LeftPanel.module.scss";
import useStore from "../../../store/store";
import { INodeType } from "../../../store/interfaces/INode";
import { useRef, useState } from "react";
import Section from "./Section/Section";
import { nodeGroup } from "../../../store/constants/nodeConst";
import { connectionsIcons } from "../../../icons/icons";


function LeftPanel() {
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const addBlock = useStore((state) => state.addBlock);
  const [isPanelActive, setIsPanelActive] = useState(true);
  const addBlockGroup = useStore((state) => state.addBlockGroup);
  const blockList = useStore((state) => state.blockList);
  const onDragStart = (event: any) => {
    event.dataTransfer.setData("application/reactflow", event.target);
    event.dataTransfer.effectAllowed = "move";
  };

  const onDragEnd = (event: any, newNode: INodeType) => {
    const { clientX, clientY } = event;
    const leftPanelRect = leftPanelRef.current?.getBoundingClientRect();
    if (
      leftPanelRect &&
      isPositionInsideRect(clientX, clientY, leftPanelRect)
    ) {
      return;
    }
    addBlock(newNode, clientX, clientY);
  };

  const isPositionInsideRect = (x: number, y: number, rect: DOMRect) => {
    return (
      x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
    );
  };

  function togglePanel() {
    setIsPanelActive(!isPanelActive);
  }

  const wrapperClasses = `${s.wrapper} ${isPanelActive ? s['opened'] : s['closed']}`;
  const toggleBtnClasses = `${s.toggle_btn} ${isPanelActive ? s['opened'] : s['closed']}`;

  return (
    <div className={wrapperClasses} ref={leftPanelRef}>
      <div className={toggleBtnClasses}><button onClick={togglePanel}>{isPanelActive ? connectionsIcons.leftCaret : connectionsIcons.rightCaret}</button></div>
      <div className={s.add_node_container}>
        <div className={s.header}>CREATE BLOCKS</div>
        <div className={s.node_list_wrapper}><div className={s.node_list}>
          <Section
            title="DATA STORE"
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            nodeType={blockList}
            nodeGroup={nodeGroup.dataGroup}
          />
          <Section
            title="EXTERNAL"
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            nodeType={blockList}
            nodeGroup={nodeGroup.externalGroup}
          />
          <Section
            title="FUNCTION"
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            nodeType={blockList}
            nodeGroup={nodeGroup.functionGroup}
          />
          <Section
            title="INPUT"
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            nodeType={blockList}
            nodeGroup={nodeGroup.inputGroup}
          />
          <Section
            title="OUTPUT"
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            nodeType={blockList}
            nodeGroup={nodeGroup.outputGroup}
          />

        </div></div>

        <div className={s.create_group}><button className={s.create_group_btn} onClick={() => { addBlockGroup() }}>CREATE GROUP</button></div>
      </div>
    </div>
  );
}


export default LeftPanel;
