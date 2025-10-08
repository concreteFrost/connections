import useRightMouseButtonClick from "hooks/useRightMouseButtonClick";
import { useRef } from "react";
import s from "./ContextMenu.module.scss";
import useStore from "store/store";
import { RFState } from "store/types/rfState";
import { saveMappingStructure } from "api/mapping";

export default function ContextMenu() {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { isVisible, pos } = useRightMouseButtonClick();
  const { mappingState, setMappingRef, toggleModal } = useStore(
    (state: RFState) => state.visualMappingSlice
  );
  const { toggleMessageModal } = useStore((state) => state.modalWindowsSlice);
  const { setIsLoading } = useStore((state) => state.loaderSlice);

  function isSavingDisabled(): boolean {
    return (
      mappingState.name === null ||
      mappingState.inputXsdContent === null ||
      mappingState.outputXsdContent === null ||
      mappingState.operations.length === 0
    );
  }

  async function handlSaveMappingState() {
    if (mappingState.reference !== null) {
    } //confirm overwite
    setIsLoading(true);

    try {
      const res = await saveMappingStructure(mappingState, false);

      if (!res.data.success) {
        toggleMessageModal(res.data.message);
        return;
      }

      setMappingRef(res.data.message);
      toggleMessageModal("Success!!!");
    } catch (error: any) {
      if (error.response.status === 409) {
        toggleMessageModal("Mapping with this reference already exists");
      }
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
            <li>
              <button onClick={() => toggleModal(true)}>Load</button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
