import { type GeckoRarity } from '../../data/gecko-playground-catalog';
import { Circle, Crown, Diamond, Gem, type LucideIcon } from 'lucide-react';

export type GeckoRarityMeta = {
  label: string;
  Icon: LucideIcon;
  iconOnlyClass: string;
  chipClass: string;
};

export const geckoRarityMetaByValue: Record<GeckoRarity, GeckoRarityMeta> = {
  common: {
    label: 'Common',
    Icon: Circle,
    iconOnlyClass: 'border-slate-300 bg-slate-100 text-slate-700',
    chipClass: 'border-slate-300 bg-slate-100 text-slate-700',
  },
  uncommon: {
    label: 'Uncommon',
    Icon: Diamond,
    iconOnlyClass: 'border-emerald-300 bg-emerald-100 text-emerald-800',
    chipClass: 'border-emerald-300 bg-emerald-100 text-emerald-800',
  },
  rare: {
    label: 'Rare',
    Icon: Gem,
    iconOnlyClass: 'border-sky-300 bg-sky-100 text-sky-800',
    chipClass: 'border-sky-300 bg-sky-100 text-sky-800',
  },
  legendary: {
    label: 'Legendary',
    Icon: Crown,
    iconOnlyClass: 'border-slate-900 bg-slate-900 text-white',
    chipClass: 'border-slate-900 bg-slate-900 text-white',
  },
};

export function splitTraitGenetics(value: string): { headline: string; detail: string } {
  const separatorIndex = value.indexOf(':');
  if (separatorIndex === -1) {
    return { headline: value, detail: value };
  }

  const headline = value.slice(0, separatorIndex).trim();
  const detail = value.slice(separatorIndex + 1).trim();

  return { headline, detail };
}

export function splitTraitHeadlineIntoChips(headline: string): string[] {
  const parts = headline
    .split(/\s(?:\+|&|\/)\s/g)
    .map((item) => item.trim())
    .filter(Boolean);

  return parts.length > 0 ? parts : [headline];
}
