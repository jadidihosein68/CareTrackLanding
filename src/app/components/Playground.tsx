import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { GeckoVisualizer } from './playground/GeckoVisualizer';
import { MorphSelector } from './playground/MorphSelector';
import { TraitInfoPanel } from './playground/TraitInfoPanel';
import { PlaygroundCTA } from './playground/PlaygroundCTA';
import { type GeckoRarity, geckoMorphOptions } from '../data/gecko-playground-catalog';
import { Footer } from './shared/Footer';
import { TopNav } from './shared/TopNav';
import { usePageMeta } from '../utils/usePageMeta';
import { SITE_URL } from '../utils/seo';
import { splitTraitGenetics, splitTraitHeadlineIntoChips } from './playground/geckoRarity';

const SEO_TITLE = 'Gecko Morph & Trait Playground | CareTrack';
const SEO_DESCRIPTION =
  'Try CareTrack\'s interactive gecko morph and trait playground. Select leopard gecko morphs and traits to preview a fun cartoon gecko visualization and learn how CareTrack supports reptile care and breeder records.';

const defaultMorph = geckoMorphOptions[0];
const rarityOrder: GeckoRarity[] = ['common', 'uncommon', 'rare', 'legendary'];

const normalizeGeckoType = (value: string) => {
  const normalized = value.trim();
  if (normalized === 'AFT') {
    return 'AFT Gecko';
  }
  return normalized;
};

const extractGeckoTypes = (speciesValue: string) =>
  speciesValue
    .split('/')
    .map(normalizeGeckoType)
    .filter(Boolean);

const extractTraitTags = (traitGeneticsValue: string) => {
  const headline = splitTraitGenetics(traitGeneticsValue).headline;
  return splitTraitHeadlineIntoChips(headline);
};

const toggleFilterValue = <T,>(currentValues: T[], value: T) => {
  if (currentValues.includes(value)) {
    return currentValues.filter((item) => item !== value);
  }
  return [...currentValues, value];
};

