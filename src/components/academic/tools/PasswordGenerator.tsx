'use client';

import { useState } from 'react';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    const chars =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    let pass = '';
    for (let i = 0; i < 12; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pass);
  };

  return (
    <section className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Password Generator</h1>
      <button
        onClick={generatePassword}
        className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Generate Password
      </button>
      {password && (
        <p className="mt-4 p-4 bg-gray-100 rounded font-mono text-lg">{password}</p>
      )}
    </section>
  );
}
