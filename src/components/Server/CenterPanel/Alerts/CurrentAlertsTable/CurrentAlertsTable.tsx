import { useEffect, useState } from "react";
import s from "./CurrentAlertsTable.module.scss";
import { useNavigate } from "react-router";
import { getAlertsApi, alertMarkAsReadApi, alertRemoveApi } from "api/ehd";
import { Alert } from "store/interfaces/IAlerts";
import useStore from "store/store";
import UnreadAlerts from "./UnreadAlerts/UnreadAlerts";
import ReadAlerts from "./ReadAlerts/ReadAlerts";
import { removeAlertFromCache, getReadAlerts } from "utils/alerts/alertUtils";

function CurrentAlertsTable() {
  const navigate = useNavigate();

  const { unreadAlerts, setUnreadAlerts } = useStore(
    (state) => state.alertSlice
  );
  const [readAlerts, setReadAlerts] = useState<Array<Alert>>([]);
  const { toggleMessageModal } = useStore((state) => state.modalWindowsSlice);

  useEffect(() => {
    const handleGetAlerts = async () => {
      try {
        const res = await getReadAlerts(unreadAlerts);
        if (res !== undefined) {
          setReadAlerts(res);
        }
      } catch (e) {
        console.log(e);
      }
    };

    handleGetAlerts();
  }, []);

  async function handleMarkAsRead(alertId: number) {
    try {
      const res: any = await alertMarkAsReadApi(alertId);

      if (!res.data.success) {
        toggleMessageModal(res.data.message);
        return;
      }

      const addToReadAlers = unreadAlerts.find(
        (alert: Alert) => alert.alertId === alertId
      )!;
      const filteredAlerts = unreadAlerts?.filter(
        (alert: Alert) => alert.alertId !== alertId
      );
      setReadAlerts([...readAlerts, addToReadAlers]);
      setUnreadAlerts(filteredAlerts);
      removeAlertFromCache(alertId);
    } catch (error) {
      console.log("error reading the alert", error);
    }
  }

  async function handleDeleteUnreadAlert(alertId: number) {
    try {
      const res: any = await alertRemoveApi(alertId);

      if (!res.data.success) {
        toggleMessageModal(res.data.message);
        return;
      }

      const filtered = unreadAlerts.filter((a: Alert) => a.alertId != alertId);
      removeAlertFromCache(alertId);
      setUnreadAlerts(filtered);
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

      const filtered = readAlerts.filter((a: Alert) => a.alertId != alertId);
      setReadAlerts(filtered);
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
        alerts={unreadAlerts}
        handleAlertDelete={handleDeleteUnreadAlert}
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
