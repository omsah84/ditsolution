'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function SuccessStory() {
  const stories = [
    {
      id: 1,
      name: 'Aisha Khan',
      title: 'Data Analyst at TechCorp',
      summary: 'After completing the Data Science Bootcamp, Aisha landed her dream job. Her story is an inspiration for many aspiring analysts.',
      image: '/images/ai-course.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      title: 'UX Lead at DesignHub',
      summary: 'Marcus transitioned from graphic design to UX leadership after completing our intensive UI/UX program.',
      image: '/images/ai-course.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
    {
      id: 3,
      name: 'Sophie Chen',
      title: 'Fullstack Developer at ByteSystems',
      summary: 'With zero coding background, Sophie mastered fullstack development in 9 months and now leads product teams.',
      image: '/images/ai-course.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const currentStory = stories[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection('right');
      setCurrentIndex((prev) => (prev + 1) % stories.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [stories.length]);

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 'right' : 'left');
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-1">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
          Student Success Stories
        </h2>
        <p className="mt-3 text-gray-600 max-w-xl mx-auto text-base sm:text-lg">
          Hear from our alumni who transformed their careers through our programs.
        </p>
      </div>

      <div className="relative bg-gradient-to-br pb-3 from-indigo-50 to-white rounded-2xl shadow-xl overflow-hidden border border-white/80 backdrop-blur-sm">
        {/* Decorative Blurs */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply blur-3xl opacity-30" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply blur-3xl opacity-30" />

        <div className="relative z-10">
          <AnimatePresence mode="wait">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 px-6 sm:px-10 py-8 sm:py-10">
              {/* Info Side */}
              <motion.div
                key={`info-${currentStory.id}`}
                initial={{ x: -80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -80, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col justify-center"
              >
                <div className="flex items-start mb-6">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-lg border-4 border-white">
                    <Image
                      src={currentStory.image}
                      alt={currentStory.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4 sm:ml-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{currentStory.name}</h3>
                    <p className="mt-1 text-indigo-600 font-medium text-sm sm:text-base">{currentStory.title}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed">{currentStory.summary}</p>
              </motion.div>

              {/* Video Side */}
              <motion.div
                key={`video-${currentStory.id}`}
                initial={{ x: 80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 80, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="aspect-video rounded-xl overflow-hidden shadow-2xl transform transition-transform hover:scale-105">
                  <iframe
                    src={currentStory.videoUrl}
                    title={`${currentStory.name}'s Success Story`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </motion.div>
            </div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="absolute bottom-1 left-0 right-0 flex justify-center z-20">
            <div className="flex space-x-2">
              {stories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-indigo-600 w-6'
                      : 'bg-gray-300 hover:bg-indigo-400 w-3'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
