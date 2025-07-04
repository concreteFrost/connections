import { ReactFlowInstance } from "react-flow-renderer";

const isPositionInsideRect = (
  x: number,
  y: number,
  element: DOMRect
): boolean => {
  const isInsideCanvas =
    x >= element.left &&
    x <= element.right &&
    y >= element.top &&
    y <= element.bottom;
  return isInsideCanvas;
};

export const canDrop = (event: any, elementRef: any): boolean => {
  const { clientX, clientY } = event;

  const leftPanelRect = elementRef.current?.getBoundingClientRect();
  event.preventDefault();
  event.dataTransfer.effectAllowed = "move";
  if (elementRef && isPositionInsideRect(clientX, clientY, leftPanelRect)) {
    return false;
  }
  return true;
};

export function positionInViewport(
  position: { x: number; y: number },
  reactFlowInstance: ReactFlowInstance,
  reactFlowWrapper: any
) {
  if (!reactFlowInstance || !reactFlowWrapper)
    return { x: position.x, y: position.y };

  const reactFlowBounds = reactFlowWrapper.getBoundingClientRect();

  const pos = reactFlowInstance.project({
    x: position.x - reactFlowBounds.left,
    y: position.y - reactFlowBounds.top,
  });

  return pos;
}
