import { useEffect, useState } from "react";

function PushTest() {
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const registerServiceWorker = async () => {
      const sw = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', sw);
    };

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', registerServiceWorker);
    }

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('load', registerServiceWorker);
    };
  }, []);

  const subscribeToPush = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const newSubscription : any = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: 'BMAm0ZdfJ_pa5ec_Q17CAnhPLlE2mXcrv13ZMAVY2EESrT2piQf4Y0FvD5nWU39_Dh1XxytD43J7BYY6DFsk0Jo',
      });

      setSubscription(newSubscription);
      // Send the subscription object to your server for future use
      console.log('Subscription:', JSON.stringify(newSubscription));
    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
    }
  };

  return (
    <div>
      <button onClick={subscribeToPush}>SUBSCRIBE</button>
    </div>
  );
}

export default PushTest;
