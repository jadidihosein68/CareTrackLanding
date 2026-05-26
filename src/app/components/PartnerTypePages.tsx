import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  CalendarRange,
  Dna,
  Mic2,
  Store,
  type LucideIcon,
} from 'lucide-react';
import { Footer } from './shared/Footer';
import { TopNav } from './shared/TopNav';
import { trackEvent } from '../utils/analytics';
import { SITE_URL } from '../utils/seo';
import { usePageMeta } from '../utils/usePageMeta';

type PartnerStep = {
  label: string;
  description: string;
};

type PartnerTypeConfig = {
  slug: 'breeders' | 'reptile-shops' | 'creators' | 'events';
  path: '/partners/breeders' | '/partners/reptile-shops' | '/partners/creators' | '/partners/events';
  breadcrumbLabel: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  heroText: string;
  emphasis: string;
  partnerTypePrefill: string;
  primaryCtaLabel: string;
  needsTitle: string;
  needs: string[];
  modelTitle: string;
  models: Array<{
    name: string;
    description: string;
  }>;
  outcomesTitle: string;
  outcomes: string[];
  stepsTitle: string;
  steps: PartnerStep[];
  disclosure?: string;
  icon: LucideIcon;
};

const stepIndicatorStyles = {
  stepIndicatorSize: 26,
  // Keep active/inactive dot size equal to avoid visual jump on each step switch.
  currentStepIndicatorSize: 26,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 2,
  stepStrokeWidth: 2,
  stepStrokeCurrentColor: '#047857',
  stepStrokeFinishedColor: '#10b981',
  stepStrokeUnFinishedColor: '#cbd5e1',
  separatorFinishedColor: '#10b981',
  separatorUnFinishedColor: '#cbd5e1',
  stepIndicatorFinishedColor: '#10b981',
  stepIndicatorUnFinishedColor: '#e2e8f0',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 12,
  currentStepIndicatorLabelFontSize: 12,
  stepIndicatorLabelCurrentColor: '#047857',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#64748b',
  labelColor: '#475569',
  labelSize: 13,
  currentStepLabelColor: '#0f766e',
};

