'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PdfToWord() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');

  const handleUpload = () => {
    if (!file) return;

    // Mock upload and convert
    setStatus('Uploading...');
    setTimeout(() => {
      setStatus('Converted! Download ready.');
    }, 2000);
  };

  return (
    <section className="min-h-screen max-w-4xl mx-auto px-4 py-10 flex flex-col">
      <Link href="/tools" className="text-indigo-600 hover:underline self-start mb-6">
        ← Back to Tools
      </Link>

      <h1 className="text-3xl font-bold mb-6">PDF to Word Converter</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      <button
        type="button"
        onClick={handleUpload}
        disabled={!file}
        className={`px-6 py-2 rounded text-white ${
          file ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Convert to Word
      </button>

      <div className="mt-4 text-gray-700">{status}</div>
    </section>
  );
}
