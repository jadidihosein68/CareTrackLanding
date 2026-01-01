import { Link } from 'react-router-dom';
import icon from '../../assets/icon.webp';

type TopNavProps = {
  rightSlot?: React.ReactNode;
};

export function TopNav({ rightSlot }: TopNavProps) {
  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={icon}
              alt="CareTrack logo"
              className="w-8 h-8 rounded-md object-contain"
            />
            <span className="text-xl font-semibold text-slate-900">CareTrack</span>
          </Link>
          {rightSlot ? <div className="flex items-center">{rightSlot}</div> : null}
        </div>
      </div>
    </nav>
  );
}
