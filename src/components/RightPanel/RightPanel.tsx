import s from "./RightPanel.module.scss"
import Properties from "./Properties/Properties";
import ValueEditor from "./ValueEditor/ValueEditor";
import DebugConsole from "./DebugConsole/DebugConsole";
import { useState } from "react";
import { connectionsIcons } from "../../icons/icons";

function RightPanel() {

    const [isPanelActive, setIsPanelActive] = useState(true);

    function togglePanel() {
        setIsPanelActive(!isPanelActive);
    }


    const panelClasses = `${s.right_panel_container} ${isPanelActive ? s['opened'] : s['closed']}`;


    return (<div className={s.wrapper}>
        <div className={s.toggle_btn}><button onClick={togglePanel}>{isPanelActive ? connectionsIcons.leftArrow : connectionsIcons.rightArrow}</button></div>
        <div className={panelClasses}>
            <Properties></Properties>
            <ValueEditor></ValueEditor>
            <DebugConsole></DebugConsole>
        </div>

    </div >)
}

export default RightPanel;