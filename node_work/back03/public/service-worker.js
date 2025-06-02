const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/app.js',
  '/manifest.json',
  '/icons/*',
];

// 설치 단계: 캐시 저장
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        urlsToCache.map(url =>
          fetch(url).then(response => {
            if (!response.ok) throw new Error(`Request failed: ${url}`);
            return cache.put(url, response);
          }).catch(err => {
            console.warn(`캐시 실패: ${url}`, err);
          })
        )
      );
    })
  );
});


// 요청 가로채기
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// 푸시 알림 수신
self.addEventListener('push', function (event) {
  const data = event.data ? event.data.json() : {};

  const title = data.title || '알림 도착!';
  const options = {
    body: data.body || '내용이 없습니다.',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-192x192.png',
    data: {
      url: data.url || '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// 클릭 시 이벤트 처리
self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  const url = event.notification.data.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      // 이미 열려있는 탭이 있으면 포커스
      for (let client of windowClients) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }

      // 아니면 새 창 열기
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

