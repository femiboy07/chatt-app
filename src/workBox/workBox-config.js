module.exports = {
     "globDirectory": "build/",
     "globPatterns": [
       "**/*.{json,ico,html,js,css}"
     ],
     "swSrc": "src/service-worker.js",
     "swDest": "build/service-worker.js",
     "maximumFileSizeToCacheInBytes": 5000000
};