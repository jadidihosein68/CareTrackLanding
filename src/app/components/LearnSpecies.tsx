import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getSpeciesById } from '../data/learn-data';
import { addToRecentlyViewed } from '../utils/recently-viewed';
import { ImageWithFallback } from './shared/ImageWithFallback';
import { Footer } from './shared/Footer';
import { TopNav } from './shared/TopNav';
import { usePageMeta } from '../utils/usePageMeta';

export function LearnSpecies() {
  const { speciesId } = useParams<{ speciesId: string }>();
  const species = getSpeciesById(speciesId ?? '');
  const metaTitle = species
    ? `${species.name} Care Guide | CareTrack Learn`
    : 'Species Guide | CareTrack Learn';
  const metaDescription = species
    ? `CareTrack guidance for ${species.name} (${species.scientificName}) covering setup, feeding, and when to seek help.`
    : 'Explore CareTrack species care guides with setup, feeding, and health guidance.';

  usePageMeta({
    title: metaTitle,
    description: metaDescription,
    path: species ? `/learn/species/${species.id}` : '/learn',
  });

  useEffect(() => {
    if (species) {
      addToRecentlyViewed(species.id);
    }
  }, [species]);

  if (!species) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl text-slate-900 mb-4">Species Not Found</h1>
          <Link
            to="/learn"
            className="text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            Return to Learn
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <TopNav
        rightSlot={(
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        )}
      />

      {/* Header */}
      <header className="pt-24  px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/learn"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Learn
          </Link>
          <h1 className="text-4xl sm:text-5xl text-slate-900">{species.name}</h1>
          <p className="mt-2 text-lg text-slate-600 italic">{species.scientificName}</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="border-l-4 border-amber-300 bg-amber-50/70 px-4 py-3 text-slate-700">
          This is general husbandry information and not veterinary advice. For illness or
          emergencies, contact a qualified exotic veterinarian.
        </div>

        <section className="grid gap-8 lg:grid-cols-2 items-start">
          <div className="relative overflow-hidden rounded-2xl bg-slate-100 shadow-sm h-full">
            <ImageWithFallback
              src={species.heroImage}
              alt={species.name}
              className="w-full h-auto lg:h-full object-cover block"
            />
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl text-slate-900 mb-3">Overview</h2>
              <p className="text-slate-700">{species.overview}</p>
            </div>
            <div>
              <h3 className="text-lg text-slate-900 mb-3">Feeding Behavior</h3>
              <ul className="space-y-3">
                {species.feedingBehavior.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-900 flex-shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg text-slate-900 mb-3">Important Considerations</h3>
              <ul className="space-y-3">
                {species.importantConsiderations.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-900 flex-shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg text-slate-900 mb-3">Supplements & Habitat Notes</h3>
              <ul className="space-y-3">
                {species.supplementsAndHabitat.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-900 flex-shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="pt-10 border-t border-slate-200">
          <h2 className="text-2xl text-slate-900">Best Setup</h2>
          <div className="grid gap-6 md:grid-cols-2 items-stretch mt-6">
            <div className="relative overflow-hidden rounded-2xl bg-slate-100 shadow-sm h-full">
              <ImageWithFallback
                src={species.setupImage}
                alt={`${species.name} setup`}
                className="w-full h-auto lg:h-full object-cover block"
              />
            </div>
            <ul className="space-y-3">
              {species.bestSetup.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-900 flex-shrink-0" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="pt-10 border-t border-amber-200">
          <h2 className="text-2xl text-slate-900">When to Seek Professional Help</h2>
          <div className="mt-3 border-l-4 border-amber-300 pl-4 text-slate-700">
            {species.whenToSeekHelp}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
