'use client';

import { useState } from 'react';

export default function ImageToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState('');
  const [downloadLink, setDownloadLink] = useState<string | null>(null);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(selectedFiles);
    setStatus('');
    setDownloadLink(null);
  };

  const handleConvert = () => {
    if (files.length === 0) {
      setStatus('Please select at least one JPG or PNG file.');
      return;
    }

    // Simulated conversion process
    setStatus('Converting images to PDF...');
    setTimeout(() => {
      setStatus('Conversion successful!');
      setDownloadLink('/dummy-image-to-pdf.pdf'); // Simulated PDF download
    }, 2000);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-10 min-h-[90vh]">
      <h1 className="text-3xl font-bold mb-6">JPG/PNG to PDF Converter</h1>

      <div className="space-y-4">
        <input
          type="file"
          accept="image/jpeg,image/png"
          multiple
          onChange={handleFilesChange}
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
        />

        <button
          onClick={handleConvert}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded"
        >
          Convert to PDF
        </button>

        {status && <p className="text-gray-700">{status}</p>}

        {downloadLink && (
          <a
            href={downloadLink}
            download
            className="inline-block mt-4 text-blue-600 hover:underline font-medium"
          >
            Download PDF
          </a>
        )}
      </div>
    </section>
  );
}
