import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import icon from '../../assets/icon.webp';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

type TopNavProps = {
  rightSlot?: React.ReactNode;
};

export function TopNav({ rightSlot }: TopNavProps) {
  const navItemClass = 'text-sm font-normal text-slate-600 hover:text-slate-900 transition-colors';

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
              alt="CareTrack reptile care tracker logo"
              className="w-8 h-8 rounded-md object-contain"
            />
            <span className="hidden sm:inline text-xl font-semibold text-slate-900">CareTrack</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-6">
            <div className="flex items-center gap-2 sm:gap-4">
              <Link to="/" className={navItemClass}>
                Home
              </Link>
              <Link to="/learn" className={navItemClass}>
                Learn
              </Link>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger className={`inline-flex items-center gap-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 ${navItemClass}`}>
                  Playground
                  <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64">
                  <DropdownMenuItem asChild>
                    <Link to="/playground/gecko" className="cursor-pointer text-sm font-normal">
                      Gecko
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/playground/snake" className="cursor-pointer text-sm font-normal">
                      Snake
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem disabled className="text-sm font-normal">
                    Turtle - Coming soon
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled className="text-sm font-normal">
                    Spider / Tarantula - Coming soon
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled className="text-sm font-normal">
                    Amphibian - Coming soon
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link
                to="/guides"
                className={`hidden sm:inline ${navItemClass}`}
              >
                Guides
              </Link>
              <Link
                to="/faq"
                className={`hidden sm:inline ${navItemClass}`}
              >
                FAQ
              </Link>
              <Link
                to="/support"
                className={`hidden md:inline ${navItemClass}`}
              >
                Support
              </Link>
            </div>
            {rightSlot ? <div className="hidden lg:flex items-center text-sm font-normal">{rightSlot}</div> : null}
          </div>
        </div>
      </div>
    </nav>
  );
}
