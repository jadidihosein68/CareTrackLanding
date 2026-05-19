import clsx from 'clsx';
import { type GeckoTraitOption } from '../../data/gecko-playground-catalog';

type TraitSelectorProps = {
  options: GeckoTraitOption[];
  selectedTraitIds: string[];
  onToggle: (traitId: string) => void;
};

export function TraitSelector({ options, selectedTraitIds, onToggle }: TraitSelectorProps) {
  return (
    <section aria-labelledby="playground-trait-heading" className="space-y-3">
      <div>
        <h2 id="playground-trait-heading" className="text-xl text-slate-900">
          Add Traits
        </h2>
        <p className="text-sm text-slate-600">
          Select multiple traits. Latest selected trait takes priority if visuals conflict.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {options.map((trait) => {
          const isSelected = selectedTraitIds.includes(trait.id);
          return (
            <button
              key={trait.id}
              type="button"
              onClick={() => onToggle(trait.id)}
              className={clsx(
                'rounded-full border px-3 py-1.5 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500',
                isSelected
                  ? 'border-emerald-600 bg-emerald-100 text-emerald-900'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/60',
              )}
              aria-pressed={isSelected}
            >
              {trait.name}
              <span className="sr-only">{isSelected ? ' trait selected' : ' trait not selected'}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
