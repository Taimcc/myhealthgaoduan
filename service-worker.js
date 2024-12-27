const CACHE_NAME = 'fitness-app-cache-v1';  
const urlsToCache = [  
  './index.html',  
  './style.css', // 如果有样式文件  
  './script.js', // 如果有其他脚本文件  
  './icon-192x192.png',  
  './icon-512x512.png'  
];  

// 安装服务工作者并缓存文件  
self.addEventListener('install', (event) => {  
  event.waitUntil(  
    caches.open(CACHE_NAME)  
      .then((cache) => {  
        return cache.addAll(urlsToCache);  
      })  
  );  
});  

// 拦截网络请求并返回缓存的文件  
self.addEventListener('fetch', (event) => {  
  event.respondWith(  
    caches.match(event.request)  
      .then((response) => {  
        return response || fetch(event.request);  
      })  
  );  
});  

// 更新缓存  
self.addEventListener('activate', (event) => {  
  const cacheWhitelist = [CACHE_NAME];  
  event.waitUntil(  
    caches.keys().then((cacheNames) => {  
      return Promise.all(  
        cacheNames.map((cacheName) => {  
          if (cacheWhitelist.indexOf(cacheName) === -1) {  
            return caches.delete(cacheName);  
          }  
        })  
      );  
    })  
  );  
});