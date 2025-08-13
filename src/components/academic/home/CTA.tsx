'use client';

import React from 'react';

export default function AcademicCTA() {
  return (
    <section className="py-20 px-6 md:px-12 bg-indigo-600 rounded-lg text-white max-w-7xl mx-auto mt-16 shadow-lg">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Ready to Elevate Your Learning?
        </h2>
        <p className="mb-8 text-indigo-200 text-lg">
          Join thousands of students and educators using our platform to achieve their academic goals.
        </p>
        <a
          href="/signup"
          className="inline-block bg-white text-indigo-700 font-semibold px-8 py-3 rounded-full shadow-md hover:bg-indigo-50 transition"
        >
          Get Started Now
        </a>
      </div>
    </section>
  );
}
