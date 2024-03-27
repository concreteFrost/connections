import TopMenu from "./TopMenu/TopMenu";
import LeftPanel from "./LeftPanel/LeftPanel";
import RightPanel from "./RightPanel/RightPanel";
import Flow from "./Flow";
import useStore from "../../store/store";
import { useEffect, useState } from "react";
import { getBlocks } from "../../api/data";
import Substitutions from "./Substitutions/Substitutions";
import BlocksWidget from "./BlocksWidget/BlocksWidget";
import { getAllselectedBlockIDs } from "../../store/actions/groupActions";
import { ReactFlowProvider } from "reactflow";

function Designer() {
  const getBlocksList = useStore((store) => store.getBlocksList);
  const { getDirectivesGlobal } = useStore((store) => store.alertSlice);
  const { flow } = useStore((store) => store.flowSlice);

  const [isRightPanelExpanded, setRightPanelExpanded] =
    useState<boolean>(false);

  const hideAllTopDropdowns = useStore(
    (state) => state.topPanelSlice.hideAllTopMenus
  );
  const hideAllGroupModals = useStore(
    (state) => state.flowSlice.hideAllGroupModals
  );

  const fetchDirectives = async () => {
    try {
      await getDirectivesGlobal();
    }
    catch (e) {
      console.log("error getting directivea");
    }
  }

  useEffect(() => {
    getBlocks()
      .then((res) => {
        getBlocksList(res);
      })
      .catch((e) => console.log(e));
    fetchDirectives();
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
      <div
        className={`${isRightPanelExpanded ? "resized_dynamic_menu" : "dynamic_menu"
          }`}
      >
        <LeftPanel></LeftPanel>
        {flow.flowIdentifier ? <Substitutions></Substitutions> : <div></div>}
        <RightPanel
          isRightPanelResized={isRightPanelExpanded}
          setRightPanelResized={setRightPanelExpanded}
        ></RightPanel>
      </div>

      <Flow resetSelectedBlockId={resetSelectedBlockId}></Flow>

      {getAllselectedBlockIDs(flow.visual.blocks) ? <BlocksWidget></BlocksWidget> : null}

    </div>
  );
}

export default Designer;
