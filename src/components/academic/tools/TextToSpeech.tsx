'use client';

import { useState } from 'react';

export default function TextToSpeech() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('');

  const speakText = () => {
    if (!text) return;
    setStatus('Playing speech...');
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ne-NP';
    utterance.onend = () => setStatus('Finished speaking');
    speechSynthesis.speak(utterance);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Text to Speech (Nepali)</h1>
      <textarea
        rows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type Nepali text here..."
        className="w-full p-4 border rounded mb-4"
      />
      <button
        onClick={speakText}
        className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Speak
      </button>
      <p className="mt-2 text-gray-600">{status}</p>
    </section>
  );
}
