import TopMenu from "./TopMenu/TopMenu";
import LeftPanel from "./LeftPanel/LeftPanel";
import RightPanel from "./RightPanel/RightPanel";
import Flow from "./Flow";
import { Tooltip } from "react-tooltip";
import useStore from "../../store/store";
import { useEffect } from "react";
import { getBlocks } from "../../api/data";
import Substitutions from "./Substitutions/Substitutions";

function Designer() {

    const getBlocksList = useStore((store) => store.getBlocksList);
    const tooltipText = useStore((store) => store.designerVisualElementsSlice.tooltip.text);

    const hideAllTopDropdowns = useStore((state) => state.topPanelSlice.hideAllTopMenus);
    const hideAllGroupModals = useStore((state) => state.flowSlice.hideAllGroupModals);

    const setselectedBlockID = useStore((state) => state.setselectedBlockID);

    useEffect(() => {
        getBlocks().then((res) => { getBlocksList(res) }).catch((e) => console.log(e))
    }, [])

    const resetselectedBlockID = (event: any) => {
        const isContainer = event.target.classList.contains(
            "react-flow__container"
        );

        if (isContainer) {
            setselectedBlockID("-1");
            //deal with right panel clearance
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
        <Flow resetselectedBlockID={resetselectedBlockID}></Flow>
        <Tooltip anchorSelect=".nodelist-body-elemet" place="right" style={{ zIndex: 1000 }}  >
            {tooltipText}
        </Tooltip>
    </div>)
}

export default Designer;