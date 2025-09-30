import { useState, useRef } from "react";
import { connectionsIcons } from "assets/icons/icons";
import s from "./AlertNotifications.module.scss";
import moment from "moment";
import { IconVariants } from "store/enums/enums";
import { useNavigate } from "react-router";
import { handleHandShake } from "utils/handleHandshake";
import { clearFromCache } from "utils/alerts/clearCache";
import { getAlertsApi } from "api/ehd";
import useStore from "store/store";
import { Alert } from "store/interfaces/IAlerts";
import useOutsideMouseClick from "hooks/useOutsideMouseClick";
import useGetValuesFromCache from "hooks/useGetValuesFromCache";

interface IPushAlert {
  Message: string;
  LoggedTime: string;
}

function AlertNotifications(props: { themeColor: IconVariants }) {
  const { unreadAlerts: alerts, setUnreadAlerts: setAlerts } = useStore(
    (state) => state.alertSlice
  );
  const [isListVisible, setListVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const modalRef = useRef<HTMLDivElement>(null);

  async function getAlertsFromCache() {
    const cache = await caches.open("alerts");
    const keys = await cache.keys();

    const cacheData = await Promise.all(
      keys.map(async (key) => {
        const response: any = await cache.match(key);
        const data: any = await response.json();

        if (data.hasOwnProperty("AlertId")) {
          return data;
        }
      })
    );

    if (cacheData.length > 0) {
      handleHandShake();
      try {
        const res: any = await getAlertsApi(true);
        setAlerts(res.data);
        clearAlertsFromCache();
      } catch (error) {
        console.log("error getting alerts");
      }
      // setAlertsCount(cahceData.length);
      // setAlerts(cahceData);
    }
  }
  async function clearAlertsFromCache() {
    try {
      await clearFromCache("alerts");
      await setListVisible(false);
    } catch (e) {
      console.log("error deleting alerts from cache");
    }
  }

  useOutsideMouseClick(modalRef, () => setListVisible(false));

  useGetValuesFromCache(() => getAlertsFromCache());

  return (
    <div className={s.wrapper}>
      <div className={s.icon_wrapper}>
        <span
          className={`${s.icon}  ${
            props.themeColor === IconVariants.Dark ? s["dark"] : s["light"]
          }`}
          onClick={() => setListVisible(!isListVisible)}
        >
          {connectionsIcons.serverMenuIcons.alert}
        </span>
        {alerts.length > 0 ? (
          <span className={s.badge}>{alerts.length}</span>
        ) : null}
      </div>
      {isListVisible && alerts.length > 0 ? (
        <div className={s.notifications_list} ref={modalRef}>
          <ul>
            {alerts?.map((pushAlert: Alert) => (
              <li key={alerts.indexOf(pushAlert)}>
                <div className={s.left_column}>
                  {" "}
                  <div className={s.message}>{pushAlert.messageText}</div>
                </div>
                <div className={s.right_column}>
                  <div className={s.date}>
                    {moment(pushAlert.logged).format("lll")}
                  </div>
                  <div
                    className={s.view}
                    onClick={() => {
                      navigate("/dashboard/server/alerts/");
                      setListVisible(false);
                    }}
                  >
                    <button>VIEW</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {/* <button className={s.clear_btn} onClick={clearAlertsFromCache}>
            CLEAR
          </button> */}
        </div>
      ) : null}
    </div>
  );
}

export default AlertNotifications;
