'use client';

import React, { useState, useEffect } from 'react';

type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
};

const questionsMap: Record<number, Question[]> = {
  1: [ // General Knowledge Test
    {
      id: 1,
      question: 'What is the capital of Nepal?',
      options: ['Pokhara', 'Kathmandu', 'Lalitpur', 'Biratnagar'],
      correctAnswer: 'Kathmandu',
    },
    {
      id: 2,
      question: 'Which planet is known as the Red Planet?',
      options: ['Earth', 'Venus', 'Mars', 'Jupiter'],
      correctAnswer: 'Mars',
    },
  ],
  2: [ // Math Test
    {
      id: 3,
      question: 'What is 5 + 7?',
      options: ['10', '11', '12', '13'],
      correctAnswer: '12',
    },
    {
      id: 4,
      question: 'What is the square root of 64?',
      options: ['6', '7', '8', '9'],
      correctAnswer: '8',
    },
  ],
  3: [ // English Grammar Test
    {
      id: 5,
      question: 'Which of the following is a noun?',
      options: ['Run', 'Happy', 'Book', 'Quickly'],
      correctAnswer: 'Book',
    },
    {
      id: 6,
      question: 'Choose the correct sentence:',
      options: [
        'He go to school.',
        'He goes to school.',
        'He gone to school.',
        'He going to school.',
      ],
      correctAnswer: 'He goes to school.',
    },
  ],
  4: [ // Computer Fundamentals Test
    {
      id: 7,
      question: 'What does CPU stand for?',
      options: [
        'Central Performance Unit',
        'Central Processing Unit',
        'Computer Personal Unit',
        'Central Programming Unit',
      ],
      correctAnswer: 'Central Processing Unit',
    },
    {
      id: 8,
      question: 'Which of these is an output device?',
      options: ['Keyboard', 'Mouse', 'Monitor', 'Scanner'],
      correctAnswer: 'Monitor',
    },
  ],
  5: [ // Nepal Constitution Test
    {
      id: 9,
      question: 'In which year was the current constitution of Nepal promulgated?',
      options: ['2063 BS', '2070 BS', '2072 BS', '2075 BS'],
      correctAnswer: '2072 BS',
    },
    {
      id: 10,
      question: 'Who is the head of the state in Nepal?',
      options: ['Prime Minister', 'Chief Justice', 'Speaker', 'President'],
      correctAnswer: 'President',
    },
  ],
  6: [ // Science Quiz
    {
      id: 11,
      question: 'Water boils at what temperature?',
      options: ['90°C', '95°C', '100°C', '105°C'],
      correctAnswer: '100°C',
    },
    {
      id: 12,
      question: 'Which gas do plants absorb from the atmosphere?',
      options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
      correctAnswer: 'Carbon Dioxide',
    },
  ],
  7: [ // Current Affairs Test
    {
      id: 13,
      question: 'Who is the current Prime Minister of Nepal? (as of 2025)',
      options: ['Sher Bahadur Deuba', 'Pushpa Kamal Dahal', 'KP Oli', 'Ram Chandra Poudel'],
      correctAnswer: 'Pushpa Kamal Dahal',
    },
    {
      id: 14,
      question: 'Which country recently hosted the 2024 Olympics?',
      options: ['USA', 'Japan', 'France', 'China'],
      correctAnswer: 'France',
    },
  ],
  8: [ // History of Nepal Test
    {
      id: 15,
      question: 'Who was the first king of unified Nepal?',
      options: ['Prithvi Narayan Shah', 'Mahendra', 'Birendra', 'Gyanendra'],
      correctAnswer: 'Prithvi Narayan Shah',
    },
    {
      id: 16,
      question: 'When did Nepal become a federal democratic republic?',
      options: ['2006', '2007', '2008', '2009'],
      correctAnswer: '2008',
    },
  ],
  9: [ // Logical Reasoning Test
    {
      id: 17,
      question: 'What comes next in the series: 2, 4, 8, 16, ?',
      options: ['18', '24', '32', '34'],
      correctAnswer: '32',
    },
    {
      id: 18,
      question: 'Find the odd one out: Apple, Orange, Banana, Carrot',
      options: ['Apple', 'Orange', 'Banana', 'Carrot'],
      correctAnswer: 'Carrot',
    },
  ],
  10: [ // Geography Quiz
    {
      id: 19,
      question: 'Which is the longest river in the world?',
      options: ['Amazon', 'Yangtze', 'Nile', 'Mississippi'],
      correctAnswer: 'Nile',
    },
    {
      id: 20,
      question: 'Mount Everest lies in which mountain range?',
      options: ['Andes', 'Alps', 'Himalayas', 'Rockies'],
      correctAnswer: 'Himalayas',
    },
  ],
};


export default function MCQModal({
  testId,
  onClose,
}: {
  testId: number;
  onClose: () => void;
}) {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // seconds
  const questions = questionsMap[testId] || [];

  const handleSelect = (qid: number, option: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [qid]: option }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeLeft(0);
    // Close modal after showing results for 5 seconds
    setTimeout(() => {
      onClose();
    }, 5000);
  };

  const isCorrect = (q: Question) => selectedAnswers[q.id] === q.correctAnswer;

  // Countdown timer effect
  useEffect(() => {
    if (submitted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(); // Auto-submit when timer ends
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted, timeLeft]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Test</h2>
          <button onClick={onClose} className="text-red-500 font-semibold text-sm">Close</button>
        </div>

        {!submitted && (
          <p className="text-sm text-red-600  mb-4 ">
            Time left: <span className="font-semibold">{timeLeft}s</span>
          </p>
        )}

        {questions.map((q) => (
          <div key={q.id} className="mb-6">
            <p className="font-medium mb-2">{q.question}</p>
            {q.options.map((opt) => (
              <label key={opt} className="block mb-1">
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  value={opt}
                  checked={selectedAnswers[q.id] === opt}
                  onChange={() => handleSelect(q.id, opt)}
                  className="mr-2"
                  disabled={submitted}
                />
                {opt}
              </label>
            ))}
            {submitted && (
              <p className={`mt-1 text-sm ${isCorrect(q) ? 'text-green-600' : 'text-red-600'}`}>
                {isCorrect(q) ? '✅ Correct' : `❌ Correct answer: ${q.correctAnswer}`}
              </p>
            )}
          </div>
        ))}

        {!submitted ? (
          <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
        ) : (
          <p className="mt-4 text-blue-600 font-medium">Test Completed! Closing shortly...</p>
        )}
      </div>
    </div>
  );
}