export function Playground() {
  const [selectedMorphId, setSelectedMorphId] = useState<string>(defaultMorph.id);
  const [selectedRarityFilters, setSelectedRarityFilters] = useState<GeckoRarity[]>([]);
  const [selectedTraitFilters, setSelectedTraitFilters] = useState<string[]>([]);
  const [selectedGeckoTypeFilters, setSelectedGeckoTypeFilters] = useState<string[]>([]);

  const rarityFilterOptions = useMemo(() => {
    const raritySet = new Set<GeckoRarity>(geckoMorphOptions.map((option) => option.rarity));
    return rarityOrder.filter((rarity) => raritySet.has(rarity));
  }, []);

  const traitFilterOptions = useMemo(() => {
    const traitSet = new Set<string>();
    geckoMorphOptions.forEach((option) => {
      extractTraitTags(option.traitGenetics).forEach((chip) => traitSet.add(chip));
    });
    return Array.from(traitSet).sort((left, right) => left.localeCompare(right));
  }, []);

  const geckoTypeFilterOptions = useMemo(() => {
    const typeSet = new Set<string>();
    geckoMorphOptions.forEach((option) => {
      extractGeckoTypes(option.species).forEach((typeValue) => typeSet.add(typeValue));
    });
    return Array.from(typeSet).sort((left, right) => left.localeCompare(right));
  }, []);

  const filteredMorphOptions = useMemo(
    () =>
      geckoMorphOptions.filter((option) => {
        if (
          selectedRarityFilters.length > 0 &&
          !selectedRarityFilters.includes(option.rarity)
        ) {
          return false;
        }

        if (selectedTraitFilters.length > 0) {
          const optionTraitTags = extractTraitTags(option.traitGenetics);
          const matchesTraitFilter = selectedTraitFilters.some((trait) =>
            optionTraitTags.includes(trait),
          );
          if (!matchesTraitFilter) {
            return false;
          }
        }

        if (selectedGeckoTypeFilters.length > 0) {
          const optionTypes = extractGeckoTypes(option.species);
          const matchesTypeFilter = selectedGeckoTypeFilters.some((typeValue) =>
            optionTypes.includes(typeValue),
          );
          if (!matchesTypeFilter) {
            return false;
          }
        }

        return true;
      }),
    [selectedRarityFilters, selectedTraitFilters, selectedGeckoTypeFilters],
  );

  useEffect(() => {
    if (filteredMorphOptions.length === 0) {
      return;
    }

    const selectedMorphStillVisible = filteredMorphOptions.some(
      (option) => option.id === selectedMorphId,
    );

    if (!selectedMorphStillVisible) {
      setSelectedMorphId(filteredMorphOptions[0].id);
    }
  }, [filteredMorphOptions, selectedMorphId]);

  const selectedMorph =
    geckoMorphOptions.find((option) => option.id === selectedMorphId) ?? defaultMorph;

  const handleMorphSelect = (morphId: string) => {
    setSelectedMorphId(morphId);
  };

  const toggleRarityFilter = (rarity: GeckoRarity) => {
    setSelectedRarityFilters((currentValues) => toggleFilterValue(currentValues, rarity));
  };

  const toggleTraitFilter = (trait: string) => {
    setSelectedTraitFilters((currentValues) => toggleFilterValue(currentValues, trait));
  };

  const toggleGeckoTypeFilter = (typeValue: string) => {
    setSelectedGeckoTypeFilters((currentValues) => toggleFilterValue(currentValues, typeValue));
  };

  const clearAllFilters = () => {
    setSelectedRarityFilters([]);
    setSelectedTraitFilters([]);
    setSelectedGeckoTypeFilters([]);
  };

  const hasActiveFilters =
    selectedRarityFilters.length > 0 ||
    selectedTraitFilters.length > 0 ||
    selectedGeckoTypeFilters.length > 0;

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
            <h1 className="text-4xl text-slate-900 sm:text-5xl">Gecko Morph & Trait Playground</h1>
            <p className="mt-3 text-base font-medium text-emerald-700">Build your gecko look</p>
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
              <div className="sm:hidden sticky top-20 z-20 rounded-2xl bg-slate-50/95 p-1 backdrop-blur supports-[backdrop-filter]:bg-slate-50/85">
                <GeckoVisualizer selectedMorph={selectedMorph} compact showCaption={false} />
              </div>

              <MorphSelector
                options={filteredMorphOptions}
                selectedMorphId={selectedMorph.id}
                onSelect={handleMorphSelect}
                rarityFilterOptions={rarityFilterOptions}
                selectedRarityFilters={selectedRarityFilters}
                onToggleRarityFilter={toggleRarityFilter}
                traitFilterOptions={traitFilterOptions}
                selectedTraitFilters={selectedTraitFilters}
                onToggleTraitFilter={toggleTraitFilter}
                geckoTypeFilterOptions={geckoTypeFilterOptions}
                selectedGeckoTypeFilters={selectedGeckoTypeFilters}
                onToggleGeckoTypeFilter={toggleGeckoTypeFilter}
                onClearAllFilters={clearAllFilters}
                hasActiveFilters={hasActiveFilters}
                totalCount={geckoMorphOptions.length}
              />

              <div className="space-y-4 sm:hidden">
                <TraitInfoPanel selectedMorph={selectedMorph} />
              </div>

              <PlaygroundCTA />
            </div>

            <div className="hidden sm:block space-y-4 lg:sticky lg:top-24 lg:self-start">
              <GeckoVisualizer selectedMorph={selectedMorph} />
              <TraitInfoPanel selectedMorph={selectedMorph} />
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
            <p className="mt-3 text-slate-700">
              For breeders, learning how labels such as Recessive, Incomplete Dominant, and
              Polygenic are documented helps improve pairing notes and handover quality. This page
              supports faster comparison of leopard gecko genetics and AFT gecko morphs in one
              organized view, then connects those records to your reptile breeding tracker workflow
              in CareTrack. Use it to review trait language, align naming standards, and keep
              cleaner lineage context before moving data into feeding logs, shed history, and
              long-term husbandry tracking.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
