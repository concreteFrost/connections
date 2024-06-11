import { useEffect, useState } from "react";
import s from "./CurrentAlertsTable.module.scss";
import { useNavigate } from "react-router";
import {
  getAlertsApi,
  alertMarkAsReadApi,
  alertRemoveApi,
} from "../../../../../api/ehd";
import { Alert } from "../../../../../store/interfaces/IAlerts";
import useStore from "../../../../../store/store";
import { response } from "express";

function CurrentAlertsTable() {
  const navigate = useNavigate();

  const [alerts, setAlerts] = useState<Array<Alert>>();
  const { toggleMessageModal } = useStore((state) => state.modalWindowsSlice);

  useEffect(() => {
    getAlertsApi(true).then((res: any) => {
      setAlerts(res.data);
    });
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

      const filteredAlerts = alerts?.filter(
        (alert: Alert) => alert.alertId !== alertId
      );

      if (filteredAlerts) {
        setAlerts(filteredAlerts);
        removeAlertFromCache(alertId);
      }
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

      const filteredAlerts = alerts?.filter(
        (alert: Alert) => alert.alertId !== alertId
      );

      if (filteredAlerts) {
        setAlerts(filteredAlerts);
        removeAlertFromCache(alertId);
      }
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
      <main>
        <table>
          <thead>
            <tr>
              <th colSpan={4}>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {alerts && alerts?.length > 0 ? (
              alerts?.map((element: Alert) => (
                <tr key={alerts.indexOf(element)}>
                  <td colSpan={4}>{element.messageText}</td>
                  <td>
                    <div className={s.actions_btn_wrapper}>
                      <button
                        className={s.read_btn}
                        onClick={() => handleMarkAsRead(element.alertId)}
                      >
                        READ
                      </button>
                      <button
                        className={s.delete_btn}
                        onClick={() => handleAlertDelete(element.alertId)}
                      >
                        DELETE
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>-</td>

                <td></td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </section>
  );
}

export default CurrentAlertsTable;
