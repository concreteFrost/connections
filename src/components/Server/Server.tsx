import s from "./Server.module.scss";
import LeftPanel from "./LeftPanel/LeftPanel";
import Header from "./Header/Header";
import CenterPanel from "./CenterPanel/CenterPanel";
import useStore from "../../store/store";
import PushTest from "../PushTest/PushTest";

function Server() {
  const { registerClientNotification, notificationsList } = useStore((state) => state.notificationSlice);
  const { appUser,getMe } = useStore((state) => state.securitySlice);

  return (
    <div className={s.wrapper}>
       <PushTest></PushTest>
      <Header></Header>
      <div className={s.content}>
        <LeftPanel></LeftPanel>
        <CenterPanel></CenterPanel>
       
      </div>
    </div>
  );
}

export default Server;
