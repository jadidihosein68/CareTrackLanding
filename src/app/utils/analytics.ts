const GA_MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID ?? '').trim();

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __caretrackGaInit?: boolean;
  }
}

const gtagLoaded = () => typeof window !== 'undefined' && typeof window.gtag === 'function';

export const isAnalyticsEnabled = GA_MEASUREMENT_ID.length > 0;

export const initializeAnalytics = () => {
  if (!isAnalyticsEnabled || typeof window === 'undefined') {
    return;
  }

  if (!window.__caretrackGaInit) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: false,
      anonymize_ip: true,
    });
    window.__caretrackGaInit = true;
  }
};

export const trackPageView = (pagePath: string) => {
  if (!isAnalyticsEnabled || typeof window === 'undefined' || !gtagLoaded()) {
    return;
  }

  window.gtag?.('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: pagePath,
    send_to: GA_MEASUREMENT_ID,
  });
};
