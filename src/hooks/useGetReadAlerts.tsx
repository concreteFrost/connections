import { AxiosResponse } from "axios";
import { getAlertsApi } from "api/ehd";
import { Alert } from "shared/interfaces/IAlerts";

export const getReadAlerts = async (
  unreadAlerts: Alert[]
): Promise<Alert[]> => {
  try {
    const res: AxiosResponse = await getAlertsApi(false);
    const allAlerts: Alert[] = res.data;

    const unreadIds = new Set(unreadAlerts.map((alert) => alert.alertId));
    return allAlerts.filter((alert) => !unreadIds.has(alert.alertId));
  } catch (e) {
    console.error(e);
    throw e; // или верните пустой массив, если предпочтительно
  }
};
