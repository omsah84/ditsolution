"use client";

import React from "react";
import Link from "next/link";
import { AcademicCapIcon, CpuChipIcon } from "@heroicons/react/24/solid";
import { useMode } from "@/context/mode/useMode";

export default function Footer() {
  const { mode } = useMode();

  // Shared styles
  const baseBg = "bg-gray-900";
  const baseText = "text-gray-300";
  const basePadding = "py-12 px-6 md:px-12";
  const baseMaxWidth = "max-w-7xl mx-auto";
  const gridCols = mode === "academic" ? "md:grid-cols-5" : "md:grid-cols-4";
  const hoverColor = mode === "academic" ? "hover:text-indigo-400" : "hover:text-cyan-400";

  // Content for academic mode
  const academicContent = {
    logo: (
      <>
        <AcademicCapIcon className="w-8 h-8 text-indigo-500" />
        <span className="text-xl font-bold">Academic Platform</span>
      </>
    ),
    sections: [
      {
        title: "Quick Links",
        links: [
          { label: "About Us", href: "/about" },
          { label: "Contact", href: "/contact" },
          { label: "Terms of Service", href: "/terms" },
          { label: "Privacy Policy", href: "/privacy" },
        ],
      },
      {
        title: "Categories",
        links: [
          { label: "Loksewa Preparation", href: "/categories/loksewa" },
          { label: "MERN Stack", href: "/categories/mern-stack" },
          { label: "Ethical Hacking", href: "/categories/ethical-hacking" },
          { label: "Computer Basics", href: "/categories/computer-basics" },
          { label: "Banking & SSC", href: "/categories/banking-ssc" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Mock Tests", href: "/resources/mock-tests" },
          { label: "Previous Papers", href: "/resources/previous-papers" },
          { label: "Study Notes", href: "/resources/study-notes" },
          { label: "Video Lectures", href: "/resources/video-lectures" },
          { label: "Current Affairs", href: "/resources/current-affairs" },
        ],
      },
      {
        title: "Tools",
        links: [
          { label: "Preeti to Unicode", href: "/tools/preeti-to-unicode" },
          { label: "PDF to Word", href: "/tools/pdf-to-word" },
          { label: "Date Converter", href: "/tools/date-converter" },
        ],
      },
      {
        title: "Follow Us",
        custom: (
          <div className="flex space-x-4">
            {/* Twitter */}
            <a href="https://twitter.com" className={hoverColor} aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
              </svg>
            </a>
            {/* Facebook */}
            <a href="https://facebook.com" className={hoverColor} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="https://linkedin.com" className={hoverColor} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        ),
      },
    ],
    copyright: "Academic Platform",
  };

  // Content for tech mode
  const techContent = {
    logo: (
      <>
        <CpuChipIcon className="w-8 h-8 text-cyan-500" />
        <span className="text-xl font-bold">Tech Platform</span>
      </>
    ),
    sections: [
      {
        title: "Quick Links",
        links: [
          { label: "About Us", href: "/about" },
          { label: "Contact", href: "/contact" },
          { label: "Terms of Service", href: "/terms" },
          { label: "Privacy Policy", href: "/privacy" },
        ],
      },
      {
        title: "Features",
        links: [
          { label: "Code Preview", href: "/features/code-preview" },
          { label: "Deployment Tools", href: "/features/deployment-tools" },
          { label: "Integrations", href: "/features/integrations" },
          { label: "API Access", href: "/features/api-access" },
          { label: "Developer Console", href: "/features/dev-console" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Documentation", href: "/docs" },
          { label: "Blog", href: "/blog" },
          { label: "Changelog", href: "/changelog" },
          { label: "Support", href: "/support" },
        ],
      },
      {
        title: "Connect",
        custom: (
          <div className="flex space-x-4">
            {/* GitHub */}
            <a href="https://github.com" className={hoverColor} aria-label="GitHub" target="_blank" rel="noopener noreferrer">
              <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.26.82-.577v-2.234c-3.338.726-4.033-1.415-4.033-1.415-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.805 1.305 3.492.997.107-.776.418-1.305.762-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.467-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23A11.49 11.49 0 0 1 12 6.8c1.02.004 2.047.138 3.003.403 2.29-1.552 3.295-1.23 3.295-1.23.655 1.653.243 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.48 5.92.43.37.823 1.103.823 2.222v3.293c0 .32.218.694.825.576C20.565 21.796 24 17.3 24 12c0-6.63-5.37-12-12-12z"
                />
              </svg>
            </a>
            {/* Twitter */}
            <a href="https://twitter.com" className={hoverColor} aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 12 7v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="https://linkedin.com" className={hoverColor} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        ),
      },
    ],
    copyright: "Tech Platform",
  };

  // Choose content based on mode
  const content = mode === "academic" ? academicContent : techContent;

  return (
    <footer className={`${baseBg} ${baseText} ${basePadding}`}>
      <div className={`${baseMaxWidth} grid gap-8 grid-cols-1 ${gridCols}`}>
        {/* Logo and title */}
        <div className="flex flex-col items-start space-y-2">
          <div className="flex items-center gap-2">{content.logo}</div>
          <p className="text-sm mt-2">&copy; {new Date().getFullYear()} {content.copyright}. All rights reserved.</p>
        </div>

        {/* Sections */}
        {content.sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-white font-semibold mb-4">{section.title}</h3>
            {section.links ? (
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={`hover:underline ${hoverColor}`}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              section.custom
            )}
          </div>
        ))}
      </div>
    </footer>
  );
}
