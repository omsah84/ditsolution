'use client';

import React, { useState } from 'react';
import MCQModal from './MCQModal';

const testList = [
  {
    id: 1,
    title: 'General Knowledge Test',
    description: 'Test your knowledge on various topics.',
  },
  {
    id: 2,
    title: 'Math Test',
    description: 'Practice basic arithmetic and logic questions.',
  },
  {
    id: 3,
    title: 'English Grammar Test',
    description: 'Check your grammar, punctuation, and vocabulary skills.',
  },
  {
    id: 4,
    title: 'Computer Fundamentals Test',
    description: 'Basic computer knowledge and terminology.',
  },
  {
    id: 5,
    title: 'Nepal Constitution Test',
    description: 'Learn about the constitution and governance of Nepal.',
  },
  {
    id: 6,
    title: 'Science Quiz',
    description: 'Basic physics, chemistry, and biology questions.',
  },
  {
    id: 7,
    title: 'Current Affairs Test',
    description: 'Stay up to date with recent national and international events.',
  },
  {
    id: 8,
    title: 'History of Nepal Test',
    description: 'Explore historical facts and timelines of Nepal.',
  },
  {
    id: 9,
    title: 'Logical Reasoning Test',
    description: 'Test your problem-solving and logical thinking skills.',
  },
  {
    id: 10,
    title: 'Geography Quiz',
    description: 'Identify countries, capitals, mountains, and rivers.',
  },
];


export default function TestCardList() {
  const [selectedTestId, setSelectedTestId] = useState<number | null>(null);

  const handleCardClick = (id: number) => {
    setSelectedTestId(id);
  };

  const closeModal = () => {
    setSelectedTestId(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Available Tests</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {testList.map((test) => (
          <div
            key={test.id}
            onClick={() => handleCardClick(test.id)}
            className="cursor-pointer border p-6 rounded shadow hover:bg-gray-100 transition"
          >
            <h2 className="text-xl font-semibold mb-2">{test.title}</h2>
            <p className="text-gray-600">{test.description}</p>
          </div>
        ))}
      </div>

      {selectedTestId && (
        <MCQModal testId={selectedTestId} onClose={closeModal} />
      )}
    </div>
  );
}
