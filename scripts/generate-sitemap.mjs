import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SITE_URL = 'https://thecaretrack.netlify.app';
const TODAY = new Date().toISOString().slice(0, 10);

const learnDataPath = resolve('src/app/data/learn-data.ts');
const seoGuidesPath = resolve('src/app/data/seo-guides.ts');
const sitemapPath = resolve('public/sitemap.xml');

const source = readFileSync(learnDataPath, 'utf8');
const seoGuidesSource = readFileSync(seoGuidesPath, 'utf8');

const extractIds = (blockLabel) => {
  const blockRegex = new RegExp(`${blockLabel}[\\s\\S]*?=\\s*\\[([\\s\\S]*?)\\];`);
  const blockMatch = source.match(blockRegex);
  if (!blockMatch?.[1]) return [];
  const idRegex = /id:\s*"([^"]+)"/g;
  const ids = [];
  let match = idRegex.exec(blockMatch[1]);
  while (match) {
    ids.push(match[1]);
    match = idRegex.exec(blockMatch[1]);
  }
  return ids;
};

const categoryIds = extractIds('export const categories');
const speciesIds = extractIds('export const speciesData');

const guideIds = [];
const guideIdRegex = /id:\s*'([^']+)'/g;
let guideMatch = guideIdRegex.exec(seoGuidesSource);
while (guideMatch) {
  guideIds.push(guideMatch[1]);
  guideMatch = guideIdRegex.exec(seoGuidesSource);
}

const entries = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/learn', changefreq: 'weekly', priority: '0.9' },
  { path: '/guides', changefreq: 'weekly', priority: '0.8' },
  { path: '/faq', changefreq: 'monthly', priority: '0.7' },
  ...categoryIds.map((id) => ({
    path: `/learn/category/${id}`,
    changefreq: 'monthly',
    priority: '0.7',
  })),
  ...speciesIds.map((id) => ({
    path: `/learn/species/${id}`,
    changefreq: 'monthly',
    priority: '0.6',
  })),
  ...guideIds.map((id) => ({
    path: `/guides/${id}`,
    changefreq: 'monthly',
    priority: '0.7',
  })),
  { path: '/privacy', changefreq: 'yearly', priority: '0.5' },
  { path: '/terms', changefreq: 'yearly', priority: '0.5' },
  { path: '/support', changefreq: 'monthly', priority: '0.6' },
];

const deduped = new Map();
entries.forEach((entry) => {
  deduped.set(entry.path, entry);
});

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...[...deduped.values()].map(
    (entry) => `  <url>
    <loc>${SITE_URL}${entry.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
  ),
  '</urlset>',
  '',
].join('\n');

writeFileSync(sitemapPath, xml, 'utf8');
console.log(`Generated sitemap with ${deduped.size} URLs at ${sitemapPath}`);
