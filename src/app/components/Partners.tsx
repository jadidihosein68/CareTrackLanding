import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  CalendarRange,
  CheckCircle2,
  Dna,
  Mic2,
  QrCode,
  ShieldCheck,
  Smartphone,
  Store,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { Footer } from './shared/Footer';
import { GooglePlayLogo } from './shared/GooglePlayLogo';
import { TopNav } from './shared/TopNav';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { trackEvent } from '../utils/analytics';
import { SITE_URL } from '../utils/seo';
import { usePageMeta } from '../utils/usePageMeta';

const GOOGLE_PLAY_URL =
  'https://play.google.com/store/apps/details?id=com.osacore.caretrack&hl=en-US&ah=UM3NhPrO8Bx2hZGtb5Ty2A9P-eY';

const PARTNER_PAGE_TITLE = 'CareTrack Partners | Reptile Breeders, Shops, Creators and Events';
const PARTNER_PAGE_DESCRIPTION =
  'Partner with CareTrack to help reptile buyers continue better care with feeding reminders, shed and weight logs, breeding records, morph tracking, and breeder handover reports.';

const partnerTypeOptions = [
  'Breeder',
  'Reptile Shop',
  'Reptile Creator / Educator',
  'Reptile Expo / Event',
  'Small Reptile Business',
  'Other',
] as const;

const reptileFocusOptions = [
  'Geckos',
  'Snakes',
  'Bearded Dragons',
  'Skinks',
  'Tortoises',
  'Mixed Reptiles',
  'Other',
] as const;

const collaborationModelOptions = [
  'QR code handover',
  'Breeder report',
  'Breeding record support',
  'Co-branded care guide',
  'Referral code',
  'Shop display card',
  'Event collaboration',
  'Featured partner profile',
  'Creator campaign',
  'Other',
] as const;

type IconCard = {
  title: string;
  body: string;
  icon: LucideIcon;
  path: string;
};

const audienceCards: IconCard[] = [
  {
    title: 'Reptile Breeders',
    body:
      'Manage breeding records, pairings, clutch details, hatchling information, morphs, traits, care history, and buyer handover records in one place.',
    icon: Dna,
    path: '/partners/breeders',
  },
  {
    title: 'Reptile Shops',
    body:
      'Help buyers continue proper care after purchase with digital care records, reminders, QR handover, and structured after-sale support.',
    icon: Store,
    path: '/partners/reptile-shops',
  },
  {
    title: 'Reptile Creators and Educators',
    body:
      'Use CareTrack to educate your audience with practical reptile care routines, tracking workflows, breeding examples, and responsible husbandry content.',
    icon: Mic2,
    path: '/partners/creators',
  },
  {
    title: 'Reptile Expos and Events',
    body:
      'Use CareTrack in events, booths, demos, QR campaigns, and educational activities that help keepers continue care after meeting breeders or shops.',
    icon: CalendarRange,
    path: '/partners/events',
  },
];

const problemItems = [
  'Feeding history can be forgotten after purchase.',
  'Shed and weight records are rarely passed to new owners.',
  'Breeding and morph details may be scattered or incomplete.',
  'Shops repeat the same basic care guidance again and again.',
  'New owners often lack a simple way to continue tracking care.',
  'Creators need practical tools to demonstrate good care habits.',
];

const workflowSteps = ['Pairing', 'Clutch', 'Hatchlings', 'Care Records', 'Buyer Handover'];

const workflowBullets = [
  'Track breeding pairs and breeding history.',
  'Record clutch and hatchling information.',
  'Maintain morph and trait notes.',
  'Keep care history connected to each reptile.',
  'Prepare buyer handover records when the reptile moves to a new owner.',
];

const reportPreviewItems = [
  'Reptile profile',
  'Species',
  'Morph and traits',
  'Date of birth or estimated age',
  'Feeding history',
  'Shed history',
  'Weight records',
  'Breeding or parent notes where applicable',
  'Care notes',
  'Recommended next actions',
  'QR code or import link',
];

const shopExamples = [
  'Add a CareTrack QR code to receipts or enclosure cards.',
  'Provide a digital care starting point after purchase.',
  'Share basic care tracking guidance with customers.',
  'Reduce repeated care questions after the sale.',
  'Improve buyer confidence and after-sale experience.',
];

