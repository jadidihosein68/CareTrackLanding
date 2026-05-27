import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import { type GeckoMorphOption, type GeckoRarity } from '../../data/gecko-playground-catalog';
import {
  geckoRarityMetaByValue,
  splitTraitGenetics,
  splitTraitHeadlineIntoChips,
} from './geckoRarity';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

type MorphSelectorProps = {
  options: GeckoMorphOption[];
  selectedMorphId: string;
  onSelect: (morphId: string) => void;
  rarityFilterOptions: GeckoRarity[];
  selectedRarityFilters: GeckoRarity[];
  onToggleRarityFilter: (rarity: GeckoRarity) => void;
  traitFilterOptions: string[];
  selectedTraitFilters: string[];
  onToggleTraitFilter: (trait: string) => void;
  geckoTypeFilterOptions: string[];
  selectedGeckoTypeFilters: string[];
  onToggleGeckoTypeFilter: (typeValue: string) => void;
  onClearAllFilters: () => void;
  hasActiveFilters: boolean;
  totalCount: number;
};

export function MorphSelector({
  options,
  selectedMorphId,
  onSelect,
  rarityFilterOptions,
  selectedRarityFilters,
  onToggleRarityFilter,
  traitFilterOptions,
  selectedTraitFilters,
  onToggleTraitFilter,
  geckoTypeFilterOptions,
  selectedGeckoTypeFilters,
  onToggleGeckoTypeFilter,
  onClearAllFilters,
  hasActiveFilters,
  totalCount,
}: MorphSelectorProps) {
  const morphCards =
    options.length > 0
      ? options.flatMap((morph, index) => {
          const rarityChanged = index > 0 && morph.rarity !== options[index - 1].rarity;
          const rarity = geckoRarityMetaByValue[morph.rarity];
          const traitInfo = splitTraitGenetics(morph.traitGenetics);
          const traitChips = splitTraitHeadlineIntoChips(traitInfo.headline);
          const isSelected = morph.id === selectedMorphId;

          const nodes: JSX.Element[] = [];

          if (rarityChanged) {
            nodes.push(
              <div key={`divider-${morph.rarity}-${index}`} className="sm:col-span-2 pt-2">
                <div className="w-full border-t border-slate-300" />
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  {rarity.label}
                </p>
              </div>,
            );
          }

          nodes.push(
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
            </button>,
          );

          return nodes;
        })
      : [];

  const hasNoResults = options.length === 0;
  const resultLabel = `${options.length} of ${totalCount} morphs`;
  const rarityFilterSummary =
    selectedRarityFilters.length > 0
      ? `${selectedRarityFilters.length} selected`
      : 'Unselected';
  const traitFilterSummary =
    selectedTraitFilters.length > 0 ? `${selectedTraitFilters.length} selected` : 'Unselected';
  const geckoTypeFilterSummary =
    selectedGeckoTypeFilters.length > 0
      ? `${selectedGeckoTypeFilters.length} selected`
      : 'Unselected';

  const filterSection = (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Filter Morphs
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">{resultLabel}</span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearAllFilters}
              className="text-xs font-medium text-emerald-700 underline hover:text-emerald-800"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        <div>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-normal text-slate-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <span className="truncate text-left">Rarity: {rarityFilterSummary}</span>
                <ChevronDown className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuLabel>Rarity</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {rarityFilterOptions.map((rarityValue) => (
                <DropdownMenuCheckboxItem
                  key={`rarity-${rarityValue}`}
                  checked={selectedRarityFilters.includes(rarityValue)}
                  onCheckedChange={() => onToggleRarityFilter(rarityValue)}
                  onSelect={(event) => event.preventDefault()}
                  className="text-sm font-normal"
                >
                  {geckoRarityMetaByValue[rarityValue].label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-normal text-slate-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <span className="truncate text-left">Trait: {traitFilterSummary}</span>
                <ChevronDown className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72">
              <DropdownMenuLabel>Trait / Genetics</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {traitFilterOptions.map((trait) => (
                <DropdownMenuCheckboxItem
                  key={`trait-${trait}`}
                  checked={selectedTraitFilters.includes(trait)}
                  onCheckedChange={() => onToggleTraitFilter(trait)}
                  onSelect={(event) => event.preventDefault()}
                  className="text-sm font-normal"
                >
                  {trait}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-normal text-slate-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <span className="truncate text-left">Gecko Type: {geckoTypeFilterSummary}</span>
                <ChevronDown className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuLabel>Gecko Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {geckoTypeFilterOptions.map((typeValue) => (
                <DropdownMenuCheckboxItem
                  key={`type-${typeValue}`}
                  checked={selectedGeckoTypeFilters.includes(typeValue)}
                  onCheckedChange={() => onToggleGeckoTypeFilter(typeValue)}
                  onSelect={(event) => event.preventDefault()}
                  className="text-sm font-normal"
                >
                  {typeValue}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );

  const emptyState = (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-6 text-center">
      <p className="text-sm font-medium text-slate-900">No morph matches these filters.</p>
      <p className="mt-1 text-xs text-slate-600">
        Adjust your rarity, trait, or gecko type filters to see more options.
      </p>
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onClearAllFilters}
          className="mt-3 text-sm font-medium text-emerald-700 underline hover:text-emerald-800"
        >
          Reset filters
        </button>
      )}
    </div>
  );

  return (
    <section aria-labelledby="playground-morph-heading" className="space-y-3">
      <div>
        <h2 id="playground-morph-heading" className="text-xl text-slate-900">
          Select a Morph
        </h2>
        <p className="text-sm text-slate-600">
          Choose one base morph. You can filter by rarity, trait/genetics, and gecko type.
        </p>
      </div>

      {filterSection}

      {hasNoResults ? (
        emptyState
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">{morphCards}</div>
      )}
    </section>
  );
}
