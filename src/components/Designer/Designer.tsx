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

  const hideAllTopDropdowns = useStore(
    (state) => state.topPanelSlice.hideAllTopMenus
  );
  const hideAllGroupModals = useStore(
    (state) => state.flowSlice.hideAllGroupModals
  );

  const setSelectedBlockId = useStore((state) => state.setSelectedBlockId);

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
      setSelectedBlockId("-1");
      //deal with right panel clearance
      hideAllGroupModals();
    }
    hideAllTopDropdowns();
  };
  return (
    <div className="App">
      <TopMenu></TopMenu>
      <div className="dynamic_menu">
        <LeftPanel></LeftPanel>
        {flow.flowIdentifier ? <Substitutions></Substitutions> : <div></div>}
        <RightPanel></RightPanel>
      </div>
      <Flow resetSelectedBlockId={resetSelectedBlockId}></Flow>
    </div>
  );
}

export default Designer;
