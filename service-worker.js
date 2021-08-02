let cacheName = 'memcard-v1';
let filesToCache = [
    './',
    './index.html',
    // images
    './img/icons/192x192.png',
    './img/icons/512x512.png',
    './img/next.png',
    './img/ok.png',
    './img/flip.png',
    // audios
    './audio/cancel.mp3',
    './audio/confirm.mp3',
    './audio/page.mp3',
    // views
    './cadcard.html',
    './caddeck.html',
    './card.html',
    './game.html',
    // css
    './font-awesome/css/font-awesome.min.css',
    './css/cadcard.css',
    './css/caddeck.css',
    './css/game.css',
    './css/style.css',
    // controllers
    './controllers/registerServiceWorker.js',
    './controllers/app.js',
    './controllers/cadcard.js',
    './controllers/caddeck.js',
    './controllers/card.js',
    './controllers/game.js',
    './controllers/indexeddb.js',
    './controllers/modal.js'
];

self.addEventListener('install', (e) => {
    console.log( '[ServiceWorker] Installer' );
    // forçando service atualizar
    self.skipWaiting();
    e.waitUntil(
        caches.open(cacheName).then((cache) =>{
            // console.log( '[ServiceWorker] Caching app shell' );
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', (e) => {
    console.log( '[ServiceWorker] Activate' );
    e.waitUntil(
        caches.keys().then((keyList) =>{  
            return Promise.all(keyList.map((key) => {
                console.log( '[ServiceWorker] Old cache', key );
                console.log( '[ServiceWorker] New cache', cacheName );
                if (key !== cacheName) {
                    console.log( '[ServiceWorker] Removing old cache', key );
                    return caches.delete(key);
                }
            }));
        })
    );
});


self.addEventListener('fetch', (e) => {
    // console.log( '[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then((response) =>{
            return response || fetch(e.request);
        })
    );
});