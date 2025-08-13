'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const counters = [
  { label: 'Active Students', value: 8500 },
  { label: 'Projects Completed', value: 1200 },
  { label: 'Team Members', value: 48 },
  { label: 'Awards Won', value: 24 },
];

const tabs = {
  story: 'We started as a small group of passionate educators and engineers, united by the vision to democratize access to quality education and tools. Today, we’ve grown into a global platform serving thousands worldwide.',
  team: 'Our team consists of developers, designers, educators, and content creators working remotely from different parts of the world to build engaging and effective learning experiences.',
  milestones: '🚀 Launched MVP in 2021\n🌍 Reached 10k users in 2022\n🏆 Won EdTech Award in 2023\n📈 Expanded globally in 2024',
};

const timeline = [
  { year: '2021', event: 'Platform launched with 5 courses.' },
  { year: '2022', event: 'Reached 10,000 users globally.' },
  { year: '2023', event: 'Won National Education Tech Award.' },
  { year: '2024', event: 'Expanded to 3 continents.' },
];

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState<'story' | 'team' | 'milestones'>('story');

  return (
    <section className="bg-white text-gray-800 min-h-screen">
      {/* Hero */}
      <div className="text-center py-16 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
          Who We Are
        </h1>
        <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto">
          Building a smarter future by combining education with modern technology and collaboration.
        </p>
      </div>

      {/* Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 px-6 sm:px-12 mb-20 max-w-6xl mx-auto text-center">
        {counters.map(({ label, value }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-indigo-600 font-extrabold text-4xl sm:text-5xl select-none"
          >
            <div>{value.toLocaleString()}</div>
            <div className="text-gray-600 text-sm sm:text-base font-semibold mt-2">{label}</div>
          </motion.div>
        ))}
      </div>

      {/* About Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6 sm:px-12 mb-24 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/images/about-us.jpg"
            alt="Team working"
            width={700}
            height={450}
            className="rounded-xl shadow-lg w-full h-auto object-cover"
            priority
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">Our Mission</h2>
          <p className="text-gray-600 mb-6 text-lg leading-relaxed max-w-lg mx-auto md:mx-0">
            Empower individuals with the tools, knowledge, and community to unlock their full potential.
          </p>
          <ul className="space-y-3 text-gray-700 list-disc list-inside max-w-lg mx-auto md:mx-0 text-left">
            <li>Accessible & Inclusive Education</li>
            <li>Developer-Friendly Tools</li>
            <li>Real-World Collaboration</li>
          </ul>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="px-6 sm:px-12 mb-24 max-w-4xl mx-auto">
        <div className="flex justify-center mb-8 flex-wrap gap-4">
          {Object.keys(tabs).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as keyof typeof tabs)}
              className={`px-5 py-2 rounded-full border font-semibold transition duration-300 ${
                activeTab === key
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg'
                  : 'text-gray-600 border-gray-300 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
        <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-700 whitespace-pre-line font-medium shadow-inner">
          {tabs[activeTab]}
        </div>
      </div>

      {/* Timeline */}
      <div className="px-6 sm:px-12 max-w-5xl mx-auto mb-24">
        <h3 className="text-3xl font-bold mb-10 text-center">Our Journey</h3>
        <div className="border-l-4 border-indigo-400 pl-8 space-y-10">
          {timeline.map(({ year, event }) => (
            <motion.div
              key={year}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h4 className="text-indigo-700 font-extrabold text-xl sm:text-2xl mb-1">{year}</h4>
              <p className="text-gray-700 text-base sm:text-lg max-w-xl">{event}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video */}
      <div className="px-6 sm:px-12 mb-24 max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-6">Meet the Team</h3>
        <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
          <iframe
            className="w-full h-96"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Intro Video"
            allowFullScreen
          />
        </div>
      </div>

      {/* Partner Logos */}
      <div className="px-6 sm:px-12 mb-24 max-w-7xl mx-auto">
        <h3 className="text-center text-3xl font-bold mb-12">Trusted by</h3>
        <div className="flex flex-wrap justify-center gap-12 opacity-80 grayscale hover:grayscale-0 transition duration-300 ease-in-out">
          {['google', 'meta', 'microsoft', 'aws'].map((name) => (
            <motion.div
              key={name}
              whileHover={{ scale: 1.15, filter: 'grayscale(0%)', transition: { duration: 0.3 } }}
              className="cursor-pointer"
            >
              <Image
                src={`/logos/${name}.svg`}
                alt={name}
                width={110}
                height={44}
                className="object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-indigo-600 text-white text-center py-20 px-6 sm:px-12">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight drop-shadow-md">
          Ready to Join Us?
        </h2>
        <p className="max-w-2xl mx-auto mb-10 text-lg sm:text-xl font-medium text-indigo-200 leading-relaxed">
          Be a part of the movement that’s redefining learning and innovation.
        </p>
        <button className="bg-white text-indigo-600 font-bold px-14 py-4 rounded-full shadow-lg hover:bg-indigo-50 transition duration-300">
          Get Started
        </button>
      </div>
    </section>
  );
}
