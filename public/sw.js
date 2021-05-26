const cacheName = 'pwa-workit';
const staticAssets = [
  './',
  './app.js'
];

self.addEventListener('install', async event => {
    const cache = await caches.open(cacheName); 
    await cache.addAll(staticAssets); 
});

// async function cacheFirst(req) {
//     const cache = await caches.open(cacheName);
//     const cachedResponse = await cache.match(req);
//     return cachedResponse || networkFirst(req);
// }

// self.addEventListener('fetch', event => {
//     const req = event.request;
//     if (/.*(json)$/.test(req.url)) {
//         event.respondWith(networkFirst(req));
//     } else {
//         event.respondWith(cacheFirst(req));
//     }

// });

async function networkFirst(req) {
    const cache = await caches.open(cacheName);
    try { 
        if(!req.url.match("^(http|https)://")) {
            return null;
        } else {
            const fresh = await fetch(req);
            cache.put(req, fresh.clone());
            return fresh;
        }
    } catch (e) { 
        const cachedResponse = await cache.match(req);
        return cachedResponse;
    }
}