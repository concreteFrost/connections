import TopMenu from "./TopMenu/TopMenu";
import LeftPanel from "./LeftPanel/LeftPanel";
import RightPanel from "./RightPanel/RightPanel";
import Flow from "./Flow";
import useStore from "../../store/store";
import { useEffect } from "react";
import { getBlocks } from "../../api/data";
import Substitutions from "./Substitutions/Substitutions";

function Designer() {

    const getBlocksList = useStore((store) => store.getBlocksList);
    const { flow } = useStore((store) => store.flowSlice);

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
            {flow.flowIdentifier ? <Substitutions></Substitutions> : <div></div>}
            <RightPanel></RightPanel>
        </div>
        <Flow resetselectedBlockID={resetselectedBlockID}></Flow>
    </div>)
}

export default Designer;