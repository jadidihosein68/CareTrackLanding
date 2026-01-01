import { useEffect, useState, type SVGProps } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ImageWithFallback } from './shared/ImageWithFallback';
import { Calendar, Bell, BookOpen, Heart, CheckCircle, Smartphone, Turtle } from 'lucide-react';
import geico from '../assets/geico.webp';
import { Footer } from './shared/Footer';
import { TopNav } from './shared/TopNav';

type IconProps = SVGProps<SVGSVGElement>;

const SnakeIcon = (props: IconProps) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path d="M6 36c6-10 18-10 24 0s18 10 28 0" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="58" cy="36" r="2" />
    <path d="M60 36l4 2-4 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GeckoIcon = (props: IconProps) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path
      d="M22 34c2-8 10-14 20-12 8 2 12 8 12 14 0 8-8 14-18 14-8 0-14-4-16-10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M22 36c-10 2-16 10-12 18 2 4 8 4 12 2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="42" cy="24" r="2" />
    <path d="M30 24l-8-6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M38 24l8-6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M28 44l-8 8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M40 44l8 8" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="22" cy="18" r="2" />
    <circle cx="50" cy="18" r="2" />
    <circle cx="20" cy="52" r="2" />
    <circle cx="52" cy="52" r="2" />
  </svg>
);

