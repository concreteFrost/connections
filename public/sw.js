self.addEventListener("push", function (event) {
  const eventData = event.data.json();

  if (eventData.hasOwnProperty("FlowId")) {
    const key = new Date().toISOString();
    const response = new Response(JSON.stringify(eventData));
    event.waitUntil(
      caches.open("status").then((cache) => cache.put(key, response))
    );
  }

  if (eventData.hasOwnProperty("RegistrationId")) {
    const key = new Date().toISOString();
    const response = new Response(JSON.stringify(eventData));
    event.waitUntil(
      caches.open("registration").then((cache) => cache.put(key, response))
    );
  }

  if (eventData.length > 0) {
    const notifications = eventData.filter((data) =>
      data.hasOwnProperty("NotificationId")
    );
    const alerts = eventData.filter((data) => data.hasOwnProperty("AlertId"));
    const metrics = eventData.filter((data) =>
      data.hasOwnProperty("AlertsRaised")
    );

    if (notifications.length > 0) {
      event.waitUntil(pushToCache("notifications", notifications));
    }

    if (alerts.length > 0) {
      event.waitUntil(pushToCache("alerts", alerts));
    }

    if (metrics.length > 0) {
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({
            type: "metrics",
            metrics,
          });
        });
      });
      return;
    }

    event.waitUntil(
      self.registration.showNotification("Connections", {
        body: `You have ${eventData.length} notifications`,
      })
    );
  }
});

function pushToCache(typeOfCache, itterativeObject) {
  return caches.open(typeOfCache).then(function (cache) {
    return Promise.all(
      itterativeObject.map(function (element, index) {
        const key = new Date().toISOString();
        const response = new Response(JSON.stringify(element));
        return cache.put(key, response);
      })
    );
  });
}
