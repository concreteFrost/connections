import s from "./TopMenu.module.scss";
import LeftList from "./LeftList/LeftList";
import Settings from "./Settings/Settings";
import useStore from "../../../store/store";
import { useNavigate } from "react-router";

function TopMenu() {
  const dropdowns = useStore((state) => state.topPanelSlice.dropdowns);
  const toggleDropdown = useStore((state) => state.topPanelSlice.toggleDropdown);
  const navigate = useNavigate()

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.server_button}>
          <button onClick={() => navigate('/dashboard/servers')}>SERVER</button>
        </div>
        <LeftList
          dropdowns={dropdowns}
          toggleDropdown={toggleDropdown}
        ></LeftList>

        <Settings
          dropdowns={dropdowns}
          toggleDropdown={toggleDropdown}
        ></Settings>
      </div>
    </div>
  );
}

export default TopMenu;
