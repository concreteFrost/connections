import useRightMouseButtonClick from "hooks/useRightMouseButtonClick";
import { useRef, useState } from "react";
import s from "./ContextMenu.module.scss";
import useStore from "store/store";
import { RFState } from "store/types/rfState";
import { MappingState } from "store/interfaces/IVisualMapping";
import { saveMappingStructure } from "api/mapping";

export default function ContextMenu() {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { isVisible, pos } = useRightMouseButtonClick();
  const { mappingState } = useStore(
    (state: RFState) => state.visualMappingSlice
  );
  const { toggleMessageModal } = useStore((state) => state.modalWindowsSlice);
  const { setIsLoading } = useStore((state) => state.loaderSlice);

  function isSavingDisabled(): boolean {
    return mappingState.length === 0;
  }

  async function handlSaveMappingState() {
    setIsLoading(true);
    try {
      const res = await saveMappingStructure(mappingState);

      console.log(res);
      toggleMessageModal("Success!!!");
    } catch (error) {
      console.log("error saving structure", error);
    } finally {
      setIsLoading(false);
    }
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
            <li className={s.list_section_header}>EDIT</li>
            <li>
              <button
                disabled={isSavingDisabled()}
                onClick={handlSaveMappingState}
              >
                Save
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
