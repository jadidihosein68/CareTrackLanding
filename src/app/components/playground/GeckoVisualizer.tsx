import { motion } from 'motion/react';
import { type GeckoMorphOption } from '../../data/gecko-playground-catalog';

type GeckoVisualizerProps = {
  selectedMorph: GeckoMorphOption;
};

const fallbackImage = '/images/playground/gecko/ghost.webp';

const morphImageById: Record<string, string> = {
  ghost: '/images/playground/gecko/ghost.webp',
  'tremper-albino': '/images/playground/gecko/Tremper-Albino.webp',
  'bell-albino': '/images/playground/gecko/Bell-Albino.webp',
  'amelanistic-albino': '/images/playground/gecko/Amelanistic(Albino).webp',
  eclipse: '/images/playground/gecko/Eclipse.webp',
  'mack-snow': '/images/playground/gecko/Mack-Snow.webp',
  blizzard: '/images/playground/gecko/Blizzard.webp',
  tangerine: '/images/playground/gecko/Tangerine.webp',
  'white-yellow': '/images/playground/gecko/White&yellow.webp',
  raptor: '/images/playground/gecko/Raptor.webp',
  zero: '/images/playground/gecko/Zero.webp',
  'black-night-melanistic': '/images/playground/gecko/Black Night (melanistic).webp',
  'black-night-combos': '/images/playground/gecko/Black Night Recessive Combos.webp',
  'diablo-blanco': '/images/playground/gecko/Diablo Blanco morph.webp',
  'oreo-striped': '/images/playground/gecko/OreoStripedMorph.webp',
  'het-oreo-pos-jungle': '/images/playground/gecko/Het Oreo Pos Jungle.webp',
};

export function GeckoVisualizer({ selectedMorph }: GeckoVisualizerProps) {
  const visualKey = selectedMorph.id;
  const imagePath = morphImageById[selectedMorph.id] ?? fallbackImage;

  return (
    <figure className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:p-6">
      <motion.div
        key={visualKey}
        className="relative overflow-hidden rounded-xl bg-slate-50 p-3"
        initial={{ opacity: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <div className="pointer-events-none absolute left-5 top-5 z-10 rounded-full bg-black/75 px-3 py-1 text-xs text-white backdrop-blur-sm">
          Morph: {selectedMorph.name}
        </div>

        <motion.img
          src={imagePath}
          alt={`${selectedMorph.name} leopard gecko morph preview in CareTrack playground`}
          className="mx-auto h-auto max-h-[460px] w-full rounded-lg object-contain"
          loading="lazy"
          onError={(event) => {
            if (event.currentTarget.src.endsWith(fallbackImage)) return;
            event.currentTarget.src = fallbackImage;
          }}
        />
      </motion.div>

      <figcaption className="mt-3 text-sm text-slate-600">
        Visual demo only. Selected morph: {selectedMorph.name}
      </figcaption>
    </figure>
  );
}
