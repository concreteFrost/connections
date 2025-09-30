import useRightMouseButtonClick from "hooks/useRightMouseButtonClick";
import { useRef, useState } from "react";
import s from "./ContextMenu.module.scss";
import useStore from "store/store";
import { RFState } from "store/types/rfState";
import { positionInViewport } from "utils/draggableUtils";
import { ReactFlowInstance } from "react-flow-renderer";
import {
  deepOrderStructure,
  deepOrderStructure2,
  destinationStructure,
} from "__mocks__/mockVisualMappingItem";

type Props = {
  canvasInstance: ReactFlowInstance | undefined;
  canvasWrapper: React.RefObject<HTMLDivElement>;
};

export default function ContextMenu({ canvasInstance, canvasWrapper }: Props) {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { isVisible, pos } = useRightMouseButtonClick();
  const {
    createCustomFunctionBlock,
    uploadInputStructure,
    uploadOutputStructure,
  } = useStore((state: RFState) => state.visualMappingSlice);

  const [elIndex, setElIndex] = useState<number>(0);

  function finalPosition() {
    if (canvasInstance == undefined) return { x: 0, y: 0 };

    const finalPosition = positionInViewport(
      { x: pos.x, y: pos.y },
      canvasInstance,
      canvasWrapper.current
    );

    return finalPosition;
  }

  function handleCreateCustomFuntionBlock() {
    createCustomFunctionBlock(finalPosition(), "Transform");
  }

  function handleUploadInput() {
    setElIndex((prev) => (prev === 1 ? 0 : 1));
    const elements = Array.from([deepOrderStructure, deepOrderStructure2]);
    uploadInputStructure(elements[elIndex], finalPosition());
  }

  function handleUploadOutput() {
    uploadOutputStructure(destinationStructure, finalPosition());
  }

  return (
    <>
      {isVisible && (
        <div
          className={s.wrapper}
          ref={menuRef}
          style={{ left: pos.x, top: pos.y }}
        >
          <ul>
            <li className={s.list_section_header}>-MAIN</li>
            <li onClick={handleUploadInput}>Input</li>
            <li onClick={handleUploadOutput}>Output</li>
            <li className={s.list_section_header}>-FUNCTIONS</li>
            <li onClick={handleCreateCustomFuntionBlock}>Transform</li>
            <li onClick={handleCreateCustomFuntionBlock}>Custom</li>
          </ul>
        </div>
      )}
    </>
  );
}
