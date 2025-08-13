'use client';

import { useState } from 'react';

const units = {
  meter: 1,
  kilometer: 1000,
  centimeter: 0.01,
  inch: 0.0254,
  foot: 0.3048,
};

export default function UnitConverter() {
  const [value, setValue] = useState(1);
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('kilometer');
  const [result, setResult] = useState<number | null>(null);

  const convert = () => {
    const meters = value * units[fromUnit];
    const converted = meters / units[toUnit];
    setResult(converted);
  };

  return (
    <section className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Length Unit Converter</h1>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full border rounded p-2 mb-4"
      />
      <div className="flex justify-between mb-4 gap-4">
        <select
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value)}
          className="flex-1 border rounded p-2"
        >
          {Object.keys(units).map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
        <select
          value={toUnit}
          onChange={(e) => setToUnit(e.target.value)}
          className="flex-1 border rounded p-2"
        >
          {Object.keys(units).map((unit) => (
            <option key={unit} value={unit}>
              {unit}
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
      {result !== null && (
        <p className="mt-4 text-gray-800 font-semibold">
          {value} {fromUnit} = {result.toFixed(4)} {toUnit}
        </p>
      )}
    </section>
  );
}
