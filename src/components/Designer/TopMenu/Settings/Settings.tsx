import { useState } from "react";
import useEscapeKeyHandler from "hooks/useEscapeKeyHandler";
import s from "./Settings.module.scss";
import SettingsDropdown from "./SettingsDropdown/SettingsDropdown";
import UseAnimations from "react-useanimations";
import settings from "react-useanimations/lib/settings2";

function Settings() {
  const [isSettingsVisible, setSettingsVisible] = useState<boolean>(false);
  useEscapeKeyHandler(() => setSettingsVisible(false));
  return (
    <div className={s.wrapper}>
      <div
        className={s.settings_icon}
        onClick={() => setSettingsVisible(!isSettingsVisible)}
      >
        <UseAnimations
          fillColor="#eb4034"
          strokeColor="rgb(74, 148, 190)"
          size={35}
          animation={settings}
        />
      </div>
      {isSettingsVisible ? (
        <SettingsDropdown
          isSettingsVisible={isSettingsVisible}
          setSettingsVisible={setSettingsVisible}
        />
      ) : null}
    </div>
  );
}

export default Settings;
