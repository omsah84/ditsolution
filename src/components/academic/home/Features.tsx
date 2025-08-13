'use client';

import React from 'react';
import {
  BookOpenIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  AcademicCapIcon,
  LightBulbIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function AcademicFeatures() {
  const features = [
    {
      title: 'Diverse Courses',
      description: 'Access a wide variety of subjects tailored to your academic goals.',
      icon: <BookOpenIcon className="w-10 h-10" />,
    },
    {
      title: 'Flexible Scheduling',
      description: 'Easily manage and customize your study schedule to fit your lifestyle.',
      icon: <CalendarDaysIcon className="w-10 h-10" />,
    },
    {
      title: 'Community Support',
      description: 'Join study groups, collaborate with peers, and get mentorship from educators.',
      icon: <UserGroupIcon className="w-10 h-10" />,
    },
    {
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with real-world experience.',
      icon: <AcademicCapIcon className="w-10 h-10" />,
    },
    {
      title: 'Innovative Learning',
      description: 'Cutting-edge teaching methods for better knowledge retention.',
      icon: <LightBulbIcon className="w-10 h-10" />,
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor your academic growth with detailed analytics.',
      icon: <ChartBarIcon className="w-10 h-10" />,
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-4"
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold px-4 py-2 rounded-full">
            ACADEMIC EXCELLENCE
          </div>
        </motion.div>
        
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Learning Experience</span>
        </motion.h2>
        
        <motion.p 
          className="text-lg text-gray-600 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          We provide innovative tools and resources to help you achieve academic success in today&apos;s digital world.
        </motion.p>
      </div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {features.map(({ title, description, icon }) => (
          <motion.div
            key={title}
            variants={item}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl transform group-hover:scale-105 transition-all duration-500 opacity-0 group-hover:opacity-100" />
            
            <div className="relative bg-white rounded-2xl p-8 h-full flex flex-col border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 group-hover:border-transparent">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  {icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{title}</h3>
              
              <p className="text-gray-600 mb-6 flex-grow">
                {description}
              </p>
              
              <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                <span>Learn more</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="mt-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-1">
          Start Learning Today
        </button>
        
        <p className="text-gray-500 mt-6 text-sm">
          Join over 250,000 students achieving their academic goals
        </p>
      </motion.div>
    </section>
  );
}