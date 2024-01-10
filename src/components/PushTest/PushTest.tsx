import { useEffect } from "react";

function PushTest() {
  useEffect(() => {
    const registerServiceWorker = async () => {
      const sw = await navigator.serviceWorker.register('/notifications/sw.js');
      console.log('Service Worker registered:', sw);
    };

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', registerServiceWorker);
      console.log('service worker is in nav')
    }
    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('load', registerServiceWorker);
    };
  }, []);

  const subscribeToPush = async () => {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: 'BMAm0ZdfJ_pa5ec_Q17CAnhPLlE2mXcrv13ZMAVY2EESrT2piQf4Y0FvD5nWU39_Dh1XxytD43J7BYY6DFsk0Jo', // Replace with your actual public key
    });
    // Send the subscription object to your server for future use
    console.log('Subscription:', JSON.stringify(subscription));

  };

  return (
    <div>
      <button onClick={subscribeToPush}>SUBSCRIBE</button>
    </div>
  );
}

export default PushTest;
