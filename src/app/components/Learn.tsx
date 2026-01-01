import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from './shared/ImageWithFallback';
import { categories, speciesData, type SpeciesData } from '../data/learn-data';
import { getRecentlyViewed } from '../utils/recently-viewed';
import { Footer } from './shared/Footer';
import { TopNav } from './shared/TopNav';

export function Learn() {
  const recentSpecies = getRecentlyViewed()
    .map((item) => speciesData.find((species) => species.id === item.speciesId))
    .filter((species): species is SpeciesData => Boolean(species))
    .slice(0, 5);

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
      <header className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl text-slate-900 mb-4">Learn</h1>
          <p className="text-lg text-slate-600">
            Professional care guidance for geckos and other exotic pets.
          </p>
        </div>
      </header>

      <main className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="border-l-4 border-amber-300 bg-amber-50/70 px-4 py-3 text-slate-700">
            This content is general husbandry information and not veterinary advice. For illness
            or emergencies, contact a qualified exotic veterinarian.
          </div>

          {recentSpecies.length > 0 && (
            <section>
              <h2 className="text-2xl text-slate-900 mb-6">Recently Viewed</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-stretch">
                {recentSpecies.map((species) => (
                  <Link
                    key={species.id}
                    to={`/learn/species/${species.id}`}
                    className="group h-full block"
                  >
                    <div className="h-full overflow-hidden rounded-xl border border-slate-200 bg-white hover:shadow-lg transition-shadow flex flex-col">
                      <div className="aspect-video relative overflow-hidden shrink-0">
                        <ImageWithFallback
                          src={species.heroImage}
                          alt={species.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="text-slate-900">{species.name}</h3>
                        <p className="text-sm text-slate-600 mt-1">
                          {species.scientificName}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="text-2xl text-slate-900 mb-6">Browse by Animal Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/learn/category/${category.id}`}
                  className="group h-full block"
                >
                  <div className="h-full overflow-hidden rounded-xl border border-slate-200 bg-white hover:shadow-xl transition-shadow">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <ImageWithFallback
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-white">{category.name}</h3>
                        <p className="text-sm text-white/90 mt-1">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-xl text-slate-900 mb-3">About This Content</h3>
            <p className="text-slate-700 mb-4">
              All care guidance is grounded in reputable veterinary and evidence-based sources.
              We use ranges and "depends on" wording to avoid absolute claims.
            </p>
            <p className="text-slate-700">
              Content is stored locally for offline access in the CareTrack app.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
