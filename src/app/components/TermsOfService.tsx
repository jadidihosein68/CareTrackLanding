import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Footer } from './shared/Footer';
import { TopNav } from './shared/TopNav';

export function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      <TopNav
        rightSlot={(
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        )}
      />

      {/* Terms Content */}
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl text-slate-900 mb-6">
            Terms of Service
          </h1>
          <p className="text-slate-600 mb-8">
            Last updated: December 29, 2025
          </p>

          <div className="prose prose-slate max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl text-slate-900 mb-4">Acceptance of Terms</h2>
              <p className="text-slate-700 mb-4">
                By accessing or using CareTrack, you agree to be bound by these Terms of Service.
                If you do not agree to these terms, please do not use the application.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-slate-900 mb-4">About CareTrack</h2>
              <p className="text-slate-700 mb-4">
                CareTrack is a care tracking tool designed to help pet owners manage feeding,
                supplementation, and health observations. The app is built with an offline-first
                approach, so your data stays on your device unless you choose to export or share it.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-slate-900 mb-4">Eligibility</h2>
              <p className="text-slate-700 mb-4">
                You must be at least 13 years old to use CareTrack. If you are under 18, you must
                have permission from a parent or legal guardian to use the application.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-slate-900 mb-4">Your Data and Privacy</h2>
              <p className="text-slate-700 mb-4">
                You retain ownership of the data you enter into CareTrack. By using the app, you
                acknowledge that your data is stored locally on your device. For more details on
                how we handle information, please review our Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-slate-900 mb-4">License to Use the App</h2>
              <p className="text-slate-700 mb-4">
                We grant you a limited, non-exclusive, non-transferable license to use CareTrack
                for your personal, non-commercial use, subject to these terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-slate-900 mb-4">Acceptable Use</h2>
              <p className="text-slate-700 mb-4">
                You agree not to misuse CareTrack or attempt to interfere with its normal operation.
                Prohibited activities include:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>Using the app for unlawful purposes</li>
                <li>Attempting to access or extract data you do not own</li>
                <li>Reverse engineering or tampering with the app</li>
                <li>Disrupting or degrading the service or user experience</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-slate-900 mb-4">Reminders and Notifications</h2>
              <p className="text-slate-700 mb-4">
                CareTrack can send local notifications for schedules and reminders. You are
                responsible for configuring notification settings on your device.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-slate-900 mb-4">Third-Party Services</h2>
              <p className="text-slate-700 mb-4">
                CareTrack may rely on third-party services for analytics and performance monitoring.
                These services are governed by their own terms and privacy policies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-slate-900 mb-4">No Veterinary Advice</h2>
              <p className="text-slate-700 mb-4">
                CareTrack does not provide medical or veterinary advice. The information in the app
                is for educational purposes only. Always consult a qualified veterinarian for
                medical concerns about your pets.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-slate-900 mb-4">Disclaimer of Warranties</h2>
              <p className="text-slate-700 mb-4">
                CareTrack is provided on an "as is" and "as available" basis without warranties of
                any kind. We do not guarantee that the app will be error-free, uninterrupted, or
                meet your specific needs.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-slate-900 mb-4">Limitation of Liability</h2>
              <p className="text-slate-700 mb-4">
                To the fullest extent permitted by law, CareTrack and its affiliates will not be
                liable for any indirect, incidental, special, or consequential damages arising from
                your use of the app.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-slate-900 mb-4">Termination</h2>
              <p className="text-slate-700 mb-4">
                We may suspend or terminate your access to CareTrack if you violate these terms.
                You may stop using the app at any time by uninstalling it from your device.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-slate-900 mb-4">Changes to These Terms</h2>
              <p className="text-slate-700 mb-4">
                We may update these Terms of Service from time to time. Changes are effective when
                posted on this page. Continued use of CareTrack after updates means you accept the
                revised terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-slate-900 mb-4">Contact Us</h2>
              <p className="text-slate-700 mb-4">
                If you have questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-slate-50 p-6 rounded-lg">
                <p className="text-slate-700 mb-2">
                  <strong>Email:</strong> info@osacore.com
                </p>
                <p className="text-slate-700 mb-2">
                  <strong>Address:</strong> OSACORE
                </p>
                <p className="text-slate-700">
                  <strong>Response Time:</strong> We aim to respond to all inquiries within 48 hours
                </p>
              </div>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
