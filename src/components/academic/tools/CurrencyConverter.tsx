'use client';

import { useState } from 'react';

const rates = {
  USD: 1,
  NPR: 130,
  EUR: 0.9,
};

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('NPR');
  const [converted, setConverted] = useState<number | null>(null);

  const convert = () => {
    const usdAmount = amount / rates[fromCurrency];
    const result = usdAmount * rates[toCurrency];
    setConverted(result);
  };

  return (
    <section className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Currency Converter</h1>
      <input
        type="number"
        className="w-full border rounded p-2 mb-4"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <div className="flex justify-between mb-4 gap-4">
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="flex-1 border rounded p-2"
        >
          {Object.keys(rates).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="flex-1 border rounded p-2"
        >
          {Object.keys(rates).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={convert}
        className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 w-full"
      >
        Convert
      </button>
      {converted !== null && (
        <p className="mt-4 text-gray-800 font-semibold">
          {amount} {fromCurrency} = {converted.toFixed(2)} {toCurrency}
        </p>
      )}
    </section>
  );
}
