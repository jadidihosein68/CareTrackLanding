import { Link } from 'react-router-dom';
import { ImageWithFallback } from './shared/ImageWithFallback';
import { Calendar, Bell, BookOpen, Heart, CheckCircle, Smartphone } from 'lucide-react';
import geico from '../assets/geico.jpeg';
import icon from '../assets/icon.png';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
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
            <Link
              to="/privacy"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-slate-900 mb-6">
                Track Your Gecko's Care with Confidence
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                Never forget a feeding or supplement again. CareTrack helps you provide the best care for your gecko with smart reminders and a built-in knowledge base.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors">
                  Download on iOS
                </button>
                <button className="bg-slate-900 text-white px-8 py-3 rounded-lg hover:bg-slate-800 transition-colors">
                  Download on Android
                </button>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback 
                src={geico}
                alt="Gecko"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl text-slate-900 mb-4">
              Everything You Need for Gecko Care
            </h2>
            <p className="text-xl text-slate-600">
              Designed specifically for reptile owners who want to provide the best care
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl text-slate-900 mb-2">Feeding Tracker</h3>
              <p className="text-slate-600">
                Log feedings with ease and track food types, quantities, and supplements applied.
              </p>
            </div>

            <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl text-slate-900 mb-2">Smart Reminders</h3>
              <p className="text-slate-600">
                Never miss a feeding or supplement schedule with customizable notifications.
              </p>
            </div>

            <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl text-slate-900 mb-2">Knowledge Base</h3>
              <p className="text-slate-600">
                Access expert gecko care guides right when you need them, completely offline.
              </p>
            </div>

            <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl text-slate-900 mb-2">Health Logs</h3>
              <p className="text-slate-600">
                Track shedding, weight, and behavioral observations to monitor your gecko's health.
              </p>
            </div>

            <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-xl text-slate-900 mb-2">Multiple Pets</h3>
              <p className="text-slate-600">
                Manage care for all your geckos in one place with individual profiles.
              </p>
            </div>

            <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl text-slate-900 mb-2">Offline First</h3>
              <p className="text-slate-600">
                All features work without internet. Your data stays private on your device.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl text-slate-900 mb-4">
              Simple, Yet Powerful
            </h2>
            <p className="text-xl text-slate-600">
              Get started in minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl text-slate-900 mb-2">Create a Profile</h3>
              <p className="text-slate-600">
                Add your gecko's details - name, species, and age
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl text-slate-900 mb-2">Set Your Schedule</h3>
              <p className="text-slate-600">
                Define feeding and supplement routines that work for you
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl text-slate-900 mb-2">Track with Ease</h3>
              <p className="text-slate-600">
                One-tap feeding logs and automatic schedule updates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl text-white mb-6">
            Ready to Provide Better Care?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join gecko owners who trust CareTrack for their reptile care needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-emerald-600 px-8 py-3 rounded-lg hover:bg-emerald-50 transition-colors">
              Download Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
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

                <li><a href="#" className="hover:text-white transition-colors">Download</a></li>
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
            <p>&copy; 2025 CareTrack. All rights reserved. Made by gecko Lovers for gecko's lovers</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
