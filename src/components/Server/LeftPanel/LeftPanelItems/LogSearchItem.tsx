import { ILeftPanelSections } from "../LeftPanel";
import s from "./ListItem.module.scss";
import { FaSearch } from "react-icons/fa";

interface SettingsItemProps {
  toggleSection: (section: string) => void;
  navigate: (route: string) => void;
  currentSection: ILeftPanelSections;
}

function LogSearchItem(props: SettingsItemProps) {
  return (
    <div className={s.section}>
      <div className={s.section_header}>
        <span className={s.header_icon}>{<FaSearch />}</span>
        <h5
          className={s.section_title}
          onClick={() => props.navigate("log-search")}
        >
          LOG SEARCH
        </h5>
      </div>
    </div>
  );
}

export default LogSearchItem;
