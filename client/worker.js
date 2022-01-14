console.log('service worker loaded...');

self.addEventListener('push', (e) => {
  const data = e.data.json();
  console.log('push received...');
  self.registration.showNotification(data.title, {
    body: 'Notified by me',
    icon: 'https://developers.google.com/web/images/web-fundamentals-icon192x192.png',
  });
});
