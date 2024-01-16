import s from "./Server.module.scss";
import LeftPanel from "./LeftPanel/LeftPanel";
import Header from "./Header/Header";
import CenterPanel from "./CenterPanel/CenterPanel";
import useStore from "../../store/store";
import CachedNotifications from "../PushTest/CachedNotifications";

function Server() {
  return (
    <div className={s.wrapper}>
      <CachedNotifications></CachedNotifications>
      <Header></Header>
      <div className={s.content}>
        <LeftPanel></LeftPanel>
        <CenterPanel></CenterPanel>  
      </div>
    </div>
  );
}

export default Server;
