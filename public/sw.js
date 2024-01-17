const eventData = event.data.json();

if (Array.isArray(eventData) && eventData.length > 0) {
  event.waitUntil(
    Promise.all([
      caches.open('notifications').then(function (cache) {
        return Promise.all(
          eventData.map(function (notification, index) {
            const key = Date.now() + index;
            const response = new Response(JSON.stringify(notification));
            return cache.put(key, response);
          })
        );
      }),
      self.registration.showNotification('Connections', { body: `You have ${eventData.length} notifications` }),
    ])
  );
}
