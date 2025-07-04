import Canvas from "components/VisualMapping/Canvas/Canvas";
import ContextMenu from "components/VisualMapping/ContextMenu/ContextMenu";
import Header from "components/VisualMapping/Header/Header";
import { useRef, useState } from "react";
import { ReactFlowInstance } from "react-flow-renderer";

export default function VisualMapping() {
  const [canvasInstance, setCanvasInstance] = useState<ReactFlowInstance>();
  const canvasWrapper = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <Header></Header>
      {/* <ControlButtons></ControlButtons> */}
      <Canvas
        setCanvasInstance={setCanvasInstance}
        canvasWrapper={canvasWrapper}
      ></Canvas>
      <ContextMenu
        canvasInstance={canvasInstance}
        canvasWrapper={canvasWrapper}
      ></ContextMenu>
    </>
  );
}
