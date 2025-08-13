'use client';

import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Emma Johnson',
    role: 'Computer Science Student',
    quote: "This platform transformed my learning experience. The courses are engaging and the scheduling tools keep me on track!",
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    name: 'Michael Lee',
    role: 'Mathematics Professor',
    quote: "The academic resources and student collaboration features make teaching more interactive and effective.",
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    name: 'Sophia Martinez',
    role: 'Graduate Student',
    quote: "I love how the community support helped me connect with peers and mentors during tough projects.",
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
  {
    name: 'David Chen',
    role: 'Engineering Student',
    quote: "The progress tracking tools helped me identify my weak areas and improve my grades significantly.",
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Olivia Wilson',
    role: 'Psychology Professor',
    quote: "An excellent platform for both teaching and learning. The analytics help me tailor my instruction to student needs.",
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'James Taylor',
    role: 'Medical Student',
    quote: "The mobile app makes it easy to study anywhere. I've doubled my productivity since switching to this platform.",
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
  }
];

export default function AcademicTestimonials() {
  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-block mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold px-4 py-2 rounded-full">
            STUDENT & EDUCATOR TESTIMONIALS
          </div>
        </div>
        
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Thousands</span>
        </motion.h2>
        
        <motion.p 
          className="text-lg text-gray-600 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Hear from students and educators who are achieving academic success with our platform.
        </motion.p>
      </div>

      <div className="relative">
        {/* Gradient background elements */}
        <div className="absolute top-0 left-0 w-1/3 h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full filter blur-3xl opacity-40 -z-10"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full filter blur-3xl opacity-30 -z-10"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map(({ name, role, quote, avatar }, index) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ 
                y: -10,
                boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.2)'
              }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl transform group-hover:scale-105 transition-all duration-500 opacity-0 group-hover:opacity-100" />
              
              <div className="relative bg-white rounded-2xl p-8 h-full flex flex-col border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 group-hover:border-transparent">
                <div className="absolute top-0 right-0 m-6 text-gray-200 group-hover:text-blue-300 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                  </svg>
                </div>
                
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <img
                      src={avatar}
                      alt={name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4 text-left">
                    <h3 className="font-bold text-gray-900">{name}</h3>
                    <p className="text-sm text-gray-500">{role}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 flex-grow">“{quote}”</p>
                
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

     <motion.div
  className="mt-16 text-center"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.5 }}
>
  <div className="flex flex-col md:flex-row items-center justify-center gap-6">
    {/* Avatars */}
    <div className="flex -space-x-3 justify-center">
      {testimonials.slice(0, 5).map(({ avatar }, i) => (
        <img
          key={i}
          src={avatar}
          alt="User"
          className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white shadow-md"
        />
      ))}
    </div>

    {/* Text */}
    <div className="text-center md:text-left">
      <p className="text-gray-900 font-medium text-sm md:text-base">
        Join 250,000+ students and educators
      </p>
      <p className="text-gray-600 text-xs md:text-sm">
        Start your journey to academic success today
      </p>
    </div>

    {/* Button */}
    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium px-5 py-2.5 md:px-6 md:py-3 rounded-lg hover:shadow-xl transition-all duration-300 hover:from-blue-700 hover:to-purple-700 text-sm md:text-base">
      Get Started
    </button>
  </div>
</motion.div>

    </section>
  );
}