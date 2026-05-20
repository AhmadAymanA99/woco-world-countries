const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');
const path = require('path');

const initPromise = i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar'],
    preload: ['en', 'ar'],
    backend: {
      loadPath: path.join(__dirname, '..', 'locales', '{{lng}}', 'translation.json'),
    },
    detection: {
      order: ['querystring', 'header'],
      lookupQuerystring: 'lang',
      caches: false,
    },
  });

initPromise.catch(err => console.error('i18n async init failed:', err.message));

module.exports = i18next;
module.exports.initPromise = initPromise;
