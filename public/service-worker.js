const CACHE_NAME = 'firebase-cache-v1';
const STORAGE_URL = 'https://firebasestorage.googleapis.com';


// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', (event)=>{
     event.waitUntil(
          caches.open(CACHE_NAME).then((cache)=>cache.addAll([
            '/',
            'index.html', // Add other important URLs
            '/service-worker.js', // Ensure the service worker itself is cached
          ]))
     ) 
})


// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method === 'POST') {
    // Skip caching for POST requests
    return;
}
     event.respondWith(
       caches.match(event.request)
         .then((response) => {
           return response || fetch(event.request.clone())
             .then((fetchResponse) => {
               // Cache the fetched images
               if (event.request.url.startsWith(STORAGE_URL)) {
                 return caches.open(CACHE_NAME)
                   .then((cache) => {
                     cache.put(event.request, fetchResponse.clone());
                     return fetchResponse;
                   });
               }
   
               return fetchResponse;
             });
         })
     );
   });

