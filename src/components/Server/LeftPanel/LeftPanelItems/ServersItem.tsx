import { connectionsIcons } from "../../../../icons/icons";
import { ILeftPanelSections } from "../LeftPanel";
import s from "./ListItem.module.scss"

interface ServersItemProps {
  currentSection: ILeftPanelSections;
  toggleSection: (section: string) => void;
  navigate: (route: string) => void;
}

function ServersItem(props: ServersItemProps) {
  return (
    <div className={s.section}>
      <div
        className={s.section_header}
        onClick={() => props.toggleSection("servers")}
      >
        <span className={s.header_icon}>
          {connectionsIcons.serverMenuIcons.server}
        </span>
        <h5 className={s.section_title}>SERVERS</h5>
        <span className={s.arrow_icon}>
          {props.currentSection.servers
            ? connectionsIcons.arrowDown
            : connectionsIcons.arrowUp}
        </span>
      </div>
      {props.currentSection.servers && (
        <ul>
          <li onClick={() => props.navigate("servers")}>localhost</li>
        </ul>
      )}
    </div>
  );
}

export default ServersItem;
