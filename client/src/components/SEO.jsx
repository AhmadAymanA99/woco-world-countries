import { useEffect } from 'react';

export const SEO = ({
  title = 'WoCo - World Countries',
  description = 'Discover detailed information about every country in the world. Track your travels, explore cultures, learn about population, GDP, landmarks, and traditions.',
  image = '/logo512.png',
  type = 'website',
  url = '/',
  keywords = 'countries, world countries, travel tracker, country information, world map',
  author = 'WoCo Team',
}) => {
  useEffect(() => {
    // Update title
    const fullTitle = title.includes('WoCo') ? title : `${title} | WoCo - World Countries`;
    document.title = fullTitle;

    // Update or create meta tags
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

    const fullUrl = `${process.env.REACT_APP_URL || window.location.origin}${url}`;
    const fullImage = `${process.env.REACT_APP_URL || window.location.origin}${image}`;

    // Update meta tags
    updateMetaTag('title', fullTitle);
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);
    
    // Update Open Graph tags
    updateOGTag('og:type', type);
    updateOGTag('og:url', fullUrl);
    updateOGTag('og:title', fullTitle);
    updateOGTag('og:description', description);
    updateOGTag('og:image', fullImage);
    updateOGTag('og:site_name', 'WoCo - World Countries');
    
    // Update Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:url', fullUrl);
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', fullImage);
  }, [title, description, image, type, url, keywords, author]);

  return null;
};

