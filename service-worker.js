self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('alarm-cache').then((cache) => {
      return cache.addAll([
        './index.html',
        './style.css',
        './favicon.ico',
        './manifest.json',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('push', function(event) {
  const options = {
    body: event.data ? event.data.text() : 'Time to check the charts!',
    icon: './favicon.ico',
    vibrate: [200, 100, 200],
    tag: 'alarm-notification'
  };
  event.waitUntil(
    self.registration.showNotification('Trading Alarm', options)
  );
});