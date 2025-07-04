import { useEffect } from "react";
import { positionInViewport, canDrop } from "utils/draggableUtils";
import useStore from "store/store";

export const useNodeDrop = () => {
  useEffect(() => {
    const handleDragOver = (event: any) => {
      event.preventDefault();
    };

    const handleDrop = (event: any) => {
      event.preventDefault();
    };

    document.addEventListener("dragover", handleDragOver);
    document.addEventListener("drop", handleDrop);

    return () => {
      document.removeEventListener("dragover", handleDragOver);
      document.removeEventListener("drop", handleDrop);
    };
  }, []);
};

export const useNodeDrag = (props: any) => {
  const addBlock = useStore((state) => state.flowSlice.addBlock);
  const { reactFlowInstance, reactFlowWrapper } = useStore(
    (state) => state.designerVisualElementsSlice
  );

  function onDragEnd(event: any) {
    if (canDrop(event, props.leftPanelRef)) {
      const pos = {
        x: positionInViewport(
          { x: event.clientX, y: event.clientY },
          reactFlowInstance,
          reactFlowWrapper
        ).x,
        y: positionInViewport(
          { x: event.clientX, y: event.clientY },
          reactFlowInstance,
          reactFlowWrapper
        ).y,
      };
      addBlock(props.nodeType, pos.x, pos.y);
    }
  }

  function onDragStart(event: any) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", JSON.stringify(props.nodeType)); // Firefox requires data to be set
  }

  return [onDragStart, onDragEnd];
};
