import { AxiosResponse } from "axios";
import { getAlertsApi } from "api/ehd";
import { Alert } from "shared/interfaces/IAlerts";

export async function removeAlertFromCache(alertId: number) {
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
