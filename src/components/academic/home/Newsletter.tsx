'use client';

import React, { useState } from 'react';

export default function AcademicNewsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can add real submission logic here (e.g., API call)
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto bg-indigo-50 rounded-lg shadow-md mt-16">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold mb-4 text-indigo-900">
          Stay Updated with Our Latest Courses
        </h2>
        <p className="text-indigo-700 mb-8">
          Subscribe to our newsletter and never miss important updates or new courses.
        </p>

        {submitted ? (
          <p className="text-green-600 font-semibold">Thank you for subscribing!</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 transition"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
