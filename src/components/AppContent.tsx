import TopMenu from "./TopMenu/TopMenu";
import LeftPanel from "./LeftPanel/LeftPanel";
import RightPanel from "./RightPanel/RightPanel";
import Flow from "./Flow";
import { Tooltip } from "react-tooltip";
import useStore from "../store/store";
import { useEffect } from "react";
import { getBlocks } from "../api/data";
import Substitutions from "./Substitutions/Substitutions";


function AppContent() {

    const baseUrl = useStore((store) => store.baseUrl)
    const getNodesList = useStore((store) => store.getNodesList);
    const tooltipText = useStore((store) => store.tooltip.text);

    const hideAllTopDropdowns = useStore((state) => state.hideAllTopMenus);
    const hideAllGroupModals = useStore((state) => state.hideAllGroupModals);

    const setSelectedNode = useStore((state) => state.setSelectedNodeID);

    useEffect(() => {
        getBlocks(baseUrl).then((res) => { getNodesList(res) })
    }, [])


    const resetSelectedNode = (event: any) => {
        const isContainer = event.target.classList.contains(
            "react-flow__container"
        );

        if (isContainer) {
            setSelectedNode("-1");
            hideAllGroupModals();
        }
        hideAllTopDropdowns();

    };
    return (<div className="App">
        <TopMenu></TopMenu>
        <LeftPanel></LeftPanel>
        <RightPanel></RightPanel>
        <Flow resetSelectedNode={resetSelectedNode}></Flow>
        <Substitutions></Substitutions>
        <Tooltip anchorSelect=".nodelist-body-elemet" place="right" style={{ zIndex: 1000 }}  >
            {tooltipText}
        </Tooltip>
    </div>)
}

export default AppContent;