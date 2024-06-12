import { useState, MouseEvent as ReactMouseEvent } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  ReactFlowProvider,
} from "react-flow-renderer";
import { shallow } from "zustand/shallow";
import useStore from "store/store";
import useCtrlMouseHold from "../hooks/useCtrlMouseHold";
import { getSelectedBlock } from "store/actions/utils/blockUtils";
import { selector } from "utils/selector";
import { nodeTypes, edgeTypes } from "store/types/flowElements";
import { Edge } from "reactflow";
import { positionInViewport } from "utils/draggableUtils";

function Flow(props: any) {
  const { onBlocksChange, onEdgesChange, onConnect } = useStore(
    selector,
    shallow
  );
  const flowSlice = useStore((state) => state.flowSlice);
  const bgView = useStore((state) => state.designerVisualElementsSlice.view);

  const { reactFlowInstance, reactFlowWrapper, setInstance, setFlowWrapper } = useStore((state) => state.designerVisualElementsSlice);
  const { snapToGrid, showMiniMap, snapStep } = useStore(
    (state) => state.topPanelSlice.settings
  );

  const [isCtrlPressed, setCtrlPressed] = useState(false);
  useCtrlMouseHold(isCtrlPressed, setCtrlPressed);

  function pasteCopiedBlock(event: ReactMouseEvent) {
    var pos = positionInViewport(event, reactFlowInstance, reactFlowWrapper);
    if (isCtrlPressed) {
      const selectedBlock = getSelectedBlock(flowSlice);
      if (selectedBlock) {
        flowSlice.createBlockCopy(Math.round(pos.x), Math.round(pos.y));
      }
    }
  }

  return (
    <ReactFlowProvider>
      <div style={{ height: "100vh", overflowY: "hidden" }} className="reactflow-wrapper" ref={setFlowWrapper}>
        <ReactFlow
          onInit={setInstance}
          nodes={flowSlice.flow.visual.blocks}
          edges={flowSlice.flow.visual.edges as Edge[]}
          onNodesChange={onBlocksChange}
          onEdgesChange={onEdgesChange}
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
            color={`rgb(74, 148, 190, ${bgView === BackgroundVariant.Dots ? 1 : 0.5
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
