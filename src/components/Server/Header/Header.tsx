import { ProfileIconVariants } from "../../../store/enums/profile";
import Profile from "../../Profile/Profile";
import s from "./Header.module.scss";
import { useNavigate } from "react-router";
import useStore from "../../../store/store";
import PushNotifications from "../../PushNotifications/PushNotifications";

function Header() {
  const navigate = useNavigate();
  const { notificationsList, toggleHaveCheckedNotifications, haveCheckedNotifications } = useStore((state) => state.notificationSlice)

  const handleNotificationsClick = () => {
    toggleHaveCheckedNotifications(true);
    navigate("/alerts");
  };

  return (
    <div className={s.wrapper}>
      <div className={s.nav_btns_wrapper}>
        <div className={s.designer_button}>
          <button onClick={() => navigate("/designer")}>DESIGNER</button>
        </div>
        <div className={s.notifications_button}>
          <button onClick={handleNotificationsClick}>NOTIFICATIONS</button>
        
        </div>
      </div>

      <header className={s.title}>CONNECTIONS SERVER DASHBOARD</header>

      <div className={s.nav_right_btns_wrapper}>
        <PushNotifications></PushNotifications>
        <Profile themeColor={ProfileIconVariants.Light}></Profile>
      </div>
    </div>
  );
}

export default Header;
