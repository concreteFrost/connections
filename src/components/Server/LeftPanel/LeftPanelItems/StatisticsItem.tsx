import { connectionsIcons } from "../../../../icons/icons"

interface StatisticsItemProps {
    className: any;
    toggleSection: (section: string) => void;
    navigate: (route: string) => void;
    isSectionOpened: any;
}

function StatisticsItem(props: StatisticsItemProps) {
    return (<div className={props.className.section}>
        <div className={props.className.section_header}>
            <span className={props.className.header_icon}>
                {connectionsIcons.serverMenuIcons.stats}
            </span>
            <h5 className={props.className.section_title}>STATISTICS</h5>
            <span
                className={props.className.arrow_icon}
                onClick={() => props.toggleSection("statistics")}
            >
                {props.isSectionOpened.statistics
                    ? connectionsIcons.arrowDown
                    : connectionsIcons.arrowUp}
            </span>
        </div>
        {props.isSectionOpened.statistics && (
            <ul>
                <li onClick={() => props.navigate("/dashboard/statistics")}>test</li>
            </ul>
        )}
    </div>)
}

export default StatisticsItem;