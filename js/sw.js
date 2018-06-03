/** service worker */

restaurantsCache = 'restaurants-v2';

self.addEventListener('install',function(event) {
  event.waitUntil(
    caches.open(restaurantsCache).then(function(cache){
      const sources = [
        '/',
        '/favicon.ico',
        '/restaurant.html',
        '/restaurant.html?id=1',
        '/restaurant.html?id=2',
        '/restaurant.html?id=3',
        '/restaurant.html?id=4',
        '/restaurant.html?id=5',
        '/restaurant.html?id=6',
        '/restaurant.html?id=7',
        '/restaurant.html?id=8',
        '/restaurant.html?id=9',
        '/restaurant.html?id=10',               
        'index.html',
        '/css/styles.css',
        '/data/resturants.json',
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
      return cache.addAll(sources);
    })
  );
});

self.addEventListener('fetch', function (event) {
    console.log(event.request);
    event.respondWith(
      caches.match(event.request).then(function (response){
        if (response) return response;
        return fetch(event.request);
      })
    );
});


self.addEventListener('activate',function (event){
  event.waitUntil(
    caches.keys().then(function(cacheNames){
      return Promise.all(
        cacheNames.filter(function (cacheNames){
          return cacheNames.startsWith('restaurant-v') && cacheNames != restaurantsCache;
        }).map(function (cacheNames){
          return caches.delete(catchName);
        })
      )
    })
  );
});