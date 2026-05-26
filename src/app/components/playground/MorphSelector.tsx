import clsx from 'clsx';
import { type GeckoMorphOption } from '../../data/gecko-playground-catalog';
import {
  geckoRarityMetaByValue,
  splitTraitGenetics,
  splitTraitHeadlineIntoChips,
} from './geckoRarity';

type MorphSelectorProps = {
  options: GeckoMorphOption[];
  selectedMorphId: string;
  onSelect: (morphId: string) => void;
};

export function MorphSelector({ options, selectedMorphId, onSelect }: MorphSelectorProps) {
  return (
    <section aria-labelledby="playground-morph-heading" className="space-y-3">
      <div>
        <h2 id="playground-morph-heading" className="text-xl text-slate-900">
          Select a Morph
        </h2>
        <p className="text-sm text-slate-600">
          Choose one base morph. Each card shows species, trait/genetics, and rarity.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((morph) => {
          const isSelected = morph.id === selectedMorphId;
          const rarity = geckoRarityMetaByValue[morph.rarity];
          const traitInfo = splitTraitGenetics(morph.traitGenetics);
          const traitChips = splitTraitHeadlineIntoChips(traitInfo.headline);

          return (
            <button
              key={morph.id}
              type="button"
              onClick={() => onSelect(morph.id)}
              className={clsx(
                'relative rounded-xl border px-4 py-3 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500',
                isSelected
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/40',
              )}
              aria-pressed={isSelected}
            >
              <span
                className={clsx(
                  'absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold',
                  rarity.chipClass,
                )}
                title={`${rarity.label} rarity`}
                aria-label={`${rarity.label} rarity`}
              >
                <rarity.Icon className="h-3.5 w-3.5" />
                <span>{rarity.label}</span>
              </span>

              <div>
                <div className="pr-28">
                  <span className="block text-sm font-medium">{morph.name}</span>
                  <span className="mt-1 block text-xs text-slate-500">{morph.species}</span>
                </div>

                <div className="mt-2 w-full border-t border-slate-200 pt-2 text-xs text-slate-700">
                  <div className="flex flex-wrap gap-1.5">
                    {traitChips.map((chip) => (
                      <span
                        key={`${morph.id}-${chip}`}
                        className="inline-flex rounded-full border border-slate-300 bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-800"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                  <p className="mt-1 text-slate-600">{traitInfo.detail}</p>
                </div>

                <div className="mt-2 w-full border-t border-slate-200 pt-2">
                  <span className="block text-xs text-slate-500">{morph.description}</span>
                </div>
              </div>

              <span className="sr-only">{isSelected ? 'Selected morph' : 'Not selected'}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