const creatorUseCases = [
  'Care routine videos',
  'Breeding project updates',
  'Reptile setup tours',
  'Feeding and shed tracking demonstrations',
  'Buyer education content',
  'Responsible reptile care campaigns',
];

const eventUseCases = [
  'QR code posters for event booths',
  'Care tracking demos',
  'Breeder handover demonstrations',
  'Creator education sessions',
  'Event-specific partner links',
  'Reptile care awareness campaigns',
];

const speciesChips = ['Geckos', 'Snakes', 'Bearded Dragons', 'Skinks', 'Tortoises', 'Other Reptiles'];

const collaborationModels = [
  {
    name: 'QR Code Handover',
    description: 'Partner gives buyers a QR code to download CareTrack or access a care handover flow.',
    bestFor: 'Shops, breeders, expos',
  },
  {
    name: 'Breeder Report',
    description: 'Breeder shares structured care and breeding history with the new owner.',
    bestFor: 'Breeders',
  },
  {
    name: 'Breeding Record Support',
    description: 'Breeders use CareTrack to manage pairings, clutch records, offspring, morphs, and traits.',
    bestFor: 'Breeders, serious keepers',
  },
  {
    name: 'Co-Branded Care Guide',
    description: 'CareTrack creates a digital guide or page with partner branding.',
    bestFor: 'Shops, creators, events',
  },
  {
    name: 'Referral Code',
    description: 'Partner receives a unique referral code or tracked link.',
    bestFor: 'Breeders, creators, shops',
  },
  {
    name: 'Shop Display Card',
    description: 'Shop displays a CareTrack QR card near reptile sections or checkout.',
    bestFor: 'Reptile shops',
  },
  {
    name: 'Event Collaboration',
    description: 'CareTrack supports reptile expos, booths, demos, or QR campaigns.',
    bestFor: 'Expos, small businesses',
  },
  {
    name: 'Featured Partner Profile',
    description: 'Partner is featured on the CareTrack website or campaign page.',
    bestFor: 'Breeders, shops, creators',
  },
  {
    name: 'Educational Creator Campaign',
    description: 'Creator demonstrates CareTrack in care, breeding, or setup content.',
    bestFor: 'Creators, educators',
  },
];

const trustCards: IconCard[] = [
  {
    title: 'Android-focused app',
    body: 'Purpose-built for mobile reptile routines and team handovers.',
    icon: Smartphone,
  },
  {
    title: 'Offline-first records',
    body: 'Daily feeding, shed, and note workflows stay usable without connectivity.',
    icon: ShieldCheck,
  },
  {
    title: 'Multi-reptile workflows',
    body: 'Useful for normal keepers, breeders, shops, creators, and events.',
    icon: Users,
  },
  {
    title: 'Handover-ready structure',
    body: 'Supports breeding notes, profile history, and care continuity.',
    icon: QrCode,
  },
];

const faqItems = [
  {
    question: 'Is CareTrack only for geckos?',
    answer:
      'No. CareTrack supports reptile care tracking across multiple reptiles, including geckos, snakes, bearded dragons, skinks, tortoises, and other reptiles where care records, reminders, and breeding history are useful.',
  },
  {
    question: 'Can breeders use CareTrack for breeding records?',
    answer:
      'Yes. CareTrack is designed to support breeding-related workflows such as pairings, breeding history, clutch records, hatchling or offspring information, morphs, traits, and buyer handover records.',
  },
  {
    question: 'How can reptile shops collaborate with CareTrack?',
    answer:
      'Reptile shops can collaborate through QR handover, co-branded care guides, customer onboarding support, referral links, or shop display cards that help buyers continue proper care after purchase.',
  },
  {
    question: 'What is a breeder report?',
    answer:
      'A breeder report is a structured care handover record that may include reptile profile details, feeding history, shed records, weight logs, morph and trait information, breeding notes, and care guidance for the new owner.',
  },
  {
    question: 'Can reptile creators collaborate with CareTrack?',
    answer:
      'Yes. Reptile creators and educators can collaborate with CareTrack through educational content, care routine demonstrations, breeding workflow demos, referral campaigns, or responsible reptile care campaigns.',
  },
  {
    question: 'Does CareTrack replace veterinary advice?',
    answer:
      'No. CareTrack helps organize care records, reminders, and breeding information. It does not diagnose health problems or replace advice from a qualified reptile veterinarian.',
  },
  {
    question: 'Can buyers continue records after receiving a reptile?',
    answer:
      'The intended breeder handover workflow allows buyers to continue care records in CareTrack after receiving a reptile, helping them avoid starting from zero.',
  },
  {
    question: 'Can CareTrack support reptile expos or events?',
    answer:
      'Yes. CareTrack can support reptile events through QR campaigns, demos, educational content, breeder handover examples, and event-specific collaboration models.',
  },
];

