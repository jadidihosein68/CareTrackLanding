import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CalendarRange,
  CheckCircle2,
  Dna,
  QrCode,
  ShieldCheck,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { Footer } from './shared/Footer';
import { TopNav } from './shared/TopNav';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { SITE_URL } from '../utils/seo';
import { usePageMeta } from '../utils/usePageMeta';

const PAGE_TITLE = 'Breeder Collaboration Model: Reptile History Handover | CareTrack';
const PAGE_DESCRIPTION =
  'CareTrack helps reptile breeders hand over structured reptile history so buyers continue care with profile details, feeding logs, breeding context, clutch records, and after-sale guidance.';

type CapabilityCard = {
  title: string;
  description: string;
  bullets: string[];
  icon: LucideIcon;
};

type StepDetail = {
  id: string;
  title: string;
  intro: string;
  groups?: Array<{
    title: string;
    items: string[];
  }>;
  quote?: string;
  codeBlock?: string;
  note?: string;
};

const visualFlow = [
  'Animal Profile',
  'Care History',
  'Breeding Program',
  'Clutch & Offspring',
  'Buyer Handover',
  'After-Sale Support',
];

const buyerBenefits = [
  'Better understanding of the reptile\'s routine',
  'Clearer feeding and care expectations',
  'Useful history from the breeder',
  'A place to continue future care records',
  'Better confidence after purchase',
];

const capabilityCards: CapabilityCard[] = [
  {
    title: 'Animal Profile Management',
    description:
      'Record the foundation of each reptile history before transfer so buyers receive context, not guesswork.',
    bullets: [
      'Species, birthday or estimated hatch date, sex, morph, and traits',
      'Weight, eating habit, feeding schedule, temperament, and special notes',
      'Photo-backed profile context where applicable',
    ],
    icon: CheckCircle2,
  },
  {
    title: 'Breeding Program Management',
    description:
      'Organize pairings, breeding outcomes, family tree, trait records, and pedigree context for transparent handover.',
    bullets: [
      'Pairing dates, outcomes, parent information, and inheritance notes',
      'Family relationship records and COI-awareness context where pedigree exists',
      'Observation notes for future pairing decisions',
    ],
    icon: Dna,
  },
  {
    title: 'Clutch and Offspring Management',
    description:
      'Keep each offspring history connected from clutch creation to buyer assignment.',
    bullets: [
      'Clutch ID, hatch dates, hatchling status, early weight, and first feeding',
      'Morph and trait notes with holdback or sale status tracking',
      'Individual records that remain readable at scale',
    ],
    icon: CalendarRange,
  },
  {
    title: 'Buyer Handover Management',
    description:
      'Generate structured handover records so owners continue care with practical, species-specific history.',
    bullets: [
      'Feeding, shedding, weight, and behavior context from breeder records',
      'Background notes for morph, traits, lineage, and breeding where relevant',
      'Recommended next-care actions with continuity links',
    ],
    icon: QrCode,
  },
  {
    title: 'After-Sale Support and Education',
    description:
      'Reduce repeated basic questions while improving buyer confidence with consistent support content.',
    bullets: [
      'Common FAQ, feeding guidance, and setup reminders',
      'Checklist-driven onboarding for the first weeks at home',
      'Escalation reminders for breeder follow-up or reptile veterinarian support',
    ],
    icon: Users,
  },
];

