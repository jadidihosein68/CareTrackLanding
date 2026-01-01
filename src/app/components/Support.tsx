import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import icon from '../assets/icon.png';

export function Support() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [context, setContext] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');
    const form = event.currentTarget;
    const formData = new FormData(form);
    const encoded = new URLSearchParams();
    formData.forEach((value, key) => {
      encoded.append(key, String(value));
    });

    try {
      const response = await fetch(form.getAttribute('action') ?? '/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encoded.toString(),
      });

      if (!response.ok) {
        throw new Error('Failed to send support request');
      }

      setStatus('sent');
      setName('');
      setEmail('');
      setContext('');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-white">
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
              to="/"
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Support Content */}
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl text-slate-900 mb-6">
            CareTrack Support
          </h1>
          <p className="text-slate-600 mb-10">
            Tell us what you need help with and we will send it to our support team.
          </p>

          <form
            className="space-y-6"
            onSubmit={handleSubmit}
            name="support"
            method="POST"
            action="/?submitted=support"
            encType="application/x-www-form-urlencoded"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="support" />
            <input type="hidden" name="subject" value="CareTrack Support" />
            <input type="hidden" name="bot-field" />
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="context">
                Context
              </label>
              <textarea
                id="context"
                name="context"
                value={context}
                onChange={(event) => setContext(event.target.value)}
                required
                rows={6}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                placeholder="Share details about the issue or question"
              />
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="submit"
                className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending...' : 'Send Email'}
              </button>
              {status === 'sent' && (
                <p className="text-emerald-600">Thanks! Your support request was sent.</p>
              )}
              {status === 'error' && (
                <p className="text-rose-600">
                  We could not send your request. Please email
                  {' '}
                  <a
                    className="underline text-rose-600 hover:text-rose-700"
                    href="mailto:info@osacore.com?subject=CareTrack%20Support"
                  >
                    info@osacore.com
                  </a>
                  {' '}
                  instead.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>

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
            <p>&copy; 2025 CareTrack. All rights reserved. Made by gecko lovers for gecko lovers</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
