import { useEffect, useState } from "react";
import s from "./CurrentAlertsTable.module.scss";
import { useNavigate } from "react-router";
import { getAlertsApi, alertMarkAsReadApi, alertRemoveApi } from "api/ehd";
import { Alert } from "store/interfaces/IAlerts";
import useStore from "store/store";
import UnreadAlerts from "./UnreadAlerts/UnreadAlerts";
import ReadAlerts from "./ReadAlerts/ReadAlerts";

function CurrentAlertsTable() {
  const navigate = useNavigate();

  const { alerts, setAlerts } = useStore((state) => state.alertSlice);
  const [readAlerts, setReadAlerts] = useState<Array<Alert>>([]);
  const { toggleMessageModal } = useStore((state) => state.modalWindowsSlice);

  const handleGetAlerts = async () => {
    await getAlertsApi(false)
      .then((res: any) => {
        setReadAlerts(res.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    handleGetAlerts();
  }, []);

  async function removeAlertFromCache(alertId: number) {
    const cache = await caches.open("alerts");
    const requests = await cache.keys();

    for (const request of requests) {
      const response = await cache.match(request);
      if (!response) continue;

      const alert = await response.json();
      if (alert.AlertId === alertId) {
        await cache.delete(request);
        console.log(`Alert with AlertId ${alertId} deleted from cache`);
        return;
      }
    }
  }

  async function handleMarkAsRead(alertId: number) {
    try {
      const res: any = await alertMarkAsReadApi(alertId);

      if (!res.data.success) {
        toggleMessageModal(res.data.message);
        return;
      }

      const addToReadAlers = alerts.find(
        (alert: Alert) => alert.alertId === alertId
      )!;
      const filteredAlerts = alerts?.filter(
        (alert: Alert) => alert.alertId !== alertId
      );
      setReadAlerts([...readAlerts, addToReadAlers]);
      setAlerts(filteredAlerts);
      removeAlertFromCache(alertId);
    } catch (error) {
      console.log("error reading the alert", error);
    }
  }

  async function handleAlertDelete(alertId: number) {
    try {
      const res: any = await alertRemoveApi(alertId);

      if (!res.data.success) {
        toggleMessageModal(res.data.message);
        return;
      }

      const filteredAlerts = alerts.filter(
        (alert: Alert) => alert.alertId !== alertId
      );

      const filteredReadAlerts = readAlerts.filter(
        (alert: Alert) => alert.alertId !== alertId
      );

      setAlerts(filteredAlerts);
      setReadAlerts(filteredReadAlerts);
      removeAlertFromCache(alertId);
    } catch (error) {
      console.log("error reading the alert", error);
    }
  }

  return (
    <section className={s.wrapper}>
      <h3>Current Alerts</h3>
      <header>
        <button
          className={s.configure_btn}
          onClick={() => navigate("configure")}
        >
          CONFIGURE
        </button>
      </header>
      <UnreadAlerts
        alerts={alerts}
        handleAlertDelete={handleAlertDelete}
        handleMarkAsRead={handleMarkAsRead}
        s={s}
      ></UnreadAlerts>
      <ReadAlerts
        alerts={readAlerts}
        handleAlertDelete={handleAlertDelete}
        s={s}
      />
    </section>
  );
}

export default CurrentAlertsTable;
