export const SITE_URL = 'https://thecaretrack.netlify.app';
export const DEFAULT_OG_IMAGE_PATH = '/og-image.jpg';
export const DEFAULT_OG_IMAGE_ALT =
  'CareTrack app preview for gecko and exotic pet care tracking.';

export const toAbsoluteUrl = (value: string) => new URL(value, SITE_URL).toString();
