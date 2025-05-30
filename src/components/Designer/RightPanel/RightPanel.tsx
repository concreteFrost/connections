import s from "./RightPanel.module.scss";
import Properties from "./Properties/Properties";
import ValueEditor from "./ValueEditor/ValueEditor";
import EdgesEditor from "./EdgesEditor/EdgesEditor";
import { useState } from "react";
import { connectionsIcons } from "assets/icons/icons";
import useStore from "store/store";
import { MiniMap } from "react-flow-renderer";

interface RightPanelProps {
  isRightPanelResized: boolean;
  setRightPanelResized: (isResized: boolean) => void;
}

function RightPanel(props: RightPanelProps) {
  const [isPanelActive, setIsPanelActive] = useState(true);
  const flowIdentifier = useStore(
    (state) => state.flowSlice.flow.flowIdentifier
  );

  const { showMiniMap } = useStore((state) => state.topPanelSlice.settings);

  function togglePanel() {
    setIsPanelActive(!isPanelActive);
  }
  const selectedBlockID = useStore(
    (state) => state.flowSlice.flow.visual.blocks.find((b) => b.selected)?.id
  );

  return (
    <div
      className={`${s.wrapper} ${isPanelActive ? s["opened"] : s["closed"]}`}
    >
      <span
        className={`${s.resizable_btn} ${
          props.isRightPanelResized ? s["resized"] : s[""]
        }`}
        onClick={() => props.setRightPanelResized(!props.isRightPanelResized)}
      >
        {connectionsIcons.resize}
      </span>
      <div
        className={`${s.toggle_btn} ${
          isPanelActive ? s["opened"] : s["closed"]
        }`}
      >
        <button onClick={togglePanel}>
          {isPanelActive
            ? connectionsIcons.rightCaret
            : connectionsIcons.leftCaret}
        </button>
      </div>
      <div className={s.right_panel_container}>
        {flowIdentifier ? (
          <div>
            <Properties></Properties>
            {selectedBlockID ? <ValueEditor></ValueEditor> : null}
            <EdgesEditor></EdgesEditor>{" "}
          </div>
        ) : (
          <div className={s.section_container}>PROPERTIES</div>
        )}

        <div
          className={`${s.minimap_wrapper} ${
            showMiniMap ? s["opened"] : s["closed"]
          }`}
        >
          <MiniMap
            className={s.minimap}
            nodeColor={"rgb(74, 120, 190)"}
            maskColor="rgb(74, 115, 150,20%)"
          ></MiniMap>
        </div>
      </div>
    </div>
  );
}

export default RightPanel;
