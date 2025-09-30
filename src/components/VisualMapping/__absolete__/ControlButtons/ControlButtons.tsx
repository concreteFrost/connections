import { RFState } from "store/types/rfState";
import useStore from "store/store";
import {
  deepOrderStructure,
  destinationStructure,
} from "__mocks__/mockVisualMappingItem";
import s from "./ControlButtons.module.scss";

function ControlButtons() {
  const { uploadInputStructure, uploadOutputStructure } = useStore(
    (state: RFState) => state.visualMappingSlice
  );

  function handleUploadInputStructure() {
    // uploadInputStructure(deepOrderStructure);
  }

  function handleUploadOutputStructure() {
    // uploadOutputStructure(destinationStructure);
  }
  return (
    <div className={s.wrapper}>
      {" "}
      <button
        className={s.upload_btn}
        onClick={handleUploadInputStructure}
        style={{
          position: "absolute",
          top: "55px",
          left: "30px",
          zIndex: 1000,
        }}
      >
        Upload Source
      </button>
      <button
        className={s.upload_btn}
        onClick={handleUploadOutputStructure}
        style={{
          position: "absolute",
          top: "55px",
          right: "30px",
          zIndex: 1000,
        }}
      >
        Upload Output
      </button>
    </div>
  );
}

export default ControlButtons;
