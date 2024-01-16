self.addEventListener('push', function (event) {
  // Parse the JSON data received in the push event
  const eventData = event.data.json();

  // Extract the "message" property from the parsed data
  const message = eventData.message;

  // Set up the options for the notification
  const options = {
    body: message,
  };

  // Show the notification
  event.waitUntil(
    self.registration.showNotification('Connections', options)
  );
});
