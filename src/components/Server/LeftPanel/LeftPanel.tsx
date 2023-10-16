import s from "./LeftPanel.module.scss";
import { connectionsIcons } from "../../../icons/icons";
import { useState } from "react";
import { useNavigate } from "react-router";

function LeftPanel() {
    const [isSectionOpened, setIsSectionOpened] = useState<Boolean>(true);
    const navigate = useNavigate();
    return (<div className={s.wrapper}>
        <div className={s.sections_container}>
            <div className={s.section}>
                <div className={s.section_header}>
                    <span className={s.header_icon}>{connectionsIcons.serverMenuIcons.server}</span>
                    <h5 className={s.section_title}>SERVERS</h5>
                    <span className={s.arrow_icon} >{isSectionOpened ? connectionsIcons.arrowDown : connectionsIcons.arrowUp}</span>
                </div>
                <ul>
                    <li onClick={() => { navigate('/dashboard/servers') }}>test</li>
                </ul></div>
            <div className={s.section}>

                <div className={s.section_header}>
                    <span className={s.header_icon}>{connectionsIcons.serverMenuIcons.flows}</span>
                    <h5 className={s.section_title}>FLOWS</h5>
                    <span className={s.arrow_icon} >{isSectionOpened ? connectionsIcons.arrowDown : connectionsIcons.arrowUp}</span>
                </div>
                <ul>
                    <li onClick={() => { navigate('/dashboard/flows') }}>test</li>
                </ul></div>
            <div className={s.section}>
                <div className={s.section_header}>
                    <span className={s.header_icon}>{connectionsIcons.serverMenuIcons.stats}</span>
                    <h5 className={s.section_title}>STATISTICS</h5>
                    <span className={s.arrow_icon} >{isSectionOpened ? connectionsIcons.arrowDown : connectionsIcons.arrowUp}</span>
                </div>
                <ul>
                    <li onClick={() => { navigate('/dashboard/statistics') }}>test</li>
                </ul></div>
            <div className={s.section}>
                <div className={s.section_header}>
                    <span className={s.header_icon}>{connectionsIcons.serverMenuIcons.settings}</span>
                    <h5 className={s.section_title}>SETTINGS</h5>
                    <span className={s.arrow_icon} >{isSectionOpened ? connectionsIcons.arrowDown : connectionsIcons.arrowUp}</span>
                </div>
                <ul>
                    <li onClick={() => { navigate('/dashboard/settings') }}>test</li>
                </ul></div>
        </div>

    </div>)
}

export default LeftPanel;