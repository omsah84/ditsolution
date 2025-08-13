'use client';

import React from 'react';
import {
  CodeBracketSquareIcon,
  ServerStackIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function TechFeatures() {
  const features = [
    {
      title: 'Project Dashboard',
      description:
        'Organize and manage all your tech initiatives with a unified view.',
      icon: (
        <CodeBracketSquareIcon className="w-14 h-14 text-cyan-700" />
      ),
    },
    {
      title: 'Version Control',
      description:
        'Integrate repositories and manage codebases with real-time collaboration.',
      icon: (
        <ServerStackIcon className="w-14 h-14 text-cyan-700" />
      ),
    },
    {
      title: 'One-Click Deployments',
      description:
        'Streamline CI/CD workflows and deploy across environments with ease.',
      icon: (
        <RocketLaunchIcon className="w-14 h-14 text-cyan-700" />
      ),
    },
  ];

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto bg-gradient-to-tr from-cyan-50 to-white rounded-xl shadow-lg">
      <div className="text-center mb-20">
        <h2 className="text-4xl font-extrabold text-cyan-900 mb-4">
          Tools Built for Developers
        </h2>
        <p className="text-cyan-800 text-lg max-w-3xl mx-auto">
          From code to deployment, our platform empowers your full dev workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
        {features.map(({ title, description, icon }, index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.25 }}
            whileHover={{
              scale: 1.08,
              boxShadow:
                '0 20px 30px rgba(14, 165, 233, 0.4), 0 10px 10px rgba(6, 182, 212, 0.3)',
            }}
            className="bg-white rounded-xl p-10 flex flex-col items-center text-center cursor-pointer border border-cyan-100 shadow-sm transition-shadow duration-300"
          >
            <div className="mb-8">{icon}</div>
            <h3 className="text-2xl font-bold text-cyan-900 mb-3">{title}</h3>
            <p className="text-cyan-700 text-base leading-relaxed max-w-md">
              {description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
