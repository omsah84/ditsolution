'use client';

import React, { useState } from 'react';

const faqData = [
  {
    question: 'How do I enroll in a course?',
    answer:
      'You can browse available courses and click "Enroll" on the course page. Then follow the instructions to complete registration.',
  },
  {
    question: 'Can I customize my study schedule?',
    answer:
      'Yes! Our platform offers flexible scheduling tools to fit your personal timetable.',
  },
  {
    question: 'Is there support available for students?',
    answer:
      'Absolutely! You can join study groups, participate in forums, and contact mentors anytime.',
  },
  {
    question: 'Are the courses accredited?',
    answer:
      'Many courses are accredited and recognized by leading academic institutions. Check course details for specifics.',
  },
];

export default function AcademicFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-extrabold mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about our academic platform.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqData.map(({ question, answer }, idx) => (
          <div
            key={idx}
            className="border border-gray-300 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleIndex(idx)}
              className="w-full text-left px-6 py-4 bg-gray-100 hover:bg-gray-200 flex justify-between items-center focus:outline-none"
            >
              <span className="font-semibold">{question}</span>
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${
                  openIndex === idx ? 'rotate-180' : 'rotate-0'
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === idx && (
              <div className="px-6 py-4 text-gray-700 bg-white">{answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
