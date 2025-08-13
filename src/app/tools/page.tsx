"use client";

import React from "react";
import Link from "next/link";



export default function Page() {


  const tools = [
    {
      href: "/tools/preeti-to-unicode",
      title: "Preeti to Unicode",
      description:
        "Convert Nepali Preeti font text into Unicode format easily.",
    },
    {
      href: "/tools/pdf-to-word",
      title: "PDF to Word",
      description: "Convert your PDF documents into editable Word files.",
    },
    {
      href: "/tools/date-converter",
      title: "Date Converter",
      description: "Convert dates between AD and BS formats with ease.",
    },
    {
      href: "/tools/word-to-pdf",
      title: "Word to PDF",
      description: "Convert your Word files into PDF documents instantly.",
    },
    {
      href: "/tools/image-to-text",
      title: "Image to Text (OCR)",
      description: "Extract text content from images using OCR.",
    },
    {
      href: "/tools/nepali-spell-checker",
      title: "Nepali Spell Checker",
      description: "Check and correct spelling in Nepali text.",
    },
    {
      href: "/tools/currency-converter",
      title: "Currency Converter",
      description: "Convert between USD, NPR, EUR and more currencies.",
    },
    {
      href: "/tools/unit-converter",
      title: "Unit Converter",
      description: "Convert length units like meter, inch, foot, etc.",
    },
    {
      href: "/tools/pdf-compressor",
      title: "PDF Compressor",
      description: "Compress large PDF files without losing quality.",
    },
    {
      href: "/tools/text-to-speech",
      title: "Text to Speech (Nepali)",
      description: "Convert Nepali text into spoken audio using TTS.",
    },
    {
      href: "/tools/nepali-date-picker",
      title: "Nepali Date Picker",
      description: "Pick dates in both BS and AD formats.",
    },
    {
      href: "/tools/password-generator",
      title: "Password Generator",
      description: "Generate secure and random passwords quickly.",
    },
    {
      href: "/tools/image-to-pdf",
      title: "Image to PDF Converter",
      description:
        "Convert JPG or PNG images into a single downloadable PDF file.",
    },
  ];

  return (
    <>
      <main className="min-h-screen flex flex-col px-6 py-12 max-w-6xl mx-auto bg-white text-gray-900">
        {/* Hero Section */}
        <section className="mb-16 rounded-lg p-10 text-center shadow-md bg-indigo-100 shadow-indigo-300">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Welcome to Our Tools Hub
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-700">
            Discover powerful and easy-to-use tools designed to simplify your
            work and boost productivity.
          </p>
        </section>

        {/* Tools Grid */}
        <section className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 flex-grow">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="block p-6 rounded-lg shadow-md border border-gray-200 bg-white hover:shadow-lg transition-shadow cursor-pointer"
            >
              <h2 className="text-2xl font-semibold mb-2">{tool.title}</h2>
              <p className="mb-4 text-gray-500">{tool.description}</p>
              <span className="inline-block text-indigo-600 hover:text-indigo-500 font-medium">
                Open Tool &rarr;
              </span>
            </Link>
          ))}
        </section>
      </main>

   
    </>
  );
}
