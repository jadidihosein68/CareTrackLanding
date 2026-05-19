import clsx from 'clsx';
import { type GeckoMorphOption } from '../../data/gecko-playground-catalog';

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
          Choose one base morph. Traits can then be stacked on top.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((morph) => {
          const isSelected = morph.id === selectedMorphId;
          return (
            <button
              key={morph.id}
              type="button"
              onClick={() => onSelect(morph.id)}
              className={clsx(
                'rounded-xl border px-4 py-3 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500',
                isSelected
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/40',
              )}
              aria-pressed={isSelected}
            >
              <span className="block text-sm font-medium">{morph.name}</span>
              <span className="mt-1 block text-xs text-slate-500">{morph.description}</span>
              <span className="sr-only">{isSelected ? 'Selected morph' : 'Not selected'}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
