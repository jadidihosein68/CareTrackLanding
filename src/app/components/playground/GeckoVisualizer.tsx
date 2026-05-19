import { motion } from 'motion/react';
import { type GeckoMorphOption } from '../../data/gecko-playground-catalog';

type GeckoVisualizerProps = {
  selectedMorph: GeckoMorphOption;
};

const fallbackImage = '/images/morphs/ghost.png';

const morphImageById: Record<string, string> = {
  normal: '/images/morphs/ghost.png',
  'tremper-albino': '/images/morphs/Tremper-Albino.png',
  'bell-albino': '/images/morphs/Bell-Albino.png',
  eclipse: '/images/morphs/Eclipse.png',
  'mack-snow': '/images/morphs/Mack-Snow.png',
  blizzard: '/images/morphs/Blizzard.png',
  patternless: '/images/morphs/Patternless.png',
  tangerine: '/images/morphs/Tangerine.png',
  'white-yellow': '/images/morphs/White&yellow.png',
  raptor: '/images/morphs/Raptor.png',
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
