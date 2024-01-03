import { ProfileIconVariants } from "../../../store/enums/profile";
import Profile from "../../Profile/Profile";
import s from "./Header.module.scss";
import { useNavigate } from "react-router";
import useStore from "../../../store/store";
import { useEffect, useState } from "react";

function Header() {
  const navigate = useNavigate();
  const { getNotificationsList, notificationsList, toggleHaveCheckedNotifications, haveCheckedNotifications } = useStore((state) => state.notificationSlice)

  useEffect(() => {
    async function fetchNotifications() {
      try {
        await getNotificationsList();
      } catch (e) {
        console.log("error getting list of notifications", e);
      }
    }

    fetchNotifications();
  }, []);

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
          { !haveCheckedNotifications && notificationsList.length > 0 ? (
            <span>{notificationsList.length}</span>
          ) : null}
        </div>
      </div>
      <header className={s.title}>CONNECTIONS SERVER DASHBOARD</header>
      <div className={s.logout_container}>
        <Profile themeColor={ProfileIconVariants.Light}></Profile>
      </div>
    </div>
  );
}

export default Header;
