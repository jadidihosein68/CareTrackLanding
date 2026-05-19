import { type GeckoMorphOption } from '../../data/gecko-playground-catalog';

type TraitInfoPanelProps = {
  selectedMorph: GeckoMorphOption;
};

export function TraitInfoPanel({ selectedMorph }: TraitInfoPanelProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" aria-live="polite">
      <h2 className="text-lg text-slate-900">Selected Profile</h2>
      <div className="mt-3 space-y-4 text-sm text-slate-700">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Morph</p>
          <p className="mt-1 text-base text-slate-900">{selectedMorph.name}</p>
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
