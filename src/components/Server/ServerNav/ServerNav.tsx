import { IconVariants } from "../../../store/enums/profile";
import Profile from "../../Profile/Profile";
import s from "./ServerNav.module.scss";
import { useNavigate } from "react-router";
import useStore from "../../../store/store";
import PushNotifications from "../../PushNotifications/PushNotifications";
import AlertNotifications from "../../AlertsNotifications/AlertNotifications";

function ServerNav() {
  const navigate = useNavigate();
  const {toggleHaveCheckedNotifications} = useStore((state) => state.notificationSlice)

  const handleNotificationsClick = () => {
    toggleHaveCheckedNotifications(true);
    navigate("/dashboard/alerts");
  };

  return (
    <div className={s.wrapper}>
      <div className={s.nav_btns_wrapper}>
        <div className={s.designer_button}>
          <button onClick={() => navigate("/dashboard/designer")}>DESIGNER</button>
        </div>
        <div className={s.notifications_button}>
          <button onClick={handleNotificationsClick}>NOTIFICATIONS</button>
        
        </div>
      </div>

      <header className={s.title}>CONNECTIONS SERVER DASHBOARD</header>

      <div className={s.nav_right_btns_wrapper}>
        <PushNotifications themeColor={IconVariants.Light}></PushNotifications>
        <AlertNotifications themeColor={IconVariants.Light}></AlertNotifications>
        <Profile themeColor={IconVariants.Light}></Profile>
      </div>
    </div>
  );
}

export default ServerNav;
