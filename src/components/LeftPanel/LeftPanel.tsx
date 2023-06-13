import s from "./LeftPanel.module.scss";
import useStore from "../../store/store";
import { nodeType } from "../../store/nodeTypes";
import { NodeType } from "../../store/nodeTypes";
import { useRef, useState } from "react";
import Section from "./Section/Section";
import { connectionsIcons } from "../../icons/icons";
import { nodeGroup } from "../../store/nodeTypes";

function LeftPanel() {
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const addNode = useStore((state) => state.addNode);

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

  return (
    <div className={s.wrapper} ref={leftPanelRef}>
      <div className={s.add_node_container}>
        <div className={s.header}>CREATE BLOCKS</div>
        <div className={s.node_list}>
          
          <Section
            title="DATA STORE"
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            nodeType={nodeType}
            nodeGroup={nodeGroup.dataGroup}
          />
        </div>
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
