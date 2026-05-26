export type GeckoPattern =
  | 'normal'
  | 'albino'
  | 'snow'
  | 'blizzard'
  | 'eclipse'
  | 'tangerine'
  | 'patternless';

export type GeckoVisualState = {
  bodyColor: string;
  bellyColor: string;
  spotColor: string;
  eyeColor: string;
  tailColor: string;
  accentColor: string;
  pattern: GeckoPattern;
  patternOpacity: number;
  stripeTail: boolean;
  tailBands: boolean;
  spotScale: number;
  contrastBoost: number;
};

export type GeckoRarity = 'common' | 'uncommon' | 'rare' | 'legendary';

export type GeckoMorphOption = {
  id: string;
  name: string;
  type: 'morph';
  species: string;
  traitGenetics: string;
  rarity: GeckoRarity;
  description: string;
  visual: Partial<GeckoVisualState> & {
    bodyColor: string;
    bellyColor: string;
    spotColor: string;
    eyeColor: string;
    pattern: GeckoPattern;
    patternOpacity: number;
  };
};

export type GeckoTraitOption = {
  id: string;
  name: string;
  category: 'trait';
  description: string;
  visualPatch: Partial<GeckoVisualState>;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const defaultVisual: GeckoVisualState = {
  bodyColor: '#c7a86a',
  bellyColor: '#f1e4bf',
  spotColor: '#5c4222',
  eyeColor: '#1f2937',
  tailColor: '#c7a86a',
  accentColor: '#86efac',
  pattern: 'normal',
  patternOpacity: 0.72,
  stripeTail: false,
  tailBands: true,
  spotScale: 1,
  contrastBoost: 1,
};

export const geckoMorphOptions: GeckoMorphOption[] = [
  {
    id: 'tremper-albino',
    name: 'Tremper Albino',
    type: 'morph',
    species: 'Leopard Gecko',
    traitGenetics: 'Recessive: Light body tones, silver/red eyes, lacking black pigment.',
    rarity: 'common',
    description: 'Warm, light body tones with softer pattern contrast and bright eyes.',
    visual: {
      bodyColor: '#e8c79f',
      bellyColor: '#f7dfbe',
      spotColor: '#b7784f',
      eyeColor: '#9a3412',
      tailColor: '#e7c093',
      accentColor: '#fb923c',
      pattern: 'albino',
      patternOpacity: 0.58,
      tailBands: true,
    },
  },
  {
    id: 'bell-albino',
    name: 'Bell Albino',
    type: 'morph',
    species: 'Leopard Gecko',
    traitGenetics: 'Recessive: Soft pink/peach tones, distinct pink eyes.',
    rarity: 'common',
    description: 'Soft pink and peach tones with reduced dark pigment expression.',
    visual: {
      bodyColor: '#efceb2',
      bellyColor: '#f8e8d5',
      spotColor: '#cd8b6b',
      eyeColor: '#b45309',
      tailColor: '#efc29a',
      accentColor: '#f59e0b',
      pattern: 'albino',
      patternOpacity: 0.54,
      tailBands: true,
    },
  },
  {
    id: 'amelanistic-albino',
    name: 'Amelanistic (Albino)',
    type: 'morph',
    species: 'AFT Gecko',
    traitGenetics: 'Recessive: AFT version of albinism lacking dark melanin pigment.',
    rarity: 'common',
    description: 'Low-melanin style palette with light peach tones and softer dark pigment expression.',
    visual: {
      bodyColor: '#ebc8a8',
      bellyColor: '#f8e7d2',
      spotColor: '#c48862',
      eyeColor: '#9f3d16',
      tailColor: '#e9bc93',
      accentColor: '#fb923c',
      pattern: 'albino',
      patternOpacity: 0.52,
      tailBands: true,
    },
  },
  {
    id: 'eclipse',
    name: 'Eclipse',
    type: 'morph',
    species: 'Leopard Gecko',
    traitGenetics: 'Recessive: Solid black or red eyes, often with a white nose and tail tip.',
    rarity: 'common',
    description: 'Known for darker eye influence with strong body contrast.',
    visual: {
      bodyColor: '#c0a16a',
      bellyColor: '#f1dfb4',
      spotColor: '#3f2f1a',
      eyeColor: '#0b1020',
      tailColor: '#bc9a61',
      accentColor: '#60a5fa',
      pattern: 'eclipse',
      patternOpacity: 0.78,
      tailBands: true,
      contrastBoost: 1.12,
    },
  },
  {
    id: 'mack-snow',
    name: 'Mack Snow',
    type: 'morph',
    species: 'Leopard Gecko',
    traitGenetics: 'Incomplete Dominant: Hatches black and white, fading to pale yellow/gray.',
    rarity: 'common',
    description: 'Cooler grayscale body base with sharper dark pattern definition.',
    visual: {
      bodyColor: '#d6d7db',
      bellyColor: '#eeeff2',
      spotColor: '#3f4148',
      eyeColor: '#111827',
      tailColor: '#d4d5da',
      accentColor: '#94a3b8',
      pattern: 'snow',
      patternOpacity: 0.82,
      tailBands: true,
      contrastBoost: 1.18,
    },
  },
  {
    id: 'tangerine',
    name: 'Tangerine',
    type: 'morph',
    species: 'Leopard Gecko',
    traitGenetics:
      'Polygenic (Line-bred): Selectively bred for bright orange body and tail coloration.',
    rarity: 'common',
    description: 'Bright orange body wash with warm tail coloration.',
    visual: {
      bodyColor: '#f4a55d',
      bellyColor: '#f9d19c',
      spotColor: '#9a4f25',
      eyeColor: '#3f1d0f',
      tailColor: '#f08b3f',
      accentColor: '#f97316',
      pattern: 'tangerine',
      patternOpacity: 0.7,
      tailBands: true,
      spotScale: 0.92,
    },
  },
  {
    id: 'het-oreo-pos-jungle',
    name: 'Het Oreo Pos Jungle',
    type: 'morph',
    species: 'AFT Gecko',
    traitGenetics:
      'Recessive (Het) & Polygenic: Visually normal but carries the Oreo gene and might have irregular "Jungle" banding.',
    rarity: 'common',
    description: 'Jungle-style irregular banding profile with mixed dark and cream pattern sections.',
    visual: {
      bodyColor: '#cdb68b',
      bellyColor: '#efe2c2',
      spotColor: '#4b3824',
      eyeColor: '#1f2937',
      tailColor: '#c7aa76',
      accentColor: '#2dd4bf',
      pattern: 'normal',
      patternOpacity: 0.76,
      tailBands: true,
      spotScale: 1.08,
      contrastBoost: 1.14,
    },
  },
  {
    id: 'ghost',
    name: 'Ghost',
    type: 'morph',
    species: 'Leopard Gecko / AFT',
    traitGenetics:
      'Dominant (Leopard) / Recessive (AFT): Hypomelanistic look with muted, sometimes greenish/faded presentation.',
    rarity: 'uncommon',
    description: 'Soft neutral tone profile with reduced contrast and muted pattern presentation.',
    visual: {
      bodyColor: '#ccb28a',
      bellyColor: '#f2e7cf',
      spotColor: '#5c4a35',
      eyeColor: '#1e293b',
      tailColor: '#c4ab84',
      accentColor: '#38bdf8',
      pattern: 'normal',
      patternOpacity: 0.5,
      tailBands: true,
    },
  },
  {
    id: 'blizzard',
    name: 'Blizzard',
    type: 'morph',
    species: 'Leopard Gecko',
    traitGenetics: 'Recessive: Completely patternless body, usually solid gray, pale, or purplish.',
    rarity: 'uncommon',
    description: 'Minimal pattern presentation with a clean, pale body color.',
    visual: {
      bodyColor: '#f1e8d5',
      bellyColor: '#f9f2e7',
      spotColor: '#dfd5c5',
      eyeColor: '#334155',
      tailColor: '#eee0c9',
      accentColor: '#cbd5e1',
      pattern: 'blizzard',
      patternOpacity: 0.14,
      tailBands: false,
      spotScale: 0.75,
    },
  },
  {
    id: 'white-yellow',
    name: 'White & Yellow',
    type: 'morph',
    species: 'Leopard Gecko',
    traitGenetics:
      'Incomplete Dominant: High-contrast white sides with clean yellow body bases.',
    rarity: 'uncommon',
    description: 'Clean yellow-white base with high visual contrast accents.',
    visual: {
      bodyColor: '#f4e6a4',
      bellyColor: '#fcf6d2',
      spotColor: '#43311c',
      eyeColor: '#111827',
      tailColor: '#efcc69',
      accentColor: '#22c55e',
      pattern: 'normal',
      patternOpacity: 0.78,
      tailBands: true,
      contrastBoost: 1.2,
    },
  },
  {
    id: 'oreo-striped',
    name: 'Oreo Striped',
    type: 'morph',
    species: 'AFT Gecko',
    traitGenetics:
      'Recessive (Oreo) + Polygenic (Stripe): High contrast black/brown and white, resembling the cookie.',
    rarity: 'uncommon',
    description: 'High-contrast black and white style profile with strong stripe emphasis.',
    visual: {
      bodyColor: '#d6d7da',
      bellyColor: '#f2f3f5',
      spotColor: '#2b2f3a',
      eyeColor: '#0f172a',
      tailColor: '#cdd1d7',
      accentColor: '#94a3b8',
      pattern: 'snow',
      patternOpacity: 0.86,
      tailBands: true,
      stripeTail: true,
      contrastBoost: 1.24,
    },
  },
  {
    id: 'raptor',
    name: 'RAPTOR',
    type: 'morph',
    species: 'Leopard Gecko',
    traitGenetics:
      'Combo (4 Genes): Red-eye Albino Patternless Tremper ORange. Solid red eyes and orange body.',
    rarity: 'rare',
    description: 'Albino and eclipse style blend with reduced body spotting influence.',
    visual: {
      bodyColor: '#f3bc7a',
      bellyColor: '#f8d8ac',
      spotColor: '#b55b2b',
      eyeColor: '#7f1d1d',
      tailColor: '#ec8d49',
      accentColor: '#ef4444',
      pattern: 'eclipse',
      patternOpacity: 0.5,
      tailBands: false,
      spotScale: 0.84,
      stripeTail: true,
    },
  },
  {
    id: 'zero',
    name: 'Zero',
    type: 'morph',
    species: 'AFT Gecko',
    traitGenetics:
      'Recessive / Polygenic Marker: Connected back bands, often linked to the Patternless trait.',
    rarity: 'rare',
    description: 'Very clean low-pattern look with bright pale body zones and reduced spotting.',
    visual: {
      bodyColor: '#f0e7cf',
      bellyColor: '#faf3e6',
      spotColor: '#d9cfbe',
      eyeColor: '#334155',
      tailColor: '#eee0c8',
      accentColor: '#cbd5e1',
      pattern: 'blizzard',
      patternOpacity: 0.12,
      tailBands: false,
      spotScale: 0.7,
    },
  },
  {
    id: 'diablo-blanco',
    name: 'Diablo Blanco',
    type: 'morph',
    species: 'Leopard Gecko',
    traitGenetics: 'Combo (4 Genes): Blizzard + RAPTOR. Clean solid white body with solid red eyes.',
    rarity: 'rare',
    description: 'Clean white-centric profile with minimal pattern visibility and soft accent tones.',
    visual: {
      bodyColor: '#f4f5f7',
      bellyColor: '#fcfdff',
      spotColor: '#d2d8df',
      eyeColor: '#b91c1c',
      tailColor: '#eceff3',
      accentColor: '#cbd5e1',
      pattern: 'blizzard',
      patternOpacity: 0.1,
      tailBands: false,
      spotScale: 0.68,
    },
  },
  {
    id: 'black-night-melanistic',
    name: 'Black Night (Melanistic)',
    type: 'morph',
    species: 'Leopard Gecko',
    traitGenetics:
      'Polygenic (Line-bred): Hypermelanistic trait causing a completely solid black or extremely dark body.',
    rarity: 'legendary',
    description: 'Deep melanistic-style profile with very dark pigment concentration and high contrast.',
    visual: {
      bodyColor: '#2c2f36',
      bellyColor: '#4a4f58',
      spotColor: '#0f1115',
      eyeColor: '#05060a',
      tailColor: '#343840',
      accentColor: '#64748b',
      pattern: 'eclipse',
      patternOpacity: 0.88,
      tailBands: true,
      contrastBoost: 1.32,
    },
  },
  {
    id: 'black-night-combos',
    name: 'Black Night Combos',
    type: 'morph',
    species: 'Leopard Gecko',
    traitGenetics:
      'Combo: Blending the deep melanistic Black Night line with other recessive traits.',
    rarity: 'legendary',
    description: 'Dark combo profile blending melanistic depth with recessive-style contrast zones.',
    visual: {
      bodyColor: '#3a3d45',
      bellyColor: '#575d66',
      spotColor: '#14171d',
      eyeColor: '#080a0f',
      tailColor: '#40454e',
      accentColor: '#94a3b8',
      pattern: 'snow',
      patternOpacity: 0.86,
      tailBands: true,
      stripeTail: true,
      contrastBoost: 1.28,
    },
  },
];

export const geckoTraitOptions: GeckoTraitOption[] = [
  {
    id: 'bold-spots',
    name: 'Bold Spots',
    category: 'trait',
    description: 'Increases spot size and density for a bolder patterned look.',
    visualPatch: {
      spotColor: '#2d1e12',
      spotScale: 1.3,
      patternOpacity: 0.9,
    },
  },
  {
    id: 'reduced-pattern',
    name: 'Reduced Pattern',
    category: 'trait',
    description: 'Softens the amount of spotting for cleaner body panels.',
    visualPatch: {
      patternOpacity: 0.3,
      spotScale: 0.7,
    },
  },
  {
    id: 'stripe-tail',
    name: 'Stripe Tail',
    category: 'trait',
    description: 'Adds a central tail stripe in the visual demo.',
    visualPatch: {
      stripeTail: true,
      tailBands: false,
    },
  },
  {
    id: 'dark-eyes',
    name: 'Dark Eyes',
    category: 'trait',
    description: 'Adds darker eye pigment to the gecko illustration.',
    visualPatch: {
      eyeColor: '#0b1220',
    },
  },
  {
    id: 'high-contrast',
    name: 'High Contrast',
    category: 'trait',
    description: 'Pushes stronger contrast between body and pattern details.',
    visualPatch: {
      contrastBoost: 1.3,
      patternOpacity: 0.88,
    },
  },
  {
    id: 'carrot-tail',
    name: 'Carrot Tail',
    category: 'trait',
    description: 'Adds a warm orange tail accent in the visual demo.',
    visualPatch: {
      tailColor: '#f97316',
      accentColor: '#ea580c',
    },
  },
  {
    id: 'pale-body',
    name: 'Pale Body',
    category: 'trait',
    description: 'Lightens body and belly tones for a softer appearance.',
    visualPatch: {
      bodyColor: '#efe1bf',
      bellyColor: '#f8f0df',
      patternOpacity: 0.42,
    },
  },
  {
    id: 'orange-wash',
    name: 'Orange Wash',
    category: 'trait',
    description: 'Applies a warm orange tone shift to body accents.',
    visualPatch: {
      accentColor: '#f59e0b',
      bodyColor: '#efb86e',
    },
  },
];

export const mergeMorphAndTraitVisuals = (
  morph: GeckoMorphOption,
  traits: GeckoTraitOption[],
): GeckoVisualState => {
  const base: GeckoVisualState = {
    ...defaultVisual,
    ...morph.visual,
    tailColor: morph.visual.tailColor ?? morph.visual.bodyColor,
    accentColor: morph.visual.accentColor ?? defaultVisual.accentColor,
    stripeTail: morph.visual.stripeTail ?? defaultVisual.stripeTail,
    tailBands: morph.visual.tailBands ?? defaultVisual.tailBands,
    spotScale: morph.visual.spotScale ?? defaultVisual.spotScale,
    contrastBoost: morph.visual.contrastBoost ?? defaultVisual.contrastBoost,
  };

  const merged = traits.reduce<GeckoVisualState>((current, trait) => {
    const patch = trait.visualPatch;
    return {
      ...current,
      ...patch,
      patternOpacity: clamp(patch.patternOpacity ?? current.patternOpacity, 0, 1),
      spotScale: clamp(patch.spotScale ?? current.spotScale, 0.5, 1.8),
      contrastBoost: clamp(patch.contrastBoost ?? current.contrastBoost, 0.7, 1.6),
    };
  }, base);

  return {
    ...merged,
    patternOpacity: clamp(merged.patternOpacity, 0, 1),
    spotScale: clamp(merged.spotScale, 0.5, 1.8),
    contrastBoost: clamp(merged.contrastBoost, 0.7, 1.6),
  };
};
