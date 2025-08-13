'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function TermsOfService() {
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
          Terms of Service
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
          Please read these terms and conditions carefully before using our platform.
        </p>
      </div>

      <div className="space-y-12 text-sm md:text-base leading-relaxed px-4 md:px-0">
        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using our platform, you agree to be bound by these Terms of Service.
            If you do not agree with any part of these terms, you may not use the service.
            These terms apply to all visitors, users and others who access or use the platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-3">2. Use of Service</h2>
          <p className="mb-2">
            You agree to use the platform only for lawful purposes and in compliance with all applicable laws and regulations.
          </p>
          <p>
            You are responsible for your conduct and any data, text, or content you submit. You agree not to:
          </p>
          <ul className="list-disc list-inside ml-5 space-y-1 text-gray-700">
            <li>Use the platform in any way that could damage, disable, or impair the service</li>
            <li>Attempt to gain unauthorized access to other users accounts</li>
            <li>Upload or distribute harmful, offensive, or illegal content</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-3">3. Account Registration</h2>
          <p>
            To access certain features, you may be required to create an account. You agree to provide accurate, current, and complete information during registration.
          </p>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-3">4. Intellectual Property</h2>
          <p>
            All content and materials on the platform, including text, graphics, logos, images, and software, are the intellectual property of the company or its licensors.
          </p>
          <p>
            You may not copy, modify, distribute, or reproduce any content without prior written permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-3">5. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your account or access to the platform at any time, without notice or liability, for violation of these Terms or other policies.
          </p>
          <p>
            Upon termination, your right to use the service will immediately cease.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-3">6. Disclaimer of Warranties</h2>
          <p>
            The service is provided &quot;as is&quot; and &quot;as available,&quot; without warranties of any kind, either express or implied.
          </p>
          <p>
            We do not guarantee that the platform will be uninterrupted, secure, or free of errors.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-3">7. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.
          </p>
          <p>
            This applies whether the claim arises from contract, tort, negligence, or other legal theory.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-3">8. Changes to Terms</h2>
          <p>
            We reserve the right to update or modify these Terms at any time without prior notice.
          </p>
          <p>
            Continued use of the platform after any changes constitutes your acceptance of the updated Terms.
          </p>
          <p>
            We recommend reviewing these Terms periodically to stay informed about any updates.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-3">9. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at{' '}
            <a href="mailto:support@yourdomain.com" className="text-indigo-600 hover:underline">
              support@yourdomain.com
            </a>.
          </p>
          <p className="mt-2">
            We aim to respond promptly and helpfully to all inquiries.
          </p>
        </section>
      </div>
    </motion.section>
  );
}
