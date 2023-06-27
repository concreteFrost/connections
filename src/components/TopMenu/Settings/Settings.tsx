import s from "./Settings.module.scss";
import { connectionsIcons } from "../../../icons/icons";
import { useState } from "react";

function Settings() {
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  return (
    <div className={s.wrapper}>
      <div
        className={s.settings_icon}
        onClick={() => setIsSettingsVisible(!isSettingsVisible)}
      >
        <div> {connectionsIcons.settings}</div>
        {isSettingsVisible? <div>sdsd</div> : null}
      </div>
    </div>
  );
}

export default Settings;
