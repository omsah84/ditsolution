'use client';

import React, { useState } from 'react';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

// --- Contact Form ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert('Please fill all fields');
      return;
    }
    console.log('Submitted:', form);
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      className="bg-gray-50 p-8 rounded-xl shadow-lg max-w-lg mx-auto md:mx-0"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name
        </label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          type="text"
          placeholder="Your name"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
          required
        />
      </div>
      <div className="mt-4">
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          placeholder="you@example.com"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
          required
        />
      </div>
      <div className="mt-4">
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          placeholder="Write your message here..."
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
          required
        />
      </div>
      <button
        type="submit"
        className={`w-full mt-6 font-semibold py-2 px-6 rounded-md transition ${
          submitted
            ? 'bg-green-600 hover:bg-green-700 text-white cursor-default'
            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
        }`}
        disabled={submitted}
      >
        {submitted ? 'Message Sent ✅' : 'Send Message'}
      </button>
    </motion.form>
  );
}

// --- Contact Info ---
function ContactInfo() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      className="max-w-md mx-auto md:mx-0 space-y-8"
    >
      <div className="flex items-start gap-4">
        <EnvelopeIcon className="w-6 h-6 text-indigo-600 mt-1" />
        <div>
          <p className="font-semibold">Email</p>
          <p className="text-gray-600">support@yourdomain.com</p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <PhoneIcon className="w-6 h-6 text-indigo-600 mt-1" />
        <div>
          <p className="font-semibold">Phone</p>
          <p className="text-gray-600">+1 (123) 456-7890</p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <MapPinIcon className="w-6 h-6 text-indigo-600 mt-1" />
        <div>
          <p className="font-semibold">Office</p>
          <p className="text-gray-600">123 Innovation St, Tech City, CA</p>
        </div>
      </div>

      {/* Socials */}
      <div className="mt-6">
        <p className="font-semibold mb-2">Connect with us</p>
        <div className="flex gap-4">
          {/* GitHub */}
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <svg
              className="w-6 h-6 text-gray-700 hover:text-black transition"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.42 7.86 10.96.58.1.79-.25.79-.56v-2.16c-3.2.69-3.87-1.55-3.87-1.55-.53-1.34-1.3-1.7-1.3-1.7-1.07-.74.08-.73.08-.73 1.18.08 1.8 1.21 1.8 1.21 1.05 1.8 2.75 1.28 3.42.98.11-.77.41-1.29.75-1.58-2.56-.3-5.26-1.29-5.26-5.75 0-1.27.45-2.3 1.2-3.11-.12-.3-.52-1.53.11-3.18 0 0 .98-.31 3.2 1.19.93-.26 1.94-.39 2.94-.4 1 .01 2.01.14 2.94.4 2.22-1.5 3.2-1.19 3.2-1.19.63 1.65.23 2.88.11 3.18.75.81 1.2 1.84 1.2 3.11 0 4.47-2.7 5.44-5.27 5.73.43.37.81 1.1.81 2.22v3.29c0 .31.21.67.8.56C20.22 21.44 23.5 17.12 23.5 12.02 23.5 5.74 18.27.5 12 .5Z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <svg
              className="w-6 h-6 text-gray-700 hover:text-blue-600 transition"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.5 1 5 2.12 5 3.5zM.5 8.99h4v14h-4v-14zM7.5 8.99h3.9v2h.05c.54-1.02 1.86-2.1 3.82-2.1 4.09 0 4.84 2.7 4.84 6.21v7.89h-4v-7c0-1.67-.03-3.82-2.33-3.82s-2.69 1.82-2.69 3.7v7.12h-4v-14z" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// --- Office Map ---
function OfficeMap() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      className="w-full rounded-lg overflow-hidden shadow-lg mt-10 md:mt-6 aspect-[16/9] max-w-lg mx-auto md:mx-0"
    >
      <iframe
        title="Office Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0195975215356!2d-122.40135068468151!3d37.79364927975652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064a7f7fbb7%3A0xa9a1c0104abdf193!2s123%20Innovation%20St%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1681018986107!5m2!1sen!2sus"
        className="w-full h-full border-0"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </motion.div>
  );
}

// --- Business Hours ---
function BusinessHours() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      className="bg-gray-50 p-6 rounded-lg shadow-md max-w-sm mx-auto md:mx-0 mt-10 md:mt-6"
    >
      <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
      <ul className="text-gray-700 space-y-1">
        <li>Monday - Friday: 9:00 AM – 6:00 PM</li>
        <li>Saturday: 10:00 AM – 4:00 PM</li>
        <li>Sunday: Closed</li>
      </ul>
    </motion.div>
  );
}

