import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Footer } from './shared/Footer';
import { TopNav } from './shared/TopNav';
import { usePageMeta } from '../utils/usePageMeta';
import { SITE_URL } from '../utils/seo';

const faqItems = [
  {
    question: 'How does CareTrack handle reptile feeding reminders?',
    answer:
      'CareTrack lets you set recurring reminders for feeding and supplements, then log completion so you can review routine consistency over time.',
  },
  {
    question: 'Can I use CareTrack for offline reptile care logs?',
    answer:
      'Yes. CareTrack is built as an offline-first app, so core logging workflows remain available even when your device has limited connectivity.',
  },
  {
    question: 'Can breeders use CareTrack for recordkeeping?',
    answer:
      'Yes. Many keepers use profile timelines, feeding history, and care observations as part of breeder recordkeeping workflows.',
  },
  {
    question: 'Does CareTrack provide veterinary medical advice?',
    answer:
      'No. CareTrack provides husbandry tracking and educational guidance only. For illness or emergencies, contact a qualified exotic veterinarian.',
  },
];

export function Faq() {
  usePageMeta({
    title: 'CareTrack FAQ | Reptile Care Tracker Support Questions',
    description:
      'Read answers about CareTrack feeding reminders, offline reptile care logs, breeder recordkeeping workflows, and support.',
    path: '/faq',
    type: 'article',
    image: '/og-image.jpeg',
    imageAlt: 'CareTrack frequently asked questions page',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
      url: `${SITE_URL}/faq`,
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl text-slate-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-slate-600 mb-10">
            Common questions about CareTrack reminders, offline logging, and support.
          </p>

          <div className="space-y-6">
            {faqItems.map((item) => (
              <section
                key={item.question}
                className="rounded-xl border border-slate-200 bg-white p-6"
              >
                <h2 className="text-xl text-slate-900 mb-3">{item.question}</h2>
                <p className="text-slate-700">{item.answer}</p>
              </section>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6 text-slate-700">
            <p>
              Need direct help? Visit{' '}
              <Link to="/support" className="text-emerald-700 underline">
                Support
              </Link>{' '}
              or browse our{' '}
              <Link to="/guides" className="text-emerald-700 underline">
                Guides
              </Link>{' '}
              for feature-focused articles.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
