"use client";

import React, { useState } from "react";
import { ClipboardIcon, CheckIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

const codeSnippets = [
  {
    label: "Deploy",
    code: `// Example: Deploy with one command
import deploy from 'my-platform-sdk';

deploy({
  project: 'my-nextjs-app',
  env: 'production',
});`,
  },
  {
    label: "Fetch Data",
    code: `// Fetch data from API
import axios from 'axios';

const res = await axios.get('/api/data');
console.log(res.data);`,
  },
  {
    label: "Auth Setup",
    code: `// Setup authentication
import { auth } from 'my-auth-lib';

auth.loginWithGithub();`,
  },
];

export default function CodeShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeSnippets[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-gradient-to-br from-slate-100 to-slate-200 py-20 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Developer-Friendly APIs & Tools
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Integrate powerful tools with minimal setup. Switch between common
            use cases.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-4 justify-center flex-wrap">
          {codeSnippets.map((snippet, idx) => (
            <button
              key={snippet.label}
              onClick={() => setActiveTab(idx)}
              className={clsx(
                "px-4 py-2 rounded-full text-sm font-medium transition",
                activeTab === idx
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-blue-100"
              )}
            >
              {snippet.label}
            </button>
          ))}
        </div>

        {/* Code block */}
        <div className="relative bg-black text-green-400 font-mono text-sm rounded-xl p-6 overflow-x-auto shadow-xl transition">
          <pre>{codeSnippets[activeTab].code}</pre>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="absolute top-4 right-4 bg-white text-black px-2 py-1 rounded-md flex items-center gap-1 text-xs hover:bg-gray-100 transition"
          >
            {copied ? (
              <>
                <CheckIcon className="w-4 h-4 text-green-500" />
                Copied
              </>
            ) : (
              <>
                <ClipboardIcon className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
