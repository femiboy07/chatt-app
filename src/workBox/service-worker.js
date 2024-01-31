import workBoxConfig from "./workBox-config";
import workbox from 'workbox-window'



const CACHE_NAME = 'v0/b/chatt-app-1c551.appspot.com/o';
const STORAGE_URL = 'https://firebasestorage.googleapis.com';

// if (workBoxConfig) {
//   console.log('Workbox is loaded');

//   // Cache images with a cache-first strategy
//   workBoxConfig.routing.registerRoute(
//     /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
//     new workBoxConfig.strategies.CacheFirst({
//       cacheName: 'images',
//       plugins: [
//         new workBoxConfig.expiration.ExpirationPlugin({
//           maxEntries: 60,
//           maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
//         }),
//       ],
//     })
//   );
// } else {
//   console.log('Workbox did not load');
// }

// eslint-disable-next-line no-restricted-globals
// self.addEventListener('install', (event)=>{
//      event.waitUntill(
//           caches.open(CACHE_NAME).then((cache)=>cache.addAll([
//             '/',
//             '../../public/index.html', // Add other important URLs
//             './service-worker.js', // Ensure the service worker itself is cached
//           ]))
//      ) 
// })


// // eslint-disable-next-line no-restricted-globals
// self.addEventListener('fetch', (event) => {
//      event.respondWith(
//        caches.match(event.request)
//          .then((response) => {
//            return response || fetch(event.request)
//              .then((fetchResponse) => {
//                // Cache the fetched images
//                if (event.request.url.startsWith(STORAGE_URL)) {
//                  return caches.open(CACHE_NAME)
//                    .then((cache) => {
//                      cache.put(event.request, fetchResponse.clone());
//                      return fetchResponse;
//                    });
//                }
   
//                return fetchResponse;
//              });
//          })
//      );
//    });


// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', (event) => {
     console.log('Service Worker installed');
   });
   
   // eslint-disable-next-line no-restricted-globals
   self.addEventListener('activate', (event) => {
     console.log('Service Worker activated');
   });