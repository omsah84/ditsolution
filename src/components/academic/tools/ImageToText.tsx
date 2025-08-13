'use client';

import { useState } from 'react';

export default function ImageToText() {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [status, setStatus] = useState('');

  const handleExtract = () => {
    if (!file) return;
    setStatus('Processing image...');
    setTimeout(() => {
      setExtractedText('Sample extracted text from image (replace with real OCR)');
      setStatus('');
    }, 2500);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Image to Text (OCR)</h1>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />
      <button
        onClick={handleExtract}
        className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Extract Text
      </button>
      {status && <p className="mt-2 text-gray-600">{status}</p>}
      {extractedText && (
        <textarea
          readOnly
          className="mt-4 w-full h-40 p-4 border rounded bg-gray-100"
          value={extractedText}
        />
      )}
    </section>
  );
}
