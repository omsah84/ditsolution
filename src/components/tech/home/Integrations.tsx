'use client';

import React from 'react';
import { motion } from 'framer-motion';

const integrations = [
  {
    name: 'GitHub',
    status: 'Connected',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-black">
        <path d="M12 .3a12 12 0 00-3.8 23.4c.6.1.8-.2.8-.6v-2c-3.3.7-4-1.6-4-1.6a3.2 3.2 0 00-1.3-1.7c-1-.7.1-.7.1-.7a2.6 2.6 0 011.9 1.3 2.6 2.6 0 003.5 1 2.6 2.6 0 01.8-1.7c-2.6-.3-5.3-1.3-5.3-5.7a4.4 4.4 0 011.1-3 4 4 0 01.1-3s1-.3 3.2 1.2a11 11 0 015.8 0c2.2-1.5 3.2-1.2 3.2-1.2a4 4 0 01.1 3 4.4 4.4 0 011.1 3c0 4.4-2.7 5.4-5.3 5.7a2.8 2.8 0 01.8 2v3c0 .4.2.7.8.6A12 12 0 0012 .3" />
      </svg>
    ),
  },
  {
    name: 'Docker',
    status: 'Available',
    svg: (
      <svg viewBox="0 0 256 198" fill="currentColor" className="w-10 h-10 text-blue-600">
        <path d="M128 0c70.692 0 128 43.863 128 98s-57.308 98-128 98S0 152.137 0 98 57.308 0 128 0zm0 12C62.728 12 12 52.697 12 98s50.728 86 116 86 116-38.697 116-86S193.272 12 128 12z" />
      </svg>
    ),
  },
  {
    name: 'Vercel',
    status: 'Connected',
    svg: (
      <svg viewBox="0 0 1155 1000" fill="currentColor" className="w-10 h-10 text-gray-900">
        <path d="M577.6 0L1155 1000H0z" />
      </svg>
    ),
  },
  {
    name: 'Slack',
    status: 'Available',
    svg: (
      <svg viewBox="0 0 122.8 122.8" fill="currentColor" className="w-10 h-10 text-pink-500">
        <path d="M30.6 79.6c0 6.8-5.5 12.3-12.3 12.3S6 86.4 6 79.6s5.5-12.3 12.3-12.3h12.3v12.3zM36.8 79.6c0-6.8 5.5-12.3 12.3-12.3s12.3 5.5 12.3 12.3v30.7c0 6.8-5.5 12.3-12.3 12.3s-12.3-5.5-12.3-12.3V79.6zM43.1 30.6c-6.8 0-12.3-5.5-12.3-12.3S36.3 6 43.1 6s12.3 5.5 12.3 12.3v12.3H43.1zM43.1 36.8h30.7c6.8 0 12.3 5.5 12.3 12.3s-5.5 12.3-12.3 12.3H43.1c-6.8 0-12.3-5.5-12.3-12.3S36.3 36.8 43.1 36.8zM92.2 43.1c0-6.8 5.5-12.3 12.3-12.3s12.3 5.5 12.3 12.3-5.5 12.3-12.3 12.3H92.2V43.1zM86 43.1c0 6.8-5.5 12.3-12.3 12.3S61.4 49.9 61.4 43.1V12.3C61.4 5.5 66.9 0 73.7 0s12.3 5.5 12.3 12.3V43.1zM79.6 92.2c6.8 0 12.3 5.5 12.3 12.3s-5.5 12.3-12.3 12.3-12.3-5.5-12.3-12.3V92.2H79.6zM79.6 86H48.9c-6.8 0-12.3-5.5-12.3-12.3S42.1 61.4 48.9 61.4H79.6c6.8 0 12.3 5.5 12.3 12.3S86.4 86 79.6 86z" />
      </svg>
    ),
  },
];

export default function TechIntegrations() {
  return (
    <section className="py-20 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Seamless Integrations
        </h2>
        <p className="text-gray-600 mb-12">
          Easily connect with the tools your team already uses.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 place-items-center">
          {integrations.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center space-y-2"
            >
              <div className="bg-gray-100 rounded-full p-4 shadow hover:shadow-lg transition">
                {tool.svg}
              </div>
              <span className="text-sm font-medium text-gray-800">{tool.name}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  tool.status === 'Connected'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {tool.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
