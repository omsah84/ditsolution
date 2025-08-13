'use client';

import { useState } from 'react';

export default function NepaliSpellChecker() {
  const [inputText, setInputText] = useState('');
  const [checkedText, setCheckedText] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const mockSpellCheck = (text: string) => {
    const wrongWords = text.includes('गलत') ? ['गलत'] : [];
    setErrors(wrongWords);
    setCheckedText(text);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Nepali Spell Checker</h1>
      <textarea
        placeholder="Type or paste Nepali text here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="w-full h-40 p-4 border rounded mb-4"
      />
      <button
        onClick={() => mockSpellCheck(inputText)}
        className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Check Spelling
      </button>

      {errors.length > 0 ? (
        <div className="mt-4 text-red-600">
          <p>Spelling errors found:</p>
          <ul className="list-disc ml-6">
            {errors.map((word, idx) => (
              <li key={idx}>{word}</li>
            ))}
          </ul>
        </div>
      ) : checkedText ? (
        <p className="mt-4 text-green-600">No spelling errors found!</p>
      ) : null}
    </section>
  );
}