const SpiderIcon = (props: IconProps) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <circle cx="32" cy="22" r="4" />
    <circle cx="32" cy="32" r="6" />
    <path d="M18 22l10 6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 30l12 2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 40l10-4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M46 22l-10 6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M50 30l-12 2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M46 40l-10-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function LandingPage() {
  const [isTesterOpen, setIsTesterOpen] = useState(false);
  const [testerEmail, setTesterEmail] = useState('');
  const [testerStatus, setTesterStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const location = useLocation();
  const navigate = useNavigate();

  const openTesterModal = () => {
    setIsTesterOpen(true);
    setTesterStatus('idle');
  };

  const closeTesterModal = () => {
    setIsTesterOpen(false);
    setTesterEmail('');
    setTesterStatus('idle');
    if (new URLSearchParams(location.search).has('early-access')) {
      navigate('/', { replace: true });
    }
  };

  const handleTesterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTesterStatus('sending');
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
        throw new Error('Failed to submit early access request');
      }

      setTesterStatus('sent');
      setTesterEmail('');
    } catch (error) {
      setTesterStatus('error');
    }
  };

  useEffect(() => {
    if (new URLSearchParams(location.search).get('early-access') === '1') {
      setIsTesterOpen(true);
    }
  }, [location.search]);

  const heroIcons = [
    {
      id: 'snake-1',
      Icon: SnakeIcon,
      className: 'left-[5%] top-[10%] h-10 w-10 sm:h-14 sm:w-14 text-slate-900/10 float-slow',
      delay: '0.3s',
    },
    {
      id: 'gecko-1',
      Icon: GeckoIcon,
      className: 'right-[8%] top-[12%] h-12 w-12 sm:h-16 sm:w-16 text-slate-900/10 float-medium',
      delay: '1.1s',
    },
    {
      id: 'spider-1',
      Icon: SpiderIcon,
      className: 'left-[10%] bottom-[18%] h-9 w-9 sm:h-12 sm:w-12 text-slate-900/10 float-sway',
      delay: '0.8s',
    },
    {
      id: 'turtle-1',
      Icon: Turtle,
      className: 'right-[10%] bottom-[12%] h-12 w-12 sm:h-16 sm:w-16 text-slate-900/10 float-slow',
      delay: '1.8s',
      strokeWidth: 1.4,
    },
    {
      id: 'snake-2',
      Icon: SnakeIcon,
      className: 'left-[32%] top-[6%] h-8 w-8 text-slate-900/5 float-medium hidden md:block',
      delay: '2.4s',
    },
    {
      id: 'gecko-2',
      Icon: GeckoIcon,
      className: 'right-[35%] top-[22%] h-8 w-8 text-slate-900/5 float-sway hidden md:block',
      delay: '1.6s',
    },
    {
      id: 'spider-2',
      Icon: SpiderIcon,
      className: 'left-[40%] bottom-[6%] h-8 w-8 text-slate-900/5 float-slow hidden md:block',
      delay: '0.9s',
    },
    {
      id: 'turtle-2',
      Icon: Turtle,
      className: 'right-[26%] bottom-[30%] h-9 w-9 text-slate-900/5 float-medium hidden md:block',
      delay: '2.1s',
      strokeWidth: 1.3,
    },
    {
      id: 'snake-3',
      Icon: SnakeIcon,
      className: 'right-[12%] top-[45%] h-8 w-8 text-slate-900/5 float-slow hidden lg:block',
      delay: '0.7s',
    },
    {
      id: 'gecko-3',
      Icon: GeckoIcon,
      className: 'left-[18%] top-[40%] h-8 w-8 text-slate-900/5 float-medium hidden lg:block',
      delay: '1.9s',
    },
    {
      id: 'spider-3',
      Icon: SpiderIcon,
      className: 'right-[40%] bottom-[18%] h-8 w-8 text-slate-900/5 float-sway hidden lg:block',
      delay: '1.2s',
    },
    {
      id: 'snake-4',
      Icon: SnakeIcon,
      className: 'left-[12%] top-[52%] h-8 w-8 text-slate-900/6 float-medium hidden md:block',
      delay: '2.6s',
    },
    {
      id: 'snake-5',
      Icon: SnakeIcon,
      className: 'right-[18%] bottom-[40%] h-9 w-9 text-slate-900/6 float-slow hidden md:block',
      delay: '0.6s',
    },
    {
      id: 'snake-6',
      Icon: SnakeIcon,
      className: 'left-[46%] top-[18%] h-8 w-8 text-slate-900/5 float-sway hidden lg:block',
      delay: '1.4s',
    },
    {
      id: 'snake-7',
      Icon: SnakeIcon,
      className: 'right-[48%] bottom-[8%] h-7 w-7 text-slate-900/5 float-medium hidden lg:block',
      delay: '2.2s',
    },
    {
      id: 'spider-4',
      Icon: SpiderIcon,
      className: 'right-[6%] top-[38%] h-8 w-8 text-slate-900/6 float-sway hidden md:block',
      delay: '0.4s',
    },
    {
      id: 'spider-5',
      Icon: SpiderIcon,
      className: 'left-[24%] bottom-[30%] h-9 w-9 text-slate-900/6 float-slow hidden md:block',
      delay: '1.7s',
    },
    {
      id: 'spider-6',
      Icon: SpiderIcon,
      className: 'left-[52%] top-[42%] h-7 w-7 text-slate-900/5 float-medium hidden lg:block',
      delay: '2.8s',
    },
    {
      id: 'spider-7',
      Icon: SpiderIcon,
      className: 'right-[32%] top-[58%] h-7 w-7 text-slate-900/5 float-slow hidden lg:block',
      delay: '0.9s',
    },
  ];

  const featuresIcons = [
    {
      id: 'features-snake-1',
      Icon: SnakeIcon,
      className: 'left-[6%] top-[12%] h-10 w-10 sm:h-14 sm:w-14 text-slate-900/8 float-slow',
      delay: '0.6s',
    },
    {
      id: 'features-spider-1',
      Icon: SpiderIcon,
      className: 'right-[8%] top-[18%] h-10 w-10 sm:h-14 sm:w-14 text-slate-900/8 float-sway',
      delay: '1.2s',
    },
  ];

  const howIcons = [
    {
      id: 'how-snake-1',
      Icon: SnakeIcon,
      className: 'left-[8%] top-[14%] h-10 w-10 sm:h-14 sm:w-14 text-slate-900/8 float-medium',
      delay: '0.8s',
    },
    {
      id: 'how-spider-1',
      Icon: SpiderIcon,
      className: 'right-[12%] top-[10%] h-10 w-10 sm:h-14 sm:w-14 text-slate-900/8 float-sway',
      delay: '1.4s',
    },
  ];

  const ctaIcons = [
    {
      id: 'cta-snake-1',
      Icon: SnakeIcon,
      className: 'left-[8%] top-[18%] h-9 w-9 text-white/12 float-slow',
      delay: '0.7s',
    },
    {
      id: 'cta-spider-1',
      Icon: SpiderIcon,
      className: 'right-[10%] top-[12%] h-9 w-9 text-white/12 float-sway',
      delay: '1.5s',
    },
    {
      id: 'cta-snake-2',
      Icon: SnakeIcon,
      className: 'right-[16%] bottom-[16%] h-7 w-7 text-white/10 float-medium hidden md:block',
      delay: '2.4s',
    },
    {
      id: 'cta-spider-2',
      Icon: SpiderIcon,
      className: 'left-[18%] bottom-[20%] h-7 w-7 text-white/10 float-slow hidden md:block',
      delay: '1.1s',
    },
  ];

  const renderFloatingIcons = (
    icons: {
      id: string;
      Icon: React.ComponentType<IconProps>;
      className: string;
      delay: string;
      strokeWidth?: number;
    }[],
  ) => (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {icons.map(({ id, Icon, className, delay, strokeWidth }) => (
        <Icon
          key={id}
          className={`absolute ${className} motion-reduce:animate-none`}
          strokeWidth={strokeWidth}
          style={{ animationDelay: delay }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <TopNav
        rightSlot={(
          <div className="flex items-center gap-4">
            <Link
              to="/learn"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Learn
            </Link>
            <Link
              to="/privacy"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        )}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {renderFloatingIcons(heroIcons)}
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-slate-900 mb-6">
                Track Your Gecko's Care with Confidence
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                Never forget a feeding or supplement again. CareTrack helps you provide the best care for your gecko with smart reminders and a built-in knowledge base.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <button
                  type="button"
                  onClick={openTesterModal}
                  className="bg-slate-900 text-white px-8 py-3 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Test it early
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        {renderFloatingIcons(featuresIcons)}
        <div className="max-w-7xl mx-auto relative z-10">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {renderFloatingIcons(howIcons)}
        <div className="max-w-7xl mx-auto relative z-10">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-emerald-600 relative overflow-hidden">
        {renderFloatingIcons(ctaIcons)}
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl text-white mb-6">
            Ready to Provide Better Care?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join gecko owners who trust CareTrack for their reptile care needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={openTesterModal}
              className="bg-white text-emerald-600 px-8 py-3 rounded-lg hover:bg-emerald-50 transition-colors"
            >
              Test it early
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {isTesterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-slate-900/50"
            onClick={closeTesterModal}
          />
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl text-slate-900">Join the tester program</h3>
                <p className="text-slate-600 mt-2">
                  Enter your email to join. We will send you an email in a few days with next steps.
                </p>
                <p className="text-sm text-slate-500 mt-3">
                  Google Play is only available for registered users. Access the listing here:{' '}
                  <a
                    href="https://play.google.com/store/apps/details?id=com.osacore.caretrack&pcampaignid=web_share"
                    className="text-emerald-600 hover:text-emerald-700 underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Google Play link
                  </a>
                </p>
              </div>
              <button
                type="button"
                onClick={closeTesterModal}
                className="text-slate-500 hover:text-slate-700 transition-colors"
              >
                Close
              </button>
            </div>

            <form
              className="space-y-6"
              onSubmit={handleTesterSubmit}
              name="early-access"
              method="POST"
              action="/?submitted=early-access"
              encType="application/x-www-form-urlencoded"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="early-access" />
              <input type="hidden" name="subject" value="CareTrack Early Access" />
              <input type="hidden" name="bot-field" />
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="tester-email">
                  Email
                </label>
                <input
                  id="tester-email"
                  name="email"
                  type="email"
                  value={testerEmail}
                  onChange={(event) => setTesterEmail(event.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="you@example.com"
                />
              </div>

              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={testerStatus === 'sending'}
                >
                  {testerStatus === 'sending' ? 'Sending...' : 'Join tester program'}
                </button>
                {testerStatus === 'sent' && (
                  <p className="text-emerald-600">Thanks! You are on the list.</p>
                )}
                {testerStatus === 'error' && (
                  <p className="text-rose-600">
                    We could not submit your request. Please try again later.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
