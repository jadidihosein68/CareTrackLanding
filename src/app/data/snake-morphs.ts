export type SnakeMorph = {
  id: string;
  name: string;
  description: string;
  geneticsNote: string;
  comboExamples: string[];
  imageSrc: string;
  imageAlt: string;
  selectedLabel: string;
  unselectedLabel: string;
};

export const SNAKE_MORPHS: SnakeMorph[] = [
  {
    id: 'normal',
    name: 'Normal / Wild Type',
    description:
      'Classic Ball Python (Python regius) look with earthy tones and clear pattern contrast used as a baseline for many morph projects.',
    geneticsNote:
      'Reference phenotype used by keepers to compare selective trait expression in morph projects.',
    comboExamples: ['Pastel projects', 'Clown het projects', 'Piebald het projects'],
    imageSrc: '/images/playground/snake/ball-python-normal-wild-type-morph.webp',
    imageAlt: 'Normal wild type Ball Python morph visualizer preview in CareTrack playground',
    selectedLabel: 'Selected morph',
    unselectedLabel: 'Not selected',
  },
  {
    id: 'albino',
    name: 'Albino',
    description:
      'Ball Python morph commonly tracked as recessive, known for bright yellow, white, and orange tones with reduced dark pigment.',
    geneticsNote:
      'Common keeper classification: recessive visual trait requiring paired compatible genetics.',
    comboExamples: ['Albino Pied', 'Albino Clown', 'Albino Pastel'],
    imageSrc: '/images/playground/snake/ball-python-albino-morph.webp',
    imageAlt: 'Albino Ball Python morph visualizer preview in CareTrack playground',
    selectedLabel: 'Selected morph',
    unselectedLabel: 'Not selected',
  },
  {
    id: 'axanthic',
    name: 'Axanthic',
    description:
      'Ball Python morph label often managed as recessive, showing a cool grayscale appearance with reduced yellow and red expression.',
    geneticsNote:
      'Common keeper classification: recessive line-bred projects with line-specific compatibility rules.',
    comboExamples: ['Axanthic Clown', 'Axanthic Pied', 'Axanthic Pastel'],
    imageSrc: '/images/playground/snake/ball-python-axanthic-morph.webp',
    imageAlt: 'Axanthic Ball Python morph visualizer preview in CareTrack playground',
    selectedLabel: 'Selected morph',
    unselectedLabel: 'Not selected',
  },
  {
    id: 'piebald',
    name: 'Piebald',
    description:
      'Widely tracked Ball Python morph commonly referenced as recessive, with high-contrast white patches mixed with patterned sections.',
    geneticsNote:
      'Common keeper classification: recessive visual trait with variable white coverage across individuals.',
    comboExamples: ['Pied Clown', 'Albino Pied', 'Pastel Pied'],
    imageSrc: '/images/playground/snake/ball-python-piebald-morph.webp',
    imageAlt: 'Piebald Ball Python morph visualizer preview in CareTrack playground',
    selectedLabel: 'Selected morph',
    unselectedLabel: 'Not selected',
  },
  {
    id: 'banana',
    name: 'Banana',
    description:
      'Popular Ball Python morph commonly tracked as incomplete-dominant style expression, with warm yellow and lavender-inspired tones.',
    geneticsNote:
      'Common keeper classification: incomplete-dominant style trait, often discussed with lineage/sex-linked project notes.',
    comboExamples: ['Banana Pastel', 'Banana Clown', 'Banana Pied'],
    imageSrc: '/images/playground/snake/ball-python-banana-morph.webp',
    imageAlt: 'Banana Ball Python morph visualizer preview in CareTrack playground',
    selectedLabel: 'Selected morph',
    unselectedLabel: 'Not selected',
  },
  {
    id: 'pastel',
    name: 'Pastel',
    description:
      'Common Ball Python morph often used in incomplete-dominant style combinations, with brighter body tones and cleaner contrast.',
    geneticsNote:
      'Common keeper classification: incomplete-dominant style trait frequently used to brighten combo projects.',
    comboExamples: ['Pastel Clown', 'Pastel Pied', 'Pastel Axanthic'],
    imageSrc: '/images/playground/snake/ball-python-pastel-morph.webp',
    imageAlt: 'Pastel Ball Python morph visualizer preview in CareTrack playground',
    selectedLabel: 'Selected morph',
    unselectedLabel: 'Not selected',
  },
  {
    id: 'clown',
    name: 'Clown',
    description:
      'Ball Python morph commonly managed in recessive projects, known for distinctive pattern flow, striping, and reduced side patterning.',
    geneticsNote:
      'Common keeper classification: recessive visual trait with strong impact on dorsal and side pattern layout.',
    comboExamples: ['Clown Pied', 'Albino Clown', 'Pastel Clown'],
    imageSrc: '/images/playground/snake/ball-python-clown-morph.webp',
    imageAlt: 'Clown Ball Python morph visualizer preview in CareTrack playground',
    selectedLabel: 'Selected morph',
    unselectedLabel: 'Not selected',
  },
  {
    id: 'snow',
    name: 'Snow',
    description:
      'Visual demo label for a pale, low-pigment look often associated with multi-gene style combinations in snake morph discussions.',
    geneticsNote:
      'Common keeper shorthand for light visual combinations; exact genetics depend on species and lineage.',
    comboExamples: ['Axanthic + Albino style projects', 'Light contrast pairings', 'Hypo + Axanthic style builds'],
    imageSrc: '/images/playground/snake/ball-python-snow-morph.webp',
    imageAlt: 'Snow snake morph preview in CareTrack playground',
    selectedLabel: 'Selected morph',
    unselectedLabel: 'Not selected',
  },
  {
    id: 'anery',
    name: 'Anery',
    description:
      'Visual demo label for muted gray and black expression, used to represent low red/orange palette tracking in snake morph records.',
    geneticsNote:
      'Cross-species label commonly discussed in colubrid projects; included for future multi-species playground expansion.',
    comboExamples: ['Anery Stripe style projects', 'Anery Motley style projects', 'Anery Snow style projects'],
    imageSrc: '/images/playground/snake/ball-python-anery-style-morph.webp',
    imageAlt: 'Anery-style snake morph visualizer preview in CareTrack playground',
    selectedLabel: 'Selected morph',
    unselectedLabel: 'Not selected',
  },
  {
    id: 'motley',
    name: 'Motley',
    description:
      'Pattern-focused visual demo label with connected or reduced side markings, useful for tracking appearance notes beside husbandry logs.',
    geneticsNote:
      'Cross-species pattern label commonly used in colubrid projects and kept here as a visual reference tag.',
    comboExamples: ['Motley Stripe style projects', 'Anery Motley style projects', 'Lavender Motley style projects'],
    imageSrc: '/images/playground/snake/ball-python-motley-style-morph.webp',
    imageAlt: 'Motley-style snake morph visualizer preview in CareTrack playground',
    selectedLabel: 'Selected morph',
    unselectedLabel: 'Not selected',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description:
      'Stripe-style visual demo label featuring a long dorsal line instead of classic saddle patterning for quick morph identification notes.',
    geneticsNote:
      'Cross-species pattern label used as visual shorthand; not a breeding prediction or genetics calculator output.',
    comboExamples: ['Anery Stripe style projects', 'Motley Stripe style projects', 'Lavender Stripe style projects'],
    imageSrc: '/images/playground/snake/ball-python-stripe-style-morph.webp',
    imageAlt: 'Stripe-style snake morph visualizer preview in CareTrack playground',
    selectedLabel: 'Selected morph',
    unselectedLabel: 'Not selected',
  },
  {
    id: 'lavender',
    name: 'Lavender',
    description:
      'Soft lavender-gray visual demo label with gentle contrast and muted patterning, suitable for documenting appearance changes over time.',
    geneticsNote:
      'Common keeper shorthand for lavender-toned trait expression; exact inheritance depends on species and lineage.',
    comboExamples: ['Lavender Albino style projects', 'Lavender Stripe style projects', 'Lavender Motley style projects'],
    imageSrc: '/images/playground/snake/ball-python-lavender-style-morph.webp',
    imageAlt: 'Lavender-style snake morph visualizer preview in CareTrack playground',
    selectedLabel: 'Selected morph',
    unselectedLabel: 'Not selected',
  },
];
