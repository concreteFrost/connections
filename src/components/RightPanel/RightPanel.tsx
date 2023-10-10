import s from "./RightPanel.module.scss";
import Properties from "./Properties/Properties";
import ValueEditor from "./ValueEditor/ValueEditor";
import DebugConsole from "./DebugConsole/DebugConsole";
import { useState } from "react";
import { connectionsIcons } from "../../icons/icons";
import useStore from "../../store/store";

function RightPanel() {
  const [isPanelActive, setIsPanelActive] = useState(true);

  function togglePanel() {
    setIsPanelActive(!isPanelActive);
  }
  const selectedNode = useStore((state) => state.selectedNode);

  const panelClasses = `${s.right_panel_container} ${
    isPanelActive ? s["opened"] : s["closed"]
  }`;
  const btnClasses = `${s.toggle_btn} ${
    isPanelActive ? s["opened"] : s["closed"]
  }`;

  return (
    <div className={s.wrapper}>
      <div className={btnClasses}>
        <button onClick={togglePanel}>
          {isPanelActive
            ? connectionsIcons.rightCaret
            : connectionsIcons.leftCaret}
        </button>
      </div>
      <div className={panelClasses}>
        <Properties></Properties>
        {selectedNode !== "-1" ? <ValueEditor></ValueEditor> : null}
        <DebugConsole></DebugConsole>
      </div>
    </div>
  );
}

export default RightPanel;
