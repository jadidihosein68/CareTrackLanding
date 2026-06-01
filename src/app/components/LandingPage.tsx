import { Link } from 'react-router-dom';
import { ImageWithFallback } from './shared/ImageWithFallback';
import {
  Calendar,
  Bell,
  BookOpen,
  Heart,
  CheckCircle,
  Smartphone,
  WifiOff,
  LineChart,
  ShieldCheck,
} from 'lucide-react';
import { Footer } from './shared/Footer';
import { GooglePlayLogo } from './shared/GooglePlayLogo';
import { TopNav } from './shared/TopNav';
import { usePageMeta } from '../utils/usePageMeta';
import { SITE_URL, toAbsoluteUrl } from '../utils/seo';

const GOOGLE_PLAY_URL =
  'https://play.google.com/store/apps/details?id=com.osacore.caretrack&hl=en-US&ah=UM3NhPrO8Bx2hZGtb5Ty2A9P-eY';
const HERO_IMAGE = '/images/gecko-dashboard.webp';

const popularSpeciesLinks = [
  { to: '/learn/species/leopard-gecko', label: 'Leopard Gecko Care Guide' },
  { to: '/learn/species/crested-gecko', label: 'Crested Gecko Care Guide' },
  { to: '/learn/species/ball-python', label: 'Ball Python Care Guide' },
  { to: '/learn/species/corn-snake', label: 'Corn Snake Care Guide' },
  { to: '/learn/species/whites-tree-frog', label: "White's Tree Frog Care Guide" },
  { to: '/learn/species/pink-toe-tarantula', label: 'Pink Toe Tarantula Care Guide' },
];

const popularGuideLinks = [
  { to: '/guides/leopard-gecko-feeding-schedule', label: 'Leopard Gecko Feeding Schedule Guide' },
  { to: '/guides/crested-gecko-supplement-guide', label: 'Crested Gecko Supplement Guide' },
  { to: '/guides/reptile-care-log-template', label: 'Reptile Care Log Template' },
  { to: '/guides/breeder-record-keeping-gecko-pairings', label: 'Breeder Record-Keeping for Gecko Pairings' },
  { to: '/playground/gecko', label: 'Gecko Morph & Trait Playground' },
];

