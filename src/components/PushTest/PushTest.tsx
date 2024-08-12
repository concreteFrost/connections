import { useEffect } from "react";
import { Subscription } from "../../store/interfaces/INotification";
import { enableClientNotificationsAPI } from "api/notification";
import { getVapidKeysAPI } from "api/security";
import { enableClientFlowStatusAPI } from "api/data";
import { enabliClientAlertsApi } from "api/ehd";

export function PushTest() {

  const registerServiceWorker = async (
    vapidKeys: any
  ): Promise<Subscription | null> => {
    try {
      if ("serviceWorker" in navigator) {
        await navigator.serviceWorker.register("/sw.js");
        // console.log('Service worker registered', sw)
        const registration = await navigator.serviceWorker.ready;
        // Check for existing subscription
        const existingSubscription =
          await registration.pushManager.getSubscription();

        if (existingSubscription) {
          console.log("already subscribed");
          return null;
        }
        // Subscribe with the new applicationServerKey
        const newSubscription: any = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: vapidKeys.publicKey,
        });

        const parsedSubscription: Subscription = JSON.parse(
          JSON.stringify(newSubscription, null, 2)
        );

        return parsedSubscription;
      } else {
        console.error("Service Worker not supported");
        return null;
      }
    } catch (error) {
      console.error("Error registering service worker:", error);
      return null;
    }
  };

  const handleNotificationsRegistration = async () => {
    try {
      const res: any = await getVapidKeysAPI();
      const vapidKeys: any = res.data;

      const subscription: any | null = await registerServiceWorker(vapidKeys);

      if (subscription) {
        console.log('enabling notifications')
        console.log(subscription)
        const formatedSubscription: Subscription = {
          endpoint: subscription.endpoint,
          p256dh: subscription.keys.p256dh,
          auth: subscription.keys.auth,
        };

        await enableClientNotificationsAPI(formatedSubscription);
        await enabliClientAlertsApi(formatedSubscription);
        await enableClientFlowStatusAPI(formatedSubscription);
      }
    } catch (e) {
      console.log("Error getting vapid keys", e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await handleNotificationsRegistration();
      } catch (error) {
        console.error("error in handling notifications registration:", error);
      }
    };
    fetchData();
  }, []);

  // No JSX to render
  return null;
}

export default PushTest;
