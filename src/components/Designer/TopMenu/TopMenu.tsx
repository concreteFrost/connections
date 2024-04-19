import s from "./TopMenu.module.scss";
import CentralPanel from "./CentralPanel/CentralPanel";
import Settings from "./Settings/Settings";
import useStore from "../../../store/store";
import UpdateFlowModal, {
  UpdateFlowActions,
} from "../../Modals/UpdateFlowModal";
import { useState } from "react";
import FlowsListModal from "../../Modals/FlowsListModal/FlowsListModal";
import Profile from "../../Profile/Profile";
import { IconVariants } from "../../../store/enums/profile";
import PushNotifications from "../../PushNotifications/PushNotifications";
import AlertNotifications from "../../AlertsNotifications/AlertNotifications";

function TopMenu() {

  const loadFlowModal = useStore(
    (state) => state.modalWindowsSlice.loadFlowModal
  );

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        {loadFlowModal.isVisible ? <FlowsListModal></FlowsListModal> : null}
        <CentralPanel></CentralPanel>
        <div className={s.settings_wrapper}>
          <PushNotifications themeColor={IconVariants.Dark}></PushNotifications>
          <AlertNotifications themeColor={IconVariants.Dark}></AlertNotifications>
          <Settings></Settings>
          <Profile themeColor={IconVariants.Dark}></Profile>
        </div>
      </div>
      <UpdateFlowModal />
    </div>
  );
}

export default TopMenu;
