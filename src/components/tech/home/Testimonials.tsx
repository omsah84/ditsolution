'use client';

import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Sarah Devlin',
    role: 'Frontend Engineer @LaunchPad',
    quote:
      'This platform has streamlined our deployment process. We ship features twice as fast now!',
  },
  {
    name: 'Tom Liu',
    role: 'DevOps Lead @CodeCore',
    quote:
      'Seamless CI/CD and GitHub integration made this our team’s go-to tool.',
  },
  {
    name: 'Amina K.',
    role: 'Full Stack Developer',
    quote:
      'Love the interface. Everything from testing to production just flows!',
  },
];

export default function TechTestimonials() {
  return (
    <section className="bg-gray-50 py-20 px-6 md:px-12">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Trusted by Developers Worldwide
        </h2>

        <div className="grid gap-10 md:grid-cols-3 text-left">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-[1.03]"
            >
              <p className="text-gray-700 italic mb-4">“{t.quote}”</p>
              <div>
                <p className="font-semibold text-gray-900">{t.name}</p>
                <p className="text-sm text-gray-600">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
