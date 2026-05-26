import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { GeckoVisualizer } from './playground/GeckoVisualizer';
import { MorphSelector } from './playground/MorphSelector';
import { TraitInfoPanel } from './playground/TraitInfoPanel';
import { PlaygroundCTA } from './playground/PlaygroundCTA';
import { geckoMorphOptions } from '../data/gecko-playground-catalog';
import { Footer } from './shared/Footer';
import { TopNav } from './shared/TopNav';
import { usePageMeta } from '../utils/usePageMeta';
import { SITE_URL } from '../utils/seo';

const SEO_TITLE = 'Gecko Morph & Trait Playground | CareTrack';
const SEO_DESCRIPTION =
  'Try CareTrack\'s interactive gecko morph and trait playground. Select leopard gecko morphs and traits to preview a fun cartoon gecko visualization and learn how CareTrack supports reptile care and breeder records.';

const defaultMorph = geckoMorphOptions[0];

export function Playground() {
  const [selectedMorphId, setSelectedMorphId] = useState<string>(defaultMorph.id);

  const selectedMorph =
    geckoMorphOptions.find((option) => option.id === selectedMorphId) ?? defaultMorph;

  const handleMorphSelect = (morphId: string) => {
    setSelectedMorphId(morphId);
  };

  usePageMeta({
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    path: '/playground/gecko',
    type: 'article',
    image: '/og-image.jpg',
    imageAlt: 'CareTrack gecko morph and trait playground visual preview.',
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          name: SEO_TITLE,
          description: SEO_DESCRIPTION,
          url: `${SITE_URL}/playground/gecko`,
          isPartOf: {
            '@type': 'WebSite',
            name: 'CareTrack',
            url: SITE_URL,
          },
        },
        {
          '@type': 'SoftwareApplication',
          name: 'CareTrack',
          applicationCategory: 'LifestyleApplication',
          operatingSystem: 'Android',
          url: SITE_URL,
          description:
            'Offline-first gecko and reptile care tracker for feeding logs, reminders, husbandry notes, and breeder records.',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
        },
      ],
    },
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
            <h1 className="text-4xl text-slate-900 sm:text-5xl">Build Your Gecko Look</h1>
            <p className="mt-4 text-lg text-slate-600">
              Select a morph to preview a playful gecko visualization. CareTrack helps keepers and
              breeders organize gecko care, morph records, feeding logs, and reminders in one
              offline-first app.
            </p>
            <p className="mt-3 text-sm text-slate-600">
              Want to explore snakes?{' '}
              <Link
                to="/playground/snake"
                className="text-emerald-700 underline hover:text-emerald-800"
              >
                Try Snake Morph Playground
              </Link>
              .
            </p>
          </header>

          <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="space-y-6">
              <MorphSelector
                options={geckoMorphOptions}
                selectedMorphId={selectedMorph.id}
                onSelect={handleMorphSelect}
              />

              <div className="hidden sm:block">
                <TraitInfoPanel selectedMorph={selectedMorph} />
              </div>

              <div className="sm:hidden">
                <GeckoVisualizer selectedMorph={selectedMorph} />
              </div>

              <PlaygroundCTA />
            </div>

            <div className="hidden sm:block space-y-4 lg:sticky lg:top-24 lg:self-start">
              <GeckoVisualizer selectedMorph={selectedMorph} />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl text-slate-900">What is the Gecko Morph & Trait Playground?</h2>
            <p className="mt-3 text-slate-700">
              The CareTrack Gecko Morph & Trait Playground is a visual demo that helps reptile
              keepers explore how morph and trait labels can be organized. It is designed for
              education and recordkeeping, not guaranteed breeding prediction.
            </p>
            <p className="mt-3 text-slate-700">
              Use this page to quickly compare gecko morph playground combinations, understand how
              leopard gecko morphs and trait labels can be tracked, and see how a gecko trait
              tracker supports breeder routines. CareTrack pairs this context with offline reptile
              care logs, reminders, and species-specific husbandry guidance.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
