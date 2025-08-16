"use client";

import { useState } from "react";
import Link from "next/link";
import {tabs} from "./tabs"; // your SEO-friendly tabs array

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const handleTabClick = (key: string) => {
    setActiveTab((prev) => (prev === key ? null : key)); // toggle collapse
  };

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen flex flex-col">
       <div className="px-6 py-4 text-2xl font-bold border-b border-gray-700">
        <Link
          href="/dashboard"
          className="hover:text-indigo-400 transition"
        >
          Admin Dashboard
        </Link>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {tabs.map(({ key, label, subtabs }) => (
          <div key={key}>
            {/* Main tab */}
            <button
              onClick={() => handleTabClick(key)}
              className={`w-full text-left px-3 py-2 rounded-md font-medium transition ${
                activeTab === key ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              {label}
            </button>

            {/* Subtabs */}
            {activeTab === key && subtabs && (
              <div className="ml-4 mt-1 space-y-1">
                {subtabs.map(({ key: subKey, label: subLabel, href }) => (
                  <Link
                    key={subKey}
                    href={href}
                    className="block w-full text-left px-3 py-1 rounded-md text-sm hover:bg-gray-700 transition"
                  >
                    {subLabel}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
