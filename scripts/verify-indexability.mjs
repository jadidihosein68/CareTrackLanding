import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SITE_URL = 'https://thecaretracks.com';
const DIST_DIR = resolve('dist');
const SITEMAP_PATH = resolve('public/sitemap.xml');

const sitemapXml = readFileSync(SITEMAP_PATH, 'utf8');
const locMatches = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1].trim());

const toCanonicalPath = (pathname) => {
  if (pathname === '/') return '/';
  return pathname.replace(/\/+$/, '');
};

const toDistFilePath = (canonicalPath) => {
  if (canonicalPath === '/') {
    return resolve(DIST_DIR, 'index.html');
  }

  return resolve(DIST_DIR, canonicalPath.replace(/^\//, ''), 'index.html');
};

const extractFirst = (html, regex) => {
  const match = html.match(regex);
  return match?.[1]?.trim() ?? '';
};

const errors = [];
const warnings = [];

for (const loc of locMatches) {
  const parsed = new URL(loc);
  if (`${parsed.protocol}//${parsed.host}` !== SITE_URL) {
    errors.push(`Sitemap URL is not on canonical host: ${loc}`);
    continue;
  }

  const canonicalPath = toCanonicalPath(parsed.pathname);
  const canonicalUrl = canonicalPath === '/' ? `${SITE_URL}/` : `${SITE_URL}${canonicalPath}`;
  const filePath = toDistFilePath(canonicalPath);

  if (!existsSync(filePath)) {
    errors.push(`Missing prerendered file for ${canonicalUrl}: ${filePath}`);
    continue;
  }

  const html = readFileSync(filePath, 'utf8');
  const title = extractFirst(html, /<title>([\s\S]*?)<\/title>/i);
  const robots = extractFirst(html, /<meta\s+name="robots"\s+content="([^"]+)"/i);
  const canonical = extractFirst(html, /<link\s+rel="canonical"\s+href="([^"]+)"/i);
  const ogUrl = extractFirst(html, /<meta\s+property="og:url"\s+content="([^"]+)"/i);
  const byteSize = Buffer.byteLength(html, 'utf8');

  if (!title) {
    errors.push(`Missing <title> in ${canonicalUrl}`);
  }

  if (!robots) {
    errors.push(`Missing robots meta in ${canonicalUrl}`);
  } else if (/noindex/i.test(robots)) {
    errors.push(`Robots meta contains noindex for indexable URL ${canonicalUrl}: "${robots}"`);
  }

  if (!canonical) {
    errors.push(`Missing canonical link in ${canonicalUrl}`);
  } else if (canonical !== canonicalUrl) {
    errors.push(`Canonical mismatch in ${canonicalUrl}: found "${canonical}"`);
  }

  if (!ogUrl) {
    errors.push(`Missing og:url in ${canonicalUrl}`);
  } else if (ogUrl !== canonicalUrl) {
    errors.push(`og:url mismatch in ${canonicalUrl}: found "${ogUrl}"`);
  }

  if (byteSize > 500_000) {
    warnings.push(
      `Large HTML payload for ${canonicalUrl}: ${(byteSize / 1024).toFixed(1)} KB (consider trimming DOM).`,
    );
  }
}

if (warnings.length > 0) {
  console.warn('\nSEO verification warnings:');
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
}

if (errors.length > 0) {
  console.error('\nSEO verification failed:');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`SEO verification passed for ${locMatches.length} sitemap URLs.`);
