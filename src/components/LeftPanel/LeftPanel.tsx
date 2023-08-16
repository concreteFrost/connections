import s from "./LeftPanel.module.scss";
import useStore from "../../store/store";
import INodeType from "../../store/interfaces/INodeType";
import { useRef, useState } from "react";
import Section from "./Section/Section";
import { nodeGroup } from "../../store/types/nodeTypes";
import { connectionsIcons } from "../../icons/icons";


function LeftPanel() {
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const addNode = useStore((state) => state.addNode);
  const [isPanelActive, setIsPanelActive] = useState(true);
  const addNodeGroup = useStore((state) => state.addNodeGroup);
  const nodeList = useStore((state) => state.nodeList);
  const onDragStart = (event: any) => {
    event.dataTransfer.setData("application/reactflow", event.target);
    event.dataTransfer.effectAllowed = "move";
  };
  const substituonsPanel = useStore((state)=>state.substitutionsPanel);

  const onDragEnd = (event: any, newNode: INodeType) => {
    const { clientX, clientY } = event;
    const leftPanelRect = leftPanelRef.current?.getBoundingClientRect();
    if (
      leftPanelRect &&
      isPositionInsideRect(clientX, clientY, leftPanelRect)
    ) {
      return;
    }
    addNode(newNode, clientX, clientY);
  };

  const isPositionInsideRect = (x: number, y: number, rect: DOMRect) => {
    return (
      x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
    );
  };

  function togglePanel() {
    setIsPanelActive(!isPanelActive);
  }

  const nodeContainerClasses = `${s.add_node_container} ${isPanelActive ? s['opened'] : s['closed']}`;

  return (
    <div className={s.wrapper} ref={leftPanelRef}>
      <div className={s.toggle_btn}><button onClick={togglePanel}>{isPanelActive ? connectionsIcons.leftCaret : connectionsIcons.rightCaret}</button></div>
      <div className={nodeContainerClasses}>
        <div className={s.header}>CREATE BLOCKS</div>
        <div className={s.node_list_wrapper}>    <div className={s.node_list}>
          <Section
            title="DATA STORE"
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            nodeType={nodeList}
            nodeGroup={nodeGroup.dataGroup}
          />
          <Section
            title="EXTERNAL"
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            nodeType={nodeList}
            nodeGroup={nodeGroup.externalGroup}
          />
          <Section
            title="FUNCTION"
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            nodeType={nodeList}
            nodeGroup={nodeGroup.functionGroup}
          />
          <Section
            title="INPUT"
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            nodeType={nodeList}
            nodeGroup={nodeGroup.inputGroup}
          />
          <Section
            title="OUTPUT"
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            nodeType={nodeList}
            nodeGroup={nodeGroup.outputGroup}
          />

        </div></div>

        <div className={s.create_group}><button className={s.create_group_btn} onClick={() => { addNodeGroup() }}>CREATE GROUP</button></div>
      </div>
    </div>
  );
}


export default LeftPanel;
