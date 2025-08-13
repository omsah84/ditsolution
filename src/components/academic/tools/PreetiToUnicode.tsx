'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PreetiToUnicode() {
  const [preetiText, setPreetiText] = useState('');
  const [unicodeText, setUnicodeText] = useState('');

  const convertToUnicode = () => {
    // Dummy conversion logic – replace with real mapping
    const converted = preetiText.replace(/क/g, 'ka').replace(/ख/g, 'kha');
    setUnicodeText(converted || 'Conversion logic needed.');
  };

  return (
    <section className="min-h-screen max-w-4xl mx-auto px-4 py-10 flex flex-col">
      <Link href="/tools" className="text-indigo-600 hover:underline self-start mb-6">
        ← Back to Tools
      </Link>

      <h1 className="text-3xl font-bold mb-6">Preeti to Unicode Converter</h1>

      <textarea
        placeholder="Paste Preeti text here..."
        value={preetiText}
        onChange={(e) => setPreetiText(e.target.value)}
        className="w-full h-40 p-4 border rounded mb-4"
      />

      <button
        type="button"
        onClick={convertToUnicode}
        className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Convert
      </button>

      <textarea
        readOnly
        placeholder="Unicode output..."
        value={unicodeText}
        className="w-full h-40 p-4 border rounded mt-4 bg-gray-100"
      />
    </section>
  );
}