const sectionViewEvents = [
  { id: 'breeder-workflow', eventName: 'partners_breeder_section_view' },
  { id: 'breeder-report', eventName: 'partners_breeder_report_section_view' },
  { id: 'shop-collaboration', eventName: 'partners_shop_section_view' },
  { id: 'creator-collaboration', eventName: 'partners_creator_section_view' },
  { id: 'event-collaboration', eventName: 'partners_event_section_view' },
] as const;

const scrollToSection = (id: string) => {
  const section = document.getElementById(id);
  if (!section) {
    return;
  }

  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="space-y-3">
      {eyebrow ? (
        <p className="inline-flex rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl text-slate-900 sm:text-4xl">{title}</h2>
      {description ? <p className="max-w-4xl text-slate-700">{description}</p> : null}
    </header>
  );
}

function ListGrid({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Partners() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [partnerType, setPartnerType] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [countryRegion, setCountryRegion] = useState('');
  const [reptileFocus, setReptileFocus] = useState('');
  const [website, setWebsite] = useState('');
  const [message, setMessage] = useState('');
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [formStarted, setFormStarted] = useState(false);
  const [formError, setFormError] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const faqStructuredData = useMemo(
    () =>
      faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    [],
  );

  usePageMeta({
    title: PARTNER_PAGE_TITLE,
    description: PARTNER_PAGE_DESCRIPTION,
    path: '/partners',
    type: 'website',
    image: '/og-image.jpg',
    imageAlt: 'CareTrack partner collaboration page for reptile breeders and shops',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Partner With CareTrack to Support Better Reptile Care',
        url: `${SITE_URL}/partners`,
        description: PARTNER_PAGE_DESCRIPTION,
        isPartOf: {
          '@type': 'WebSite',
          name: 'CareTrack',
          url: SITE_URL,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'CareTrack',
        applicationCategory: 'LifestyleApplication',
        operatingSystem: 'Android',
        url: SITE_URL,
        downloadUrl: GOOGLE_PLAY_URL,
        description:
          'Offline reptile care tracker for feeding logs, reminders, breeding records, morph tracking, and care handover workflows.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
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
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        url: `${SITE_URL}/partners`,
        mainEntity: faqStructuredData,
      },
    ],
  });

  useEffect(() => {
    trackEvent('partners_page_view');
  }, []);

  useEffect(() => {
    const prefilledType = searchParams.get('partnerType');
    if (!prefilledType) {
      return;
    }

    if (!partnerTypeOptions.includes(prefilledType as (typeof partnerTypeOptions)[number])) {
      return;
    }

    setPartnerType(prefilledType);
  }, [searchParams]);

  useEffect(() => {
    if (location.hash !== '#partner-form') {
      return;
    }

    window.requestAnimationFrame(() => {
      scrollToSection('partner-form');
    });
  }, [location.hash]);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const sectionId = entry.target.getAttribute('id');
          const matched = sectionViewEvents.find((item) => item.id === sectionId);
          if (!matched || seen.has(matched.eventName)) {
            return;
          }

          seen.add(matched.eventName);
          trackEvent(matched.eventName);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.45,
      },
    );

    sectionViewEvents.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const onFormStart = () => {
    if (formStarted) {
      return;
    }

    setFormStarted(true);
    trackEvent('partners_form_start');
  };

  const onPartnerTypeChange = (value: string) => {
    setPartnerType(value);
    if (value) {
      trackEvent('partners_partner_type_selected', { partner_type: value });
    }
  };

  const onModelToggle = (model: string) => {
    setSelectedModels((previous) => {
      const isSelected = previous.includes(model);
      const nextValues = isSelected ? previous.filter((item) => item !== model) : [...previous, model];

      trackEvent('partners_model_selected', {
        model,
        selected: !isSelected,
      });

      return nextValues;
    });
  };

  const scrollToForm = (prefillPartnerType?: string) => {
    if (prefillPartnerType) {
      onPartnerTypeChange(prefillPartnerType);
    }
    scrollToSection('partner-form');
  };

  const onPrimaryCtaClick = () => {
    trackEvent('partners_primary_cta_click');
    scrollToForm();
  };

  const onSecondaryCtaClick = () => {
    trackEvent('partners_secondary_cta_click');
    scrollToSection('collaboration-models');
  };

  const onDownloadClick = (placement: string) => {
    trackEvent('partners_download_click', { placement });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (selectedModels.length === 0) {
      setFormError('Please select at least one collaboration model.');
      return;
    }

    if (!consent) {
      setFormError('Please confirm consent before submitting.');
      return;
    }

    setStatus('sending');
    trackEvent('partners_form_submit', {
      partner_type: partnerType || 'unspecified',
      selected_models_count: selectedModels.length,
    });

    const formData = new FormData(form);
    const encoded = new URLSearchParams();
    formData.forEach((value, key) => {
      encoded.append(key, String(value));
    });

    try {
      const response = await fetch(form.getAttribute('action') ?? '/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encoded.toString(),
      });

      if (!response.ok) {
        throw new Error('Failed to submit partner request');
      }

      setStatus('sent');
      setName('');
      setEmail('');
      setPartnerType('');
      setBusinessName('');
      setCountryRegion('');
      setReptileFocus('');
      setWebsite('');
      setMessage('');
      setSelectedModels([]);
      setConsent(false);
      setFormStarted(false);
      setFormError('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <TopNav
        rightSlot={(
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-600 transition-colors hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        )}
      />

      <main className="px-4 pb-24 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
            <Link to="/" className="text-slate-600 underline hover:text-slate-900">
              Home
            </Link>{' '}
            / <span className="text-slate-900">Partners</span>
          </nav>

          <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="pointer-events-none absolute -top-16 right-0 h-56 w-56 rounded-full bg-emerald-100/70 blur-3xl" />
            <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
              <header className="relative space-y-5">
                <p className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-emerald-700">
                  Partner Program
                </p>
                <h1 className="text-4xl text-slate-900 sm:text-5xl">
                  Partner With CareTrack to Support Better Reptile Care
                </h1>
                <p className="text-lg text-slate-700">
                  CareTrack helps reptile breeders, shops, creators, and events give keepers a better way
                  to continue care with digital records for feeding, shedding, weight, breeding, morphs,
                  traits, reminders, and buyer handover.
                </p>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                    For breeders, shops, creators, and reptile events
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                    Built for care records, reminders, and breeding workflows
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                    Designed for reptile owners, not generic pet tracking
                  </li>
                </ul>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={onPrimaryCtaClick}
                    className="rounded-lg bg-emerald-600 px-5 py-3 text-white transition-colors hover:bg-emerald-700"
                  >
                    Apply to Collaborate
                  </button>
                  <button
                    type="button"
                    onClick={onSecondaryCtaClick}
                    className="rounded-lg border border-slate-300 px-5 py-3 text-slate-800 transition-colors hover:bg-slate-100"
                  >
                    Explore Collaboration Options
                  </button>
                </div>
              </header>

              <div className="relative space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h2 className="text-lg text-slate-900">At a Glance</h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-500">Audience Segments</p>
                      <p className="mt-1 text-xl text-slate-900">4 Core Partner Types</p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-500">Workflows</p>
                      <p className="mt-1 text-xl text-slate-900">Breeding to Handover</p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-4 sm:col-span-2">
                      <p className="text-xs uppercase tracking-wide text-slate-500">Platform</p>
                      <p className="mt-1 text-xl text-slate-900">Offline-first Android app for reptile records</p>
                    </div>
                  </div>
                </div>

                <a
                  href={GOOGLE_PLAY_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => onDownloadClick('hero')}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-600 px-5 py-3 text-emerald-700 transition-colors hover:bg-emerald-50"
                >
                  <GooglePlayLogo className="h-4 w-4 shrink-0" />
                  Download the CareTrack Reptile App
                </a>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <SectionHeading
              eyebrow="Audience"
              title="Built for the Reptile Ecosystem"
              description="CareTrack supports normal reptile keepers, but our partner program focuses on the people and businesses who guide reptile owners at the most important moments: purchase, breeding, education, and handover."
            />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {audienceCards.map((card) => {
                const Icon = card.icon;
                return (
                  <article key={card.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex rounded-lg border border-slate-300 bg-white p-2 text-slate-700">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <h3 className="text-xl text-slate-900">{card.title}</h3>
                        <p className="mt-2 text-slate-700">{card.body}</p>
                        <Link
                          to={card.path}
                          className="mt-3 inline-flex text-sm font-medium text-emerald-700 underline hover:text-emerald-800"
                        >
                          View detailed partner page
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <SectionHeading
              eyebrow="Context"
              title="Why Reptile Care Often Breaks Down After Purchase"
              description="Many reptile buyers receive care advice at the point of sale, but important details can be forgotten, lost, or misunderstood after the reptile goes home. Feeding history, shed records, weight changes, breeding notes, morph details, and setup guidance often stay scattered across paper notes, messages, screenshots, or memory."
            />
            <p className="mt-3 max-w-4xl text-slate-700">
              CareTrack helps partners create a smoother handover so new owners can continue care with
              better context from day one.
            </p>
            <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {problemItems.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section id="breeder-workflow" className="hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <SectionHeading
              eyebrow="Breeding"
              title="Built for Real Reptile Breeding Workflows"
              description="CareTrack supports more than basic reminders. Breeders and serious keepers can manage breeding-related records such as pairings, breeding history, clutch details, hatchling or offspring records, morphs, traits, and buyer handover information."
            />

            <div className="mt-6 space-y-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-700">Pairing → Clutch → Hatchlings → Care Records → Buyer Handover</p>
              <div className="grid gap-3 md:grid-cols-5">
                {workflowSteps.map((step, index) => (
                  <div key={step} className="rounded-xl border border-slate-200 bg-white p-3 text-center">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Step {index + 1}</p>
                    <p className="mt-1 text-sm text-slate-900">{step}</p>
                  </div>
                ))}
              </div>
              <ul className="list-disc space-y-2 pl-5 text-slate-700">
                {workflowBullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section id="shop-collaboration" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <SectionHeading
              eyebrow="Reptile Shops"
              title="Help Your Customers Start Right From Day One"
              description="Reptile shops already help customers choose animals, setups, food, and supplies. CareTrack extends that support after the sale by giving buyers a simple way to track feeding, shedding, weight, reminders, and care history at home."
            />
            <div className="mt-6">
              <ListGrid items={shopExamples} />
            </div>
            <button
              type="button"
              onClick={() => scrollToForm('Reptile Shop')}
              className="mt-6 rounded-lg bg-emerald-600 px-5 py-3 text-white transition-colors hover:bg-emerald-700"
            >
              Discuss Shop Collaboration
            </button>
          </section>

          <section id="breeder-report" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <SectionHeading
              eyebrow="Handover"
              title="Give Buyers More Than a Reptile. Give Them Its Care History."
              description="With CareTrack's breeder report and care handover workflow, partners can provide a structured digital record that may include feeding history, shed records, weight logs, morph and trait information, breeding notes, and setup guidance. New owners can continue the care record instead of starting from zero."
            />
            <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900">
              Breeder Report is planned as part of CareTrack's partner workflow.
            </p>

            <div id="sample-handover" className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-xl text-slate-900">Sample Handover Record</h3>
              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {reportPreviewItems.map((item) => (
                  <div key={item} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => scrollToSection('sample-handover')}
                className="mt-4 rounded-lg border border-slate-300 px-4 py-2 text-slate-800 transition-colors hover:bg-white"
              >
                View Sample Handover Flow
              </button>
            </div>
          </section>

          <section id="shop-collaboration-legacy" className="hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <SectionHeading
              eyebrow="Reptile Shops"
              title="Help Your Customers Start Right From Day One"
              description="Reptile shops already help customers choose animals, setups, food, and supplies. CareTrack extends that support after the sale by giving buyers a simple way to track feeding, shedding, weight, reminders, and care history at home."
            />
            <div className="mt-6">
              <ListGrid items={shopExamples} />
            </div>
            <button
              type="button"
              onClick={() => scrollToForm('Reptile Shop')}
              className="mt-6 rounded-lg bg-emerald-600 px-5 py-3 text-white transition-colors hover:bg-emerald-700"
            >
              Discuss Shop Collaboration
            </button>
          </section>

          <section id="creator-collaboration" className="hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <SectionHeading
              eyebrow="Creators"
              title="Partner With CareTrack to Teach Better Reptile Care"
              description="CareTrack gives reptile creators and educators a practical tool to show real care routines, breeding records, feeding schedules, shed tracking, and responsible reptile ownership. Collaborations should focus on useful education, not spammy promotion."
            />
            <div className="mt-6">
              <ListGrid items={creatorUseCases} />
            </div>
            <p className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              Creator collaborations should clearly disclose sponsorships, gifted access, referral
              relationships, or paid partnerships where applicable.
            </p>
            <button
              type="button"
              onClick={() => scrollToForm('Reptile Creator / Educator')}
              className="mt-6 rounded-lg bg-emerald-600 px-5 py-3 text-white transition-colors hover:bg-emerald-700"
            >
              Collaborate as a Creator
            </button>
          </section>

          <section id="event-collaboration" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <SectionHeading
              eyebrow="Events"
              title="Support Reptile Events With Practical Care Tools"
              description="Reptile expos and events bring breeders, shops, creators, and keepers together. CareTrack can support event education, QR campaigns, breeder demos, and post-event care continuity so buyers leave with more than a memory or paper note."
            />
            <div className="mt-6">
              <ListGrid items={eventUseCases} />
            </div>
            <button
              type="button"
              onClick={() => scrollToForm('Reptile Expo / Event')}
              className="mt-6 rounded-lg bg-emerald-600 px-5 py-3 text-white transition-colors hover:bg-emerald-700"
            >
              Explore Event Collaboration
            </button>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <SectionHeading
              eyebrow="Species"
              title="For Geckos, Snakes, Bearded Dragons, Skinks, Tortoises, and More"
              description="CareTrack is not limited to one species. It is designed for reptile keepers and partners who need practical records, reminders, breeding notes, and care history across different reptiles."
            />
            <div className="mt-6 flex flex-wrap gap-2">
              {speciesChips.map((species) => (
                <span
                  key={species}
                  className="rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm text-slate-700"
                >
                  {species}
                </span>
              ))}
            </div>
          </section>

          <section id="collaboration-models" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <SectionHeading
              eyebrow="Models"
              title="Ways to Collaborate With CareTrack"
              description="Every partner is different. CareTrack can support lightweight collaboration models for breeders, shops, creators, and events without forcing a complex setup from day one."
            />

            <div className="mt-6 hidden overflow-x-auto rounded-2xl border border-slate-200 lg:block">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 font-medium">Collaboration Model</th>
                    <th className="px-4 py-3 font-medium">Description</th>
                    <th className="px-4 py-3 font-medium">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                  {collaborationModels.map((model) => (
                    <tr key={model.name}>
                      <td className="px-4 py-3 font-medium text-slate-900">{model.name}</td>
                      <td className="px-4 py-3">{model.description}</td>
                      <td className="px-4 py-3">{model.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid gap-4 lg:hidden">
              {collaborationModels.map((model) => (
                <article key={model.name} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="text-lg text-slate-900">{model.name}</h3>
                  <p className="mt-2 text-slate-700">{model.description}</p>
                  <p className="mt-2 text-sm text-slate-600">
                    <span className="font-medium text-slate-700">Best for:</span> {model.bestFor}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <SectionHeading
              eyebrow="Trust"
              title="Built for Practical Reptile Care, Not Guesswork"
              description="CareTrack helps reptile keepers and partners keep important care information organized. The app supports care records, reminders, breeding notes, and handover workflows, but it does not replace professional veterinary advice."
            />

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {trustCards.map((card) => {
                const Icon = card.icon;
                return (
                  <article key={card.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex rounded-lg border border-slate-300 bg-white p-2 text-slate-700">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <h3 className="text-base text-slate-900">{card.title}</h3>
                        <p className="mt-1 text-sm text-slate-700">{card.body}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <p className="mt-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-900">
              CareTrack helps organize care records, reminders, and breeding information. It does not
              replace professional veterinary advice.
            </p>
          </section>

          <section className="hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <SectionHeading eyebrow="Resources" title="Partner Resources" />
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Link
                to="/"
                className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 transition-colors hover:bg-white"
              >
                Home
              </Link>
              <a
                href={GOOGLE_PLAY_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => onDownloadClick('resources')}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 transition-colors hover:bg-white"
              >
                <GooglePlayLogo className="h-4 w-4 shrink-0" />
                Download app
              </a>
              <Link
                to="/guides/feeding-reminder-features"
                className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 transition-colors hover:bg-white"
              >
                Feeding reminders
              </Link>
              <Link
                to="/guides/reptile-care-log-template"
                className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 transition-colors hover:bg-white"
              >
                Care logs
              </Link>
              <Link
                to="/playground/gecko"
                className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 transition-colors hover:bg-white"
              >
                Morph and trait tracking
              </Link>
              <Link
                to="/guides/breeder-record-keeping-gecko-pairings"
                className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 transition-colors hover:bg-white"
              >
                Breeding features
              </Link>
              <button
                type="button"
                onClick={() => scrollToSection('breeder-report')}
                className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-left text-slate-700 transition-colors hover:bg-white"
              >
                Breeder report
              </button>
              <Link
                to="/support"
                className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 transition-colors hover:bg-white"
              >
                Contact
              </Link>
              <Link
                to="/privacy"
                className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 transition-colors hover:bg-white"
              >
                Privacy policy
              </Link>
            </div>
          </section>

          <section id="partner-form" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <SectionHeading
              eyebrow="Inquiry"
              title="Apply to Collaborate With CareTrack"
              description="Tell us about your reptile business, breeding project, shop, event, or creator channel. We will review your request and explore the best collaboration model."
            />

            <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
              <aside className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-lg text-slate-900">What Happens Next</h3>
                <ol className="space-y-3 text-sm text-slate-700">
                  <li className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                    1. CareTrack reviews your partner profile and reptile focus.
                  </li>
                  <li className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                    2. We match your goals to suitable collaboration models.
                  </li>
                  <li className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                    3. If there is a fit, we follow up with a scoped collaboration plan.
                  </li>
                </ol>
                <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
                  Sponsored, gifted, referral, or paid collaborations should be clearly disclosed by
                  creators according to applicable advertising and platform rules.
                </div>
              </aside>

              <form
                className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5"
                onSubmit={handleSubmit}
                onFocusCapture={onFormStart}
                onChangeCapture={onFormStart}
                name="partners-inquiry"
                method="POST"
                action="/?submitted=partners"
                encType="application/x-www-form-urlencoded"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
              >
                <input type="hidden" name="form-name" value="partners-inquiry" />
                <input type="hidden" name="subject" value="CareTrack Partner Collaboration Request" />
                <input type="hidden" name="bot-field" />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="partner-name" className="mb-2 block text-sm font-medium text-slate-700">
                      Name
                    </label>
                    <input
                      id="partner-name"
                      name="name"
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      required
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="partner-email" className="mb-2 block text-sm font-medium text-slate-700">
                      Email
                    </label>
                    <input
                      id="partner-email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="partner-type" className="mb-2 block text-sm font-medium text-slate-700">
                      Partner type
                    </label>
                    <select
                      id="partner-type"
                      name="partner_type"
                      value={partnerType}
                      onChange={(event) => onPartnerTypeChange(event.target.value)}
                      required
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    >
                      <option value="">Select partner type</option>
                      {partnerTypeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="business-name" className="mb-2 block text-sm font-medium text-slate-700">
                      Business or channel name
                    </label>
                    <input
                      id="business-name"
                      name="business_or_channel_name"
                      type="text"
                      value={businessName}
                      onChange={(event) => setBusinessName(event.target.value)}
                      required
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                      placeholder="Business or channel name"
                    />
                  </div>

                  <div>
                    <label htmlFor="country-region" className="mb-2 block text-sm font-medium text-slate-700">
                      Country / region
                    </label>
                    <input
                      id="country-region"
                      name="country_region"
                      type="text"
                      value={countryRegion}
                      onChange={(event) => setCountryRegion(event.target.value)}
                      required
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                      placeholder="Country or region"
                    />
                  </div>

                  <div>
                    <label htmlFor="reptile-focus" className="mb-2 block text-sm font-medium text-slate-700">
                      Main reptile focus
                    </label>
                    <select
                      id="reptile-focus"
                      name="main_reptile_focus"
                      value={reptileFocus}
                      onChange={(event) => setReptileFocus(event.target.value)}
                      required
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    >
                      <option value="">Select reptile focus</option>
                      {reptileFocusOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="website" className="mb-2 block text-sm font-medium text-slate-700">
                      Website or social media link
                    </label>
                    <input
                      id="website"
                      name="website_or_social_link"
                      type="url"
                      value={website}
                      onChange={(event) => setWebsite(event.target.value)}
                      required
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                      placeholder="https://"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <p className="mb-2 block text-sm font-medium text-slate-700">Interested collaboration model</p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {collaborationModelOptions.map((option) => {
                        const checked = selectedModels.includes(option);
                        return (
                          <label key={option} className="flex items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                            <input
                              type="checkbox"
                              name="interested_collaboration_model"
                              value={option}
                              checked={checked}
                              onChange={() => onModelToggle(option)}
                              className="mt-1"
                            />
                            <span className="text-sm text-slate-700">{option}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="partner-message" className="mb-2 block text-sm font-medium text-slate-700">
                      Message
                    </label>
                    <textarea
                      id="partner-message"
                      name="message"
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      required
                      rows={6}
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                      placeholder="Tell us about your collaboration goals"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        name="consent"
                        value="yes"
                        checked={consent}
                        onChange={(event) => setConsent(event.target.checked)}
                        required
                        className="mt-1"
                      />
                      <span>
                        I agree to be contacted by CareTrack regarding partnership or collaboration
                        opportunities.
                      </span>
                    </label>
                  </div>
                </div>

                {formError ? <p className="text-rose-600">{formError}</p> : null}

                <div className="space-y-3">
                  <button
                    type="submit"
                    className="rounded-lg bg-emerald-600 px-8 py-3 text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? 'Submitting...' : 'Submit Collaboration Request'}
                  </button>

                  {status === 'sent' ? (
                    <p className="text-emerald-700">
                      Thank you. Your collaboration request has been received. The CareTrack team will
                      review your details and contact you if there is a suitable fit.
                    </p>
                  ) : null}

                  {status === 'error' ? (
                    <p className="text-rose-600">
                      Something went wrong while submitting your request. Please check your details and try
                      again.
                    </p>
                  ) : null}
                </div>
              </form>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <SectionHeading eyebrow="FAQ" title="FAQ" />
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-5">
              <Accordion type="single" collapsible>
                {faqItems.map((item, index) => (
                  <AccordionItem key={item.question} value={`faq-${index}`}>
                    <AccordionTrigger className="text-base text-slate-900 hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-700">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          <section className="hidden rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl text-slate-900 sm:text-3xl">
              Ready to Share CareTrack With Your Reptile Audience?
            </h2>
            <p className="mt-3 text-slate-700">
              Help reptile buyers continue better care after purchase with digital care logs, breeding
              records, reminders, and breeder handover reports.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={onPrimaryCtaClick}
                className="rounded-lg bg-emerald-600 px-5 py-3 text-white transition-colors hover:bg-emerald-700"
              >
                Apply to Collaborate
              </button>
              <a
                href={GOOGLE_PLAY_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => onDownloadClick('bottom_cta')}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-700 px-5 py-3 text-emerald-800 transition-colors hover:bg-emerald-100"
              >
                <GooglePlayLogo className="h-4 w-4 shrink-0" />
                Download the CareTrack Reptile App
              </a>
            </div>
            <p className="mt-4 text-xs text-slate-600">
              Sponsored, gifted, referral, or paid collaborations should be clearly disclosed by creators
              according to applicable advertising and platform rules.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
