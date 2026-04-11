import { Link, useLocation } from 'react-router-dom';
import { Footer } from './shared/Footer';
import { TopNav } from './shared/TopNav';
import { usePageMeta } from '../utils/usePageMeta';

export function NotFound() {
  const location = useLocation();

  usePageMeta({
    title: 'Page Not Found | CareTrack',
    description:
      'The page you requested could not be found. Browse CareTrack home, learn guides, or support.',
    path: location.pathname,
    noindex: true,
    robots: 'noindex, nofollow',
  });

  return (
    <div className="min-h-screen bg-white">
      <TopNav />
      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl text-slate-900 mb-6">Page Not Found</h1>
          <p className="text-slate-600 mb-8">
            The URL does not match an available page. Use one of the links below.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/learn"
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Learn
            </Link>
            <Link
              to="/support"
              className="border border-slate-300 text-slate-900 px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Support
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
