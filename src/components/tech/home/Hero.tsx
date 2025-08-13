'use client';

import React from 'react';

export default function TechHero() {
  return (
    <section className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-20 px-6 md:px-12 rounded-lg shadow-lg max-w-7xl mx-auto">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          Build, Deploy & Innovate
        </h1>
        <p className="text-lg md:text-xl mb-8 opacity-90">
          Manage your projects, explore repositories, and streamline your deployments with our cutting-edge tech tools.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/projects"
            className="bg-white text-cyan-700 font-semibold rounded-full px-8 py-3 shadow-lg hover:bg-cyan-50 transition"
          >
            View Projects
          </a>
          <a
            href="/repos"
            className="border border-white border-opacity-60 rounded-full px-8 py-3 hover:bg-white hover:text-cyan-700 transition"
          >
            Explore Repositories
          </a>
        </div>
      </div>
    </section>
  );
}
