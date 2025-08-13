'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Updated sample data with more realistic course information
const levelCoursesData = [
  {
    id: 1,
    title: 'Beginner Frontend Development',
    subtitle: 'Learn HTML, CSS, and JavaScript from scratch',
    level: 'Beginner',
    duration: '3 months',
    image: '/images/beginner-1.jpg',
    lessons: 42,
    students: 1200,
    rating: 4.8
  },
  {
    id: 2,
    title: 'Intermediate React & Redux',
    subtitle: 'Build scalable web apps with React',
    level: 'Intermediate',
    duration: '4 months',
    image: '/images/intermediate-1.jpg',
    lessons: 56,
    students: 850,
    rating: 4.9
  },
  {
    id: 3,
    title: 'Advanced DevOps',
    subtitle: 'Master CI/CD, Docker, Kubernetes',
    level: 'Advanced',
    duration: '6 months',
    image: '/images/advanced-1.jpg',
    lessons: 72,
    students: 650,
    rating: 4.7
  },
  {
    id: 4,
    title: 'Advanced Machine Learning',
    subtitle: 'Train deep learning models at scale',
    level: 'Advanced',
    duration: '5 months',
    image: '/images/advanced-2.jpg',
    lessons: 68,
    students: 920,
    rating: 4.9
  },
  {
    id: 5,
    title: 'Beginner UI/UX Fundamentals',
    subtitle: 'Get started with user experience design',
    level: 'Beginner',
    duration: '2 months',
    image: '/images/beginner-2.jpg',
    lessons: 24,
    students: 2100,
    rating: 4.6
  },
];

const levels = ['Beginner', 'Intermediate', 'Advanced'];

export default function LevelCoursesFilter() {
  const [activeLevel, setActiveLevel] = useState('Beginner');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);

  const filteredCourses = levelCoursesData.filter((course) => course.level === activeLevel);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredCourses.length);
    setIsAutoSliding(false);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredCourses.length - 1 : prev - 1));
    setIsAutoSliding(false);
  };

  // Auto slide effect
  useEffect(() => {
    if (!isAutoSliding) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % filteredCourses.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [filteredCourses.length, isAutoSliding]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Explore Our Courses
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Filter by skill level to find the perfect learning path for your journey
        </p>
      </div>
      
      <div className="mb-8 flex justify-center">
        <div className="bg-white/80 p-1.5 rounded-xl shadow-lg border border-gray-100 flex flex-wrap justify-center gap-2">
          {levels.map((level) => (
            <motion.button
              key={level}
              onClick={() => {
                setActiveLevel(level);
                setCurrentIndex(0);
                setIsAutoSliding(true);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2.5 text-sm sm:text-base font-medium rounded-xl transition-all ${
                level === activeLevel
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-700 hover:text-indigo-700 hover:bg-indigo-50'
              }`}
            >
              {level}
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeLevel}-${currentIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="relative"
        >
          <div className="relative bg-gradient-to-br from-white to-indigo-50 rounded-3xl shadow-xl border border-white/70 backdrop-blur-sm px-6 py-10 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute -top-24 -left-24 w-80 h-80 bg-indigo-200/30 rounded-full mix-blend-multiply blur-[80px] opacity-60" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-purple-200/30 rounded-full mix-blend-multiply blur-[80px] opacity-60" />
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Image Section */}
              <div className="relative">
                <div className="relative h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent z-10" />
                  <div className="absolute top-4 right-4 bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1.5 rounded-full z-20">
                    {filteredCourses[currentIndex].level}
                  </div>
                  <div className="absolute bottom-4 left-4 z-20">
                    <h3 className="text-2xl font-bold text-white">
                      {filteredCourses[currentIndex].title}
                    </h3>
                    <p className="text-indigo-100 mt-1">{filteredCourses[currentIndex].subtitle}</p>
                  </div>
                  <div className="w-full h-full bg-gray-200 border-2 border-dashed rounded-xl" />
                </div>
                
                {/* Course Stats */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="bg-white/80 p-3 rounded-xl shadow-sm border border-white text-center">
                    <div className="text-xl font-bold text-indigo-700">{filteredCourses[currentIndex].lessons}</div>
                    <div className="text-xs text-gray-600 mt-1">Lessons</div>
                  </div>
                  <div className="bg-white/80 p-3 rounded-xl shadow-sm border border-white text-center">
                    <div className="text-xl font-bold text-indigo-700">{filteredCourses[currentIndex].students}+</div>
                    <div className="text-xs text-gray-600 mt-1">Students</div>
                  </div>
                  <div className="bg-white/80 p-3 rounded-xl shadow-sm border border-white text-center">
                    <div className="text-xl font-bold text-indigo-700">{filteredCourses[currentIndex].rating}</div>
                    <div className="text-xs text-gray-600 mt-1">Rating</div>
                  </div>
                </div>
              </div>
              
              {/* Info Section */}
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 md:mt-0">
                    {filteredCourses[currentIndex].title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {filteredCourses[currentIndex].subtitle}
                  </p>
                  
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium text-gray-900">Duration:</span>
                      <span className="ml-2 text-gray-600">{filteredCourses[currentIndex].duration}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium text-gray-900">Level:</span>
                      <span className="ml-2 text-gray-600">{filteredCourses[currentIndex].level}</span>
                    </div>
                  </div>
                  
                  <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                    <h4 className="font-semibold text-indigo-800 mb-2">What you&apos;ll learn:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Core concepts and practical applications</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Hands-on projects and real-world examples</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Expert guidance and community support</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mt-8">
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-white text-indigo-700 font-medium rounded-xl shadow-sm border border-indigo-200 hover:bg-indigo-50 transition-colors flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                <Link href='courses'>
                All Courses
                </Link>
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    <Link href='courses'>
                    
                    Enroll Now
                    </Link>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -left-5 transform -translate-y-1/2 z-20 hidden md:block">
            <motion.button
              onClick={prev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-indigo-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </div>
          <div className="absolute top-1/2 -right-5 transform -translate-y-1/2 z-20 hidden md:block">
            <motion.button
              onClick={next}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-indigo-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-8 space-x-2 z-10 relative">
            {filteredCourses.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setIsAutoSliding(true);
                }}
                whileHover={{ scale: 1.2 }}
                className={`w-3 h-3 rounded-full transition ${
                  idx === currentIndex ? 'bg-indigo-600 scale-125' : 'bg-gray-300 hover:bg-indigo-400'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}