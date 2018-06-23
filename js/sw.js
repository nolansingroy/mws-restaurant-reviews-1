var Cache_Name = 'Cache-v2';
var urlsToCache = [
  '/',
  '/restaurant.html',
  '/index.html',
  '/css/styles.css',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '/js/main.js',
  '/js/dbhelper.js',
  '/js/restaurant_info.js'
];
self.addEventListener('install',function(event) {
//installation steps
  event.waitUntil(
    caches.open(Cache_Name).then(function(cache){
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
    console.log(event.request);
    event.respondWith(
      caches.match(event.request).then(function (response){
        if (response){ return response;
        }else {
          console.log('error no response');
        }
        return fetch(event.request);
      })
    );
});

self.addEventListener('activate',function (event){
  event.waitUntil(
    caches.keys().then(function(cacheNames){
      return Promise.all(
        cacheNames.filter(function (cacheName){
          return cacheNames.startsWith('Cache-v2') && cacheName != Cache_Name;
        }).map(function (cacheName){
          console.log('deleting cache');
          return caches.delete(cacheName);
        })
      )
    })
  );
});
