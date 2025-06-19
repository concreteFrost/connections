import Canvas from "components/VisualMapping/Canvas/Canvas";
import Header from "components/VisualMapping/Header/Header";
import SourcePanel from "components/VisualMapping/SourcePanel/SourcePanel";
import { ReactFlowProvider } from "react-flow-renderer";

export default function VisualMapping() {
  return (
    <>
      <Header></Header>
      {/* <div className="dynamic_menu" style={{ top: 50 }}>
        <SourcePanel title="INPUT"></SourcePanel>
      
      </div> */}

      <Canvas></Canvas>
    </>
  );
}
