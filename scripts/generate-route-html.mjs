import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const SITE_URL = 'https://thecaretracks.com';
const DIST_INDEX_PATH = resolve('dist/index.html');
const DIST_SSR_ENTRY_CANDIDATES = [
  resolve('dist-ssr/entry-server.js'),
  resolve('dist-ssr/entry-server.mjs'),
];
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
      '@type': 'SoftwareApplication',
      name: 'CareTrack',
      url: `${SITE_URL}/`,
      description: 'Offline gecko and reptile care tracker with reminders',
      applicationCategory: 'LifestyleApplication',
      operatingSystem: 'Android',
      downloadUrl:
        'https://play.google.com/store/apps/details?id=com.osacore.caretrack&hl=en-US&ah=UM3NhPrO8Bx2hZGtb5Ty2A9P-eY',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
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

  if (route.kind === 'partners') {
    const partnerFaq = [
      {
        '@type': 'Question',
        name: 'Is CareTrack only for geckos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. CareTrack supports reptile care tracking for geckos, snakes, bearded dragons, skinks, tortoises, and other reptiles where records and reminders are useful.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can breeders use CareTrack for breeding records?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. CareTrack supports breeding workflows such as pairings, clutch records, hatchling notes, morph tracking, and buyer handover context.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can reptile creators collaborate with CareTrack?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Creators and educators can collaborate through practical care content, demonstrations, referral campaigns, and responsible husbandry education.',
        },
      },
    ];

    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          name: route.h1,
          description: route.description,
          url: absoluteUrl(route.path),
          isPartOf: {
            '@type': 'WebSite',
            name: 'CareTrack',
            url: SITE_URL,
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
              name: 'Partners',
              item: absoluteUrl(route.path),
            },
          ],
        },
        {
          '@type': 'SoftwareApplication',
          name: 'CareTrack',
          applicationCategory: 'LifestyleApplication',
          operatingSystem: 'Android',
          url: `${SITE_URL}/`,
          description:
            'Offline-first reptile care tracker for feeding logs, reminders, breeding records, morph tracking, and handover workflows.',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
        },
        {
          '@type': 'FAQPage',
          url: absoluteUrl(route.path),
          mainEntity: partnerFaq,
        },
      ],
    };
  }

  if (route.kind === 'partner-child') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          name: route.h1,
          description: route.description,
          url: absoluteUrl(route.path),
          isPartOf: {
            '@type': 'WebSite',
            name: 'CareTrack',
            url: SITE_URL,
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
              name: 'Partners',
              item: `${SITE_URL}/partners`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: route.breadcrumbLabel ?? route.h1,
              item: absoluteUrl(route.path),
            },
          ],
        },
      ],
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

  if (route.kind === 'playground') {
    const isSnakePlayground = route.playgroundType === 'Snake';
    const snakeFaq = [
      {
        '@type': 'Question',
        name: 'What is the Snake Morph Playground?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It is a Ball Python-focused visual demo where keepers select a morph label and preview a snake morph visualizer state.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does this playground calculate Ball Python genetics?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. This page is a visual demo only and does not calculate breeding outcomes, inheritance percentages, or guaranteed genetic results.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I stack multiple snake morph traits?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Not in this first version. The first version supports one selected base morph at a time.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I track snake feeding and shed history in CareTrack?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. CareTrack is built for offline reptile care records including feeding logs, shed history, reminders, and husbandry notes.',
        },
      },
    ];

    const webPageNode = {
      '@type': 'WebPage',
      name: route.h1,
      description: route.description,
      url: absoluteUrl(route.path),
      ...(isSnakePlayground
        ? {
            primaryImageOfPage:
              `${SITE_URL}/images/playground/snake/ball-python-normal-wild-type-morph.webp`,
          }
        : {}),
      isPartOf: {
        '@type': 'WebSite',
        name: 'CareTrack',
        url: SITE_URL,
      },
    };

    const graph = [
      webPageNode,
      {
        '@type': 'SoftwareApplication',
        name: 'CareTrack',
        applicationCategory: 'LifestyleApplication',
        operatingSystem: 'Android',
        url: `${SITE_URL}/`,
        description:
          'Offline-first gecko and reptile care tracker for morph records, feeding logs, reminders, and husbandry notes.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      ...(isSnakePlayground
        ? [
            {
              '@type': 'FAQPage',
              url: absoluteUrl(route.path),
              mainEntity: snakeFaq,
            },
          ]
        : []),
    ];

    return {
      '@context': 'https://schema.org',
      '@graph': graph,
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
      <li><a href="/playground/gecko">Gecko Morph &amp; Trait Playground</a></li>
      <li><a href="/playground/snake">Ball Python Snake Morph Playground</a></li>
      <li><a href="/partners">CareTrack partner collaboration page</a></li>
      <li><a href="/guides">Reptile care log templates and workflows</a></li>
      <li><a href="/faq">Reptile care app FAQ</a></li>
      <li><a href="/support">CareTrack support</a></li>
    </ul>
  `;
  const fallbackImages = `
    <h2>Reference Images</h2>
    <p>These images preview species-focused care content and offline logging workflows available in CareTrack.</p>
    <div>
      <img src="/images/leopard-gecko.webp" alt="Leopard Gecko feeding log on CareTrack app with husbandry tracking context" width="800" height="500" loading="lazy" />
      <img src="/images/crested-gecko.webp" alt="Crested Gecko care planning image from CareTrack app species guide" width="800" height="500" loading="lazy" />
      <img src="/images/ball-python.webp" alt="Ball Python husbandry record example in CareTrack app timeline" width="800" height="500" loading="lazy" />
      <img src="/images/gecko-dashboard.webp" alt="CareTrack offline gecko care dashboard showing feeding log and reminders" width="800" height="500" loading="lazy" />
    </div>
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
        <h2>${escapeHtml(route.h1)}</h2>
        <p>${escapeHtml(route.description)}</p>
        <p>CareTrack helps reptile keepers track feeding, shedding, supplements, and behavior in one offline-first workflow. Logs stay available without internet so routines remain reliable during daily checks, travel, and breeding projects.</p>
        <p>Consistent records improve decision quality over time. When appetite, shedding, supplementation, or behavior shifts, dated entries help you review patterns across weeks and quickly identify husbandry changes that may need attention.</p>
        <p>Trusted by 500+ keepers.</p>
        ${fallbackImages}
        <h2>Core Benefits</h2>
        <ul>
          <li>Offline-first care logging for feeding, supplements, and behavior notes.</li>
          <li>Reminder workflows to reduce missed routine tasks.</li>
          <li>Species-specific guides for geckos, snakes, amphibians, and tarantulas.</li>
          <li>Practical templates for keeper and breeder record-keeping.</li>
        </ul>
        ${commonLinks}
        <h2>Featured Guide Topics</h2>
        <ul>
          ${featuredGuides}
        </ul>
        <h2>Species Pages</h2>
        <ul>
          <li><a href="/learn/species/leopard-gecko">Leopard Gecko Care Guide</a></li>
          <li><a href="/learn/species/crested-gecko">Crested Gecko Care Guide</a></li>
          <li><a href="/learn/species/ball-python">Ball Python Care Guide</a></li>
          <li><a href="/learn/species/pink-toe-tarantula">Pink Toe Tarantula Care Guide</a></li>
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
        <h2>${escapeHtml(route.h1)}</h2>
        <p>${escapeHtml(route.description)}</p>
        <p>Browse category pages and species guides with practical setup, feeding, supplement, and husbandry tracking notes. Each profile focuses on day-to-day execution so keepers can move from generic advice to repeatable care routines.</p>
        <p>Use Learn as your husbandry reference layer, then pair it with routine logs in CareTrack for trend review. When enclosure changes, feeding cadence updates, or supplements are adjusted, the timeline helps confirm what changed and how animals responded.</p>
        ${fallbackImages}
        <h2>Browse by Animal Type</h2>
        <ul>
          ${categoryLinks}
        </ul>
        ${commonLinks}
        <h2>Recommended Next Steps</h2>
        <ul>
          <li><a href="/guides">Read practical care workflow guides</a></li>
          <li><a href="/faq">Review common product and care questions</a></li>
        </ul>
      </main>
    `;
  }

  if (route.kind === 'playground') {
    const subject = route.playgroundType ?? 'Gecko';
    const morphLine =
      subject === 'Snake'
        ? 'Swap Ball Python morph options to preview the current visualizer state.'
        : 'Apply multiple traits to update the gecko visual state.';
    const introLine =
      subject === 'Snake'
        ? 'Try the CareTrack Ball Python snake morph playground to compare morph labels in a visual demo. This page is designed for education and recordkeeping context, not guaranteed breeding prediction.'
        : 'Try the CareTrack gecko morph playground to compare gecko morph labels in a visual demo. This page is designed for education and recordkeeping context, not guaranteed breeding prediction.';
    const seoLine =
      subject === 'Snake'
        ? 'Use this page as a visual starting point for ball python morph tracker workflows, snake feeding tracker routines, snake shed tracker notes, and offline reptile care app planning.'
        : 'Use this page as a visual starting point before moving into daily care logging and reminder workflows in CareTrack.';
    return `
      <main>
        <h2>${escapeHtml(route.h1)}</h2>
        <p>${escapeHtml(route.description)}</p>
        <p>${escapeHtml(introLine)}</p>
        <h2>How This Demo Works</h2>
        <ul>
          <li>Select one morph as the base profile.</li>
          <li>${escapeHtml(morphLine)}</li>
          <li>Review profile notes and continue to app workflows for real record-keeping.</li>
        </ul>
        <p>${escapeHtml(seoLine)}</p>
        <p>CareTrack helps reptile keepers maintain offline care logs, reminders, and husbandry notes with species-specific guidance.</p>
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
        <h2>${escapeHtml(route.h1)}</h2>
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
        <h2>${escapeHtml(route.h1)}</h2>
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
        <h2>${escapeHtml(route.h1)}</h2>
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
        <h2>${escapeHtml(route.h1)}</h2>
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
      <h2>${escapeHtml(route.h1)}</h2>
      <p>${escapeHtml(route.description)}</p>
      ${commonLinks}
    </main>
  `;
};

const replaceHeadMeta = (html, route, guides, categories, speciesById) => {
  const canonicalUrl = absoluteUrl(route.path);
  const structuredData = buildRouteJsonLd(route, guides);
  const noscriptBody = buildNoscriptMain(route, guides, categories, speciesById);
  const ogTitle = route.ogTitle ?? route.title;
  const twitterTitle = route.twitterTitle ?? ogTitle;
  const imagePath = route.image ?? '/og-image.jpg';
  const imageUrl = imagePath.startsWith('http') ? imagePath : `${SITE_URL}${imagePath}`;
  const imageAlt = route.imageAlt ?? `${route.h1} page preview image`;
  const ogDescription = route.ogDescription ?? route.description;
  const twitterDescription = route.twitterDescription ?? ogDescription;

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
      `<meta property="og:title" content="${escapeHtml(ogTitle)}" />`,
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/>/,
      `<meta property="og:description" content="${escapeHtml(ogDescription)}" />`,
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/>/,
      `<meta property="og:url" content="${canonicalUrl}" />`,
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[\s\S]*?"\s*\/>/,
      `<meta name="twitter:title" content="${escapeHtml(twitterTitle)}" />`,
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/>/,
      `<meta name="twitter:description" content="${escapeHtml(twitterDescription)}" />`,
    )
    .replace(
      /<meta\s+name="twitter:url"\s+content="[\s\S]*?"\s*\/>/,
      `<meta name="twitter:url" content="${canonicalUrl}" />`,
    )
    .replace(
      /<meta\s+property="og:image:alt"\s+content="[\s\S]*?"\s*\/>/,
      `<meta property="og:image:alt" content="${escapeHtml(imageAlt)}" />`,
    )
    .replace(
      /<meta\s+property="og:image"\s+content="[\s\S]*?"\s*\/>/,
      `<meta property="og:image" content="${imageUrl}" />`,
    )
    .replace(
      /<meta\s+property="og:image:secure_url"\s+content="[\s\S]*?"\s*\/>/,
      `<meta property="og:image:secure_url" content="${imageUrl}" />`,
    )
    .replace(
      /<meta\s+name="twitter:image"\s+content="[\s\S]*?"\s*\/>/,
      `<meta name="twitter:image" content="${imageUrl}" />`,
    )
    .replace(
      /<meta\s+name="twitter:image:alt"\s+content="[\s\S]*?"\s*\/>/,
      `<meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}" />`,
    )
    .replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script type="application/ld+json">\n${JSON.stringify(structuredData, null, 2)}\n</script>`,
    )
    .replace(/<noscript>[\s\S]*?<\/noscript>/, `<noscript>\n${noscriptBody}\n      </noscript>`);
};

const injectPrerenderedApp = (html, routePath, renderRoute) => {
  const appHtml = renderRoute(routePath);
  return html.replace(/<div id="root">\s*<\/div>/, `<div id="root">${appHtml}</div>`);
};

const loadRouteRenderer = async () => {
  const entryPath = DIST_SSR_ENTRY_CANDIDATES.find((candidate) => existsSync(candidate));
  if (!entryPath) {
    throw new Error(
      `SSR entry not found. Expected one of: ${DIST_SSR_ENTRY_CANDIDATES.join(', ')}`,
    );
  }

  const imported = await import(pathToFileURL(entryPath).href);
  if (typeof imported.renderRoute !== 'function') {
    throw new Error(`renderRoute() export missing from ${entryPath}`);
  }

  return imported.renderRoute;
};

const renderRoute = await loadRouteRenderer();

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
    title: 'CareTrack: Offline Gecko & Reptile Care Tracker with Reminders',
    h1: 'CareTrack: Offline Gecko & Reptile Care Tracker with Reminders',
    description:
      'Free offline gecko and reptile care tracker. Log feeding, shedding, weight, humidity, temperature and get smart reminders. Works without internet. Perfect for leopard geckos, crested geckos and more.',
    ogDescription:
      'Free offline reptile care log with feeding reminders, weight tracking and health records.',
    twitterDescription:
      'Free offline reptile care log with feeding reminders, weight tracking and health records.',
    ogType: 'website',
  },
  {
    kind: 'learn',
    path: '/learn',
    title: 'Reptile Care Knowledge Base & Species Guides | CareTrack',
    h1: 'Reptile Care Knowledge Base & Species Guides',
    description:
      'Learn best practices for gecko and reptile care. Species guides, husbandry tips, feeding schedules, shedding logs and more for leopard geckos, crested geckos, ball pythons and other reptiles.',
    ogDescription: 'Learn everything about gecko and reptile care.',
    ogType: 'article',
  },
  {
    kind: 'guides',
    path: '/guides',
    title: 'Reptile Care Guides, Templates & Logs | CareTrack',
    h1: 'Reptile Care Guides, Templates & Logs',
    description:
      'Download free reptile care guides, templates, and printable logs for feeding, shedding, weight tracking and more. Made for gecko keepers.',
    ogDescription: 'Free reptile care guides and printable templates.',
    ogType: 'article',
  },
  {
    kind: 'playground',
    path: '/playground/gecko',
    title: 'Gecko Morph & Trait Playground | CareTrack',
    h1: 'Gecko Morph & Trait Playground',
    playgroundType: 'Gecko',
    description:
      "Try CareTrack's interactive gecko morph and trait playground. Select leopard gecko morphs and traits to preview a fun cartoon gecko visualization and learn how CareTrack supports reptile care and breeder records.",
    ogType: 'website',
  },
  {
    kind: 'playground',
    path: '/playground/snake',
    title: 'Ball Python Snake Morph Playground & Visualizer | CareTrack',
    ogTitle: 'Ball Python Snake Morph Playground | CareTrack',
    twitterTitle: 'Ball Python Snake Morph Playground | CareTrack',
    h1: 'Snake Morph Playground & Visualizer',
    playgroundType: 'Snake',
    description:
      'Use CareTrack Snake Morph Playground to preview Ball Python morph visuals, compare traits, and track reptile feeding, shed history, and care notes offline.',
    ogDescription:
      'Preview Ball Python morph visuals and compare trait notes in the CareTrack Snake Morph Playground before tracking real reptile care records.',
    twitterDescription:
      'Compare Ball Python morph visuals and organize snake care records offline with CareTrack.',
    image: '/images/playground/snake/ball-python-normal-wild-type-morph.webp',
    imageAlt: 'Normal wild type Ball Python morph visualizer preview in CareTrack playground',
    ogType: 'website',
  },
  {
    kind: 'partners',
    path: '/partners',
    title: 'CareTrack Partners | Reptile Breeders, Shops, Creators and Events',
    h1: 'Partner With CareTrack to Support Better Reptile Care',
    description:
      'Partner with CareTrack to help reptile buyers continue better care with feeding reminders, shed and weight logs, breeding records, morph tracking, and breeder handover reports.',
    ogType: 'website',
  },
  {
    kind: 'partner-child',
    path: '/partners/breeders',
    title: 'CareTrack for Reptile Breeders | Partner Workflows',
    h1: 'CareTrack Partnership for Reptile Breeders',
    breadcrumbLabel: 'Breeders',
    description:
      'Partner with CareTrack as a reptile breeder to manage pairings, clutch logs, hatchling care records, morph tracking, and buyer handover history.',
    ogType: 'website',
  },
  {
    kind: 'partner-child',
    path: '/partners/breeders2',
    title: 'Breeder Collaboration Model: Reptile History Handover | CareTrack',
    h1: 'Breeder Collaboration Built Around Reptile History',
    breadcrumbLabel: 'Breeders 2',
    description:
      'CareTrack helps reptile breeders hand over structured reptile history so buyers continue care with profile details, feeding logs, breeding context, clutch records, and after-sale guidance.',
    ogType: 'website',
  },
  {
    kind: 'partner-child',
    path: '/partners/reptile-shops',
    title: 'CareTrack for Reptile Shops | Customer Care Partnership',
    h1: 'CareTrack Partnership for Reptile Shops',
    breadcrumbLabel: 'Reptile Shops',
    description:
      'Partner with CareTrack as a reptile shop to improve post-sale support using QR handover, care reminders, and practical reptile care records.',
    ogType: 'website',
  },
  {
    kind: 'partner-child',
    path: '/partners/creators',
    title: 'CareTrack for Reptile Creators and Educators | Partner Program',
    h1: 'CareTrack Partnership for Reptile Creators and Educators',
    breadcrumbLabel: 'Creators',
    description:
      'Partner with CareTrack as a reptile creator or educator to demonstrate practical husbandry routines, breeding context, and responsible ownership workflows.',
    ogType: 'website',
  },
  {
    kind: 'partner-child',
    path: '/partners/events',
    title: 'CareTrack for Reptile Expos and Events | Collaboration Program',
    h1: 'CareTrack Partnership for Reptile Expos and Events',
    breadcrumbLabel: 'Events',
    description:
      'Partner with CareTrack for reptile expos and events through QR campaigns, booth demos, breeder handover education, and practical care continuity workflows.',
    ogType: 'website',
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
  const routeHtml = replaceHeadMeta(templateHtml, route, guides, categories, speciesById);
  const html = injectPrerenderedApp(routeHtml, route.path, renderRoute);
  const outputPath =
    route.path === '/'
      ? resolve('dist/index.html')
      : resolve('dist', route.path.replace(/^\//, ''), 'index.html');

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, html, 'utf8');
}

console.log(`Generated prerendered HTML pages for ${uniqueRoutes.size} routes.`);