const stepDetails: StepDetail[] = [
  {
    id: 'step-1',
    title: 'Step 1: Create the Reptile Profile',
    intro: 'Breeder starts by creating a structured profile for each reptile.',
    groups: [
      {
        title: 'Profile should include',
        items: [
          'Reptile name or ID',
          'Species',
          'Morph and traits',
          'Sex',
          'Birthday or estimated hatch date',
          'Current age and current weight',
          'Eating habit and feeding schedule',
          'Temperament or behavior notes',
          'Special care notes and photos where applicable',
        ],
      },
      {
        title: 'Eating habit examples',
        items: [
          'Eats live insects',
          'Eats frozen/thawed prey',
          'Prefers specific feeder size',
          'Eats during evening/night',
          'Slow eater with strong feeding response',
          'Refuses food during shedding',
          'Seasonal appetite changes',
          'Needs supervised feeding',
        ],
      },
    ],
    note:
      'This helps the buyer understand what is normal for that specific reptile, not only for the species in general.',
  },
  {
    id: 'step-2',
    title: 'Step 2: Record the Reptile Care History',
    intro: 'Breeder records care activity before handover to create continuity.',
    groups: [
      {
        title: 'Care history may include',
        items: [
          'Feeding logs, shed logs, and weight logs',
          'Supplement notes and enclosure/setup notes',
          'Behavior observations and appetite changes',
          'Growth progress and important care events',
        ],
      },
    ],
    note:
      'Purpose is organized record continuity, not medical diagnosis. CareTrack does not replace professional veterinary assessment.',
  },
  {
    id: 'step-3',
    title: 'Step 3: Manage Breeding Program Information',
    intro:
      'Support breeders managing reptiles in active breeding programs with clear lineage and pairing context.',
    groups: [
      {
        title: 'Breeding program management includes',
        items: [
          'Breeding pairs, pairing dates, outcomes, and breeding history',
          'Parent information, family tree, morph and trait information',
          'Inheritance notes and breeder observations',
          'COI or inbreeding-risk notes where applicable',
          'Future breeding plans',
        ],
      },
      {
        title: 'Trait examples',
        items: [
          'Morph, pattern traits, color traits',
          'Recessive, dominant, and line-bred traits',
          'Possible het information where applicable',
          'Visual vs possible trait notes',
        ],
      },
      {
        title: 'Family tree context',
        items: [
          'Parents and grandparents',
          'Siblings and previous offspring',
          'Related breeding groups and lineage notes',
        ],
      },
    ],
    quote:
      'CareTrack helps breeders keep family tree and relationship information organized so they can make more informed pairing decisions where pedigree data is available.',
    note:
      'The page should avoid overclaiming genetic certainty unless confirmed records exist. COI is positioned as awareness and recordkeeping context, not guaranteed outcome prediction.',
  },
  {
    id: 'step-4',
    title: 'Step 4: Manage Clutch and Offspring Records',
    intro:
      'Track each clutch and hatchling from breeding outcome to buyer assignment without losing individual history.',
    groups: [
      {
        title: 'Clutch and offspring records include',
        items: [
          'Clutch ID and pairing linkage',
          'Lay date or birth date where applicable',
          'Egg count, hatch date, hatchling IDs, and hatchling status',
          'Hatchling weight, first feeding date, shed history',
          'Morph and trait notes',
          'Holdback, available/reserved/sold status',
          'Buyer assignment where applicable',
        ],
      },
    ],
    codeBlock:
      'Pairing -> Clutch Created -> Eggs / Birth Recorded -> Hatchlings Added -> Feeding Starts -> Shed and Weight Logged -> Buyer Assigned -> Handover Report Generated',
  },
  {
    id: 'step-5',
    title: 'Step 5: Prepare the Buyer Handover',
    intro:
      'When sold or transferred, breeder prepares a structured handover record so buyer does not start from zero.',
    groups: [
      {
        title: 'Handover may include',
        items: [
          'Reptile profile, species, birthday or estimated hatch date',
          'Morph and traits with eating habit and feeding schedule',
          'Last feeding date, shed history, and weight history',
          'Breeding background, lineage notes, and clutch context where relevant',
          'Care notes, setup guidance, common FAQ, and recommended next actions',
          'QR code or import link for CareTrack continuity',
        ],
      },
    ],
  },
  {
    id: 'step-6',
    title: 'Step 6: Buyer Continues Care in CareTrack',
    intro:
      'After handover, buyer continues daily records in the same continuity flow started by breeder.',
    groups: [
      {
        title: 'Buyer can track',
        items: [
          'Feeding, shedding, weight, and reminders',
          'Care notes, behavior observations, and health observations',
          'Future breeding information where relevant',
        ],
      },
    ],
    quote: 'CareTrack helps buyers continue the care record instead of starting from zero.',
  },
  {
    id: 'step-7',
    title: 'Step 7: Support the Buyer After Sale',
    intro:
      'Collaboration does not stop at handover. Consistent support reduces repeated basic questions and improves experience.',
    groups: [
      {
        title: 'After-sale support can include',
        items: [
          'Common feeding and shedding questions',
          'Weight tracking explanation and new owner care checklist',
          'Setup reminders and safe handling reminders',
          'What to monitor after bringing reptile home',
          'When to contact breeder and when to contact a qualified reptile veterinarian',
        ],
      },
    ],
  },
  {
    id: 'step-8',
    title: 'Step 8: Provide FAQ and Education Content',
    intro:
      'Share practical educational content so buyer guidance is consistent across handovers and follow-up.',
    groups: [
      {
        title: 'Education content can include',
        items: [
          'Species care basics',
          'Feeding schedule explanation and shedding expectations',
          'Weight tracking guide and morph/trait explanation',
          'Breeding record, family tree, and COI awareness explanation',
          'Buyer handover guide and care continuation checklist',
        ],
      },
    ],
    note: 'Educational support does not replace veterinary advice.',
  },
];