const partnerConfigs: Record<PartnerTypeConfig['slug'], PartnerTypeConfig> = {
  breeders: {
    slug: 'breeders',
    path: '/partners/breeders',
    breadcrumbLabel: 'Breeders',
    seoTitle: 'CareTrack for Reptile Breeders | Partner Workflows',
    seoDescription:
      'Partner with CareTrack as a reptile breeder to manage pairings, clutch logs, hatchling care records, morph tracking, and buyer handover history.',
    h1: 'CareTrack Partnership for Reptile Breeders',
    heroText:
      'Support buyers with better continuity after handover while keeping your breeding workflow organized in one practical system.',
    emphasis:
      'Built for pairing records, clutch history, hatchling tracking, morph and trait notes, and digital care handover.',
    partnerTypePrefill: 'Breeder',
    primaryCtaLabel: 'Apply as a Breeder Partner',
    needsTitle: 'Breeder Priorities We Support',
    needs: [
      'Structured pairing and breeding history records',
      'Clutch and hatchling tracking with date-based context',
      'Morph and trait notes tied to each reptile profile',
      'Buyer handover history to reduce lost care details',
      'Professional partner presentation during sales and inquiries',
    ],
    modelTitle: 'Recommended Breeder Collaboration Models',
    models: [
      {
        name: 'Breeder Report',
        description: 'Provide buyers with a structured digital handover history before transfer.',
      },
      {
        name: 'Breeding Record Support',
        description: 'Use CareTrack for pairings, clutch records, hatchlings, and routine care continuity.',
      },
      {
        name: 'QR Code Handover',
        description: 'Share a fast onboarding path so owners continue records from day one.',
      },
      {
        name: 'Featured Partner Profile',
        description: 'Showcase responsible breeder workflows and care transparency.',
      },
    ],
    outcomesTitle: 'Expected Collaboration Outcomes',
    outcomes: [
      'Clearer buyer handover and fewer repeated care questions',
      'Higher confidence during reptile transfer and onboarding',
      'More consistent breeding documentation across projects',
    ],
    stepsTitle: 'Breeder Collaboration Steps',
    steps: [
      {
        label: 'Scope',
        description: 'Map your breeding workflow goals and current handover process.',
      },
      {
        label: 'Records',
        description: 'Align pairings, clutch logs, hatchling data, and morph notes structure.',
      },
      {
        label: 'Handover',
        description: 'Define a repeatable buyer handover format with care continuity context.',
      },
      {
        label: 'Launch',
        description: 'Roll out collaboration flow and monitor adoption quality with your team.',
      },
    ],
    icon: Dna,
  },
  'reptile-shops': {
    slug: 'reptile-shops',
    path: '/partners/reptile-shops',
    breadcrumbLabel: 'Reptile Shops',
    seoTitle: 'CareTrack for Reptile Shops | Customer Care Partnership',
    seoDescription:
      'Partner with CareTrack as a reptile shop to improve post-sale support using QR handover, care reminders, and practical reptile care records.',
    h1: 'CareTrack Partnership for Reptile Shops',
    heroText:
      'Turn point-of-sale care advice into a consistent post-sale support workflow that buyers can continue at home.',
    emphasis:
      'Designed for QR onboarding, repeatable care guidance, and stronger after-sale customer confidence.',
    partnerTypePrefill: 'Reptile Shop',
    primaryCtaLabel: 'Apply as a Reptile Shop Partner',
    needsTitle: 'Shop Priorities We Support',
    needs: [
      'Simple onboarding for first-time reptile buyers',
      'Reduced repeated care questions after purchase',
      'Consistent customer education for feeding, sheds, and routine logs',
      'Professional checkout and enclosure-card support with QR workflows',
      'Better continuity between in-store guidance and at-home care',
    ],
    modelTitle: 'Recommended Shop Collaboration Models',
    models: [
      {
        name: 'Shop Display Card',
        description: 'Add a CareTrack QR card near reptile displays and checkout points.',
      },
      {
        name: 'QR Code Handover',
        description: 'Attach a direct onboarding path on receipts or enclosure labels.',
      },
      {
        name: 'Co-Branded Care Guide',
        description: 'Deliver practical, consistent care guidance with your store identity.',
      },
      {
        name: 'Referral Code',
        description: 'Track partner-driven buyer onboarding through a dedicated link.',
      },
    ],
    outcomesTitle: 'Expected Collaboration Outcomes',
    outcomes: [
      'Smoother customer handover process from purchase to home setup',
      'More structured support with less repetitive support overhead',
      'Improved trust and retention with reptile-focused buyers',
    ],
    stepsTitle: 'Shop Collaboration Steps',
    steps: [
      {
        label: 'Audit',
        description: 'Review buyer onboarding moments at checkout and enclosure touchpoints.',
      },
      {
        label: 'QR Setup',
        description: 'Place QR and guide assets on receipts, cards, and key store surfaces.',
      },
      {
        label: 'Team Enablement',
        description: 'Train staff on a consistent messaging flow for post-sale care continuity.',
      },
      {
        label: 'Optimization',
        description: 'Collect feedback and refine guidance based on customer support patterns.',
      },
    ],
    icon: Store,
  },
  creators: {
    slug: 'creators',
    path: '/partners/creators',
    breadcrumbLabel: 'Creators',
    seoTitle: 'CareTrack for Reptile Creators and Educators | Partner Program',
    seoDescription:
      'Partner with CareTrack as a reptile creator or educator to demonstrate practical husbandry routines, breeding context, and responsible ownership workflows.',
    h1: 'CareTrack Partnership for Reptile Creators and Educators',
    heroText:
      'Use a practical tool for care demonstration content instead of generic app promotion, with focus on responsible husbandry habits.',
    emphasis:
      'Strong fit for routine videos, educational walkthroughs, breeding updates, and care continuity campaigns.',
    partnerTypePrefill: 'Reptile Creator / Educator',
    primaryCtaLabel: 'Apply as a Creator Partner',
    needsTitle: 'Creator Priorities We Support',
    needs: [
      'Clear demonstration workflows for feeding, sheds, and record habits',
      'Educational storytelling around breeding and care continuity',
      'Responsible audience onboarding with practical tools, not hype',
      'Campaign structures that fit tutorials, reels, and long-form content',
      'Partner formats suited for referral links and educational series',
    ],
    modelTitle: 'Recommended Creator Collaboration Models',
    models: [
      {
        name: 'Educational Creator Campaign',
        description: 'Build practical care-content series centered on real husbandry routines.',
      },
      {
        name: 'Referral Code',
        description: 'Use tracked links that align with transparent educational content.',
      },
      {
        name: 'Co-Branded Care Guide',
        description: 'Provide structured resources your audience can apply immediately.',
      },
      {
        name: 'Featured Partner Profile',
        description: 'Highlight creator-led responsible reptile care initiatives.',
      },
    ],
    outcomesTitle: 'Expected Collaboration Outcomes',
    outcomes: [
      'Higher-quality educational content with practical user takeaways',
      'More consistent onboarding from content to real care routines',
      'Stronger trust through transparent, responsible collaboration formats',
    ],
    stepsTitle: 'Creator Collaboration Steps',
    steps: [
      {
        label: 'Plan',
        description: 'Define content goals and target care workflows to demonstrate.',
      },
      {
        label: 'Creative',
        description: 'Build practical episodes around routine logs, tracking habits, and setup guidance.',
      },
      {
        label: 'Publish',
        description: 'Launch content with clear disclosure and consistent partner messaging.',
      },
      {
        label: 'Measure',
        description: 'Review audience adoption signals and improve educational campaign quality.',
      },
    ],
    disclosure:
      'Sponsored, gifted, referral, or paid collaborations should be clearly disclosed by creators according to applicable advertising and platform rules.',
    icon: Mic2,
  },
  events: {
    slug: 'events',
    path: '/partners/events',
    breadcrumbLabel: 'Events',
    seoTitle: 'CareTrack for Reptile Expos and Events | Collaboration Program',
    seoDescription:
      'Partner with CareTrack for reptile expos and events through QR campaigns, booth demos, breeder handover education, and practical care continuity workflows.',
    h1: 'CareTrack Partnership for Reptile Expos and Events',
    heroText:
      'Support attendees with care continuity tools that extend beyond event day, from breeder demos to practical onboarding.',
    emphasis:
      'Built for booth education, QR campaigns, event activations, and partner onboarding in reptile communities.',
    partnerTypePrefill: 'Reptile Expo / Event',
    primaryCtaLabel: 'Apply as an Event Partner',
    needsTitle: 'Event Priorities We Support',
    needs: [
      'Attendee onboarding that continues after the event ends',
      'Educational booth workflows with practical care guidance',
      'Consistent breeder/shop handover messaging at scale',
      'Event-specific QR activations and campaign tracking',
      'Responsible care awareness initiatives across partner groups',
    ],
    modelTitle: 'Recommended Event Collaboration Models',
    models: [
      {
        name: 'Event Collaboration',
        description: 'Coordinate event booths, demos, and attendee education touchpoints.',
      },
      {
        name: 'QR Code Handover',
        description: 'Deploy event-focused onboarding links for partner booths and sessions.',
      },
      {
        name: 'Co-Branded Care Guide',
        description: 'Provide practical post-event care continuity resources.',
      },
      {
        name: 'Featured Partner Profile',
        description: 'Highlight responsible event programs and education campaigns.',
      },
    ],
    outcomesTitle: 'Expected Collaboration Outcomes',
    outcomes: [
      'Stronger attendee value beyond in-person event interactions',
      'Better continuity from booth education to at-home reptile care',
      'Clearer partner alignment across breeders, shops, and creators',
    ],
    stepsTitle: 'Event Collaboration Steps',
    steps: [
      {
        label: 'Design',
        description: 'Define event outcomes for education, onboarding, and partner alignment.',
      },
      {
        label: 'Activation',
        description: 'Deploy booth demos, QR campaigns, and handover-oriented touchpoints.',
      },
      {
        label: 'Engagement',
        description: 'Coordinate breeders, shops, and creators for consistent attendee guidance.',
      },
      {
        label: 'Post-Event',
        description: 'Extend care continuity with follow-up resources after event day.',
      },
    ],
    icon: CalendarRange,
  },
};

