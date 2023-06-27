
import s from "./TopMenu.module.scss";
import MiddleButtons from "./MiddleButtons/MiddleButtons";
import LeftList from "./LeftList/LeftList";
import Settings from "./Settings/Settings";

function TopMenu() {
 

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
       <LeftList></LeftList>
      <MiddleButtons></MiddleButtons>
      <Settings></Settings>
      </div>
    </div>
  );
}

export default TopMenu;
