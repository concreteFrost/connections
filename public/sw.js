self.addEventListener('push', function (event) {
  const eventData = event.data.json();

  if (eventData.length > 0) {
    console.log("new event data", eventData)

    const notifications = eventData.filter((data) => data.hasOwnProperty("NotificationId"));
    const alerts = eventData.filter((data) => data.hasOwnProperty("AlertId"));
    const status = eventData.filter((data)=> data.hasOwnProperty("FlowId"));

    if (notifications.length > 0) {
      event.waitUntil(pushToCache("notifications", notifications));
    }

    if (alerts.length > 0) {
      event.waitUntil(pushToCache("alerts", alerts));
    }

    if(status.length > 0){
      event.waitUntil(pushToCache("status",status));
    }

    event.waitUntil(
      self.registration.showNotification('Connections', { body: `You have ${eventData.length} notifications` })
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
