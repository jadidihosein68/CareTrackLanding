export type GuideSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type SeoGuideArticle = {
  id: string;
  title: string;
  description: string;
  summary: string;
  updated: string;
  sections: GuideSection[];
};

export const seoGuides: SeoGuideArticle[] = [
  {
    id: 'gecko-care-logging',
    title: 'Gecko Care Logging: What to Track Every Week',
    description:
      'Learn what to record in a gecko care log, including feeding, shedding, supplements, and behavior trends.',
    summary:
      'A clear weekly logging framework for gecko owners who want better visibility into health and husbandry changes.',
    updated: '2026-04-12',
    sections: [
      {
        heading: 'Why Consistent Gecko Care Logs Matter',
        paragraphs: [
          'A reptile can look stable while gradual changes happen in appetite, activity, or body condition. Logging each event gives you a timeline that is easier to review than memory alone.',
          'CareTrack is built for this workflow: each profile stores feeding history, supplements, and observations so you can review trends before they become urgent problems.',
        ],
      },
      {
        heading: 'Minimum Data to Record',
        paragraphs: [
          'If you want a lightweight routine, track a short set of essentials on every care event.',
        ],
        bullets: [
          'Feeding date, feeder type, and response (strong/normal/weak appetite).',
          'Supplement use (calcium, vitamin D3, multivitamin) and schedule adherence.',
          'Shedding notes, including incomplete shed events and recovery steps.',
          'Weight and body condition checks on a regular cadence.',
          'Behavior flags such as lethargy, unusual hiding, or reduced handling tolerance.',
        ],
      },
      {
        heading: 'How to Review Trends',
        paragraphs: [
          'A single log entry rarely tells the full story. The goal is trend detection across several entries.',
          'Review your most recent 2-4 weeks and look for linked signals such as appetite decline plus increased hiding, or repeated shed issues with low humidity windows.',
        ],
      },
    ],
  },
  {
    id: 'feeding-reminder-features',
    title: 'Feeding Reminder Features for Reptile Owners',
    description:
      'Set up reptile feeding reminders with schedules, supplement cadence, and completion history to avoid missed tasks.',
    summary:
      'Use reminder systems that fit real husbandry routines and reduce missed feedings or supplement drift.',
    updated: '2026-04-12',
    sections: [
      {
        heading: 'What a Good Feeding Reminder System Should Do',
        paragraphs: [
          'Reminder tools should reduce mental load, not create extra work. The best systems support recurring tasks, one-tap completion, and history review.',
          'CareTrack supports recurring reminders and simple completion logs so routine husbandry does not depend on memory.',
        ],
      },
      {
        heading: 'Schedule Setup Checklist',
        paragraphs: [
          'Before creating reminders, define your base rhythm for each species and life stage.',
        ],
        bullets: [
          'Set feeding frequency by species and age, not a universal schedule.',
          'Separate feeding reminders from supplement reminders for cleaner tracking.',
          'Use specific reminder labels so each alert is immediately actionable.',
          'Review missed tasks weekly and adjust times to your real routine.',
        ],
      },
      {
        heading: 'Avoiding Reminder Fatigue',
        paragraphs: [
          'Too many notifications can make users ignore all notifications. Keep alerts limited to actions that require a decision or confirmation.',
          'When schedules change seasonally or after growth stage transitions, update reminders immediately to keep data reliable.',
        ],
      },
    ],
  },
  {
    id: 'breeder-recordkeeping',
    title: 'Breeder Recordkeeping for Reptile Projects',
    description:
      'Organize breeder recordkeeping with profile timelines, feeding history, and hatchling care notes in one place.',
    summary:
      'A practical recordkeeping structure for keepers who run breeding projects and need consistent husbandry documentation.',
    updated: '2026-04-12',
    sections: [
      {
        heading: 'Why Breeder Documentation Needs Structure',
        paragraphs: [
          'Breeding projects generate many repeat tasks across animals and time windows. Without structure, key details are easy to lose between notes, chats, and spreadsheets.',
          'A structured care tracker helps centralize individual profiles, schedule activity, and observations tied to exact dates.',
        ],
      },
      {
        heading: 'Core Records to Maintain',
        paragraphs: [
          'Even when your workflow is simple, keep a consistent baseline for each animal and clutch.',
        ],
        bullets: [
          'Individual profile details and date-based husbandry logs.',
          'Feeding and supplementation history for adults and juveniles.',
          'Observation notes around breeding behavior and post-pairing changes.',
          'Hatchling progress notes and care milestone checks.',
        ],
      },
      {
        heading: 'How CareTrack Fits Breeding Workflows',
        paragraphs: [
          'CareTrack focuses on practical husbandry records, reminders, and profile history. It can support breeder documentation without forcing a complex setup.',
          'If your project also needs advanced genetics or sales inventory data, keep those in dedicated tools and use CareTrack for day-to-day care execution.',
        ],
      },
    ],
  },
  {
    id: 'offline-reptile-care-logs',
    title: 'Offline Reptile Care Logs: Why Offline-First Matters',
    description:
      'Understand the benefits of offline reptile care logs for daily tracking, continuity, and privacy.',
    summary:
      'Offline-first care logging keeps routines available without network dependence and improves data continuity in daily husbandry.',
    updated: '2026-04-12',
    sections: [
      {
        heading: 'Offline-First Reliability',
        paragraphs: [
          'Care does not pause when connectivity drops. Offline-first logging ensures feeding, reminders, and notes remain accessible during travel, shows, or unstable networks.',
          'CareTrack is designed so core care workflows stay usable without internet access.',
        ],
      },
      {
        heading: 'Privacy and Local Control',
        paragraphs: [
          'Many keepers prefer local control over routine husbandry records. Offline-first tools reduce dependence on constant cloud sync and can simplify privacy expectations.',
          'You should still follow your own backup habits for important records.',
        ],
      },
      {
        heading: 'When to Use Offline Logs Most',
        paragraphs: [
          'Offline logging is especially useful for multi-animal routines, travel, and environments where fast updates matter more than real-time sharing.',
        ],
        bullets: [
          'Daily feeding and supplement completion during busy routines.',
          'Quick behavior notes while handling or enclosure checks are in progress.',
          'Reference of previous entries when evaluating appetite or shedding changes.',
        ],
      },
    ],
  },
];

export const getSeoGuideById = (id: string) => seoGuides.find((guide) => guide.id === id);
