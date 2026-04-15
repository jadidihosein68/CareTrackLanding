import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const SITE_URL = 'https://thecaretrack.netlify.app';
const DIST_INDEX_PATH = resolve('dist/index.html');
const LEARN_DATA_PATH = resolve('src/app/data/learn-data.ts');
const SEO_GUIDES_PATH = resolve('src/app/data/seo-guides.ts');

const absoluteUrl = (path) => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`);

const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const slugToTitle = (value) =>
  value
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const readSourceBlock = (source, label) => {
  const match = source.match(new RegExp(`${label}[\\s\\S]*?=\\s*\\[([\\s\\S]*?)\\n\\];`));
  return match?.[1] ?? '';
};

const parseCategories = (learnSource) => {
  const categoriesBlock = readSourceBlock(learnSource, 'export const categories');
  const categories = [];
  const categoryRegex = /{\s*id:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?description:\s*"([^"]+)"/g;
  let match = categoryRegex.exec(categoriesBlock);
  while (match) {
    categories.push({
      id: match[1],
      name: match[2],
      description: match[3],
    });
    match = categoryRegex.exec(categoriesBlock);
  }
  return categories;
};

const parseSpecies = (learnSource) => {
  const speciesBlock = readSourceBlock(learnSource, 'export const speciesData');
  const species = [];
  const speciesRegex =
    /{\s*id:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?scientificName:\s*"([^"]+)"[\s\S]*?category:\s*"([^"]+)"[\s\S]*?summary:\s*"([^"]+)"/g;

  let match = speciesRegex.exec(speciesBlock);
  while (match) {
    species.push({
      id: match[1],
      name: match[2],
      scientificName: match[3],
      category: match[4],
      summary: match[5],
    });
    match = speciesRegex.exec(speciesBlock);
  }

  return species;
};

const parseGuides = (guidesSource) => {
  const guidesBlock = readSourceBlock(guidesSource, 'export const seoGuides');
  const guides = [];
  const guideRegex =
    /{\s*id:\s*'([^']+)'[\s\S]*?seoTitle:\s*'([^']+)'[\s\S]*?seoDescription:\s*'([^']+)'[\s\S]*?relatedSpeciesIds:\s*\[([^\]]*)\][\s\S]*?title:\s*'([^']+)'[\s\S]*?summary:\s*'([^']+)'[\s\S]*?updated:\s*'([^']+)'/g;

  let match = guideRegex.exec(guidesBlock);
  while (match) {
    const rawRelated = match[4].trim();
    const relatedSpeciesIds = rawRelated
      ? rawRelated
          .split(',')
          .map((entry) => entry.trim().replaceAll("'", ''))
          .filter(Boolean)
      : [];

    guides.push({
      id: match[1],
      seoTitle: match[2],
      seoDescription: match[3],
      relatedSpeciesIds,
      title: match[5],
      summary: match[6],
      updated: match[7],
    });
    match = guideRegex.exec(guidesBlock);
  }

  return guides;
};

const buildRouteJsonLd = (route, guides) => {
  if (route.kind === 'home') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          name: 'CareTrack',
          url: SITE_URL,
          logo: `${SITE_URL}/apple-touch-icon.png`,
          contactPoint: [
            {
              '@type': 'ContactPoint',
              contactType: 'customer support',
              email: 'info@osacore.com',
              url: `${SITE_URL}/support`,
            },
          ],
        },
        {
          '@type': 'WebSite',
          name: 'CareTrack',
          url: SITE_URL,
          inLanguage: 'en-US',
        },
        {
          '@type': 'SoftwareApplication',
          name: 'CareTrack',
          applicationCategory: 'LifestyleApplication',
          operatingSystem: 'Android',
          url: SITE_URL,
          downloadUrl:
            'https://play.google.com/store/apps/details?id=com.osacore.caretrack&hl=en-US&ah=UM3NhPrO8Bx2hZGtb5Ty2A9P-eY',
          description:
            'Offline-first gecko and reptile care tracker with feeding logs, reminders, and species care guidance.',
        },
      ],
    };
  }

  if (route.kind === 'faq') {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does CareTrack handle reptile feeding reminders?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'CareTrack supports recurring reminder schedules and completion logs so reptile keepers can review routine consistency over time.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I use CareTrack when I am offline?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. CareTrack is offline-first for daily feeding, supplementation, and observation logging workflows.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is CareTrack a veterinary advice service?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. CareTrack provides husbandry tracking tools and educational content. Contact a qualified exotic veterinarian for medical concerns.',
          },
        },
      ],
      url: absoluteUrl(route.path),
    };
  }

  if (route.kind === 'guides') {
    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Reptile Care Guides and Templates',
      description: route.description,
      url: absoluteUrl(route.path),
      hasPart: guides.map((guide) => ({
        '@type': 'CreativeWork',
        name: guide.title,
        url: absoluteUrl(`/guides/${guide.id}`),
      })),
    };
  }

  if (route.kind === 'guide') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          headline: route.h1,
          description: route.description,
          dateModified: route.updated,
          mainEntityOfPage: absoluteUrl(route.path),
          author: {
            '@type': 'Organization',
            name: 'CareTrack',
          },
          publisher: {
            '@type': 'Organization',
            name: 'CareTrack',
            logo: {
              '@type': 'ImageObject',
              url: `${SITE_URL}/apple-touch-icon.png`,
            },
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: SITE_URL,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Guides',
              item: `${SITE_URL}/guides`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: route.h1,
              item: absoluteUrl(route.path),
            },
          ],
        },
      ],
    };
  }

  return {
    '@context': 'https://schema.org',
    '@type': route.kind === 'learn' ? 'CollectionPage' : 'WebPage',
    name: route.h1,
    description: route.description,
    url: absoluteUrl(route.path),
    isPartOf: {
      '@type': 'WebSite',
      name: 'CareTrack',
      url: SITE_URL,
    },
  };
};

const buildNoscriptMain = (route, guides, categories, speciesById) => {
  const commonLinks = `
    <h2>Key Pages</h2>
    <ul>
      <li><a href="/learn">Gecko and reptile care guides</a></li>
      <li><a href="/guides">Reptile care log templates and workflows</a></li>
      <li><a href="/faq">Reptile care app FAQ</a></li>
      <li><a href="/support">CareTrack support</a></li>
    </ul>
  `;

  if (route.kind === 'home') {
    const featuredGuides = guides
      .slice(0, 6)
      .map(
        (guide) =>
          `<li><a href="/guides/${guide.id}">${escapeHtml(guide.title)}</a></li>`,
      )
      .join('\n');

    return `
      <main>
        <h1>${escapeHtml(route.h1)}</h1>
        <p>${escapeHtml(route.description)}</p>
        <p>CareTrack helps reptile keepers track feeding, shedding, supplements, and behavior in one offline-first workflow.</p>
        ${commonLinks}
        <h2>Featured Guide Topics</h2>
        <ul>
          ${featuredGuides}
        </ul>
      </main>
    `;
  }

  if (route.kind === 'learn') {
    const categoryLinks = categories
      .map(
        (category) =>
          `<li><a href="/learn/category/${category.id}">${escapeHtml(category.name)} care guides</a></li>`,
      )
      .join('\n');
    return `
      <main>
        <h1>${escapeHtml(route.h1)}</h1>
        <p>${escapeHtml(route.description)}</p>
        <p>Browse category pages and species guides with practical setup, feeding, supplement, and husbandry tracking notes.</p>
        <h2>Browse by Animal Type</h2>
        <ul>
          ${categoryLinks}
        </ul>
        ${commonLinks}
      </main>
    `;
  }

  if (route.kind === 'guides') {
    const guideLinks = guides
      .map(
        (guide) =>
          `<li><a href="/guides/${guide.id}">${escapeHtml(guide.title)}</a></li>`,
      )
      .join('\n');

    return `
      <main>
        <h1>${escapeHtml(route.h1)}</h1>
        <p>${escapeHtml(route.description)}</p>
        <p>These pages focus on practical use-cases such as feeding schedules, supplement tracking, breeder record-keeping, and offline logging workflows.</p>
        <h2>Published Guides</h2>
        <ul>
          ${guideLinks}
        </ul>
        ${commonLinks}
      </main>
    `;
  }

  if (route.kind === 'guide') {
    const relatedSpeciesLinks = (route.relatedSpeciesIds ?? [])
      .map((speciesId) => speciesById.get(speciesId))
      .filter(Boolean)
      .map(
        (species) =>
          `<li><a href="/learn/species/${species.id}">${escapeHtml(species.name)} care guide</a></li>`,
      )
      .join('\n');

    return `
      <main>
        <h1>${escapeHtml(route.h1)}</h1>
        <p>${escapeHtml(route.description)}</p>
        <p>${escapeHtml(route.summary)}</p>
        <h2>Related Care Pages</h2>
        <ul>
          ${relatedSpeciesLinks || '<li><a href="/learn">Browse species care guides</a></li>'}
          <li><a href="/guides">All reptile care guides</a></li>
        </ul>
      </main>
    `;
  }

  if (route.kind === 'species') {
    return `
      <main>
        <h1>${escapeHtml(route.h1)}</h1>
        <p>${escapeHtml(route.description)}</p>
        <p>${escapeHtml(route.summary)}</p>
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/learn/category/${route.categoryId}">More ${escapeHtml(route.categoryName)} care guides</a></li>
          <li><a href="/guides">Practical care log templates</a></li>
        </ul>
        ${commonLinks}
      </main>
    `;
  }

  if (route.kind === 'category') {
    return `
      <main>
        <h1>${escapeHtml(route.h1)}</h1>
        <p>${escapeHtml(route.description)}</p>
        <p>This category page links to species-specific care content so each animal profile has focused setup, feeding, and husbandry guidance.</p>
        <h2>Continue Browsing</h2>
        <ul>
          <li><a href="/learn">All learn categories</a></li>
          <li><a href="/guides">Workflow and template guides</a></li>
        </ul>
        ${commonLinks}
      </main>
    `;
  }

  return `
    <main>
      <h1>${escapeHtml(route.h1)}</h1>
      <p>${escapeHtml(route.description)}</p>
      ${commonLinks}
    </main>
  `;
};

const replaceHeadMeta = (html, route, guides, categories, speciesById) => {
  const canonicalUrl = absoluteUrl(route.path);
  const structuredData = buildRouteJsonLd(route, guides);
  const noscriptBody = buildNoscriptMain(route, guides, categories, speciesById);

  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/>/,
      `<meta name="description" content="${escapeHtml(route.description)}" />`,
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/>/,
      `<link rel="canonical" href="${canonicalUrl}" />`,
    )
    .replace(
      /<meta\s+property="og:type"\s+content="[\s\S]*?"\s*\/>/,
      `<meta property="og:type" content="${route.ogType}" />`,
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/>/,
      `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/>/,
      `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/>/,
      `<meta property="og:url" content="${canonicalUrl}" />`,
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[\s\S]*?"\s*\/>/,
      `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/>/,
      `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    )
    .replace(
      /<meta\s+name="twitter:url"\s+content="[\s\S]*?"\s*\/>/,
      `<meta name="twitter:url" content="${canonicalUrl}" />`,
    )
    .replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script type="application/ld+json">\n${JSON.stringify(structuredData, null, 2)}\n</script>`,
    )
    .replace(/<noscript>[\s\S]*?<\/noscript>/, `<noscript>\n${noscriptBody}\n      </noscript>`);
};

