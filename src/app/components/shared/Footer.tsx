import { Link } from 'react-router-dom';
import icon from '../../assets/icon.webp';

export function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src={icon}
                alt="CareTrack logo"
                className="w-8 h-8 rounded-md object-contain"
              />
              <span className="text-xl">CareTrack</span>
            </div>
            <p className="text-slate-400">
              The smart way to track your gecko's care schedule
            </p>
          </div>
          <div>
            <h4 className="mb-4">Product</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link to="/learn" className="hover:text-white transition-colors">
                  Learn
                </Link>
              </li>
              <li>
                <Link to="/?early-access=1" className="hover:text-white transition-colors">
                  Download
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-white transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4">Legal</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 text-center text-slate-400">
          <p>&copy; 2025 CareTrack. All rights reserved. Made by gecko lovers for gecko lovers</p>
        </div>
      </div>
    </footer>
  );
}
