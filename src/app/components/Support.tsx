import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Footer } from './shared/Footer';
import { TopNav } from './shared/TopNav';
import { usePageMeta } from '../utils/usePageMeta';
import { SITE_URL } from '../utils/seo';

export function Support() {
  usePageMeta({
    title: 'Reptile Care App Support | CareTrack',
    description:
      'Contact CareTrack support for help with reminders, tracking features, and reptile care workflow questions.',
    path: '/support',
    type: 'website',
    image: '/og-image.jpeg',
    imageAlt: 'CareTrack support page',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'CareTrack Support',
      url: `${SITE_URL}/support`,
      description:
        'Support contact page for the CareTrack pet care tracking application.',
      mainEntity: {
        '@type': 'Organization',
        name: 'CareTrack',
        email: 'info@osacore.com',
      },
    },
  });

  return (
    <div className="min-h-screen bg-white">
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

      {/* Support Content */}
      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl text-slate-900 mb-6">
            CareTrack Support
          </h1>
          <p className="text-slate-600 mb-10">
            Tell us what you need help with and we will send it to our support team.
          </p>

          <section className="rounded-xl border border-slate-200 bg-slate-50 px-6 py-5">
            <p className="text-slate-700">
              To contact our support, please send email to{' '}
              <a
                className="font-medium text-emerald-700 underline hover:text-emerald-800"
                href="mailto:info@osacore.com?subject=CareTrack%20Support"
              >
                info@osacore.com
              </a>
              .
            </p>
          </section>
          <div className="mt-8 text-sm text-slate-600">
            <p>
              Before contacting support, you can check our{' '}
              <Link to="/learn" className="text-emerald-700 underline">
                Learn guides
              </Link>{' '}
              and{' '}
              <Link to="/guides" className="text-emerald-700 underline">
                feature articles
              </Link>{' '}
              in the{' '}
              <Link to="/faq" className="text-emerald-700 underline">
                FAQ
              </Link>{' '}
              and review our{' '}
              <Link to="/privacy" className="text-emerald-700 underline">
                Privacy Policy
              </Link>
              .
            </p>
            <p className="mt-2">
              You can also review our{' '}
              <Link to="/terms" className="text-emerald-700 underline">
                Terms of Service
              </Link>{' '}
              for product usage details.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