const learnSource = readFileSync(LEARN_DATA_PATH, 'utf8');
const guidesSource = readFileSync(SEO_GUIDES_PATH, 'utf8');
const templateHtml = readFileSync(DIST_INDEX_PATH, 'utf8');

const categories = parseCategories(learnSource);
const species = parseSpecies(learnSource);
const guides = parseGuides(guidesSource);
const speciesById = new Map(species.map((item) => [item.id, item]));
const categoryById = new Map(categories.map((item) => [item.id, item]));

const staticRoutes = [
  {
    kind: 'home',
    path: '/',
    title: 'Gecko & Reptile Care Tracker App | CareTrack',
    h1: 'Gecko & Reptile Care Tracker App',
    description:
      'CareTrack is an offline-first gecko and reptile care tracker app for feeding, shedding, supplements, reminders, and health observations.',
    ogType: 'website',
  },
  {
    kind: 'learn',
    path: '/learn',
    title: 'Gecko, Snake & Reptile Care Guides | CareTrack',
    h1: 'Gecko and Reptile Care Guides',
    description:
      'Detailed reptile husbandry guides for geckos, snakes, amphibians, and tarantulas with setup, feeding, and health tracking context.',
    ogType: 'article',
  },
  {
    kind: 'guides',
    path: '/guides',
    title: 'Reptile Care Guides and Templates | CareTrack',
    h1: 'Reptile Care Guides and Templates',
    description:
      'Use-case guides for gecko feeding schedules, supplement routines, care log templates, and breeder record-keeping workflows.',
    ogType: 'article',
  },
  {
    kind: 'faq',
    path: '/faq',
    title: 'Reptile Care App FAQ | CareTrack',
    h1: 'Reptile Care App FAQ',
    description:
      'Answers to common questions about CareTrack reminders, offline reptile care logging, and daily husbandry workflows.',
    ogType: 'article',
  },
  {
    kind: 'support',
    path: '/support',
    title: 'Reptile Care App Support | CareTrack',
    h1: 'CareTrack Support',
    description:
      'Contact CareTrack support for help with reminders, tracking features, and reptile care workflow questions.',
    ogType: 'website',
  },
  {
    kind: 'privacy',
    path: '/privacy',
    title: 'Privacy Policy | CareTrack',
    h1: 'Privacy Policy',
    description:
      'Read the CareTrack privacy policy for details on offline-first data handling and user information practices.',
    ogType: 'article',
  },
  {
    kind: 'terms',
    path: '/terms',
    title: 'Terms of Service | CareTrack',
    h1: 'Terms of Service',
    description:
      'Review the CareTrack terms of service for app usage conditions, responsibilities, and legal information.',
    ogType: 'article',
  },
];