function PartnerTypePage({ config }: { config: PartnerTypeConfig }) {
  const Icon = config.icon;
  const applicationLink = `/partners?partnerType=${encodeURIComponent(config.partnerTypePrefill)}#partner-form`;
  const [activeStep, setActiveStep] = useState(0);
  const [StepIndicatorComponent, setStepIndicatorComponent] = useState<null | ((props: any) => JSX.Element)>(null);
  const stepLabels = useMemo(() => config.steps.map((step) => step.label), [config.steps]);
  const selectedStep = config.steps[activeStep] ?? config.steps[0];

  usePageMeta({
    title: config.seoTitle,
    description: config.seoDescription,
    path: config.path,
    type: 'website',
    image: '/og-image.jpg',
    imageAlt: `${config.breadcrumbLabel} partnership page in CareTrack`,
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: config.h1,
        url: `${SITE_URL}${config.path}`,
        description: config.seoDescription,
        isPartOf: {
          '@type': 'WebSite',
          name: 'CareTrack',
          url: SITE_URL,
        },
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
            name: 'Partners',
            item: `${SITE_URL}/partners`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: config.breadcrumbLabel,
            item: `${SITE_URL}${config.path}`,
          },
        ],
      },
    ],
  });

  useEffect(() => {
    trackEvent('partners_segment_page_view', { segment: config.slug });
  }, [config.slug]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    // react-native-step-indicator expects a Node-style global in web runtime.
    if (typeof (globalThis as typeof globalThis & { global?: typeof globalThis }).global === 'undefined') {
      (globalThis as typeof globalThis & { global?: typeof globalThis }).global = globalThis;
    }

    let isMounted = true;
    import('react-native-step-indicator')
      .then((module) => {
        if (isMounted) {
          setStepIndicatorComponent(() => module.default as (props: any) => JSX.Element);
        }
      })
      .catch(() => {
        setStepIndicatorComponent(null);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setActiveStep(0);
  }, [config.slug]);

  return (
    <div className="min-h-screen bg-slate-50">
      <TopNav
        rightSlot={(
          <Link
            to="/partners"
            className="flex items-center gap-2 text-slate-600 transition-colors hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Partners
          </Link>
        )}
      />

      <main className="px-4 pb-24 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
            <Link to="/" className="text-slate-600 underline hover:text-slate-900">
              Home
            </Link>{' '}
            /{' '}
            <Link to="/partners" className="text-slate-600 underline hover:text-slate-900">
              Partners
            </Link>{' '}
            / <span className="text-slate-900">{config.breadcrumbLabel}</span>
          </nav>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start">
              <header className="space-y-4">
                <p className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-emerald-700">
                  Partner Type
                </p>
                <h1 className="text-4xl text-slate-900 sm:text-5xl">{config.h1}</h1>
                <p className="text-lg text-slate-700">{config.heroText}</p>
                <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700">
                  {config.emphasis}
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    to={applicationLink}
                    onClick={() =>
                      trackEvent('partners_segment_primary_cta_click', {
                        segment: config.slug,
                        partner_type: config.partnerTypePrefill,
                      })
                    }
                    className="rounded-lg bg-emerald-600 px-5 py-3 text-center text-white transition-colors hover:bg-emerald-700"
                  >
                    {config.primaryCtaLabel}
                  </Link>
                  <Link
                    to="/partners"
                    onClick={() => trackEvent('partners_segment_secondary_cta_click', { segment: config.slug })}
                    className="rounded-lg border border-slate-300 px-5 py-3 text-center text-slate-800 transition-colors hover:bg-slate-100"
                  >
                    View All Partner Types
                  </Link>
                </div>
              </header>

              <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-start gap-3">
                  <span className="inline-flex rounded-lg border border-slate-300 bg-white p-2 text-slate-700">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Partner Focus</p>
                    <p className="mt-1 text-sm text-slate-700">{config.breadcrumbLabel}</p>
                  </div>
                </div>
                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
                  Every collaboration should support practical care continuity and responsible reptile
                  ownership after purchase, handover, education, or event interactions.
                </div>
              </aside>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-3xl text-slate-900">{config.stepsTitle}</h2>
            <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:min-h-[220px]">
                {StepIndicatorComponent ? (
                  <StepIndicatorComponent
                    direction="vertical"
                    currentPosition={activeStep}
                    stepCount={config.steps.length}
                    labels={stepLabels}
                    customStyles={stepIndicatorStyles}
                    onPress={(position: number) => {
                      setActiveStep(position);
                      trackEvent('partners_segment_step_change', {
                        segment: config.slug,
                        step: config.steps[position]?.label ?? String(position + 1),
                      });
                    }}
                  />
                ) : (
                  <ol className="space-y-2">
                    {config.steps.map((step, index) => (
                      <li
                        key={step.label}
                        className={[
                          'rounded-lg border px-3 py-2 text-sm',
                          index === activeStep
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                            : 'border-slate-200 bg-white text-slate-700',
                        ].join(' ')}
                      >
                        {index + 1}. {step.label}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
              <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5 lg:min-h-[220px]">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Step {activeStep + 1} of {config.steps.length}
                </p>
                <h3 className="mt-2 text-2xl text-slate-900">{selectedStep.label}</h3>
                <p className="mt-3 text-slate-700">{selectedStep.description}</p>
              </article>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-3xl text-slate-900">{config.needsTitle}</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {config.needs.map((item) => (
                <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-3xl text-slate-900">{config.modelTitle}</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {config.models.map((model) => (
                <article key={model.name} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="text-lg text-slate-900">{model.name}</h3>
                  <p className="mt-2 text-slate-700">{model.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-3xl text-slate-900">{config.outcomesTitle}</h2>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-slate-700">
              {config.outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {config.disclosure ? (
              <p className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {config.disclosure}
              </p>
            ) : null}
          </section>

          <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl text-slate-900">Start Collaboration Planning</h2>
            <p className="mt-2 text-slate-700">
              Share your collaboration goals and CareTrack will review a practical partnership format.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Link
                to={applicationLink}
                onClick={() =>
                  trackEvent('partners_segment_primary_cta_click', {
                    segment: config.slug,
                    partner_type: config.partnerTypePrefill,
                    placement: 'bottom_cta',
                  })
                }
                className="rounded-lg bg-emerald-600 px-5 py-3 text-center text-white transition-colors hover:bg-emerald-700"
              >
                {config.primaryCtaLabel}
              </Link>
              <Link
                to="/partners"
                className="rounded-lg border border-slate-300 px-5 py-3 text-center text-slate-800 transition-colors hover:bg-emerald-100"
              >
                Return to Partner Hub
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export function PartnerBreedersPage() {
  return <PartnerTypePage config={partnerConfigs.breeders} />;
}

export function PartnerReptileShopsPage() {
  return <PartnerTypePage config={partnerConfigs['reptile-shops']} />;
}

export function PartnerCreatorsPage() {
  return <PartnerTypePage config={partnerConfigs.creators} />;
}

export function PartnerEventsPage() {
  return <PartnerTypePage config={partnerConfigs.events} />;
}
