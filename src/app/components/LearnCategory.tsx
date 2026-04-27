import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { categories, getSpeciesByCategory } from '../data/learn-data';
import { ImageWithFallback } from './shared/ImageWithFallback';
import { Footer } from './shared/Footer';
import { TopNav } from './shared/TopNav';
import { usePageMeta } from '../utils/usePageMeta';
import { SITE_URL } from '../utils/seo';

export function LearnCategory() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categories.find((item) => item.id === categoryId);
  const speciesList = getSpeciesByCategory(categoryId ?? '');
  const metaTitle = category
    ? `${category.name} Reptile Care Guides | CareTrack`
    : 'Reptile Care Guides | CareTrack';
  const metaDescription = category
    ? `${category.description}. Explore CareTrack setup, feeding, and health tracking guidance for ${category.name.toLowerCase()} care.`
    : 'CareTrack Learn provides setup, feeding, and health tracking guides for geckos, snakes, amphibians, and tarantulas.';

  usePageMeta({
    title: metaTitle,
    description: metaDescription,
    path: category ? `/learn/category/${category.id}` : undefined,
    type: 'article',
    image: '/og-image.jpeg',
    imageAlt: category
      ? `${category.name} reptile care category page`
      : 'CareTrack Learn category page',
    noindex: !category,
    structuredData: category
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `${category.name} Care Guides`,
            url: `${SITE_URL}/learn/category/${category.id}`,
            description: metaDescription,
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
                name: 'Learn',
                item: `${SITE_URL}/learn`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: category.name,
                item: `${SITE_URL}/learn/category/${category.id}`,
              },
            ],
          },
        ]
      : undefined,
  });

  if (!category) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl text-slate-900 mb-4">Category Not Found</h1>
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
      <header className="pt-24 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/learn"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Learn
          </Link>
          <h1 className="text-4xl sm:text-5xl text-slate-900">{category.name} Care Guides</h1>
          <p className="mt-2 text-lg text-slate-600">{category.description}</p>
        </div>
      </header>

      {/* Hero Image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="aspect-[21/9] relative overflow-hidden rounded-2xl shadow-lg">
          <ImageWithFallback
            src={category.image}
            alt={`${category.name} reptile care hero image with CareTrack husbandry guidance`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
        </div>
      </div>

      {/* Species List */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl text-slate-900 mb-6">Species in this Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {speciesList.map((species) => (
            <Link
              key={species.id}
              to={`/learn/species/${species.id}`}
              className="group h-full block"
            >
              <div className="h-full overflow-hidden rounded-xl border border-slate-200 bg-white hover:shadow-xl transition-shadow flex flex-col">
                <div className="aspect-video relative overflow-hidden shrink-0">
                  <ImageWithFallback
                    src={species.heroImage}
                    alt={`${species.name} species care guide thumbnail with feeding log context in CareTrack`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-slate-900 mb-2">{species.name}</h3>
                  <p className="text-sm text-slate-600 italic mb-3">
                    {species.scientificName}
                  </p>
                  <p className="text-slate-700">{species.summary}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
