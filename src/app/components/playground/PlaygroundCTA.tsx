import { Link } from 'react-router-dom';
import { GooglePlayLogo } from '../shared/GooglePlayLogo';

const GOOGLE_PLAY_URL =
  'https://play.google.com/store/apps/details?id=com.osacore.caretrack&hl=en-US&ah=UM3NhPrO8Bx2hZGtb5Ty2A9P-eY';

export function PlaygroundCTA() {
  return (
    <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
      <h2 className="text-xl text-slate-900">Ready to Track Real Care Data?</h2>
      <p className="mt-2 text-slate-700">
        CareTrack helps keepers and breeders organize morph labels, feeding logs, supplements,
        reminders, and husbandry notes in one offline-first app.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <a
          href={GOOGLE_PLAY_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-white transition-colors hover:bg-emerald-700"
        >
          <GooglePlayLogo className="h-4 w-4 shrink-0" />
          Download CareTrack
        </a>
        <Link
          to="/guides"
          className="inline-flex items-center justify-center rounded-lg border border-emerald-600 px-5 py-2.5 text-emerald-700 transition-colors hover:bg-emerald-100"
        >
          Explore Gecko Care Features
        </Link>
      </div>
    </section>
  );
}
