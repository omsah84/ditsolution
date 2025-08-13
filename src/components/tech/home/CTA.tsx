'use client';

import React from 'react';

export default function TechCTA() {
  return (
    <section className="bg-cyan-700 text-white py-16 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Build Smarter, Deploy Faster
        </h2>
        <p className="mb-8 text-lg">
          Supercharge your workflow with tools designed for developers and teams.
        </p>
        <a
          href="/signup"
          className="inline-block bg-white text-cyan-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-cyan-100 transition"
        >
          Start Building
        </a>
      </div>
    </section>
  );
}
