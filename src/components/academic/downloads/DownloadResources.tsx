'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const downloadData = [
  {
    category: 'Loksewa Preparation',
    slug: 'loksewa',
    resources: [
      { title: 'Mock Test Set 1', url: '/downloads/loksewa/mock-test-1.pdf', size: '1.2 MB' },
      { title: 'Previous Year Papers', url: '/downloads/loksewa/previous-papers.pdf', size: '900 KB' },
      { title: 'Study Notes PDF', url: '/downloads/loksewa/study-notes.pdf', size: '2.5 MB' },
      { title: 'Extra Practice Set', url: '/downloads/loksewa/practice-set.pdf', size: '1.1 MB' },
    ],
  },
  {
    category: 'MERN Stack',
    slug: 'mern-stack',
    resources: [
      { title: 'MERN Stack Guide', url: '/downloads/mern-stack/guide.pdf', size: '3.1 MB' },
      { title: 'Video Lecture Notes', url: '/downloads/mern-stack/video-notes.pdf', size: '1.8 MB' },
      { title: 'Advanced Concepts', url: '/downloads/mern-stack/advanced.pdf', size: '2.2 MB' },
    ],
  },
  {
    category: 'Ethical Hacking',
    slug: 'ethical-hacking',
    resources: [
      { title: 'Beginner’s Hacking Notes', url: '/downloads/ethical-hacking/notes.pdf', size: '1.1 MB' },
      { title: 'Mock Tests', url: '/downloads/ethical-hacking/mock-tests.pdf', size: '950 KB' },
      { title: 'Mock Tests', url: '/downloads/ethical-hacking/mock-tests.pdf', size: '950 KB' },
      { title: 'Mock Tests', url: '/downloads/ethical-hacking/mock-tests.pdf', size: '950 KB' },
    ],
  },
];

const DownloadResources: React.FC = () => {
  const [search, setSearch] = useState('');
  const [downloads, setDownloads] = useState<{ [key: string]: number }>({});
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const stored = localStorage.getItem('downloadCounts');
    if (stored) setDownloads(JSON.parse(stored));
  }, []);

  const handleDownload = (url: string) => {
    const updated = { ...downloads, [url]: (downloads[url] || 0) + 1 };
    setDownloads(updated);
    localStorage.setItem('downloadCounts', JSON.stringify(updated));
  };

  const toggleExpanded = (slug: string) => {
    setExpanded(prev => ({ ...prev, [slug]: !prev[slug] }));
  };

  const filteredData = downloadData
    .map(section => ({
      ...section,
      resources: section.resources.filter(res =>
        res.title.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter(section => section.resources.length > 0);

  return (
    <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto text-gray-800 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Download Resources</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse and download learning materials. Use the search or expand categories.
        </p>
      </motion.div>

      {/* Search */}
      <div className="mb-10 max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Search resources..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {filteredData.map((section, index) => {
          const isExpanded = expanded[section.slug];
          const resourcesToShow = isExpanded
            ? section.resources
            : section.resources.slice(0, 2);

          return (
            <motion.div
              key={section.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold mb-4 text-indigo-700">{section.category}</h3>
              <ul className="space-y-4 text-sm">
                {resourcesToShow.map((res, j) => (
                  <li
                    key={j}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex flex-col">
                      <span className="text-gray-900 font-medium">{res.title}</span>
                      <span className="text-gray-500 text-xs">
                        Size: {res.size} | Downloads: {downloads[res.url] || 0}
                      </span>
                    </div>
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleDownload(res.url)}
                      className="mt-2 sm:mt-0 text-white text-xs bg-indigo-600 hover:bg-indigo-700 px-4 py-1.5 rounded-md"
                    >
                      Download
                    </a>
                  </li>
                ))}
              </ul>

              {/* View All / View Less */}
              {section.resources.length > 2 && (
                <div className="mt-4">
                  <button
                    onClick={() => toggleExpanded(section.slug)}
                    className="text-sm text-indigo-500 hover:underline"
                  >
                    {isExpanded ? 'View Less' : 'View All'}
                  </button>
                </div>
              )}

              {/* Category Link */}
              <div className="mt-2">
                <Link
                  href={`/categories/${section.slug}`}
                  className="text-sm text-gray-500 hover:underline"
                >
                  Explore more in {section.category}
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredData.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No resources found.</p>
      )}
    </section>
  );
};

export default DownloadResources;
