const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/app.js',
  '/manifest.json',
  '/service-worker.js',
  '/apple-touch-icon.png',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/favicon.ico',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/icons/icon-48x48.png',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-256x256.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png'
];

// 설치 단계: 캐시 저장
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('캐시가 열렸습니다');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('모든 리소스가 캐시되었습니다');
        return self.skipWaiting(); // 새로운 서비스 워커가 즉시 활성화되도록 함
      })
  );
});

// 활성화 단계: 이전 캐시 정리
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('이전 캐시 삭제:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('새로운 서비스 워커가 활성화되었습니다');
      return self.clients.claim(); // 모든 클라이언트를 새로운 서비스 워커의 제어 하에 둠
    })
  );
});

// 요청 가로채기
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // 캐시하지 않을 요청들
  if (
    request.method !== 'GET' || // GET 요청이 아닌 경우
    url.protocol !== 'http:' && url.protocol !== 'https:' || // http/https가 아닌 경우
    url.origin === 'chrome-extension:' || // chrome-extension 스키마
    url.origin === 'chrome:' || // chrome 스키마
    url.origin === 'file:' || // file 스키마
    url.pathname.includes('/.well-known/') || // .well-known 경로
    url.pathname.includes('/devtools/') // devtools 관련 경로
  ) {
    event.respondWith(fetch(request));
    return;
  }

  event.respondWith(
    fetch(request)
      .then(response => {
        // 유효한 응답인지 확인
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // 응답을 복제 (스트림은 한 번만 사용 가능)
        const responseToCache = response.clone();

        // 응답을 캐시에 저장
        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(request, responseToCache);
            console.log('새로운 리소스가 캐시되었습니다:', request.url);
          });

        return response;
      })
      .catch(error => {
        console.log('네트워크 요청 실패, 캐시에서 시도:', request.url);
        // 네트워크 요청 실패 시 캐시에서 시도
        return caches.match(request)
          .then(cachedResponse => {
            if (cachedResponse) {
              console.log('캐시에서 응답:', request.url);
              return cachedResponse;
            }
            console.error('캐시에도 없음:', request.url);
            return new Response('오프라인 상태입니다');
          });
      })
  );
});

// 푸시 알림 이벤트 처리
self.addEventListener('push', function(event) {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: '알림', body: event.data.text() };
    }
  }
  const title = data.title || '알림';
  const options = {
    body: data.body || '',
    icon: '/android-chrome-192x192.png', // 원하는 아이콘 경로로 수정
    badge: '/android-chrome-192x192.png',
    data: {
      url: data.url || '/'
    }
  };
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// 알림 클릭 시 처리
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const url = event.notification.data && event.notification.data.url ? event.notification.data.url : '/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
