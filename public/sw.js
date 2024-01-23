self.addEventListener('push', function (event) {

  const eventData = event.data.json();
  
  if (eventData.length > 0) {

    event.waitUntil(
      caches.open('notifications').then(function (cache) {
        // Итерируем по массиву объектов и добавляем каждый объект в кэш
        return Promise.all(
          eventData.map(function (notification, index) {
            const key = Date.now() + index; // Используйте уникальный ключ для каждого уведомления
            const response = new Response(JSON.stringify(notification));
            return cache.put(key, response);
          })
        );
      })
    );

    event.waitUntil(
      self.registration.showNotification('Connections', { body: `You have ${eventData.length} notifications` })
    );
  }
});
