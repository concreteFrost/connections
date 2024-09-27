import { connectionsIcons } from "../../../../assets/icons/icons";
import { ILeftPanelSections } from "../LeftPanel";
import s from "./ListItem.module.scss";

interface SettingsItemProps {
  toggleSection: (section: string) => void;
  navigate: (route: string) => void;
  currentSection: ILeftPanelSections;
}

function AlertsItem(props: SettingsItemProps) {
  return (
    <div className={s.section}>
      <div className={s.section_header}>
        <span className={s.header_icon}>
          {connectionsIcons.serverMenuIcons.alert}
        </span>
        <h5
          className={s.section_title}
          onClick={() => props.navigate("alerts")}
        >
          ALERTS
        </h5>
      </div>
    </div>
  );
}

export default AlertsItem;
