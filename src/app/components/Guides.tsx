import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Footer } from './shared/Footer';
import { TopNav } from './shared/TopNav';
import { usePageMeta } from '../utils/usePageMeta';
import { SITE_URL } from '../utils/seo';
import { seoGuides } from '../data/seo-guides';
import { getSpeciesById } from '../data/learn-data';

export function Guides() {
  usePageMeta({
    title: 'Reptile Care Guides and Templates | CareTrack',
    description:
      'Read in-depth guides for gecko care logs, reptile feeding reminders, breeder recordkeeping, and offline husbandry tracking with CareTrack.',
    path: '/guides',
    type: 'article',
    image: '/og-image.jpeg',
    imageAlt: 'CareTrack guides and feature articles',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'CareTrack Guides',
      description:
        'Feature and husbandry articles about gecko care logging, reminders, and offline reptile tracking.',
      url: `${SITE_URL}/guides`,
      hasPart: seoGuides.map((guide) => ({
        '@type': 'CreativeWork',
        name: guide.title,
        url: `${SITE_URL}/guides/${guide.id}`,
      })),
    },
  });

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

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl text-slate-900 mb-4">
            Reptile Care Guides and Templates
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mb-10">
            Explore practical articles about reptile care logging, reminder workflows,
            and recordkeeping habits that improve day-to-day husbandry.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {seoGuides.map((guide) => (
              <article
                key={guide.id}
                className="rounded-xl border border-slate-200 bg-white p-6 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-2xl text-slate-900 mb-3">
                  <Link
                    to={`/guides/${guide.id}`}
                    className="hover:text-emerald-700 transition-colors"
                  >
                    {guide.title}
                  </Link>
                </h2>
                <p className="text-slate-700 mb-4">{guide.summary}</p>
                {guide.relatedSpeciesIds.length > 0 ? (
                  <ul className="mb-4 flex flex-wrap gap-2">
                    {guide.relatedSpeciesIds
                      .map((speciesId) => getSpeciesById(speciesId))
                      .filter(
                        (
                          species,
                        ): species is NonNullable<ReturnType<typeof getSpeciesById>> =>
                          Boolean(species),
                      )
                      .map((species) => (
                        <li key={species.id}>
                          <Link
                            to={`/learn/species/${species.id}`}
                            className="inline-flex rounded-full border border-slate-300 px-3 py-1 text-xs text-slate-700 hover:border-emerald-600 hover:text-emerald-700 transition-colors"
                          >
                            {species.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                ) : null}
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  <span>Updated: {guide.updated}</span>
                  <Link
                    to={`/guides/${guide.id}`}
                    className="text-emerald-700 hover:text-emerald-800 underline"
                  >
                    Read {guide.title}
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-2xl text-slate-900 mb-3">Need Product Help?</h2>
            <p className="text-slate-700">
              Check our{' '}
              <Link to="/faq" className="text-emerald-700 underline">
                FAQ
              </Link>{' '}
              or contact{' '}
              <Link to="/support" className="text-emerald-700 underline">
                Support
              </Link>{' '}
              for CareTrack-specific questions.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
