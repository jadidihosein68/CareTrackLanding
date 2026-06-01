import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { GooglePlayLogo } from './shared/GooglePlayLogo';
import { Footer } from './shared/Footer';
import { TopNav } from './shared/TopNav';
import { usePageMeta } from '../utils/usePageMeta';
import { SITE_URL } from '../utils/seo';
import { SNAKE_MORPHS, type SnakeMorph } from '../data/snake-morphs';

const GOOGLE_PLAY_URL =
  'https://play.google.com/store/apps/details?id=com.osacore.caretrack&hl=en-US&ah=UM3NhPrO8Bx2hZGtb5Ty2A9P-eY';

const DEFAULT_MORPH_ID = 'normal';
const FALLBACK_IMAGE = '/images/playground/snake/snake-placeholder.webp';
const SEO_TITLE = 'Ball Python Snake Morph Playground & Visualizer | CareTrack';
const SEO_DESCRIPTION =
  'Use CareTrack Snake Morph Playground to preview Ball Python morph visuals, compare traits, and track reptile feeding, shed history, and care notes offline.';
const SNAKE_OG_IMAGE = '/images/playground/snake/ball-python-normal-wild-type-morph.webp';

const faqItems = [
  {
    question: 'What is the Snake Morph Playground?',
    answer:
      'It is a visual demo where you select a morph label and preview a snake look. The current set is Ball Python-focused and shows how CareTrack can organize morph labels beside care records.',
  },
  {
    question: 'Does this playground calculate Ball Python genetics?',
    answer:
      'No. This page is a visual demo only. It does not calculate breeding outcomes, offspring probabilities, or inheritance percentages.',
  },
  {
    question: 'Can I stack multiple snake morph traits?',
    answer:
      'Not in this first version. The first version supports one selected base morph at a time. Future versions may support stacked visual traits.',
  },
  {
    question: 'Can I track real Ball Python morph labels in CareTrack?',
    answer:
      'CareTrack is designed to help keepers organize animal records, including morph labels where supported, alongside feeding logs, shed history, reminders, and husbandry notes.',
  },
  {
    question: 'Does CareTrack provide DNA testing?',
    answer: 'No. CareTrack does not provide DNA testing. Morph labels are user-entered recordkeeping information.',
  },
  {
    question: 'Does CareTrack replace animal care advice?',
    answer:
      'No. CareTrack helps organize care records and educational information. It does not replace professional animal care advice.',
  },
  {
    question: 'Why does each morph use a dedicated image?',
    answer:
      'Each morph uses a dedicated image so the preview feels clearer, more polished, and easier to understand than a generic generated shape or CSS-based visual.',
  },
];

