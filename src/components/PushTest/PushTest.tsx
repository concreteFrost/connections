import { useEffect } from "react";
import useStore from "../../store/store";
import { getAccessToken } from "../../store/actions/storageActions";
import { ISubscription } from "../../store/interfaces/INotification";

export function PushTest() {
  const { getVapidKeys } = useStore((state) => state.securitySlice);
  const { enableClientNotification } = useStore((state) => state.notificationSlice);
  const {enablieClientAlerts} = useStore((state)=>state.alertSlice);
  const {isLoggedIn} = useStore((state)=>state.userSlice);

  const registerServiceWorker = async (vapidKeys: any): Promise<ISubscription | null> => {
    try {
      if ("serviceWorker" in navigator) {
        const sw = await navigator.serviceWorker.register("/sw.js")
        // console.log('Service worker registered', sw)
        const registration = await navigator.serviceWorker.ready;
        // Check for existing subscription
        const existingSubscription = await registration.pushManager.getSubscription();

        if (existingSubscription) {
          console.log('already subscribed');
          return null;
        }
        // Subscribe with the new applicationServerKey
        const newSubscription: any = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: vapidKeys.publicKey,
        });

        const parsedSubscription: ISubscription = JSON.parse(JSON.stringify(newSubscription, null, 2));

        return parsedSubscription;
      }
      else {
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
      const res: any = await getVapidKeys();
      const vapidKeys: any = res.data;
      
      const subscription: any | null = await registerServiceWorker(vapidKeys);
    
      if (subscription) {
      
        console.log('enabling notifications and alerts');
        const formatedSubscription : ISubscription= {
          endpoint: subscription.endpoint,
          p256dh: subscription.keys.p256dh,
          auth: subscription.keys.auth
        }
        await enableClientNotification(formatedSubscription);
        await enablieClientAlerts(formatedSubscription);
      }
    } catch (e) {
      console.log("Error getting vapid keys", e);
    }
  };

  useEffect(() => {

    const fetchData = async () => {
      try {
        if (isLoggedIn) {
          await handleNotificationsRegistration();
        }
      } catch (error) {
        console.error("Error in useEffect:", error);
      }
    };

    fetchData();
  }, [isLoggedIn]);

  // No JSX to render
  return null;
}

export default PushTest;
