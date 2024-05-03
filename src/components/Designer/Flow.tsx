import React, { useState, MouseEvent as ReactMouseEvent,useEffect } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  ReactFlowProvider,
} from "react-flow-renderer";
import { shallow } from "zustand/shallow";
import useStore from "../../store/store";
import useCtrlMouseHold from "../../hooks/useCtrlMouseHold";
import { getSelectedBlock } from "../../store/actions/utils/blockUtils";
import { selector } from "../../utils/selector";
import { nodeTypes, edgeTypes } from "../../store/types/flowElements";

function Flow(props: any) {
  const { onBlocksChange, onEdgesChange, onConnect } = useStore(
    selector,
    shallow
  );
  const flowSlice = useStore((state) => state.flowSlice);
  const bgView = useStore((state) => state.designerVisualElementsSlice.view);
  const { snapToGrid, showMiniMap, snapStep } = useStore(
    (state) => state.topPanelSlice.settings
  );

  const [isCtrlPressed, setCtrlPressed] = useState(false);
  useCtrlMouseHold(isCtrlPressed, setCtrlPressed);
  function pasteCopiedBlock(e: any) {
    if (isCtrlPressed) {
      const pos = {
        x: e.clientX,
        y: e.clientY,
      };

      if (getSelectedBlock(flowSlice) !== undefined)
        flowSlice.createBlockCopy(pos.x, pos.y);
    }
  }

  return (
    <ReactFlowProvider>
      <div style={{ height: "100vh", overflowY: "hidden" }}>
        <ReactFlow
          
          nodes={flowSlice.flow.visual.blocks}
          edges={flowSlice.flow.visual.edges}
          onNodesChange={onBlocksChange}
          onEdgesChange={onEdgesChange}
          onLoad={()=>console.log('s')}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onClick={props.resetSelectedBlockId}
          snapToGrid={snapToGrid}
          snapGrid={[snapStep[0], snapStep[1]]}
          deleteKeyCode={null}
          onMouseUp={(e: any) => {
            pasteCopiedBlock(e);
          }}
          nodesDraggable={!isCtrlPressed}
        >
          <Background
            color={`rgb(74, 148, 190, ${
              bgView === BackgroundVariant.Dots ? 1 : 0.5
            })`}
            variant={bgView}
          ></Background>
          {/* <MiniMap nodeStrokeColor={"black"} nodeStrokeWidth={10} className={s.minimap} nodeColor={'rgb(74, 120, 190)'} style={{ display: showMinimap ? "block" : "none" }} ></MiniMap> */}
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}

export default Flow;
