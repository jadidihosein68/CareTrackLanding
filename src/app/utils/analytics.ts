const GA_MEASUREMENT_ID = 'G-ZRP6W57X8D';

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

  window.dataLayer = window.dataLayer || [];
  window.__caretrackGaInit = gtagLoaded();
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

type AnalyticsEventParams = Record<string, string | number | boolean>;

export const trackEvent = (
  eventName: string,
  params: AnalyticsEventParams = {},
) => {
  if (!isAnalyticsEnabled || typeof window === 'undefined' || !gtagLoaded()) {
    return;
  }

  window.gtag?.('event', eventName, {
    ...params,
    send_to: GA_MEASUREMENT_ID,
  });
};