// --- Newsletter Signup ---
function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter your email');
      return;
    }
    // Here you would connect to newsletter backend
    setSubmitted(true);
    setEmail('');
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      className="bg-indigo-600 py-12 px-6 rounded-xl max-w-4xl mx-auto my-20 text-white"
    >
      <h2 className="text-3xl font-bold mb-4 text-center">Subscribe to our Newsletter</h2>
      <p className="text-center max-w-xl mx-auto mb-8 opacity-90">
        Get the latest updates, offers, and news delivered straight to your inbox.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row max-w-xl mx-auto gap-4"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-grow px-4 py-3 rounded-md text-gray-900 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className={`bg-white text-indigo-700 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition ${
            submitted ? 'cursor-default' : ''
          }`}
          disabled={submitted}
        >
          {submitted ? 'Subscribed ✅' : 'Subscribe'}
        </button>
      </form>
    </motion.section>
  );
}

// --- FAQ Accordion ---
type FAQItem = {
  question: string;
  answer: string;
};

const FAQ_DATA: FAQItem[] = [
  {
    question: 'How can I contact support?',
    answer: 'You can reach us through the contact form or email support@yourdomain.com.',
  },
  {
    question: 'What are your business hours?',
    answer: 'Our office is open Monday to Friday from 9 AM to 6 PM.',
  },
  {
    question: 'Where is your office located?',
    answer: '123 Innovation St, Tech City, CA.',
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.section
      id="faq"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      className="max-w-4xl mx-auto px-6 md:px-12 my-20"
    >
      <h2 className="text-3xl font-extrabold mb-8 text-center">Frequently Asked Questions</h2>

      <div className="space-y-4">
        {FAQ_DATA.map(({ question, answer }, i) => (
          <div key={i} className="border rounded-lg overflow-hidden shadow-sm">
            <button
              className="w-full px-6 py-4 flex justify-between items-center bg-gray-100 hover:bg-gray-200 focus:outline-none"
              onClick={() => toggle(i)}
              aria-expanded={openIndex === i}
              aria-controls={`faq-panel-${i}`}
            >
              <span className="text-lg font-medium">{question}</span>
              {openIndex === i ? (
                <ChevronUpIcon className="w-6 h-6 text-indigo-600" />
              ) : (
                <ChevronDownIcon className="w-6 h-6 text-indigo-600" />
              )}
            </button>
            <AnimatePresence initial={false}>
              {openIndex === i && (
                <motion.div
                  id={`faq-panel-${i}`}
                  key="content"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { height: 'auto', opacity: 1 },
                    collapsed: { height: 0, opacity: 0 },
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="px-6 pt-2 pb-4 bg-white text-gray-700 overflow-hidden"
                >
                  {answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

// --- Testimonials Carousel ---
const TESTIMONIALS = [
  {
    name: 'Alice Johnson',
    role: 'CEO, Acme Corp',
    text: 'Fantastic service and support. Highly recommend!',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    name: 'Mark Smith',
    role: 'CTO, Innovatech',
    text: 'Professional and efficient team. Great experience overall.',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
  {
    name: 'Sophia Lee',
    role: 'Product Manager, StartUpX',
    text: 'The solutions provided helped us scale quickly and easily.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
];

function Testimonials() {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };
  const prev = () => {
    setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <motion.section
      id="testimonials"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      className="max-w-4xl mx-auto px-6 md:px-12 my-20"
    >
      <h2 className="text-3xl font-extrabold mb-8 text-center">What Our Clients Say</h2>

      <div className="relative bg-gray-50 rounded-xl p-8 shadow-lg max-w-3xl mx-auto">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-gray-800 italic mb-4">&ldquo;{TESTIMONIALS[index].text}&rdquo;</p>
          <img
            src={TESTIMONIALS[index].avatar}
            alt={TESTIMONIALS[index].name}
            className="w-16 h-16 rounded-full mx-auto mb-2 object-cover"
          />
          <p className="font-semibold">{TESTIMONIALS[index].name}</p>
          <p className="text-indigo-600 text-sm">{TESTIMONIALS[index].role}</p>
        </motion.div>

        {/* Arrows */}
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition focus:outline-none"
        >
          ‹
        </button>
        <button
          onClick={next}
          aria-label="Next testimonial"
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition focus:outline-none"
        >
          ›
        </button>
      </div>
    </motion.section>
  );
}

// --- Main ContactUs Component ---
export default function ContactUs() {
  return (
    <>
      <section
        id="contact"
        className="py-16 px-6 md:px-12 bg-white text-gray-900"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12 px-4 max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-extrabold mb-4">Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              We’re here to answer your questions, collaborate, or support your goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <ContactForm />
            <div className="flex flex-col gap-10 px-4 md:px-0">
              <ContactInfo />
              <OfficeMap />
              <BusinessHours />
            </div>
          </div>
        </div>
      </section>

      <Newsletter />

      <FAQ />

      <Testimonials />
    </>
  );
}
