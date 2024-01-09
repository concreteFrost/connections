import { connectionsIcons } from "../../../../icons/icons";
import { ILeftPanelSections } from "../LeftPanel";

interface SettingsItemProps {
    className: any;
    toggleSection: (section: string) => void;
    navigate: (route: string) => void;
    currentSection: ILeftPanelSections;
}

function SecurityItem(props: SettingsItemProps) {
    return (<div className={props.className.section}>
        <div className={props.className.section_header}>
            <span className={props.className.header_icon}>
                {connectionsIcons.serverMenuIcons.settings}
            </span>
            <h5 className={props.className.section_title} onClick={() => props.navigate("/dashboard/security")}>SECURITY</h5>

        </div>
    </div>)
}

export default SecurityItem;