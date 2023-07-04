import s from "./Settings.module.scss";
import SettingsDropdown from "./SettingsDropdown/SettingsDropdown";
import UseAnimations from "react-useanimations";
import settings from "react-useanimations/lib/settings2";

function Settings(props: any) {
  return (
    <div className={s.wrapper}>
      <div className={s.settings_icon}  onClick={() => props.toggleDropdown("settings")}>
        <UseAnimations
          fillColor="#eb4034"
          strokeColor="rgb(74, 148, 190)"
          size={35}
          animation={settings}
         
        />

      
      </div>
      {props.dropdowns.settings.isVisible ? <SettingsDropdown /> : null}
    </div>
  );
}

export default Settings;