const categoryRoutes = categories.map((category) => ({
  kind: 'category',
  path: `/learn/category/${category.id}`,
  title: `${category.name} Reptile Care Guides | CareTrack`,
  h1: `${category.name} Care Guides`,
  description: `${category.description} Browse species pages and care references for ${category.name.toLowerCase()} husbandry topics.`,
  ogType: 'article',
}));

const speciesRoutes = species.map((item) => ({
  kind: 'species',
  path: `/learn/species/${item.id}`,
  title: `${item.name} Care Guide | CareTrack`,
  h1: `${item.name} Care Guide`,
  description: `Use this ${item.name} (${item.scientificName}) care guide for setup planning, feeding logs, supplement tracking, and husbandry reviews.`,
  summary: item.summary,
  categoryId: item.category,
  categoryName: categoryById.get(item.category)?.name ?? slugToTitle(item.category),
  ogType: 'article',
}));

const guideRoutes = guides.map((guide) => ({
  kind: 'guide',
  path: `/guides/${guide.id}`,
  title: guide.seoTitle,
  h1: guide.title,
  summary: guide.summary,
  description: guide.seoDescription,
  relatedSpeciesIds: guide.relatedSpeciesIds,
  updated: guide.updated,
  ogType: 'article',
}));

const routes = [...staticRoutes, ...categoryRoutes, ...speciesRoutes, ...guideRoutes];
const uniqueRoutes = new Map(routes.map((route) => [route.path, route]));

for (const route of uniqueRoutes.values()) {
  const html = replaceHeadMeta(templateHtml, route, guides, categories, speciesById);
  const outputPath =
    route.path === '/'
      ? resolve('dist/index.html')
      : resolve('dist', route.path.replace(/^\//, ''), 'index.html');

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, html, 'utf8');
}

console.log(`Generated prerendered HTML shells for ${uniqueRoutes.size} routes.`);
