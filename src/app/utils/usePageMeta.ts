import { useEffect } from 'react';
import { DEFAULT_OG_IMAGE_ALT, DEFAULT_OG_IMAGE_PATH, toAbsoluteUrl } from './seo';

type PageMeta = {
  title: string;
  description: string;
  path?: string;
  type?: 'website' | 'article';
  image?: string;
  imageAlt?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  robots?: string;
  noindex?: boolean;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
};

const ensureMetaTag = (attrName: 'name' | 'property', attrValue: string) => {
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  return element as HTMLMetaElement;
};

const ensureLinkTag = (relValue: string) => {
  let element = document.querySelector(`link[rel="${relValue}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', relValue);
    document.head.appendChild(element);
  }
  return element as HTMLLinkElement;
};

const normalizePath = (path: string) => {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return normalized === '/' ? normalized : normalized.replace(/\/+$/, '');
};

const resolveCanonicalUrl = (path?: string) => {
  if (path) {
    return toAbsoluteUrl(normalizePath(path));
  }
  const pathname = normalizePath(window.location.pathname || '/');
  return toAbsoluteUrl(pathname);
};

const clearStructuredDataScripts = () => {
  document
    .querySelectorAll('script[data-caretrack-jsonld="true"]')
    .forEach((node) => node.remove());
};

const appendStructuredData = (items: Record<string, unknown>[]) => {
  items.forEach((item) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.caretrackJsonld = 'true';
    script.text = JSON.stringify(item);
    document.head.appendChild(script);
  });
};

export function usePageMeta({
  title,
  description,
  path,
  type = 'website',
  image = DEFAULT_OG_IMAGE_PATH,
  imageAlt = DEFAULT_OG_IMAGE_ALT,
  ogTitle,
  ogDescription,
  twitterTitle,
  twitterDescription,
  robots,
  noindex = false,
  structuredData,
}: PageMeta) {
  const structuredDataKey = structuredData ? JSON.stringify(structuredData) : '';

  useEffect(() => {
    const url = resolveCanonicalUrl(path);
    const imageUrl = toAbsoluteUrl(image);
    const resolvedRobots = robots ?? (noindex ? 'noindex, nofollow' : 'index, follow');
    const resolvedOgTitle = ogTitle ?? title;
    const resolvedOgDescription = ogDescription ?? description;
    const resolvedTwitterTitle = twitterTitle ?? resolvedOgTitle;
    const resolvedTwitterDescription = twitterDescription ?? resolvedOgDescription;

    document.title = title;
    ensureMetaTag('name', 'description').setAttribute('content', description);
    ensureMetaTag('name', 'robots').setAttribute('content', resolvedRobots);
    ensureMetaTag('name', 'twitter:card').setAttribute('content', 'summary_large_image');
    ensureMetaTag('property', 'og:title').setAttribute('content', resolvedOgTitle);
    ensureMetaTag('property', 'og:description').setAttribute('content', resolvedOgDescription);
    ensureMetaTag('property', 'og:url').setAttribute('content', url);
    ensureMetaTag('property', 'og:type').setAttribute('content', type);
    ensureMetaTag('property', 'og:image').setAttribute('content', imageUrl);
    ensureMetaTag('property', 'og:image:alt').setAttribute('content', imageAlt);
    ensureMetaTag('name', 'twitter:title').setAttribute('content', resolvedTwitterTitle);
    ensureMetaTag('name', 'twitter:description').setAttribute('content', resolvedTwitterDescription);
    ensureMetaTag('name', 'twitter:url').setAttribute('content', url);
    ensureMetaTag('name', 'twitter:image').setAttribute('content', imageUrl);
    ensureMetaTag('name', 'twitter:image:alt').setAttribute('content', imageAlt);
    ensureLinkTag('canonical').setAttribute('href', url);

    clearStructuredDataScripts();
    if (structuredData) {
      const payload = Array.isArray(structuredData) ? structuredData : [structuredData];
      appendStructuredData(payload);
    }
  }, [
    title,
    description,
    path,
    type,
    image,
    imageAlt,
    ogTitle,
    ogDescription,
    twitterTitle,
    twitterDescription,
    robots,
    noindex,
    structuredDataKey,
  ]);
}
