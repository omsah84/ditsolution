'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DateConverter() {
  const [adDate, setAdDate] = useState('');
  const [bsDate, setBsDate] = useState('');

  const convertToBS = () => {
    // Dummy conversion example
    if (adDate) {
      setBsDate('2082-01-01 (BS)');
    } else {
      setBsDate('');
    }
  };

  const convertToAD = () => {
    // Dummy conversion example
    if (bsDate) {
      setAdDate('2025-04-13 (AD)');
    } else {
      setAdDate('');
    }
  };

  return (
    <section className="min-h-screen max-w-4xl mx-auto px-4 py-10 flex flex-col">
      <Link href="/tools" className="text-indigo-600 hover:underline self-start mb-6">
        ← Back to Tools
      </Link>

      <h1 className="text-3xl font-bold mb-8">AD ↔ BS Date Converter</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* AD to BS */}
        <div>
          <label className="block mb-2 font-medium">AD to BS:</label>
          <input
            type="date"
            value={adDate}
            onChange={(e) => setAdDate(e.target.value)}
            className="w-full border rounded p-2 mb-3"
          />
          <button
            type="button"
            onClick={convertToBS}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Convert to BS
          </button>
          {bsDate && <div className="mt-3 text-green-600 font-semibold">BS: {bsDate}</div>}
        </div>

        {/* BS to AD */}
        <div>
          <label className="block mb-2 font-medium">BS to AD:</label>
          <input
            type="text"
            placeholder="2082-01-01"
            value={bsDate}
            onChange={(e) => setBsDate(e.target.value)}
            className="w-full border rounded p-2 mb-3"
          />
          <button
            type="button"
            onClick={convertToAD}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Convert to AD
          </button>
          {adDate && <div className="mt-3 text-green-600 font-semibold">AD: {adDate}</div>}
        </div>
      </div>
    </section>
  );
}
