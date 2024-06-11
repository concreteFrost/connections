import { useEffect, useState, useRef } from "react";
import { connectionsIcons } from "../../assets/icons/icons";
import s from "./AlertNotifications.module.scss";
import moment from "moment";
import { IconVariants } from "../../store/enums/profile";
import { useNavigate } from "react-router";
import { handleHandShake } from "../../utils/handleHandshake";

interface IPushAlert {
  Message: string;
  LoggedTime: string;
}

function AlertNotifications(props: { themeColor: IconVariants }) {
  const [alertsCount, setAlertsCount] = useState<number>(0);
  const [alertsList, setAlertsList] = useState<Array<IPushAlert>>();
  const [isListVisible, setListVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const modalRef = useRef<HTMLDivElement>(null);

  const refreshInterval = 2000;

  async function getAlertsFromCache() {
    const cache = await caches.open("alerts");
    const keys = await cache.keys();

    const cahceData = await Promise.all(
      keys.map(async (key) => {
        const response: any = await cache.match(key);
        const data: any = await response.json();

        if (data.hasOwnProperty("AlertId")) {
          return data;
        }
      })
    );

    if (cahceData.length > 0) {
      handleHandShake();
      setAlertsCount(cahceData.length);
      setAlertsList(cahceData);
    }
  }
  async function clearAlertsFromCache() {
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache === "alerts") {
            return caches.delete(cache);
          }
        })
      );
    });
    await setListVisible(false);
    await setAlertsCount(0);
    await setAlertsList([]);
  }

  function handleOutsideClick(e: MouseEvent) {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setListVisible(false);
    }
  }

  useEffect(() => {
    if (isListVisible) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isListVisible]);

  useEffect(() => {
    const refreshTimer = setInterval(() => {
      getAlertsFromCache();
    }, refreshInterval);

    return () => {
      clearInterval(refreshTimer);
    };
  }, [refreshInterval]);

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
        {alertsCount > 0 ? (
          <span className={s.badge}>{alertsCount}</span>
        ) : null}
      </div>
      {isListVisible && alertsList && alertsList.length > 0 ? (
        <div className={s.notifications_list} ref={modalRef}>
          <ul>
            {alertsList?.map((pushAlert: IPushAlert) => (
              <li key={alertsList.indexOf(pushAlert)}>
                <div className={s.left_column}>
                  {" "}
                  <div className={s.message}>{pushAlert.Message}</div>
                </div>
                <div className={s.right_column}>
                  <div className={s.date}>
                    {moment(pushAlert.LoggedTime).format("lll")}
                  </div>
                  <div
                    className={s.view}
                    onClick={() => {
                      navigate("/dashboard/alerts/");
                      setListVisible(false);
                    }}
                  >
                    <button>VIEW</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button className={s.clear_btn} onClick={clearAlertsFromCache}>
            CLEAR
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default AlertNotifications;
