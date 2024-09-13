import s from "./DesignerNav.module.scss";
import Settings from "./Settings/Settings";
import useStore from "store/store";
import UpdateFlowModal from "../../Modals/UpdateFlowModal";
import FlowsListModal from "../../Modals/FlowsListModal/FlowsListModal";
import Profile from "../../Profile/Profile";
import { IconVariants } from "store/enums/profile";
import PushNotifications from "../../PushNotifications/PushNotifications";
import AlertNotifications from "../../AlertsNotifications/AlertNotifications";
import MonacoEditor from "components/MonacoEditor/MonacoEditor";
import SwitchToServerView from "./CentralPanel/SwitchToServerView";
import Create from "./CentralPanel/Create";
import Save from "./CentralPanel/Save";
import Load from "./CentralPanel/Load";
import Close from "./CentralPanel/Close";
import View from "./CentralPanel/View/View";
import Approve from "./CentralPanel/Approve";
import FlowTabs from "./Tabs/FlowTabs";

function DesignerNav() {
  const flowId = useStore((state) => state.flowSlice.flow.flowIdentifier);

  return (
    <div className={s.container}>
      <div className={s.grid}>
        <section className={s.left}>
          <SwitchToServerView></SwitchToServerView>
        </section>
        <section className={s.central}>
          <Create></Create>
          {flowId ? <Save></Save> : null}
          <Load></Load>
          {/* {flowId ? <Close></Close> : null} */}
          <View></View>
          <Approve></Approve>
        </section>
        <section className={s.right}>
          <MonacoEditor themeColor={IconVariants.Dark}></MonacoEditor>
          <PushNotifications themeColor={IconVariants.Dark}></PushNotifications>
          <AlertNotifications
            themeColor={IconVariants.Dark}
          ></AlertNotifications>
          <Settings></Settings>
          <Profile themeColor={IconVariants.Dark}></Profile>
        </section>
      </div>
      <FlowTabs></FlowTabs>

      <FlowsListModal></FlowsListModal>
      <UpdateFlowModal />
    </div>
  );
}

export default DesignerNav;
