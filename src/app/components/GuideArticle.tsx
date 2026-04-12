import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Footer } from './shared/Footer';
import { TopNav } from './shared/TopNav';
import { usePageMeta } from '../utils/usePageMeta';
import { SITE_URL } from '../utils/seo';
import { getSeoGuideById } from '../data/seo-guides';

export function GuideArticle() {
  const { guideId } = useParams<{ guideId: string }>();
  const guide = getSeoGuideById(guideId ?? '');

  const title = guide ? `${guide.title} | CareTrack` : 'Guide Not Found | CareTrack';
  const description = guide
    ? guide.description
    : 'The requested CareTrack guide could not be found.';

  usePageMeta({
    title,
    description,
    path: guide ? `/guides/${guide.id}` : '/guides',
    type: 'article',
    image: '/og-image.jpeg',
    imageAlt: guide ? `${guide.title} article on CareTrack` : 'CareTrack guide page',
    noindex: !guide,
    structuredData: guide
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: guide.title,
            description: guide.description,
            dateModified: guide.updated,
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
            mainEntityOfPage: `${SITE_URL}/guides/${guide.id}`,
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
                name: 'Guides',
                item: `${SITE_URL}/guides`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: guide.title,
                item: `${SITE_URL}/guides/${guide.id}`,
              },
            ],
          },
        ]
      : undefined,
  });

  if (!guide) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl text-slate-900 mb-4">Guide Not Found</h1>
          <Link to="/guides" className="text-emerald-600 hover:text-emerald-700 underline">
            Return to Guides
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <TopNav
        rightSlot={(
          <Link
            to="/guides"
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Guides
          </Link>
        )}
      />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto">
          <header className="mb-10">
            <p className="text-sm text-slate-500 mb-3">Updated: {guide.updated}</p>
            <h1 className="text-4xl sm:text-5xl text-slate-900 mb-4">{guide.title}</h1>
            <p className="text-lg text-slate-600">{guide.summary}</p>
          </header>

          <div className="space-y-10">
            {guide.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl text-slate-900 mb-4">{section.heading}</h2>
                <div className="space-y-4 text-slate-700">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.bullets ? (
                  <ul className="mt-4 list-disc pl-6 space-y-2 text-slate-700">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <footer className="mt-12 pt-8 border-t border-slate-200 text-slate-700">
            <p>
              Continue with{' '}
              <Link to="/learn" className="text-emerald-700 underline">
                Learn guides
              </Link>{' '}
              or visit{' '}
              <Link to="/support" className="text-emerald-700 underline">
                Support
              </Link>{' '}
              for product help.
            </p>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
}
