'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <motion.section
      role="main"
      className="py-20 px-6 md:px-12 max-w-5xl mx-auto bg-white text-gray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="mb-12 text-center px-4 md:px-0">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
          Privacy Policy
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
          Your privacy is important to us. This policy explains how we collect, use, and protect your information when you use our platform.
        </p>
      </div>

      <div className="space-y-12 text-sm md:text-base leading-relaxed px-4 md:px-0">
        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-3">1. Information We Collect</h2>
          <p className="mb-2">
            We collect personal information that you provide when you register, subscribe to newsletters, use our services, or contact us. This may include your name, email address, phone number, payment details, and any other data you choose to share.
          </p>
          <p>
            Additionally, we may collect technical data such as IP address, browser type, and device information automatically through cookies and similar tracking technologies.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-3">2. How We Use Your Information</h2>
          <p className="mb-2">
            Your information helps us provide, personalize, and improve our services. We use it to:
          </p>
          <ul className="list-disc list-inside ml-5 space-y-1 text-gray-700">
            <li>Respond to inquiries and provide customer support</li>
            <li>Send important updates, newsletters, and marketing communications</li>
            <li>Analyze and enhance platform performance and user experience</li>
            <li>Prevent fraud and ensure security</li>
            <li>Comply with legal requirements</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-3">3. Cookies and Tracking Technologies</h2>
          <p className="mb-2">
            We use cookies, web beacons, and similar technologies to track usage patterns and remember preferences. This enables a smoother experience and targeted content delivery.
          </p>
          <p>
            You can control cookie settings through your browser preferences. Disabling cookies may affect the functionality of some parts of our site.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-3">4. Data Security</h2>
          <p className="mb-2">
            We implement robust technical and organizational measures to safeguard your data against unauthorized access, loss, or misuse.
          </p>
          <p>
            Despite our efforts, no data transmission over the internet or electronic storage is 100% secure. Please take appropriate steps to keep your login information safe.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-3">5. Your Rights</h2>
          <p className="mb-2">
            Depending on your jurisdiction, you may have rights such as:
          </p>
          <ul className="list-disc list-inside ml-5 space-y-1 text-gray-700">
            <li>Accessing your personal data</li>
            <li>Correcting inaccuracies</li>
            <li>Requesting deletion or restriction of processing</li>
            <li>Opting out of marketing communications</li>
            <li>Data portability</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information below.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-3">6. Third-Party Services</h2>
          <p className="mb-2">
            We collaborate with trusted third-party providers for hosting, analytics, payment processing, and marketing. These providers only have access to necessary data and are obligated to keep it confidential.
          </p>
          <p>
            We recommend reviewing their privacy policies for detailed information on their practices.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-3">7. Children’s Privacy</h2>
          <p>
            Our services are intended for users aged 13 and above. We do not knowingly collect personal information from children under 13. If you believe we have collected such data, please contact us to have it removed.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-3">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We encourage you to review this page regularly.
          </p>
          <p>
            Continued use of our platform after updates indicates your acceptance of the revised policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-3">9. Contact Us</h2>
          <p>
            If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us at{' '}
            <a href="mailto:privacy@yourdomain.com" className="text-indigo-600 hover:underline">
              privacy@yourdomain.com
            </a>.
          </p>
          <p className="mt-2">
            We strive to respond to all inquiries promptly and transparently.
          </p>
        </section>
      </div>
    </motion.section>
  );
}
