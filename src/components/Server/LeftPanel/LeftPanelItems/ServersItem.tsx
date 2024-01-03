import { connectionsIcons } from "../../../../icons/icons";

interface ServersItemProps {
  className: any;
  isSectionOpened: any;
  toggleSection: (section: string) => void;
  navigate: (route: string) => void;
}

function ServersItem(props: ServersItemProps) {
  return (
    <div className={props.className.section}>
      <div
        className={props.className.section_header}
        onClick={() => props.toggleSection("servers")}
      >
        <span className={props.className.header_icon}>
          {connectionsIcons.serverMenuIcons.server}
        </span>
        <h5 className={props.className.section_title}>SERVERS</h5>
        <span className={props.className.arrow_icon}>
          {props.isSectionOpened.servers
            ? connectionsIcons.arrowDown
            : connectionsIcons.arrowUp}
        </span>
      </div>
      {props.isSectionOpened.servers && (
        <ul>
          <li onClick={() => props.navigate("servers")}>localhost</li>
        </ul>
      )}
    </div>
  );
}

export default ServersItem;
