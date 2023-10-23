import { connectionsIcons } from "../../../../icons/icons";

interface SettingsItemProps {
    className: any;
    toggleSection: (section: string) => void;
    navigate: (route: string) => void;
    isSectionOpened: any;
}


function SettingsItem(props: SettingsItemProps) {
    return (<div className={props.className.section}>
        <div className={props.className.section_header}>
            <span className={props.className.header_icon}>
                {connectionsIcons.serverMenuIcons.settings}
            </span>
            <h5 className={props.className.section_title}>SETTINGS</h5>
            <span
                className={props.className.arrow_icon}
                onClick={() => props.toggleSection("settings")}
            >
                {props.isSectionOpened.settings
                    ? connectionsIcons.arrowDown
                    : connectionsIcons.arrowUp}
            </span>
        </div>
        {props.isSectionOpened.settings && (
            <ul>
                <li onClick={() => props.navigate("/dashboard/settings")}>test</li>
            </ul>
        )}
    </div>)
}

export default SettingsItem;