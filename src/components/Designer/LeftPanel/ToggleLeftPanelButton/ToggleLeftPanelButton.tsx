import s from "../LeftPanel.module.scss";

import { connectionsIcons } from "assets/icons/icons";
interface ToggleLeftPaneButtonProps {
  isPanelActive: boolean;
  setPanelActive: (active: boolean) => void;
}

export default function ToggleLeftPanelButton({
  isPanelActive,
  setPanelActive,
}: ToggleLeftPaneButtonProps) {
  const toggleBtnClasses = `${s.toggle_btn} ${
    isPanelActive ? s["opened"] : s["closed"]
  }`;

  return (
    <div className={toggleBtnClasses}>
      <button
        data-testid="close_designer_left_panel_btn"
        onClick={() => setPanelActive(!isPanelActive)}
      >
        {isPanelActive
          ? connectionsIcons.leftCaret
          : connectionsIcons.rightCaret}
      </button>
    </div>
  );
}
