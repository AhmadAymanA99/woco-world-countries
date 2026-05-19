import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const SEO = ({
  title,
  description,
  image = '/logo512.png',
  type = 'website',
  url = '/',
  keywords,
  author,
}) => {
  const { t, i18n } = useTranslation();
  const defaultTitle = t('seo.defaultTitle');
  const defaultDescription = t('seo.defaultDescription');
  const defaultKeywords = t('seo.defaultKeywords');
  const defaultAuthor = t('seo.defaultAuthor');
  const siteName = t('seo.siteName');

  const resolvedTitle = title ?? defaultTitle;
  const resolvedDescription = description ?? defaultDescription;
  const resolvedKeywords = keywords ?? defaultKeywords;
  const resolvedAuthor = author ?? defaultAuthor;

  const baseUrl = process.env.REACT_APP_URL || 'https://woco-world-countries.vercel.app';

  useEffect(() => {
    const fullTitle = resolvedTitle.includes('WoCo') ? resolvedTitle : `${resolvedTitle} | ${defaultTitle}`;
    document.title = fullTitle;

    const updateMetaTag = (name, content) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const updateOGTag = (property, content) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const updateLinkTag = (rel, href, extra = {}) => {
      let element = document.querySelector(`link[rel="${rel}"]${extra.hreflang ? `[hreflang="${extra.hreflang}"]` : ''}`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        if (extra.hreflang) element.setAttribute('hreflang', extra.hreflang);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    const removeLinkTag = (rel, hreflang) => {
      const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`;
      const element = document.querySelector(selector);
      if (element) element.remove();
    };

    const fullUrl = `${baseUrl}${url}`;
    const fullImage = image.startsWith('http') ? image : `${baseUrl}${image}`;

    // Title and description
    updateMetaTag('description', resolvedDescription);
    updateMetaTag('keywords', resolvedKeywords);
    updateMetaTag('author', resolvedAuthor);

    // Canonical URL
    removeLinkTag('canonical');
    updateLinkTag('canonical', fullUrl);

    // Hreflang
    removeLinkTag('alternate', 'en');
    removeLinkTag('alternate', 'ar');
    removeLinkTag('alternate', 'x-default');
    updateLinkTag('alternate', `${baseUrl}${url}`, { hreflang: 'en' });
    updateLinkTag('alternate', `${baseUrl}${url}`, { hreflang: 'ar' });
    updateLinkTag('alternate', `${baseUrl}${url}`, { hreflang: 'x-default' });

    // Open Graph
    updateOGTag('og:type', type);
    updateOGTag('og:url', fullUrl);
    updateOGTag('og:title', fullTitle);
    updateOGTag('og:description', resolvedDescription);
    updateOGTag('og:image', fullImage);
    updateOGTag('og:site_name', siteName);
    updateOGTag('og:locale', i18n.language === 'ar' ? 'ar_SA' : 'en_US');

    // Twitter
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:url', fullUrl);
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', resolvedDescription);
    updateMetaTag('twitter:image', fullImage);

    // HTML lang attribute
    document.documentElement.setAttribute('lang', i18n.language === 'ar' ? 'ar' : 'en');
  }, [resolvedTitle, resolvedDescription, image, type, url, resolvedKeywords, resolvedAuthor, defaultTitle, siteName, baseUrl, i18n.language]);

  return null;
};