const workflowList = [
  'Breeder creates reptile profile',
  'Breeder records care history',
  'Breeder links breeding program information where relevant',
  'Breeder records clutch and offspring details',
  'Breeder prepares buyer handover record',
  'Buyer receives QR code or import link',
  'Buyer continues care tracking in CareTrack',
  'Breeder supports buyer with FAQ and educational content',
];

const quickCopyBenefits = [
  'Keep reptile history organized',
  'Track breeding and clutch records',
  'Record morphs, traits, family tree, and COI context',
  'Prepare better buyer handover',
  'Help buyers continue care after purchase',
  'Reduce repeated after-sale questions with FAQ and educational content',
];

export function PartnerBreeders2Page() {
  usePageMeta({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: '/partners/breeders2',
    type: 'website',
    image: '/og-image.jpg',
    imageAlt: 'Breeder collaboration reptile history handover page in CareTrack',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Breeder Collaboration Built Around Reptile History',
        url: `${SITE_URL}/partners/breeders2`,
        description: PAGE_DESCRIPTION,
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
            name: 'Breeders 2',
            item: `${SITE_URL}/partners/breeders2`,
          },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'Breeder Collaboration Workflow',
        description:
          'A handover-first breeder workflow that preserves reptile history from profile creation to buyer continuity and after-sale support.',
        step: workflowList.map((name, index) => ({
          '@type': 'HowToStep',
          position: index + 1,
          name,
          text: name,
        })),
      },
    ],
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
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
        <div className="mx-auto max-w-7xl space-y-10">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
            <Link to="/" className="text-slate-600 underline hover:text-slate-900">
              Home
            </Link>{' '}
            /{' '}
            <Link to="/partners" className="text-slate-600 underline hover:text-slate-900">
              Partners
            </Link>{' '}
            / <span className="text-slate-900">Breeders 2</span>
          </nav>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start">
              <header className="space-y-5">
                <p className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-emerald-700">
                  Breeder Collaboration Model
                </p>
                <h1 className="text-4xl text-slate-900 sm:text-5xl">
                  Breeder Collaboration Built Around Reptile History
                </h1>
                <p className="text-lg text-slate-700">
                  CareTrack helps breeders record the important history of each reptile before
                  handover, including profile details, feeding habits, care records, breeding
                  background, family tree, clutch records, and transfer notes.
                </p>
                <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700">
                  Give buyers the reptile&apos;s story, not just the reptile. The buyer should receive
                  useful care context and continue the reptile&apos;s care journey in CareTrack.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/partners?partnerType=Breeder#partner-form"
                    className="rounded-lg bg-emerald-600 px-5 py-3 text-center text-white transition-colors hover:bg-emerald-700"
                  >
                    Apply as Breeder Partner
                  </Link>
                  <Link
                    to="/partners/breeders"
                    className="rounded-lg border border-slate-300 px-5 py-3 text-center text-slate-800 transition-colors hover:bg-slate-100"
                  >
                    Open Breeders Page
                  </Link>
                </div>
              </header>

              <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h2 className="text-xl text-slate-900">At a Glance</h2>
                <div className="mt-4 grid gap-3">
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Workflow</p>
                    <p className="mt-1 text-lg text-slate-900">8-stage breeder-to-buyer continuity</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Coverage</p>
                    <p className="mt-1 text-lg text-slate-900">Profile, care, breeding, clutch, handover, support</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Positioning</p>
                    <p className="mt-1 text-lg text-slate-900">Recordkeeping + continuity, not medical diagnosis</p>
                  </div>
                </div>
              </aside>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-3xl text-slate-900">Visual Flow</h2>
            <p className="mt-2 text-slate-700">
              Animal Profile -&gt; Care History -&gt; Breeding Program -&gt; Clutch &amp; Offspring -&gt;
              Buyer Handover -&gt; After-Sale Support
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {visualFlow.map((item, index) => (
                <div key={item} className="contents">
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-900">
                    {item}
                  </span>
                  {index < visualFlow.length - 1 ? (
                    <ArrowRight className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-3xl text-slate-900">Why Reptile History Matters</h2>
            <p className="mt-3 text-slate-700">
              During transfer, feeding routine, shed context, weight trends, morph detail, and
              breeding background are often lost. CareTrack helps breeders deliver a more
              professional handover by keeping these details organized and shareable.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {buyerBenefits.map((benefit) => (
                <div key={benefit} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700">
                  {benefit}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-3xl text-slate-900">Website Capability Cards</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {capabilityCards.map((card) => {
                const Icon = card.icon;
                return (
                  <article key={card.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex rounded-lg border border-slate-300 bg-white p-2 text-slate-700">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <h3 className="text-xl text-slate-900">{card.title}</h3>
                        <p className="mt-2 text-slate-700">{card.description}</p>
                      </div>
                    </div>
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
                      {card.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-3xl text-slate-900">Breeder Collaboration Workflow</h2>
            <ol className="mt-5 grid gap-3 md:grid-cols-2">
              {workflowList.map((step, index) => (
                <li key={step} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700">
                  <span className="font-medium text-slate-900">{index + 1}. </span>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-3xl text-slate-900">Detailed Steps</h2>
            <p className="mt-2 text-slate-700">
              Long-form implementation guidance for PRD and Codex instruction.
            </p>

            <Accordion type="single" collapsible className="mt-4 w-full">
              {stepDetails.map((step) => (
                <AccordionItem
                  key={step.id}
                  value={step.id}
                  className="rounded-xl border border-slate-200 px-4 data-[state=open]:bg-slate-50"
                >
                  <AccordionTrigger className="text-left text-base text-slate-900 hover:no-underline">
                    {step.title}
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 text-slate-700">
                    <p>{step.intro}</p>

                    {step.groups?.map((group) => (
                      <div key={group.title} className="rounded-lg border border-slate-200 bg-white p-4">
                        <h3 className="text-sm uppercase tracking-wide text-slate-500">{group.title}</h3>
                        <ul className="mt-2 list-disc space-y-1 pl-5">
                          {group.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    {step.codeBlock ? (
                      <pre className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-900 p-4 text-xs text-slate-100">
                        <code>{step.codeBlock}</code>
                      </pre>
                    ) : null}

                    {step.quote ? (
                      <blockquote className="rounded-lg border-l-4 border-emerald-500 bg-emerald-50 px-4 py-3 text-emerald-900">
                        {step.quote}
                      </blockquote>
                    ) : null}

                    {step.note ? (
                      <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900">
                        {step.note}
                      </p>
                    ) : null}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-3xl text-slate-900">Short Website Copy Version</h2>
            <p className="mt-3 text-slate-700">
              CareTrack helps breeders give buyers more than a reptile. It helps them share the
              reptile&apos;s care history.
            </p>
            <p className="mt-3 text-slate-700">
              Breeders can record animal profiles, eating habits, feeding logs, shed history,
              weight records, breeding background, traits, family tree, clutch details, offspring
              records, and buyer handover notes.
            </p>
            <p className="mt-3 text-slate-700">
              When the reptile moves to a new owner, breeder can provide a structured handover and
              QR/import continuity link so buyer continues care inside CareTrack.
            </p>
            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm uppercase tracking-wide text-slate-500">Workflow</p>
              <p className="mt-1 text-slate-800">
                Animal Profile -&gt; Care History -&gt; Breeding Program -&gt; Clutch &amp; Offspring -&gt;
                Buyer Handover -&gt; After-Sale Support
              </p>
            </div>
            <ul className="mt-5 grid gap-3 md:grid-cols-2">
              {quickCopyBenefits.map((item) => (
                <li key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl text-slate-900">Collaboration Safety Positioning</h2>
            <ul className="mt-4 space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                CareTrack is for organized husbandry records and handover continuity.
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                Trait and lineage notes should not overclaim certainty without confirmed records.
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                Education content does not replace advice from a qualified reptile veterinarian.
              </li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
