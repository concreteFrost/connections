import s from "./style/Server.module.scss";
import LeftPanel from "../components/Server/LeftPanel/LeftPanel";
import ServerNav from "../components/Server/ServerNav/ServerNav";
import ServerCenterPanel from "./ServerCenterPanel";

function Server() {
  return (
    <div className={s.wrapper}>
      <ServerNav></ServerNav>
      <div className={s.content}>
        <LeftPanel></LeftPanel>
        <ServerCenterPanel></ServerCenterPanel>  
      </div>
    </div>
  );
}

export default Server;
