import { useEffect, useState, useRef } from "react";
import { connectionsIcons } from "assets/icons/icons";
import s from "./PushNotifications.module.scss";
import moment from "moment";
import { IconVariants } from "shared/enums/enums";
import { handleHandShake } from "utils/handleHandshake";
import useOutsideMouseClick from "hooks/useOutsideMouseClick";
import useGetValuesFromCache from "hooks/useGetValuesFromCache";

interface IPushNotification {
  Message: string;
  LoggedTime: string;
}

function PushNotifications(props: { themeColor: IconVariants }) {
  const [notificationsCount, setNotificationsCount] = useState<number>(0);
  const [notificationsList, setNotificationsList] =
    useState<Array<IPushNotification>>();
  const [isListVisible, setListVisible] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);

  async function getNotifications() {
    const cache = await caches.open("notifications");
    const keys = await cache.keys();

    const cacheData = await Promise.all(
      keys.map(async (key) => {
        const response: any = await cache.match(key);
        const data: any = await response.json();
        if (data.hasOwnProperty("NotificationId")) {
          return data;
        }
      })
    );

    if (cacheData.length > 0) {
      handleHandShake();
      setNotificationsCount(cacheData.length);
      setNotificationsList(cacheData);
    }
  }
  async function clearNotifications() {
    await setListVisible(false);
    await setNotificationsCount(0);
    await setNotificationsList([]);

    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache === "notifications") {
            return caches.delete(cache);
          }
        })
      );
    });
  }

  useOutsideMouseClick(modalRef, () => setListVisible(false));

  //uncomment to get notifications on component mounted
  // useEffect(() => {
  //   getNotifications();
  // }, []);

  useGetValuesFromCache(() => getNotifications());
  return (
    <div className={s.wrapper}>
      <div className={s.icon_wrapper}>
        <span
          className={`${s.icon}  ${
            props.themeColor === IconVariants.Dark ? s["dark"] : s["light"]
          }`}
          onClick={() => setListVisible(!isListVisible)}
        >
          {connectionsIcons.bell}
        </span>
        {notificationsCount > 0 ? (
          <span className={s.badge}>{notificationsCount}</span>
        ) : null}
      </div>
      {isListVisible && notificationsList && notificationsList.length > 0 ? (
        <div className={s.notifications_list} ref={modalRef}>
          <ul>
            {notificationsList?.map((pushNotification: IPushNotification) => (
              <li key={notificationsList.indexOf(pushNotification)}>
                <div className={s.message}>{pushNotification.Message}</div>
                <div className={s.date}>
                  {moment(pushNotification.LoggedTime).format("lll")}
                </div>
              </li>
            ))}
          </ul>
          <button className={s.clear_btn} onClick={clearNotifications}>
            CLEAR
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default PushNotifications;
