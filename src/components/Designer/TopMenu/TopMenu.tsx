import s from "./TopMenu.module.scss";
import CentralPanel from "./CentralPanel/CentralPanel";
import Settings from "./Settings/Settings";
import useStore from "../../../store/store";
import UpdateFlowModal, { UpdateFlowActions } from "../../Modals/UpdateFlowModal";
import { useState } from "react";
import FlowsListModal from "../../Modals/FlowsListModal/FlowsListModal";
import Profile from "../../Profile/Profile";
import { IconVariants } from "../../../store/enums/profile";
import PushNotifications from "../../PushNotifications/PushNotifications";

function TopMenu() {
  const dropdowns = useStore((state) => state.topPanelSlice.dropdowns);
  const toggleDropdown = useStore((state) => state.topPanelSlice.toggleDropdown);
  const [currentActions, setCurrentActions] = useState<UpdateFlowActions>(UpdateFlowActions.Create);
  const loadFlowModal = useStore((state) => state.modalWindowsSlice.loadFlowModal);

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        {loadFlowModal.isVisible ? <FlowsListModal></FlowsListModal> : null}
        <CentralPanel
          dropdowns={dropdowns}
          toggleDropdown={toggleDropdown}
          setCurrentActions={setCurrentActions}
        ></CentralPanel>
        <div className={s.settings_wrapper}>
        <PushNotifications themeColor={IconVariants.Dark}></PushNotifications>
          <Settings
            dropdowns={dropdowns}
            toggleDropdown={toggleDropdown}
          ></Settings>
          
          <Profile themeColor={IconVariants.Dark}></Profile>
        </div>

      </div>
      <UpdateFlowModal />
    </div>
  );
}

export default TopMenu;
