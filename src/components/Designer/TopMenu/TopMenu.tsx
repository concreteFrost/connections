import s from "./TopMenu.module.scss";
import CentralPanel from "./CentralPanel/CentralPanel";
import Settings from "./Settings/Settings";
import useStore from "../../../store/store";
import UpdateFlowModal, { UpdateFlowActions } from "../../Modals/UpdateFlowModal";
import { useState } from "react";
import FlowsList from "./CentralPanel/FlowsList/FlowsList";
import MessageModal from "../../Modals/MessageModal";

function TopMenu() {
  const dropdowns = useStore((state) => state.topPanelSlice.dropdowns);
  const toggleDropdown = useStore((state) => state.topPanelSlice.toggleDropdown);
  const toggleUpdateFlowModal = useStore((state) => state.modalWindowsSlice.toggleUpdateFlowModal);
  const [currentActions, setCurrentActions] = useState<UpdateFlowActions>(UpdateFlowActions.Create);
  const [isSelectFlowVisible, setIsSelectFlowVisible] = useState<boolean>(false);
  const [flowIdToLoad, setFlowIdToLoad] = useState<string>('');


  function closeSelectFlowModal() {
    setIsSelectFlowVisible(false);
  }

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        {isSelectFlowVisible ? <FlowsList
          closeSelecFlowModal={closeSelectFlowModal}
          toggleUpdateFlowModal={toggleUpdateFlowModal}
          setCurrentActions={setCurrentActions}
          setFlowIdToLoad={setFlowIdToLoad}
        ></FlowsList> : null}
        <CentralPanel
          dropdowns={dropdowns}
          toggleDropdown={toggleDropdown}
          setIsSelectFlowsVisible={setIsSelectFlowVisible}
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
