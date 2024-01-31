import { connectionsIcons } from "../../../../icons/icons"
import { ILeftPanelSections } from "../LeftPanel";
import s from "./ListItem.module.scss"

interface StatisticsItemProps {

    toggleSection: (section: string) => void;
    navigate: (route: string) => void;
    currentSection: ILeftPanelSections;
}

function StatisticsItem(props: StatisticsItemProps) {
    return (<div className={s.section}>
        <div className={s.section_header}>
            <span className={s.header_icon}>
                {connectionsIcons.serverMenuIcons.stats}
            </span>
            <h5 className={s.section_title}>STATISTICS</h5>
            <span
                className={s.arrow_icon}
                onClick={() => props.toggleSection("statistics")}
            >
                {props.currentSection.statistics
                    ? connectionsIcons.arrowDown
                    : connectionsIcons.arrowUp}
            </span>
        </div>
        {props.currentSection.statistics && (
            <ul>
                <li onClick={() => props.navigate("/dashboard/statistics")}>test</li>
            </ul>
        )}
    </div>)
}

export default StatisticsItem;