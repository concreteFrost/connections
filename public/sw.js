
self.addEventListener('push', function (event) {
  const eventData = event.data.json();
  const message = eventData.message;
  const options = message

  const cacheKey = 'notification_' + Date.now();

  event.waitUntil(
    caches.open('notifications').then(function (cache) {
      const response = new Response(JSON.stringify(options));
      return cache.put(cacheKey, response);
    })
  );

  event.waitUntil(
    self.registration.showNotification('Connections', options)
  );
});


