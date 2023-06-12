import s from "./RightPanel.module.scss"
import useStore from "../../store/store";
import Properties from "./Properties/Properties";
import ValueEditor from "./ValueEditor/ValueEditor";
import DebugConsole from "./DebugConsole/DebugConsole";

function RightPanel() {



    return (<div className={s.wrapper}>
        <div className={s.right_panel_container}>
            <Properties></Properties>
            <ValueEditor></ValueEditor>
            <DebugConsole></DebugConsole>
        </div>

    </div >)
}

export default RightPanel;