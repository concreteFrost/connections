
import s from "./TopMenu.module.scss";
import MiddleButtons from "./MiddleButtons/MiddleButtons";
import LeftList from "./LeftList/LeftList";
import Settings from "./Settings/Settings";
import useStore from "../../store/store";

function TopMenu() {
 
  const dropdowns = useStore((state) => state.topPanel.dropdowns);
  const toggleDropdown = useStore((state) => state.toggleDropdown);

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
       <LeftList dropdowns={dropdowns} toggleDropdown={toggleDropdown}></LeftList>
      <MiddleButtons></MiddleButtons>
      <Settings dropdowns={dropdowns} toggleDropdown={toggleDropdown}></Settings>
      </div>
    </div>
  );
}

export default TopMenu;
