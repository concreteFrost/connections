import { useState, useCallback, MouseEvent as ReactMouseEvent } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  applyNodeChanges,
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

  const onNodesChange = useCallback(
    (changes: any) => {
      const updatedBlocks = applyNodeChanges(
        changes,
        flowSlice.flow.visual.blocks
      );
      onBlocksChange(updatedBlocks);
    },
    [flowSlice.flow.visual.blocks]
  );

  const { reactFlowInstance, reactFlowWrapper, setInstance, setFlowWrapper } =useStore((state) => state.designerVisualElementsSlice);
  const { snapToGrid, snapStep } = useStore((state) => state.topPanelSlice.settings);

  console.log(flowSlice.flow)

  return (
    <div
      style={{ height: "100vh", overflowY: "hidden" }}
      className="reactflow-wrapper"
      ref={setFlowWrapper}
    >
      <ReactFlow
        onInit={setInstance}
        nodes={flowSlice.flow.visual.blocks}
        edges={flowSlice.flow.visual.edges as Edge[]}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onClick={props.resetSelectedBlockId}
        snapToGrid={snapToGrid}
        snapGrid={[snapStep[0], snapStep[1]]}
        deleteKeyCode={null}

        // onMouseUp={(e: any) => {
        //   pasteCopiedBlock(e);
        // }}
        // nodesDraggable={!isCtrlPressed}
      >
        <Background
          color={`rgb(74, 148, 190, ${
            bgView === BackgroundVariant.Dots ? 1 : 0.5
          })`}
          variant={bgView}
        ></Background>
      </ReactFlow>
    </div>
  );
}

export default Flow;

//COPY/PASTE BLOCK ON HOLD CTRL BTN
//EXPERIMENTAL FEATURE 
// const [isCtrlPressed, setCtrlPressed] = useState(false);
// useCtrlMouseHold(isCtrlPressed, setCtrlPressed);

// function pasteCopiedBlock(event: ReactMouseEvent) {
//   var pos = positionInViewport(event, reactFlowInstance, reactFlowWrapper);
//   if (isCtrlPressed) {
//     const selectedBlock = getSelectedBlock(flowSlice);
//     if (selectedBlock) {
//       flowSlice.createBlockCopy(Math.round(pos.x), Math.round(pos.y));
//     }
//   }
// }
