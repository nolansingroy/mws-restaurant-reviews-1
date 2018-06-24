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

self.addEventListener('install',function (event) {
//installation steps
  event.waitUntil(
    caches.open(Cache_Name).then(function (cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
console.log(event.request.url);
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
/*
// fetching data from cache
self.addEventListener('fetch', function (event) {
	event.respondWith(caches.match(event.request).then(function (response) {
		if (response !== undefined) {
			return response;
		} else {
			return fetch(event.request).then(function (response) {
				var responseClone = response.clone();
				caches.open(Cache_Name).then(function (cache) {
					cache.put(event.request, responseClone);
				});
				return response;
			});
		}
	}));
});
*/
/*
//Activate SW
self.addEventListener('activate', function (event) {
	event.waitUntil(
		caches.keys().then(function (keys) {
			return Promise.all(keys.map(function (key, i) {
				if (key !== Cache_Name) {
					return caches.delete(keys[i]);
				}
			}));
		})
	);
});
*/
