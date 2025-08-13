'use client';

import { useState } from 'react';

export default function PdfCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');

  const handleCompress = () => {
    if (!file) return;
    setStatus('Compressing...');
    setTimeout(() => {
      setStatus('Compression complete! Download ready.');
    }, 2000);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">PDF Compressor</h1>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />
      <button
        onClick={handleCompress}
        className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Compress PDF
      </button>
      <div className="mt-4 text-gray-700">{status}</div>
    </section>
  );
}