const homepageImageIds = [
  {
    id: 'leopard-gecko',
    name: 'Leopard Gecko',
    scientificName: 'Eublepharis macularius',
    heroImage:
      'https://images.unsplash.com/photo-1723630717197-ba54729a41ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZW9wYXJkJTIwZ2Vja28lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjcyODMwMjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'crested-gecko',
    name: 'Crested Gecko',
    scientificName: 'Correlophus ciliatus',
    heroImage:
      'https://images.unsplash.com/photo-1636370395847-e0781efa45e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVzdGVkJTIwZ2Vja298ZW58MXx8fHwxNzY3MjgzMDI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'ball-python',
    name: 'Ball Python',
    scientificName: 'Python regius',
    heroImage:
      'https://images.unsplash.com/photo-1529978515127-dba8c80bbf05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxweXRob24lMjBzbmFrZXxlbnwxfHx8fDE3NjcyMDg2NTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'pink-toe-tarantula',
    name: 'Pink Toe Tarantula',
    scientificName: 'Avicularia avicularia',
    heroImage:
      'https://images.unsplash.com/photo-1606540583267-bf3e845c9056?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwdG9lJTIwdGFyYW50dWxhfGVufDF8fHx8MTc2NzI4MzAyNnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
] as const;

const homepageImages = homepageImageIds;

export function LandingPage() {
  usePageMeta({
    title: 'CareTrack: Offline Gecko & Reptile Care Tracker with Reminders',
    description:
      'Free offline gecko and reptile care tracker. Log feeding, shedding, weight, humidity, temperature and get smart reminders. Works without internet. Perfect for leopard geckos, crested geckos and more.',
    ogDescription:
      'Free offline reptile care log with feeding reminders, weight tracking and health records.',
    path: '/',
    type: 'website',
    image: '/og-image.jpg',
    imageAlt: 'CareTrack gecko and exotic pet care tracking app preview.',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'CareTrack',
        url: SITE_URL,
        logo: toAbsoluteUrl('/apple-touch-icon.png'),
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            email: 'info@osacore.com',
            url: `${SITE_URL}/support`,
          },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'CareTrack',
        url: SITE_URL,
        inLanguage: 'en-US',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'CareTrack',
        operatingSystem: 'Android',
        applicationCategory: 'LifestyleApplication',
        url: SITE_URL,
        downloadUrl: GOOGLE_PLAY_URL,
        description:
          'Offline-first pet care tracker for geckos and other exotic pets with feeding logs, reminders, and care guides.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
    ],
  });

  const homepageWebAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'CareTrack',
    url: `${SITE_URL}/`,
    description: 'Offline gecko and reptile care tracker with reminders',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Android',
    downloadUrl: GOOGLE_PLAY_URL,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <TopNav />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl text-slate-900 mb-6">
                  CareTrack: Offline Gecko & Reptile Care Tracker with Reminders
                </h1>
                <p className="text-xl text-slate-600 mb-8">
                  Never forget a feeding or supplement again. CareTrack helps you provide the best care for your gecko with smart reminders and a built-in knowledge base.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <a
                    href={GOOGLE_PLAY_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <GooglePlayLogo className="h-5 w-5 shrink-0" />
                    Get it on Google Play
                  </a>
                </div>
                <p className="mt-4 text-sm text-slate-600">
                  Trusted by 500+ keepers.
                </p>
              </div>
              <div className="relative">
                <ImageWithFallback 
                  src={HERO_IMAGE}
                  alt="Leopard Gecko feeding log on CareTrack app with offline reptile care tracking"
                  className="rounded-2xl shadow-2xl w-full"
                  loading="eager"
                  fetchpriority="high"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl text-slate-900 mb-4">
                Everything You Need for Gecko Care
              </h2>
              <p className="text-xl text-slate-600">
                Designed specifically for reptile owners who want to provide the best care
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl text-slate-900 mb-2">Feeding Tracker</h3>
                <p className="text-slate-600">
                  Log feedings with ease and track food types, quantities, and supplements applied.
                </p>
              </div>

              <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Bell className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl text-slate-900 mb-2">Smart Reminders</h3>
                <p className="text-slate-600">
                  Never miss a feeding or supplement schedule with customizable notifications.
                </p>
              </div>

              <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl text-slate-900 mb-2">Knowledge Base</h3>
                <p className="text-slate-600">
                  Access expert gecko care guides right when you need them, completely offline.
                </p>
              </div>

              <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl text-slate-900 mb-2">Health Logs</h3>
                <p className="text-slate-600">
                  Track shedding, weight, and behavioral observations to monitor your gecko's health.
                </p>
              </div>

              <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="text-xl text-slate-900 mb-2">Multiple Pets</h3>
                <p className="text-slate-600">
                  Manage care for all your geckos in one place with individual profiles.
                </p>
              </div>

              <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-xl text-slate-900 mb-2">Offline First</h3>
                <p className="text-slate-600">
                  All features work without internet. Your data stays private on your device.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl text-slate-900 mb-4">
                Simple, Yet Powerful
              </h2>
              <p className="text-xl text-slate-600">
                Get started in minutes
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl text-slate-900 mb-2">Create a Profile</h3>
                <p className="text-slate-600">
                  Add your gecko's details - name, species, and age
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl text-slate-900 mb-2">Set Your Schedule</h3>
                <p className="text-slate-600">
                  Define feeding and supplement routines that work for you
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl text-slate-900 mb-2">Track with Ease</h3>
                <p className="text-slate-600">
                  One-tap feeding logs and automatic schedule updates
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl text-slate-900 mb-4">
                Practical Reptile Care Articles
              </h2>
              <p className="text-xl text-slate-600">
                Browse focused guides built for daily husbandry workflows.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <article className="rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl text-slate-900 mb-2">
                  <Link to="/guides/gecko-care-logging" className="hover:text-emerald-700 transition-colors">
                    Gecko Care Logging
                  </Link>
                </h3>
                <p className="text-slate-600">
                  Learn what to track every week for feeding, supplements, shedding, and behavior trends.
                </p>
              </article>
              <article className="rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl text-slate-900 mb-2">
                  <Link to="/guides/feeding-reminder-features" className="hover:text-emerald-700 transition-colors">
                    Feeding Reminder Features
                  </Link>
                </h3>
                <p className="text-slate-600">
                  Build reminders that reduce missed feeding tasks and keep supplement routines on schedule.
                </p>
              </article>
              <article className="rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl text-slate-900 mb-2">
                  <Link to="/guides/breeder-recordkeeping" className="hover:text-emerald-700 transition-colors">
                    Breeder Recordkeeping
                  </Link>
                </h3>
                <p className="text-slate-600">
                  Keep profile timelines and husbandry notes organized for breeding projects.
                </p>
              </article>
              <article className="rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl text-slate-900 mb-2">
                  <Link to="/guides/offline-reptile-care-logs" className="hover:text-emerald-700 transition-colors">
                    Offline Reptile Care Logs
                  </Link>
                </h3>
                <p className="text-slate-600">
                  Understand why offline-first care tracking improves reliability and continuity.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl text-slate-900 mb-4">
                Why Offline Care Tracking Improves Daily Husbandry
              </h2>
              <p className="text-lg text-slate-600 max-w-4xl mx-auto">
                Care routines often happen in reptile rooms, rack systems, travel enclosures, and expo settings
                where connectivity is inconsistent. CareTrack keeps logs and reminders available so routine
                execution stays reliable and data remains complete.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <article className="rounded-xl border border-slate-200 bg-white p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <WifiOff className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl text-slate-900 mb-2">Offline Continuity</h3>
                <p className="text-slate-600">
                  Log feeding, supplements, shedding, and observations even when internet is unavailable.
                </p>
              </article>
              <article className="rounded-xl border border-slate-200 bg-white p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl text-slate-900 mb-2">Trend Visibility</h3>
                <p className="text-slate-600">
                  Review timestamped patterns across appetite, behavior, and shedding quality over time.
                </p>
              </article>
              <article className="rounded-xl border border-slate-200 bg-white p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl text-slate-900 mb-2">Routine Control</h3>
                <p className="text-slate-600">
                  Reduce missed tasks with consistent reminders and clear completion history.
                </p>
              </article>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 hover:shadow-lg transition-shadow">
              <p className="text-slate-700 mb-4">
                A single missed meal may be normal. Repeated appetite changes, shedding variance, or behavior shifts
                become meaningful when reviewed in a structured timeline. With consistent records, keepers can compare
                routine changes across weeks and make more confident husbandry decisions.
              </p>
              <p className="text-slate-700">
                Continue with{' '}
                <Link to="/learn" className="text-emerald-700 underline">
                  Learn
                </Link>{' '}
                for species guidance and{' '}
                <Link to="/guides" className="text-emerald-700 underline">
                  Guides
                </Link>{' '}
                for practical workflows.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl text-slate-900 mb-4">Care Tracking by Species</h2>
            <p className="text-lg text-slate-600 mb-8">
              Explore species workflows for feeding logs, reminder cadence, and daily husbandry notes.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {homepageImages.map((species) => (
                <Link
                  key={species.id}
                  to={`/learn/species/${species.id}`}
                  className="group block overflow-hidden rounded-xl border border-slate-200 bg-white hover:shadow-lg transition-shadow"
                >
                  <ImageWithFallback
                    src={species.heroImage}
                    alt={`${species.name} feeding and husbandry tracking interface in CareTrack app`}
                    className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div className="p-4">
                    <h3 className="text-slate-900 transition-colors group-hover:text-emerald-700">
                      {species.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 italic">{species.scientificName}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl text-slate-900 mb-4">
              Popular Species and Workflow Pages
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Use these direct links to jump into species-specific care guidance and practical reptile tracking workflows.
            </p>
            <nav aria-label="Popular internal SEO links" className="grid gap-8 lg:grid-cols-2">
              <div>
                <h3 className="text-xl text-slate-900 mb-3">Species Care Pages</h3>
                <ul className="space-y-2">
                  {popularSpeciesLinks.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className="text-emerald-700 underline hover:text-emerald-800"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl text-slate-900 mb-3">Care Logging Guides</h3>
                <ul className="space-y-2">
                  {popularGuideLinks.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className="text-emerald-700 underline hover:text-emerald-800"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-emerald-600 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl text-white mb-6">
              Ready to Provide Better Care?
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              Join gecko owners who trust CareTrack for their reptile care needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={GOOGLE_PLAY_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-white text-emerald-600 px-8 py-3 rounded-lg hover:bg-emerald-50 transition-colors"
              >
                <GooglePlayLogo className="h-5 w-5 shrink-0" />
                Get it on Google Play
              </a>
            </div>
            <p className="mt-4 text-emerald-100">
              Need details first? Visit our{' '}
              <Link to="/learn" className="underline hover:text-white transition-colors">
                Learn guides
              </Link>{' '}
              and{' '}
              <Link to="/guides" className="underline hover:text-white transition-colors">
                feature articles
              </Link>{' '}
              or check the{' '}
              <Link to="/faq" className="underline hover:text-white transition-colors">
                FAQ
              </Link>{' '}
              or{' '}
              <Link to="/support" className="underline hover:text-white transition-colors">
                contact support
              </Link>
              .
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageWebAppSchema) }}
      />
    </div>
  );
}
