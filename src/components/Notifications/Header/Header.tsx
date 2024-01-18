import { IconVariants } from "../../../store/enums/profile";
import Profile from "../../Profile/Profile";
import PushNotifications from "../../PushNotifications/PushNotifications";
import s from "./Header.module.scss";
import { useNavigate } from "react-router";

function Header() {

  const navigate = useNavigate();
  return (
    <div className={s.wrapper}>
      <div className={s.nav_btns_wrapper}>
        <div className={s.server_button}>
          <button onClick={() => {
            navigate('/server')
          }}>SERVER</button>
        </div>
        <div className={s.designer_button}>
          <button onClick={() => {
            navigate('/designer')
          }}>DESIGNER</button>
        </div>
      </div>
      <header>NOTIFICATIONS</header>
      <div className={s.settings_container}>
        <PushNotifications themeColor={IconVariants.Light}></PushNotifications>
        <Profile themeColor={IconVariants.Light}></Profile>
      </div>

    </div>
  );
}

export default Header;
