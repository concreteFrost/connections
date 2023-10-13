import TopMenu from "./Designer/TopMenu/TopMenu";
import LeftPanel from "./Designer/LeftPanel/LeftPanel";
import RightPanel from "./Designer/RightPanel/RightPanel";
import Flow from "./Designer/Flow";
import { Tooltip } from "react-tooltip";
import useStore from "../store/store";
import { useEffect } from "react";
import { getBlocks } from "../api/data";
import Substitutions from "./Designer/Substitutions/Substitutions";
import { getAccessToken } from "../store/actions/storageActions";


function AppContent() {

    const baseUrl = useStore((store) => store.baseUrl)
    const getNodesList = useStore((store) => store.getNodesList);
    const tooltipText = useStore((store) => store.tooltip.text);

    const hideAllTopDropdowns = useStore((state) => state.hideAllTopMenus);
    const hideAllGroupModals = useStore((state) => state.hideAllGroupModals);

    const setSelectedNode = useStore((state) => state.setSelectedNodeID);
    const clearRightPanel = useStore((state) => state.clearRightPanel);

    useEffect(() => {
        getBlocks(baseUrl).then((res) => { getNodesList(res) })
    }, [])



    const resetSelectedNode = (event: any) => {
        const isContainer = event.target.classList.contains(
            "react-flow__container"
        );

        if (isContainer) {
            setSelectedNode("-1");
            clearRightPanel();
            hideAllGroupModals();
        }
        hideAllTopDropdowns();

    };
    return (<div className="App">
        <TopMenu></TopMenu>
        <div className="dynamic_menu">
            <LeftPanel></LeftPanel>
            <Substitutions></Substitutions>
            <RightPanel></RightPanel>

        </div>
        <Flow resetSelectedNode={resetSelectedNode}></Flow>
        <Tooltip anchorSelect=".nodelist-body-elemet" place="right" style={{ zIndex: 1000 }}  >
            {tooltipText}
        </Tooltip>
    </div>)
}

export default AppContent;