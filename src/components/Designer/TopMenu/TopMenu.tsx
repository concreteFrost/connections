import s from "./TopMenu.module.scss";
import CentralPanel from "./CentralPanel/CentralPanel";
import Settings from "./Settings/Settings";
import useStore from "../../../store/store";
import UpdateFlowModal, { UpdateFlowActions } from "../../Modals/UpdateFlowModal";
import { useState } from "react";
import FlowsListModal from "../../Modals/FlowsListModal/FlowsListModal";
import MessageModal from "../../Modals/MessageModal";

function TopMenu() {
  const dropdowns = useStore((state) => state.topPanelSlice.dropdowns);
  const toggleDropdown = useStore((state) => state.topPanelSlice.toggleDropdown);
  const toggleUpdateFlowModal = useStore((state) => state.modalWindowsSlice.toggleUpdateFlowModal);
  const [currentActions, setCurrentActions] = useState<UpdateFlowActions>(UpdateFlowActions.Create);
  const [flowIdToLoad, setFlowIdToLoad] = useState<string>('');
  const loadFlowModal = useStore((state) => state.modalWindowsSlice.loadFlowModal);


  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        {loadFlowModal.isVisible ? <FlowsListModal
          toggleUpdateFlowModal={toggleUpdateFlowModal}
          setCurrentActions={setCurrentActions}
          setFlowIdToLoad={setFlowIdToLoad}
        ></FlowsListModal> : null}
        <CentralPanel
          dropdowns={dropdowns}
          toggleDropdown={toggleDropdown}
          toggleUpdateFlowModal={toggleUpdateFlowModal}
          setCurrentActions={setCurrentActions}
        ></CentralPanel>
        <Settings
          dropdowns={dropdowns}
          toggleDropdown={toggleDropdown}
        ></Settings>
      </div>
      <UpdateFlowModal actions={currentActions} flowIdToLoad={flowIdToLoad} />
      <MessageModal></MessageModal>
    </div>
  );
}

export default TopMenu;
