import Canvas from "components/VisualMapping/Canvas/Canvas";
import Header from "components/VisualMapping/Header/Header";
import { RFState } from "store/types/rfState";
import useStore from "store/store";

export default function VisualMapping() {
  const { uploadInputStructure, uploadOutputStructure } = useStore(
    (state: RFState) => state.visualMappingSlice
  );
  return (
    <>
      <Header></Header>
      <button
        onClick={uploadInputStructure}
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
        onClick={uploadOutputStructure}
        style={{
          position: "absolute",
          top: "55px",
          right: "30px",
          zIndex: 1000,
        }}
      >
        Upload Output
      </button>
      {/* <div className="dynamic_menu" style={{ top: 50 }}>
        <SourcePanel title="INPUT"></SourcePanel>
      
      </div> */}

      <Canvas></Canvas>
    </>
  );
}
