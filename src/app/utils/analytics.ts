const DEFAULT_GA_MEASUREMENT_ID = 'G-ZRP6W57X8D';
const GA_MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID ?? DEFAULT_GA_MEASUREMENT_ID).trim();

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __caretrackGaInit?: boolean;
    __caretrackGaBootScheduled?: boolean;
  }
}

const gtagLoaded = () => typeof window !== 'undefined' && typeof window.gtag === 'function';

export const isAnalyticsEnabled = GA_MEASUREMENT_ID.length > 0;

const bootAnalytics = () => {
  if (!isAnalyticsEnabled || typeof window === 'undefined') {
    return;
  }

  if (!window.__caretrackGaInit) {
    const existingScript = document.querySelector(
      `script[src*="googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"]`,
    );

    if (existingScript && typeof window.gtag === 'function') {
      window.__caretrackGaInit = true;
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID);
    window.__caretrackGaInit = true;
  }
};

export const initializeAnalytics = () => {
  if (!isAnalyticsEnabled || typeof window === 'undefined') {
    return;
  }

  if (window.__caretrackGaInit || window.__caretrackGaBootScheduled) {
    return;
  }

  window.__caretrackGaBootScheduled = true;

  const start = () => {
    cleanupListeners();
    bootAnalytics();
  };

  const events: Array<keyof WindowEventMap> = ['pointerdown', 'touchstart', 'keydown', 'scroll'];
  const onInteraction = () => start();

  const cleanupListeners = () => {
    events.forEach((eventName) => {
      window.removeEventListener(eventName, onInteraction);
    });
  };

  events.forEach((eventName) => {
    window.addEventListener(eventName, onInteraction, { once: true, passive: true });
  });

  if ('requestIdleCallback' in window) {
    (window as Window & { requestIdleCallback: (cb: () => void, options?: { timeout: number }) => number })
      .requestIdleCallback(start, { timeout: 2500 });
    return;
  }

  window.setTimeout(start, 2500);
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
