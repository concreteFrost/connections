import { useEffect, useState } from "react";
import useStore from "../../store/store";
import { getAccessToken } from "../../store/actions/storageActions";
import { ISubscription } from "../../store/interfaces/INotification";

export function PushTest() {
  const { getVapidKeys } = useStore((state) => state.securitySlice);
  const {enableClientNotification} = useStore((state)=>state.notificationSlice);

  const registerServiceWorker = async (vapidKeys: any) : Promise<ISubscription | null> => {
    try {
      const sw = await navigator.serviceWorker.register("/sw.js");
      console.log('Service Worker registereds');

      const registration = await navigator.serviceWorker.ready;

      // Check for existing subscription
      const existingSubscription = await registration.pushManager.getSubscription();
      if (existingSubscription) {
        await existingSubscription.unsubscribe();
      }
      // Subscribe with the new applicationServerKey
      const newSubscription :any = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidKeys.publicKey,
      });

      const parsedSubscription : ISubscription = JSON.parse(JSON.stringify(newSubscription, null, 2));
      return parsedSubscription;
    } catch (error) {
      console.error('Error registering service worker:', error);
      return null;
    }
  };

  const handleNotificationsRegistertation = async () => {
    try {
      const res: any = await getVapidKeys();
      const vapidKeys:any = res.data;
      const subscription : ISubscription|null = await registerServiceWorker(vapidKeys);
      if(subscription){
        await enableClientNotification(subscription)
      }
      
    } catch (e) {
      console.log('Error getting vapid keys', e);
    }
  };

  useEffect(() => {

    if (getAccessToken().is_logged_in === "true") {
      handleNotificationsRegistertation();
    }
  }, [getAccessToken().is_logged_in]);

  // No JSX to render
  return null;
}

export default PushTest;
