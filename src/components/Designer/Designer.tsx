import TopMenu from "./TopMenu/TopMenu";
import LeftPanel from "./LeftPanel/LeftPanel";
import RightPanel from "./RightPanel/RightPanel";
import Flow from "./Flow";
import useStore from "../../store/store";
import { useEffect, useState } from "react";
import { getBlocks } from "../../api/data";
import Substitutions from "./Substitutions/Substitutions";

function Designer() {
  const getBlocksList = useStore((store) => store.getBlocksList);
  const { flow } = useStore((store) => store.flowSlice);
  const [isRightPanelExpanded,setRightPanelExpanded] = useState<boolean>(false);

  const hideAllTopDropdowns = useStore(
    (state) => state.topPanelSlice.hideAllTopMenus
  );
  const hideAllGroupModals = useStore(
    (state) => state.flowSlice.hideAllGroupModals
  );

  useEffect(() => {
    getBlocks()
      .then((res) => {
        getBlocksList(res);
      })
      .catch((e) => console.log(e));
  }, []);

  const resetSelectedBlockId = (event: any) => {
    const isContainer = event.target.classList.contains(
      "react-flow__container"
    );

    if (isContainer) {
      //deal with right panel clearance
      hideAllGroupModals();
    }
    hideAllTopDropdowns();
  };
  return (
    <div className="App">
      <TopMenu></TopMenu>
      <div className={`${isRightPanelExpanded ? "resized_dynamic_menu" : "dynamic_menu"}`}>
        <LeftPanel></LeftPanel>
        {flow.flowIdentifier ? <Substitutions></Substitutions> : <div></div>}
        <RightPanel isRightPanelResized={isRightPanelExpanded} setRightPanelResized={setRightPanelExpanded}></RightPanel>
      </div>
      <Flow resetSelectedBlockId={resetSelectedBlockId}></Flow>
    </div>
  );
}

export default Designer;
