import Canvas from "components/VisualMapping/Canvas/Canvas";
import ControlButtons from "components/VisualMapping/ControlButtons/ControlButtons";
import Header from "components/VisualMapping/Header/Header";

export default function VisualMapping() {
  return (
    <>
      <Header></Header>
      <ControlButtons></ControlButtons>
      <Canvas></Canvas>
    </>
  );
}
