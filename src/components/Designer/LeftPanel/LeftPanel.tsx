import s from "./LeftPanel.module.scss";
import useStore from "store/store";
import { useRef, useState } from "react";
import CreateBlocksWrapper from "./CreateBlocksWrapper/CreateBlocksWrapper";
import ToggleLeftPanelButton from "./ToggleLeftPanelButton/ToggleLeftPanelButton";

function LeftPanel() {
  const flowIdentifier = useStore(
    (state) => state.flowSlice.flow.flowIdentifier
  );
  const leftPanelRef = useRef<HTMLDivElement>(null); //used to identify the borders of the left panel element
  const [isPanelActive, setIsPanelActive] = useState(true);

  const wrapperClasses = `${s.wrapper} ${
    isPanelActive ? s["opened"] : s["closed"]
  }`;

  return (
    <div
      className={wrapperClasses}
      ref={leftPanelRef}
      data-testid="designer_left_panel_wrapper"
    >
      <ToggleLeftPanelButton
        isPanelActive={isPanelActive}
        setPanelActive={setIsPanelActive}
      />
      <CreateBlocksWrapper
        flowIdentifier={flowIdentifier}
        leftPanelRef={leftPanelRef}
      />
    </div>
  );
}

export default LeftPanel;