function SnakeMorphSelector({
  options,
  selectedMorphId,
  onSelect,
}: {
  options: SnakeMorph[];
  selectedMorphId: string;
  onSelect: (morphId: string) => void;
}) {
  return (
    <section aria-labelledby="snake-morph-heading" className="space-y-3">
      <div>
        <h2 id="snake-morph-heading" className="text-xl text-slate-900">
          Select a Morph
        </h2>
        <p className="text-sm text-slate-600">
          Choose one base Ball Python morph to preview. Future versions may support stacked traits
          and additional species-specific morph groups.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((morph) => {
          const isSelected = morph.id === selectedMorphId;
          return (
            <button
              key={morph.id}
              id={`morph-${morph.id}`}
              type="button"
              onClick={() => onSelect(morph.id)}
              className={[
                'rounded-xl border px-4 py-3 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500',
                isSelected
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/40',
              ].join(' ')}
              aria-pressed={isSelected}
            >
              <span className="block text-sm font-medium">{morph.name}</span>
              <span className="mt-1 block text-xs text-slate-500">{morph.description}</span>
              <span className="mt-2 inline-flex rounded-full border border-slate-300 px-2 py-0.5 text-[11px] text-slate-700">
                {isSelected ? morph.selectedLabel : morph.unselectedLabel}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function SnakeMorphImagePreview({ selectedMorph }: { selectedMorph: SnakeMorph }) {
  const [imageSrc, setImageSrc] = useState(selectedMorph.imageSrc);
  const [usingFallbackImage, setUsingFallbackImage] = useState(false);

  useEffect(() => {
    setImageSrc(selectedMorph.imageSrc);
    setUsingFallbackImage(false);
  }, [selectedMorph.id, selectedMorph.imageSrc]);

  const isDefault = selectedMorph.id === DEFAULT_MORPH_ID;
  const priorityAttr = ({ fetchpriority: isDefault ? 'high' : 'auto' } as Record<string, string>);

  return (
    <figure className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:p-6">
      <div className="relative overflow-hidden rounded-xl bg-slate-50 p-3">
        <div className="pointer-events-none absolute left-5 top-5 z-10 rounded-full bg-black/75 px-3 py-1 text-xs text-white backdrop-blur-sm">
          Morph: {selectedMorph.name}
        </div>

        <picture>
          <source srcSet={imageSrc} type="image/webp" />
          <img
            src={imageSrc}
            alt={selectedMorph.imageAlt}
            width={1200}
            height={900}
            loading={isDefault ? 'eager' : 'lazy'}
            decoding="async"
            {...priorityAttr}
            className="mx-auto h-auto max-h-[460px] w-full rounded-lg object-contain"
            onError={(event) => {
              if (event.currentTarget.src.endsWith(FALLBACK_IMAGE)) {
                setUsingFallbackImage(true);
                return;
              }
              setImageSrc(FALLBACK_IMAGE);
              setUsingFallbackImage(true);
            }}
          />
        </picture>
      </div>

      {usingFallbackImage ? (
        <p className="mt-3 text-sm text-amber-700">Preview image coming soon.</p>
      ) : null}

      <figcaption className="mt-3 text-sm text-slate-600">
        Ball Python visual demo only. Selected morph: {selectedMorph.name}
      </figcaption>
    </figure>
  );
}

function SnakeSelectedProfilePanel({ selectedMorph }: { selectedMorph: SnakeMorph }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" aria-live="polite">
      <h2 className="text-lg text-slate-900">Selected Profile</h2>
      <div className="mt-3 space-y-4 text-sm text-slate-700">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Morph</p>
          <p className="mt-1 text-base text-slate-900">{selectedMorph.name}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Description</p>
          <p className="mt-1">{selectedMorph.description}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Genetics Notes</p>
          <p className="mt-1">{selectedMorph.geneticsNote}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Common Combo Examples</p>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            {selectedMorph.comboExamples.map((combo) => (
              <li key={combo}>{combo}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-amber-900">
          This playground is a visual demo only. Snake appearance and morph expression may vary.
          CareTrack does not provide DNA testing, veterinary advice, or guaranteed breeding
          predictions.
        </div>
      </div>
    </section>
  );
}

function SnakePlaygroundCTA() {
  return (
    <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
      <h2 className="text-xl text-slate-900">Ready to Track Real Ball Python Care Data?</h2>
      <p className="mt-2 text-slate-700">
        CareTrack helps snake keepers organize morph labels, feeding logs, shed history, reminders,
        and husbandry notes in one offline-first app.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <a
          href={GOOGLE_PLAY_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-white transition-colors hover:bg-emerald-700"
        >
          <GooglePlayLogo className="h-4 w-4 shrink-0" />
          Download the CareTrack Reptile App
        </a>
        <Link
          to="/learn/species/ball-python"
          className="inline-flex items-center justify-center rounded-lg border border-emerald-600 px-5 py-2.5 text-emerald-700 transition-colors hover:bg-emerald-100"
        >
          Explore Ball Python Care Guide
        </Link>
      </div>
    </section>
  );
}

export function SnakePlayground() {
  const defaultMorph = useMemo(
    () => SNAKE_MORPHS.find((item) => item.id === DEFAULT_MORPH_ID) ?? SNAKE_MORPHS[0],
    [],
  );

  const [selectedMorphId, setSelectedMorphId] = useState<string>(defaultMorph.id);
  const selectedMorph = SNAKE_MORPHS.find((option) => option.id === selectedMorphId) ?? defaultMorph;

  usePageMeta({
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    path: '/playground/snake',
    type: 'website',
    image: SNAKE_OG_IMAGE,
    imageAlt: 'Normal wild type Ball Python morph visualizer preview in CareTrack playground',
    ogTitle: 'Ball Python Snake Morph Playground | CareTrack',
    ogDescription:
      'Preview Ball Python morph visuals and compare trait notes in the CareTrack Snake Morph Playground before tracking real reptile care records.',
    twitterTitle: 'Ball Python Snake Morph Playground | CareTrack',
    twitterDescription:
      'Compare Ball Python morph visuals and organize snake care records offline with CareTrack.',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Ball Python Snake Morph Playground & Visualizer',
        url: `${SITE_URL}/playground/snake`,
        description: SEO_DESCRIPTION,
        primaryImageOfPage: `${SITE_URL}${SNAKE_OG_IMAGE}`,
        isPartOf: {
          '@type': 'WebSite',
          name: 'CareTrack',
          url: SITE_URL,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'CareTrack',
        applicationCategory: 'LifestyleApplication',
        operatingSystem: 'Android',
        url: SITE_URL,
        downloadUrl: GOOGLE_PLAY_URL,
        description:
          'Offline reptile care tracker for snake keepers to organize morph labels, feeding logs, shed history, reminders, and husbandry notes.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@context': 'https://schema.org',
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
            name: 'Playground',
            item: `${SITE_URL}/playground/gecko`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Ball Python Snake Morph Playground',
            item: `${SITE_URL}/playground/snake`,
          },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        url: `${SITE_URL}/playground/snake`,
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Ball Python morph list in Snake Playground',
        itemListElement: SNAKE_MORPHS.map((morph, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${SITE_URL}/playground/snake#morph-${morph.id}`,
          name: morph.name,
          description: morph.description,
        })),
      },
    ],
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <TopNav
        rightSlot={(
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-600 transition-colors hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        )}
      />

      <main className="px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-10">
          <header className="max-w-3xl">
            <h1 className="text-4xl text-slate-900 sm:text-5xl">Snake Morph Playground & Visualizer</h1>
            <p className="mt-3 text-base font-medium text-emerald-700">Build your snake morph look</p>
            <p className="mt-4 text-lg text-slate-600">
              Select a Ball Python morph to preview a visualizer state and compare trait notes.
              CareTrack helps snake keepers organize morph labels, feeding logs, shed history,
              reminders, and husbandry notes in one offline-first reptile care app.
            </p>
            <p className="mt-3 text-sm text-slate-600">
              Looking for gecko visuals?{' '}
              <Link to="/playground/gecko" className="text-emerald-700 underline hover:text-emerald-800">
                Try Gecko Morph Playground
              </Link>
              .
            </p>
          </header>

          <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="space-y-6">
              <SnakeMorphSelector
                options={SNAKE_MORPHS}
                selectedMorphId={selectedMorph.id}
                onSelect={setSelectedMorphId}
              />

              <div className="space-y-4 sm:hidden">
                <SnakeMorphImagePreview selectedMorph={selectedMorph} />
                <SnakeSelectedProfilePanel selectedMorph={selectedMorph} />
              </div>

              <SnakePlaygroundCTA />
            </div>

            <div className="hidden space-y-4 sm:block lg:sticky lg:top-24 lg:self-start">
              <SnakeMorphImagePreview selectedMorph={selectedMorph} />
              <SnakeSelectedProfilePanel selectedMorph={selectedMorph} />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl text-slate-900">What is the Ball Python Snake Morph Playground?</h2>
            <p className="mt-3 text-slate-700">
              The CareTrack Snake Morph Playground is a Ball Python morph visualizer that helps
              reptile keepers compare common labels and organize appearance notes. It is designed
              for education and recordkeeping context, not guaranteed breeding prediction.
            </p>
            <p className="mt-3 text-slate-700">
              Use this page to compare Ball Python morph visuals, understand how keepers describe
              recessive and incomplete-dominant style projects, and see how a snake morph tracker
              supports day-to-day husbandry routines.
            </p>
            <p className="mt-3 text-slate-700">
              In CareTrack, morph labels are treated as searchable recordkeeping fields that sit
              beside practical care data: feeding history, shed notes, reminders, weight, and
              husbandry observations.
            </p>
            <p className="mt-3 text-slate-700">
              Keepers searching for a ball python morph tracker, corn snake morph tracker, snake
              feeding tracker, snake shed tracker, or an offline reptile care app can use this page
              as a visual entry point before moving to full care routines inside CareTrack.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl text-slate-900">Ball Python Snake Morph Playground FAQ</h2>
            <div className="mt-4 space-y-4">
              {faqItems.map((item) => (
                <article key={item.question} className="rounded-xl border border-slate-200 p-4">
                  <h3 className="text-lg text-slate-900">{item.question}</h3>
                  <p className="mt-2 text-slate-700">{item.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl text-slate-900">Related Pages</h2>
            <ul className="mt-3 list-disc pl-5 text-slate-700 space-y-2">
              <li><Link to="/learn/species/ball-python" className="text-emerald-700 underline">Ball Python Care Guide</Link></li>
              <li><Link to="/guides/ball-python-shedding-problems-guide" className="text-emerald-700 underline">Ball Python Shedding Problems Guide</Link></li>
              <li><Link to="/guides/feeding-reminder-features" className="text-emerald-700 underline">Reptile Feeding Reminder Features</Link></li>
              <li><Link to="/guides/offline-reptile-care-logs" className="text-emerald-700 underline">Offline Reptile Care Log Workflows</Link></li>
              <li><Link to="/guides/reptile-care-log-template" className="text-emerald-700 underline">Reptile Care Log Template</Link></li>
              <li><Link to="/playground/gecko" className="text-emerald-700 underline">Gecko Morph Playground</Link></li>
              <li><Link to="/support" className="text-emerald-700 underline">CareTrack Support</Link></li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
