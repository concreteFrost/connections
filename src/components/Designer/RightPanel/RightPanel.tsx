import s from "./RightPanel.module.scss";
import Properties from "./Properties/Properties";
import ValueEditor from "./ValueEditor/ValueEditor";
import DebugConsole from "./DebugConsole/DebugConsole";
import { useState } from "react";
import { connectionsIcons } from "../../../icons/icons";
import useStore from "../../../store/store";

function RightPanel() {
  const [isPanelActive, setIsPanelActive] = useState(true);
  const flowIdentifier = useStore((state) => state.flowSlice.flow.flowIdentifier)

  function togglePanel() {
    setIsPanelActive(!isPanelActive);
  }
  const selectedBlockID = useStore((state) => state.selectedBlockID);

  const btnClasses = `${s.toggle_btn} ${isPanelActive ? s["opened"] : s["closed"]
    }`;

  const wrapperClasses = `${s.wrapper} ${isPanelActive ? s["opened"] : s["closed"]
    }`;

  return (
    <div className={wrapperClasses}>
      <div className={btnClasses}>
        <button onClick={togglePanel}>
          {isPanelActive
            ? connectionsIcons.rightCaret
            : connectionsIcons.leftCaret}
        </button>
      </div>
      <div className={s.right_panel_container}>
        {flowIdentifier ?
          <div>
            <Properties></Properties>
            {selectedBlockID.length>0 ? <ValueEditor></ValueEditor> : null}
            <DebugConsole></DebugConsole> </div> : <div className={s.section_container}>PROPERTIES</div>}

      </div>
    </div>
  );
}

export default RightPanel;
