import s from "./LeftPanel.module.scss";
import useStore from "../../store/store";
import { nodeType } from "../../store/types/nodeTypes";
import { NodeType } from "../../store/types/nodeTypes";
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

  const onDragEnd = (event: any, nodeType: NodeType) => {
    const { clientX, clientY } = event;
    const leftPanelRect = leftPanelRef.current?.getBoundingClientRect();
    if (
      leftPanelRect &&
      isPositionInsideRect(clientX, clientY, leftPanelRect)
    ) {
      return;
    }
    addNode(nodeType, clientX, clientY);
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
      <div className={s.toggle_btn}><button onClick={togglePanel}>{isPanelActive ? connectionsIcons.leftArrow : connectionsIcons.rightArrow}</button></div>
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

{
  /* <div>
<h5>DATA STORE</h5>
<Section children={<NodeListItem title="Pointer" onDragStart={onDragStart} onDragEnd={onDragEnd}nodeType={nodeType.pointer} icon={connectionsIcons.pointer}></NodeListItem>}/>
<Section children={<NodeListItem title="Send" onDragStart={onDragStart} onDragEnd={onDragEnd}nodeType={nodeType.pointer} icon={connectionsIcons.mailbox}></NodeListItem>}/>
</div>
<div>
<h5>EXTERNAL</h5>
<Section children={<NodeListItem title="Pointer" onDragStart={onDragStart} onDragEnd={onDragEnd}nodeType={nodeType.pointer} icon={connectionsIcons.pointer}></NodeListItem>}/>
<Section children={<NodeListItem title="DB2" onDragStart={onDragStart} onDragEnd={onDragEnd}nodeType={nodeType.pointer} icon={connectionsIcons.database}></NodeListItem>}/>
<Section children={<NodeListItem title="SQL" onDragStart={onDragStart} onDragEnd={onDragEnd}nodeType={nodeType.pointer} icon={connectionsIcons.sql}></NodeListItem>}/>
</div>
<div>
<h5>FUNCTION</h5>
<Section children={<NodeListItem title="Pointer" onDragStart={onDragStart} onDragEnd={onDragEnd}nodeType={nodeType.pointer} icon={connectionsIcons.pointer}></NodeListItem>}/>
<Section children={<NodeListItem title="Archive" onDragStart={onDragStart} onDragEnd={onDragEnd}nodeType={nodeType.pointer} icon={connectionsIcons.archive}></NodeListItem>}/>
</div> */
}

export default LeftPanel;
