import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Footer } from './shared/Footer';
import { TopNav } from './shared/TopNav';

export function PrivacyPolicy() {
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

      {/* Privacy Policy Content */}
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl text-slate-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-slate-600 mb-8">
            Last updated: December 29, 2025
          </p>

          <div className="prose prose-slate max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl text-slate-900 mb-4">Introduction</h2>
              <p className="text-slate-700 mb-4">
                Welcome to CareTrack. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our mobile application.
              </p>
              <p className="text-slate-700 mb-4">
                CareTrack is designed with privacy as a core principle. Our app operates offline-first, meaning your data stays on your device by default.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-slate-900 mb-4">Information We Collect</h2>
              
              <h3 className="text-xl text-slate-900 mb-3">Information You Provide</h3>
              <p className="text-slate-700 mb-4">
                When you use CareTrack, you may provide the following information:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>Animal profile information (name, species, age, photos)</li>
                <li>Feeding schedules and logs</li>
                <li>Supplement tracking data</li>
                <li>Health observation notes</li>
                <li>Custom notes and observations</li>
              </ul>

              <h3 className="text-xl text-slate-900 mb-3">Automatically Collected Information</h3>
              <p className="text-slate-700 mb-4">
                We may automatically collect certain technical information:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>Device type and operating system version</li>
                <li>App version and usage statistics (crash reports)</li>
                <li>Local notification preferences</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-slate-900 mb-4">How We Use Your Information</h2>
              <p className="text-slate-700 mb-4">
                All data you enter into CareTrack is stored locally on your device. We use this information solely to:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>Provide core app functionality (tracking, reminders, knowledge base access)</li>
                <li>Send you local notifications about feeding and care schedules</li>
                <li>Improve app performance and fix bugs</li>
                <li>Provide customer support when requested</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-slate-900 mb-4">Data Storage and Security</h2>
              
              <h3 className="text-xl text-slate-900 mb-3">Local Storage</h3>
              <p className="text-slate-700 mb-4">
                CareTrack is designed as an offline-first application. This means:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>All your animal profiles and care data are stored locally on your device</li>
                <li>We do not automatically sync or upload your data to our servers</li>
                <li>You maintain full control over your data at all times</li>
                <li>Data is protected by your device's built-in security features</li>
              </ul>

              <h3 className="text-xl text-slate-900 mb-3">Security Measures</h3>
              <p className="text-slate-700 mb-4">
                We implement industry-standard security practices to protect your information:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>Encrypted local data storage</li>
                <li>Secure coding practices</li>
                <li>Regular security audits and updates</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-slate-900 mb-4">Data Sharing and Disclosure</h2>
              <p className="text-slate-700 mb-4">
                We do not sell, trade, or rent your personal information to third parties. Your data stays on your device. We may only disclose information if:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>Required by law or legal process</li>
                <li>Necessary to protect our rights or safety</li>
                <li>You explicitly consent to sharing specific information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-slate-900 mb-4">Third-Party Services</h2>
              <p className="text-slate-700 mb-4">
                CareTrack may use the following third-party services:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>Analytics services (for crash reporting and performance monitoring)</li>
                <li>Push notification services (for local reminders)</li>
              </ul>
              <p className="text-slate-700 mb-4">
                These services may collect limited technical information as described in their respective privacy policies. We carefully select partners who respect user privacy and comply with applicable data protection laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-slate-900 mb-4">Children's Privacy</h2>
              <p className="text-slate-700 mb-4">
                CareTrack is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-slate-900 mb-4">Your Rights and Choices</h2>
              <p className="text-slate-700 mb-4">
                You have the following rights regarding your data:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li><strong>Access:</strong> You can access all your data within the app at any time</li>
                <li><strong>Edit:</strong> You can modify or update your information directly in the app</li>
                <li><strong>Delete:</strong> You can delete individual records or all app data from your device settings</li>
                <li><strong>Export:</strong> You can export your data for backup purposes (feature availability may vary)</li>
                <li><strong>Notifications:</strong> You can enable or disable notifications in your device settings</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-slate-900 mb-4">Data Retention</h2>
              <p className="text-slate-700 mb-4">
                Your data is retained on your device until you choose to delete it. When you uninstall CareTrack, all local data associated with the app is removed from your device according to your operating system's data management policies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-slate-900 mb-4">International Users</h2>
              <p className="text-slate-700 mb-4">
                CareTrack is available worldwide. Since data is stored locally on your device, it does not cross international borders unless you choose to manually transfer or share it.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-slate-900 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-slate-700 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>Posting the new Privacy Policy on this page</li>
                <li>Updating the "Last updated" date at the top of this policy</li>
                <li>Sending an in-app notification for significant changes</li>
              </ul>
              <p className="text-slate-700 mb-4">
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-slate-900 mb-4">Important Notices</h2>
              
              <h3 className="text-xl text-slate-900 mb-3">Not for Medical Advice</h3>
              <p className="text-slate-700 mb-4">
                CareTrack is a care tracking tool and does not provide medical or veterinary advice. The knowledge base is for informational purposes only. Always consult with a qualified veterinarian for medical concerns about your pets.
              </p>

              <h3 className="text-xl text-slate-900 mb-3">Not for Sensitive or Personal Information</h3>
              <p className="text-slate-700 mb-4">
                CareTrack is designed for tracking animal care and should not be used to store personally identifiable information (PII), sensitive personal data, or any information that requires special protection under data privacy laws. Please do not enter:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>Personal health information</li>
                <li>Financial information</li>
                <li>Government-issued identification numbers</li>
                <li>Passwords or security credentials</li>
                <li>Any other sensitive personal data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-slate-900 mb-4">Contact Us</h2>
              <p className="text-slate-700 mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
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

            <section className="mb-8">
              <h2 className="text-2xl text-slate-900 mb-4">Consent</h2>
              <p className="text-slate-700 mb-4">
                By using CareTrack, you consent to this Privacy Policy and agree to its terms. If you do not agree with this policy, please do not use our application.
              </p>
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
