'use client';

import { useState } from 'react';


const blogCategories = [
  { slug: 'technology', title: 'Technology' },
  { slug: 'programming', title: 'Programming' },
  { slug: 'productivity', title: 'Productivity' },
  { slug: 'design', title: 'Design' },
];

const blogPosts: Record<
  string,
  {
    id: number;
    title: string;
    date: string;
    excerpt: string;
    url: string;
  }[]
> = {
  technology: [
    {
      id: 1,
      title: 'The Future of AI in Everyday Life',
      date: '2025-07-10',
      excerpt:
        'Artificial intelligence is transforming how we interact with technology...',
      url: '/blog/future-of-ai',
    },
    {
      id: 2,
      title: 'Top 5 Emerging Tech Trends in 2025',
      date: '2025-06-22',
      excerpt: 'Stay ahead by knowing what technology will shape the future...',
      url: '/blog/emerging-tech-trends',
    },
  ],
  programming: [
    {
      id: 3,
      title: 'JavaScript ES2025 Features to Watch',
      date: '2025-07-01',
      excerpt: 'Explore the latest enhancements in JavaScript for modern development...',
      url: '/blog/js-es2025-features',
    },
    {
      id: 4,
      title: 'A Beginner’s Guide to React 18',
      date: '2025-05-15',
      excerpt: 'Start building reactive user interfaces with the newest React version...',
      url: '/blog/react-18-guide',
    },
  ],
  productivity: [
    {
      id: 5,
      title: 'How to Manage Your Time Like a Pro',
      date: '2025-07-03',
      excerpt: 'Effective techniques to boost your productivity and focus daily...',
      url: '/blog/time-management',
    },
  ],
  design: [
    {
      id: 6,
      title: 'UX Design Principles for Beginners',
      date: '2025-06-25',
      excerpt: 'Learn the foundations of user experience design with practical tips...',
      url: '/blog/ux-design-principles',
    },
  ],
};

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState(blogCategories[0].slug);

  return (
    <>
      <main className="max-w-5xl mx-auto px-6 py-12 min-h-[80vh]">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Blog</h1>

        {/* Tabs */}
        <nav className="border-b border-gray-300 mb-8">
          <ul className="flex space-x-6 overflow-x-auto">
            {blogCategories.map(({ slug, title }) => (
              <li key={slug}>
                <button
                  onClick={() => setSelectedCategory(slug)}
                  className={`pb-3 border-b-4 font-semibold focus:outline-none ${
                    selectedCategory === slug
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-600 hover:text-indigo-600 hover:border-indigo-300'
                  }`}
                  aria-selected={selectedCategory === slug}
                  role="tab"
                >
                  {title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Blog posts */}
        <section>
          {blogPosts[selectedCategory]?.length ? (
            <ul className="space-y-8">
              {blogPosts[selectedCategory].map(({ id, title, date, excerpt, url }) => (
                <li key={id} className="border-b pb-6">
                  <a
                    href={url}
                    className="text-2xl font-semibold text-indigo-600 hover:underline"
                  >
                    {title}
                  </a>
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700">{excerpt}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No posts found in this category.</p>
          )}
        </section>
      </main>

     
    </>
  );
}
