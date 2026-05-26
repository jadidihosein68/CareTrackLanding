import clsx from 'clsx';
import { type GeckoMorphOption } from '../../data/gecko-playground-catalog';
import {
  geckoRarityMetaByValue,
  splitTraitGenetics,
  splitTraitHeadlineIntoChips,
} from './geckoRarity';

type TraitInfoPanelProps = {
  selectedMorph: GeckoMorphOption;
};

export function TraitInfoPanel({ selectedMorph }: TraitInfoPanelProps) {
  const rarity = geckoRarityMetaByValue[selectedMorph.rarity];
  const traitInfo = splitTraitGenetics(selectedMorph.traitGenetics);
  const traitChips = splitTraitHeadlineIntoChips(traitInfo.headline);

  return (
    <section
      className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      aria-live="polite"
    >
      <span
        className={clsx(
          'absolute right-5 top-5 inline-flex h-8 w-8 items-center justify-center rounded-full border',
          rarity.iconOnlyClass,
        )}
        title={`${rarity.label} rarity`}
        aria-label={`${rarity.label} rarity`}
      >
        <rarity.Icon className="h-4 w-4" />
      </span>

      <h2 className="pr-12 text-lg text-slate-900">Selected Profile</h2>
      <div className="mt-3 space-y-4 text-sm text-slate-700">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Morph</p>
            <p className="mt-1 text-base text-slate-900">{selectedMorph.name}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Species</p>
            <p className="mt-1 text-base text-slate-900">{selectedMorph.species}</p>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Trait / Genetics</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {traitChips.map((chip) => (
              <span
                key={`${selectedMorph.id}-${chip}`}
                className="inline-flex rounded-full border border-slate-300 bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-900"
              >
                {chip}
              </span>
            ))}
          </div>
          <p className="mt-2 text-slate-700">{traitInfo.detail}</p>
        </div>

        <div className="border-t border-slate-200 pt-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Summary</p>
          <p className="mt-1">{selectedMorph.description}</p>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-amber-900">
          This playground is a visual demo only. Gecko appearance and genetic outcomes may vary.
          CareTrack does not provide DNA testing or guaranteed breeding predictions.
        </div>
      </div>
    </section>
  );
}
