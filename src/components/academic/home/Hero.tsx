'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function AcademicHero() {
  const heading = "Empower Your Learning Journey";
  const subtitle = "Access world-class courses, schedule your classes, and track your progress — all in one place designed just for students and educators.";

  const [headingText, setHeadingText] = useState('');
  const [subtitleText, setSubtitleText] = useState('');
  const [headingIndex, setHeadingIndex] = useState(0);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    // Typing heading
    if (!isErasing && headingIndex < heading.length) {
      timer = setTimeout(() => {
        setHeadingText(heading.slice(0, headingIndex + 1));
        setHeadingIndex(headingIndex + 1);
      }, 50);
    }

    // After heading typed, start subtitle
    else if (!isErasing && headingIndex === heading.length && subtitleIndex < subtitle.length) {
      timer = setTimeout(() => {
        setSubtitleText(subtitle.slice(0, subtitleIndex + 1));
        setSubtitleIndex(subtitleIndex + 1);
      }, 15);
    }

    // Pause before erasing
    else if (!isErasing && headingIndex === heading.length && subtitleIndex === subtitle.length) {
      timer = setTimeout(() => {
        setIsErasing(true);
      }, 2000); // wait 2 seconds before erase
    }

    // Erase subtitle
    else if (isErasing && subtitleIndex > 0) {
      timer = setTimeout(() => {
        setSubtitleText(subtitle.slice(0, subtitleIndex - 1));
        setSubtitleIndex(subtitleIndex - 1);
      }, 10);
    }

    // Erase heading
    else if (isErasing && subtitleIndex === 0 && headingIndex > 0) {
      timer = setTimeout(() => {
        setHeadingText(heading.slice(0, headingIndex - 1));
        setHeadingIndex(headingIndex - 1);
      }, 25);
    }

    // Reset and loop
    else if (isErasing && subtitleIndex === 0 && headingIndex === 0) {
      setIsErasing(false);
    }

    return () => clearTimeout(timer);
  }, [headingIndex, subtitleIndex, isErasing]);

  return (
    <section className="relative bg-gradient-to-r from-indigo-600 via-purple-700 to-indigo-800 text-white py-20 px-6 md:px-12 rounded-2xl shadow-2xl max-w-7xl mx-auto overflow-hidden h-[600px] sm:h-[410px]">
      {/* KEEP THE REST OF YOUR EXISTING CODE HERE — NOTHING ELSE NEEDS TO CHANGE */}

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {headingText}
          <span className="ml-1 inline-block w-1 h-14 bg-white animate-pulse align-middle"></span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl mb-10 opacity-90 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {subtitleText}
        </motion.p>

        {/* REST OF YOUR COMPONENT BELOW */}

        {/* Buttons with hover animations */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link
            href="/courses"
            className="relative overflow-hidden group"
          >
            <motion.div 
              className="bg-white text-indigo-700 font-semibold rounded-full px-8 py-4 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                Explore Courses
              </span>
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity rounded-full -z-10" />
          </Link>
          
          <Link
            href="/schedule"
            className="relative overflow-hidden group"
          >
            <motion.div 
              className="border-2 border-white border-opacity-60 rounded-full px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                View Schedule
              </span>
            </motion.div>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity rounded-full -z-10" />
          </Link>
        </motion.div>
      </div>
      
      {/* Floating elements */}
      <motion.div 
        className="absolute top-10 left-10 w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg flex items-center justify-center"
        animate={{ 
          y: [0, -15, 0],
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
        </svg>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-16 right-16 w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg flex items-center justify-center"
        animate={{ 
          y: [0, 15, 0],
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      </motion.div>
      
      {/* Animated student icons */}
      <div className="absolute bottom-8 left-1/4">
        <motion.div 
          className="w-10 h-10 bg-indigo-400 rounded-full flex items-center justify-center shadow-lg"
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </motion.div>
      </div>
      
      <div className="absolute top-12 right-1/3">
        <motion.div 
          className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center shadow-lg"
          animate={{ 
            y: [0, -8, 0],
          }}
          transition={{ 
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}