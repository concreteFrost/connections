import { connectionsIcons } from "assets/icons/icons";
import { ILeftPanelSections } from "../LeftPanel";
import { FaChartBar } from "react-icons/fa";
import s from "./ListItem.module.scss";

interface SettingsItemProps {
  toggleSection: (section: string) => void;
  navigate: (route: string) => void;
  currentSection: ILeftPanelSections;
}

function MetricsItem(props: SettingsItemProps) {
  return (
    <div className={s.section}>
      <div className={s.section_header}>
        <span className={s.header_icon}>{<FaChartBar />}</span>
        <h5
          className={s.section_title}
          onClick={() => props.navigate("metrics")}
        >
          METRICS
        </h5>
      </div>
    </div>
  );
}

export default MetricsItem;
