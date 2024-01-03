import s from "./Server.module.scss";
import LeftPanel from "./LeftPanel/LeftPanel";
import Header from "./Header/Header";
import CenterPanel from "./CenterPanel/CenterPanel";
import useStore from "../../store/store";
import { useEffect } from "react";
import { INotification } from "../../store/interfaces/INotification";

function Server() {
  const { registerClientNotification, notificationsList } = useStore(
    (state) => state.notificationSlice
  );
  const { appUser, appUserPassword, getMe } = useStore(
    (state) => state.securitySlice
  );

  async function _getMe() {
    try {
      await getMe();
    } catch (e) {
      throw e;
    }
  }

  async function _registerClientNotification(notification: INotification) {
    if (notification.userOrGroupId == appUser?.userId) {
      console.log(notification.notificationTypeId)
      try {
        const res = await registerClientNotification(
          notification.notificationId,
          "https://smee.io/OzII8k90t0fySZOe",
          "iliaM",
          "cre4min9Tuff"
        );
        console.log("result of registering client notification", res);
      } catch (e) {
        console.log("error registering callback", e);
      }
    }
  }

  async function fetchAndRegisterNotifications() {
    notificationsList.forEach((note: INotification) => {
      _registerClientNotification(note);
    });
  }

  useEffect(() => {
    // _getMe();
    // fetchAndRegisterNotifications();
    const CALLBACK_URL = process.env.REACT_APP_CALLBACK_URL || "https://your-default-callback-url";
    console.log(CALLBACK_URL)
  }, []);

  return (
    <div className={s.wrapper}>
      <Header></Header>
      <div className={s.content}>
        <LeftPanel></LeftPanel>
        <CenterPanel></CenterPanel>
      </div>
    </div>
  );
}

export default Server;
