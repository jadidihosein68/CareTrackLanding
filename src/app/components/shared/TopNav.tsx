import { Link } from 'react-router-dom';
import icon from '../../assets/icon.webp';

type TopNavProps = {
  rightSlot?: React.ReactNode;
};

export function TopNav({ rightSlot }: TopNavProps) {
  return (
    <nav
      aria-label="Primary"
      className="border-b bg-white/80 backdrop-blur-sm fixed w-full top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={icon}
              alt="CareTrack logo"
              className="w-8 h-8 rounded-md object-contain"
            />
            <span className="text-xl font-semibold text-slate-900">CareTrack</span>
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-3 sm:gap-4 text-sm">
              <Link to="/" className="text-slate-600 hover:text-slate-900 transition-colors">
                Home
              </Link>
              <Link to="/learn" className="text-slate-600 hover:text-slate-900 transition-colors">
                Learn
              </Link>
              <Link to="/guides" className="text-slate-600 hover:text-slate-900 transition-colors">
                Guides
              </Link>
              <Link to="/faq" className="text-slate-600 hover:text-slate-900 transition-colors">
                FAQ
              </Link>
              <Link to="/support" className="text-slate-600 hover:text-slate-900 transition-colors">
                Support
              </Link>
            </div>
            {rightSlot ? <div className="hidden lg:flex items-center">{rightSlot}</div> : null}
          </div>
        </div>
      </div>
    </nav>
  );
}
