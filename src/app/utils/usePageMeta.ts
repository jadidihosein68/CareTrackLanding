import { useEffect } from 'react';

type PageMeta = {
  title: string;
  description: string;
  path?: string;
};

const SITE_URL = 'https://thecaretrack.netlify.app';

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

export function usePageMeta({ title, description, path }: PageMeta) {
  useEffect(() => {
    const url = path ? new URL(path, SITE_URL).toString() : window.location.href;

    document.title = title;
    ensureMetaTag('name', 'description').setAttribute('content', description);
    ensureMetaTag('property', 'og:title').setAttribute('content', title);
    ensureMetaTag('property', 'og:description').setAttribute('content', description);
    ensureMetaTag('property', 'og:url').setAttribute('content', url);
    ensureMetaTag('name', 'twitter:title').setAttribute('content', title);
    ensureMetaTag('name', 'twitter:description').setAttribute('content', description);
    ensureLinkTag('canonical').setAttribute('href', url);
  }, [title, description, path]);
}
