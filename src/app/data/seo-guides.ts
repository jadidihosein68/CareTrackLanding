export type GuideSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type SeoGuideArticle = {
  id: string;
  seoTitle: string;
  seoDescription: string;
  relatedSpeciesIds: string[];
  title: string;
  description: string;
  summary: string;
  updated: string;
  sections: GuideSection[];
};

export const seoGuides: SeoGuideArticle[] = [
  {
    id: 'gecko-care-logging',
    seoTitle: 'How to Keep a Gecko Care Log (Free Tracker) | CareTrack',
    seoDescription:
      'Learn how to keep a gecko care log with a free tracker workflow. Record feeding, shedding, supplements, and behavior to catch health changes early.',
    relatedSpeciesIds: ['leopard-gecko', 'crested-gecko'],
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
    seoTitle: 'Gecko Feeding Reminder Setup for Reptile Owners | CareTrack',
    seoDescription:
      'Set up gecko and reptile feeding reminders that reduce missed tasks. Use schedule templates, supplement cadence, and completion logs in CareTrack.',
    relatedSpeciesIds: ['leopard-gecko', 'corn-snake', 'ball-python'],
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
    seoTitle: 'Reptile Breeder Recordkeeping Guide and Tracker Tips | CareTrack',
    seoDescription:
      'Organize reptile breeder recordkeeping with profile timelines, feeding history, hatchling notes, and day-to-day husbandry logs in one workflow.',
    relatedSpeciesIds: ['leopard-gecko', 'crested-gecko', 'ball-python'],
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
    seoTitle: 'Offline Reptile Care Log App: Why Offline-First Works | CareTrack',
    seoDescription:
      'Understand why an offline reptile care log app improves reliability and privacy. Track feeding, reminders, and husbandry notes without connectivity.',
    relatedSpeciesIds: ['leopard-gecko', 'corn-snake', 'whites-tree-frog'],
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
  {
    id: 'leopard-gecko-feeding-schedule',
    seoTitle: 'Leopard Gecko Feeding Log Guide | CareTrack',
    seoDescription:
      'Build a leopard gecko feeding schedule with a practical log template. Track prey size, feeding response, supplements, and trend changes in CareTrack.',
    relatedSpeciesIds: ['leopard-gecko'],
    title: 'Leopard Gecko Feeding Schedule and Log Template',
    description:
      'Use a repeatable feeding schedule and logging format for leopard geckos by age, body condition, and appetite trends.',
    summary:
      'A practical feeding-log workflow for leopard geckos, including cadence planning, supplement notes, and troubleshooting missed meals.',
    updated: '2026-04-15',
    sections: [
      {
        heading: 'Set an Age-Appropriate Feeding Rhythm',
        paragraphs: [
          'Leopard gecko feeding cadence changes with age, body condition, and activity. A rigid one-size plan causes overfeeding in some animals and underfeeding in others.',
          'Start with a baseline schedule, then adjust based on appetite consistency, stool quality, and body condition observations in your log.',
        ],
        bullets: [
          'Juveniles generally need more frequent feeder sessions than adults.',
          'Adults often do better with fewer, deliberate feedings and consistent monitoring.',
          'Review schedule changes after growth, seasonal shifts, or husbandry updates.',
        ],
      },
      {
        heading: 'Use a Structured Feeding Log',
        paragraphs: [
          'A useful feeding log captures what happened, not just that feeding occurred. This helps connect appetite changes to enclosure conditions or supplement patterns.',
        ],
        bullets: [
          'Record feeder type, estimated quantity, and feeding response.',
          'Log calcium, D3, and multivitamin usage by date.',
          'Add notes for refusals, partial meals, or unusual behavior.',
        ],
      },
      {
        heading: 'Troubleshoot Missed Meals with Trend Data',
        paragraphs: [
          'A single skipped meal is often normal. Repeated refusals paired with low activity, weight drift, or shedding issues should trigger a husbandry review.',
          'Use your weekly timeline to compare feeding consistency with humidity, temperature, and handling frequency.',
        ],
      },
    ],
  },
  {
    id: 'crested-gecko-supplement-guide',
    seoTitle: 'Crested Gecko Supplement Guide and Tracker | CareTrack',
    seoDescription:
      'Plan a crested gecko supplement schedule with reliable tracking. Log calcium, vitamin D3, and multivitamin rotations alongside feeding entries in CareTrack.',
    relatedSpeciesIds: ['crested-gecko'],
    title: 'Crested Gecko Supplement Guide and Schedule Tracking',
    description:
      'Create a supplement routine for crested geckos and track dosing consistency with clear records for calcium, D3, and multivitamins.',
    summary:
      'A practical supplement workflow for crested gecko keepers who want fewer missed doses and clearer husbandry history.',
    updated: '2026-04-15',
    sections: [
      {
        heading: 'Why Supplement Tracking Matters',
        paragraphs: [
          'Supplement routines break down when they rely on memory. Tracking each dose helps avoid long gaps or accidental overuse.',
          'A dated log is also useful when reviewing appetite, growth, and activity changes over time.',
        ],
      },
      {
        heading: 'Build a Repeatable Rotation',
        paragraphs: [
          'Most keepers use a planned rotation rather than random dusting. The key is consistency and documenting every adjustment.',
        ],
        bullets: [
          'Define your baseline frequency for calcium, D3, and multivitamins.',
          'Separate supplement reminders from feeding reminders for cleaner records.',
          'Log skipped doses and why they were skipped.',
        ],
      },
      {
        heading: 'Review Monthly to Prevent Drift',
        paragraphs: [
          'Small routine changes compound quickly. A monthly review catches missed reminders and helps keep your husbandry plan aligned with current conditions.',
          'If supplements are drifting out of schedule, simplify reminders and reduce optional notifications.',
        ],
      },
    ],
  },
  {
    id: 'reptile-care-log-template',
    seoTitle: 'Reptile Care Log Template for Daily Tracking | CareTrack',
    seoDescription:
      'Use a practical reptile care log template for feeding, shedding, supplements, and behavior notes. Keep daily husbandry records organized in CareTrack.',
    relatedSpeciesIds: ['leopard-gecko', 'corn-snake', 'whites-tree-frog'],
    title: 'Reptile Care Log Template for Daily Husbandry',
    description:
      'Apply a simple care-log template to track daily husbandry tasks, observations, and reminders across multiple reptiles.',
    summary:
      'A reusable logging format for reptile keepers who need consistent records without complex spreadsheets.',
    updated: '2026-04-15',
    sections: [
      {
        heading: 'Core Fields Every Log Should Include',
        paragraphs: [
          'A strong template captures the minimum data needed to identify trends. If the format is too heavy, entries stop; if too light, insights are lost.',
        ],
        bullets: [
          'Date and task type (feeding, supplementation, enclosure maintenance).',
          'Outcome notes (ate normally, partial meal, refusal, unusual behavior).',
          'Environmental notes when relevant (temperature or humidity exceptions).',
        ],
      },
      {
        heading: 'Use Template Blocks for Multi-Pet Routines',
        paragraphs: [
          'For keepers with multiple animals, repeated template blocks reduce mistakes and improve consistency across profiles.',
          'CareTrack profile timelines keep these records separated by animal while preserving a unified routine view.',
        ],
      },
      {
        heading: 'Turn Logs into Weekly Decisions',
        paragraphs: [
          'The goal is not recordkeeping for its own sake. Weekly reviews should guide practical actions such as reminder changes, handling adjustments, or enclosure checks.',
          'Flag recurring issues quickly so you can act before they become larger husbandry problems.',
        ],
      },
    ],
  },
  {
    id: 'breeder-record-keeping-gecko-pairings',
    seoTitle: 'Breeder Record-Keeping for Gecko Pairings | CareTrack',
    seoDescription:
      'Track breeder record-keeping for gecko pairings with profile timelines, pairing notes, feeding history, and hatchling follow-up workflows in CareTrack.',
    relatedSpeciesIds: ['leopard-gecko', 'crested-gecko'],
    title: 'Breeder Record-Keeping for Gecko Pairings',
    description:
      'Organize gecko pairing records with date-based notes, pre-pairing checks, and post-pairing husbandry logs.',
    summary:
      'A structured workflow for breeders who need clear pairing timelines, observation history, and follow-up documentation.',
    updated: '2026-04-15',
    sections: [
      {
        heading: 'Document Pairing Context, Not Just Dates',
        paragraphs: [
          'A pairing date alone is rarely enough for later review. Context around condition, feeding behavior, and enclosure setup improves decision quality in future cycles.',
        ],
        bullets: [
          'Pre-pairing condition notes and feeding consistency.',
          'Pairing window dates and key behavioral observations.',
          'Post-pairing monitoring notes with date-linked follow-up tasks.',
        ],
      },
      {
        heading: 'Standardize Notes Across Pairings',
        paragraphs: [
          'Using a consistent note format reduces ambiguity and makes cross-project comparisons easier later.',
          'When multiple keepers are involved, template-driven entries reduce interpretation errors.',
        ],
      },
      {
        heading: 'Link Pairing Notes to Daily Husbandry',
        paragraphs: [
          'Pairing records should connect directly to routine care logs. Feeding and behavioral drift after pairing often appears in daily entries first.',
          'CareTrack helps keep breeding context and day-to-day execution in one searchable timeline.',
        ],
      },
    ],
  },
  {
    id: 'ball-python-shedding-problems-guide',
    seoTitle: 'Ball Python Shedding Problems and Care Log Guide | CareTrack',
    seoDescription:
      'Learn a practical ball python shedding log workflow. Track humidity windows, incomplete sheds, and husbandry adjustments to reduce repeat issues.',
    relatedSpeciesIds: ['ball-python'],
    title: 'Ball Python Shedding Problems: Logging and Husbandry Checks',
    description:
      'Use structured logs to identify causes behind recurring ball python shedding problems and guide enclosure adjustments.',
    summary:
      'A troubleshooting workflow for ball python shedding issues that focuses on humidity trends, routine checks, and clear records.',
    updated: '2026-04-15',
    sections: [
      {
        heading: 'Track Shedding Events as a Sequence',
        paragraphs: [
          'Shedding outcomes are easier to interpret when you track pre-shed cues, humidity behavior, and post-shed results together.',
          'Single-point notes miss the sequence that often reveals the root husbandry issue.',
        ],
      },
      {
        heading: 'Log Environmental Context with Every Shed',
        paragraphs: [
          'Repeated incomplete sheds are often linked to inconsistent environmental management rather than one isolated event.',
        ],
        bullets: [
          'Record humidity ranges and unusual dips around shedding windows.',
          'Note hide usage and hydration behaviors when possible.',
          'Track interventions and whether they resolved retained shed sections.',
        ],
      },
      {
        heading: 'Use Trend Reviews Before Making Big Changes',
        paragraphs: [
          'Large husbandry changes without a record baseline can create new problems. Review at least a few cycles before altering multiple variables at once.',
          'Make incremental adjustments and log each change with date-specific outcomes.',
        ],
      },
    ],
  },
  {
    id: 'tarantula-care-log-routine',
    seoTitle: 'Tarantula Care Log Routine for Feeding and Molting | CareTrack',
    seoDescription:
      'Set up a tarantula care log routine for feeding response, molt timing, enclosure checks, and stress signals. Keep records organized in CareTrack.',
    relatedSpeciesIds: ['curly-hair-tarantula', 'pink-toe-tarantula'],
    title: 'Tarantula Care Log Routine for Feeding and Molting',
    description:
      'Create a tarantula husbandry log that tracks feeding patterns, molt events, and enclosure observations with clear timestamps.',
    summary:
      'A practical recordkeeping approach for tarantula keepers who want reliable feeding and molting history over time.',
    updated: '2026-04-15',
    sections: [
      {
        heading: 'Focus on Observation Quality',
        paragraphs: [
          'Tarantula care logs work best when entries are concise and objective. Overly detailed notes are hard to maintain, while vague notes are hard to interpret.',
          'Record visible, repeatable signals such as feeding response, webbing changes, and molt-related behavior.',
        ],
      },
      {
        heading: 'Separate Feeding and Molting Timelines',
        paragraphs: [
          'Feeding patterns and molt cycles interact, but they should still be logged as separate event streams for clarity.',
        ],
        bullets: [
          'Log feeding attempts, acceptance, and refusals with dates.',
          'Record pre-molt signs and recovery notes after molting.',
          'Track enclosure maintenance actions that could affect stress behavior.',
        ],
      },
      {
        heading: 'Review Quarterly for Husbandry Drift',
        paragraphs: [
          'Quarterly review helps identify subtle drift in routine quality, especially when multiple animals are managed together.',
          'Use trend summaries to update reminders and prioritize enclosure checks for animals with inconsistent records.',
        ],
      },
    ],
  },
];

export const getSeoGuideById = (id: string) => seoGuides.find((guide) => guide.id === id);
