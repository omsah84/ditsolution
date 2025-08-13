'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpenIcon,
  UserGroupIcon,
  AcademicCapIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';

export default function AcademicAchievements() {
  const [countersStarted, setCountersStarted] = useState(false);

  const achievements = [
    { label: 'Courses Completed', value: 1200, icon: BookOpenIcon, suffix: '+' },
    { label: 'Active Students', value: 8500, icon: UserGroupIcon, suffix: '+' },
    { label: 'Certified Teachers', value: 150, icon: AcademicCapIcon, suffix: '+' },
    { label: 'Awards Won', value: 24, icon: TrophyIcon },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('achievements-section');
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75 && !countersStarted) {
          setCountersStarted(true);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [countersStarted]);

  return (
    <section
      id="achievements-section"
      className="py-16 px-4 md:px-8 max-w-7xl mx-auto relative overflow-hidden"
    >
      {/* Background blur */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-0 left-1/4 w-60 h-60 bg-blue-500 rounded-full blur-[100px] opacity-10" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500 rounded-full blur-[100px] opacity-10" />
      </div>

      {/* Heading */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block mb-3"
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
            ACADEMIC EXCELLENCE
          </div>
        </motion.div>

        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Our{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Achievements
          </span>
        </motion.h2>

        <motion.p
          className="text-base text-gray-600 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Celebrating milestones in educational innovation and student success
        </motion.p>
      </div>

      {/* Counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {achievements.map(({ label, value, icon: Icon, suffix }, index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
              y: -8,
              boxShadow: '0 12px 24px -6px rgba(99, 102, 241, 0.15)',
            }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl transform group-hover:scale-105 transition-all duration-500 opacity-0 group-hover:opacity-100" />

            <div className="relative bg-white rounded-xl p-6 flex flex-col items-center text-center border border-gray-100 shadow-sm hover:shadow-md transition duration-300 group-hover:border-transparent">
              {/* Icon */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                  <Icon className="w-6 h-6" />
                </div>
              </div>

              {/* Number */}
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {countersStarted ? (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={value}>
                    {value.toLocaleString()}
                    {suffix && <span className="text-blue-600">{suffix}</span>}
                  </motion.span>
                ) : (
                  '0'
                )}
              </div>

              {/* Label */}
              <div className="text-sm font-medium text-gray-700">{label}</div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-gray-100 rounded-full mt-4 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                  initial={{ width: 0 }}
                  animate={{ width: countersStarted ? `${Math.min(100, (index + 1) * 25)}%` : 0 }}
                  transition={{ duration: 2, delay: 0.5 }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        className="mt-14 flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 md:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">Join our academic community</h3>
          <p className="text-sm text-gray-600">
            Become part of our growing network of learners and educators
          </p>
        </div>

        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium px-6 py-2.5 rounded-lg hover:shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700 text-sm">
          Get Started Now
        </button>
      </motion.div>
    </section>
  );
}
