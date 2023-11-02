import View from "./View/View";
import s from "./LeftList.module.scss";
import useStore from "../../../../store/store";
import FlowsList from "./FlowsList/FlowsList";
import { getFlowListApi } from "../../../../api/flow";
import { useState } from "react";
import { checkExistingFlowInDataBase } from "../../../../store/actions/utils/flowUtils";
import UpdateFlowModal from "../../../Modals/UpdateFlowModal";
import MessageModal from "../../../Modals/MessageModal";

function LeftList(props: any) {
  const saveFlow = useStore<any>((state) => state.flowSlice.saveFlow);
  const [loadedFlows, setLoadedFlows] = useState<Array<object>>([])
  const [isSelectFlowVisible, setIsSelectFlowVisible] = useState<boolean>(false);
  const currentFlow = useStore((state) => state.flowSlice.flow.flowName);
  const [matchFlow, setMatchFlow] = useState<object>();
  const toggleUpdateFlowModal = useStore((state) => state.modalWindowsSlice.toggleUpdateFlowModal);
  const createFlow = useStore((state) => state.flowSlice.createFlow);

  function createNewFlow() {
    createFlow();
  }

  function getFlowList() {
    setIsSelectFlowVisible(!isSelectFlowVisible);
    getFlowListApi().then((res: any) => {
      setLoadedFlows(res.data)
    }).catch((e) => {
      console.log(e)
    })
  }

  function checkFlowVersion() {
    checkExistingFlowInDataBase(currentFlow).then((match) => {
      if (match) {
        toggleUpdateFlowModal();
        setMatchFlow(match);
      }
      else {
        saveFlow();
      }
    })
  }

  function closeSelectFlowModal() {
    setIsSelectFlowVisible(false);
  }

  return (
    <div>
      <ul className={s.nav_list}>
        <li className={s.nav_list_item} onClick={createNewFlow}>New</li>
        {/* <li className={s.nav_list_item} onClick={openTestFlow}>Open</li> */}
        <li className={s.nav_list_item} onClick={getFlowList}>Load</li>
        <li className={s.nav_list_item} onClick={checkFlowVersion}>Save</li>
        <li className={s.nav_list_item} onClick={() => props.toggleDropdown("exportFlow")}>Export</li>
        <li className={s.nav_list_item}>
          <div onClick={() => props.toggleDropdown("view")}>View</div>
          <div
            className={
              props.dropdowns.view.isVisible ? null : s.view_section_hidden
            }
          >
            <View />
          </div>
        </li>
        <li className={s.nav_list_item}>Print</li>
      </ul>
      {isSelectFlowVisible ? <FlowsList loadedFlows={loadedFlows} closeSelecFlowModal={closeSelectFlowModal}></FlowsList> : null}
      <UpdateFlowModal matchFlow={matchFlow}></UpdateFlowModal>
      <MessageModal></MessageModal>
    </div>
  );
}

export default LeftList;
