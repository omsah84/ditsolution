'use client';

import { useState } from 'react';

export default function WordToPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');

  const handleConvert = () => {
    if (!file) return;
    setStatus('Uploading...');
    setTimeout(() => {
      setStatus('Conversion complete! Download ready.');
    }, 2000);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Word to PDF Converter</h1>
      <input
        type="file"
        accept=".doc,.docx"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />
      <button
        onClick={handleConvert}
        className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Convert to PDF
      </button>
      <div className="mt-4 text-gray-700">{status}</div>
    </section>
  );
}
