
const isPositionInsideRect = (x: number, y: number, element: DOMRect) : boolean => {
  const isInsideCanvas =
    x >= element.left &&
    x <= element.right &&
    y >= element.top &&
    y <= element.bottom;
  return isInsideCanvas;
};

export const canDrop = (
  event: any,
  elementRef: any
): boolean => {
  const { clientX, clientY } = event;
  
  const leftPanelRect = elementRef.current?.getBoundingClientRect();
  event.preventDefault();
  event.dataTransfer.effectAllowed = 'move';
  if (elementRef && isPositionInsideRect(clientX, clientY, leftPanelRect)) {
    return false;
  }
  return true;
  // addBlock(newNode, clientX, clientY);
};
