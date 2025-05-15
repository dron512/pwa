import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';

precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst()
);

// self.addEventListener('push', (event) => {
//   const data = event.data.json();
//   event.waitUntil(
//     self.registration.showNotification(data.title, {
//       body: data.body,
//       icon: '/pwa-192x192.png',
//     })
//   );
// });

self.addEventListener('push', (event) => {
  const data = event.data?.json() || {
    title: '기본 제목',
    body: '기본 내용',
    url: '/'
  }

  const options = {
    body: data.body,
      icon: '/pwa-192x192.png',
    data: {
      url: data.url // 나중에 클릭 시 이동할 경로
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  )
})


self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  const targetUrl = event.notification.data?.url || '/'

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // 이미 열린 창이 있는 경우 focus
      for (const client of clientList) {
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus()
        }
      }
      // 새 창 열기
      if (clients.openWindow) {
        return clients.openWindow(targetUrl)
      }
    })
  )
})

