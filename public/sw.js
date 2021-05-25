self.addEventListener('install', async event => {
    console.log('install event')
});
  
self.addEventListener('fetch', async event => {
    console.log('fetch event')
});

const cacheName = 'pwa-workit';
const staticAssets = [
  './',
  './app.js'
];

self.addEventListener('install', async event => {
    const cache = await caches.open(cacheName); 
    await cache.addAll(staticAssets); 
    console.log("YOOO WHAT")
});

self.addEventListener('fetch', event => {
    const req = event.request;
    event.respondWith(cacheFirst(req));
    console.log("YOYOYOYOY");
});

self.addEventListener('fetch', event => {
    const req = event.request;
    event.respondWith(cacheFirst(req));
});

async function cacheFirst(req) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(req);
    return cachedResponse || networkFirst(req);
}

self.addEventListener('fetch', event => {
    const req = event.request;
    if(!(req.url.indexOf('http') === 0)){
        
    }
    else if (/.*(json)$/.test(req.url)) {
        event.respondWith(networkFirst(req));
    } else {
        event.respondWith(cacheFirst(req));
    }
});



async function networkFirst(req) {
    const cache = await caches.open(cacheName);
    try { 
      const fresh = await fetch(req);
      cache.put(req, fresh.clone());
      return fresh;
    } catch (e) { 
        const cachedResponse = await cache.match(req);
        return cachedResponse;
    }
}