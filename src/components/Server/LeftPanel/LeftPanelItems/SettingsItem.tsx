import { connectionsIcons } from "../../../../assets/icons/icons";
import { ILeftPanelSections } from "../LeftPanel";
import s from "./ListItem.module.scss"

interface SettingsItemProps {
    toggleSection: (section: string) => void;
    navigate: (route: string) => void;
    currentSection: ILeftPanelSections;
}

function SecurityItem(props: SettingsItemProps) {
    return (<div className={s.section}>
        <div className={s.section_header}>
            <span className={s.header_icon}>
                {connectionsIcons.serverMenuIcons.settings}
            </span>
            <h5 className={s.section_title} onClick={() => props.navigate("/dashboard/settings")}>SETTINGS</h5>

        </div>
    </div>)
}

export default SecurityItem;