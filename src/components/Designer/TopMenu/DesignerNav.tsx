import s from "./DesignerNav.module.scss";
import Settings from "./Settings/Settings";
import useStore from "store/store";
import UpdateFlowModal from "components/Modals/UpdateFlowModal";
import FlowsListModal from "components/Modals/FlowsListModal/FlowsListModal";
import Profile from "components/Profile/Profile";
import { IconVariants } from "store/enums/enums";
import PushNotifications from "components/PushNotifications/PushNotifications";
import AlertNotifications from "components/AlertsNotifications/AlertNotifications";
import MonacoEditor from "components/MonacoEditor/MonacoEditor";
import SwitchToServerView from "./CentralPanel/SwitchToServerView";
import Create from "./CentralPanel/Create";
import Save from "./CentralPanel/Save";
import Load from "./CentralPanel/Load";
import View from "./CentralPanel/View/View";
import Approve from "./CentralPanel/Approve";
import FlowTabs from "./Tabs/FlowTabs";
import VM from "./CentralPanel/VM";

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
          <VM></VM>
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
