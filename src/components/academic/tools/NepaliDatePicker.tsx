'use client';

import { useState } from 'react';

export default function NepaliDatePicker() {
  const [bsDate, setBsDate] = useState('');
  const [adDate, setAdDate] = useState('');

  return (
    <section className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Nepali Date Picker</h1>
      <label className="block mb-2 font-medium">BS Date:</label>
      <input
        type="text"
        placeholder="YYYY-MM-DD (BS)"
        value={bsDate}
        onChange={(e) => setBsDate(e.target.value)}
        className="w-full border rounded p-2 mb-4"
      />
      <label className="block mb-2 font-medium">AD Date:</label>
      <input
        type="date"
        value={adDate}
        onChange={(e) => setAdDate(e.target.value)}
        className="w-full border rounded p-2"
      />
      <p className="mt-4 text-gray-600 text-sm">
        * This is a mock. Replace with a proper Nepali calendar component.
      </p>
    </section>
  );
}
