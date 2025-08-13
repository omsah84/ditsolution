"use client";

import React, { useState } from "react";
import { AcademicCapIcon, CpuChipIcon } from "@heroicons/react/24/solid";
import { useMode } from "@/context/mode/useMode";
import Link from "next/link";

export default function Navbar() {
  const { mode, toggleMode } = useMode();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const academicNavItems = [
    { label: "Courses", href: "/courses" },
    { label: "Tools", href: "/tools" },
    { label: "Blog", href: "/blog" },
    { label: "Tests", href: "/tests" },
    { label: "Downloads", href: "/downloads" },
  ];

  const techNavItems = [
    { label: "Projects", href: "/projects" },
    { label: "Repositories", href: "/repos" },
    { label: "Deployments", href: "/deployments" },
  ];

  const navItems = mode === "academic" ? academicNavItems : techNavItems;

  const NAVBAR_HEIGHT = 56;

  // Handle drawer toggle checkbox state
  const handleDrawerToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDrawerOpen(e.target.checked);
  };

  return (
    <div className="drawer sticky top-0 left-0 z-30">
      <input
        id="my-drawer-3"
        type="checkbox"
        className="drawer-toggle"
        checked={drawerOpen}
        onChange={handleDrawerToggle}
      />
      <div className="drawer-content flex flex-col bg-base-100">
        {/* Navbar */}
        <div className="navbar bg-base-300 px-4 h-14">
          {/* Hamburger for mobile */}
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label={drawerOpen ? "close sidebar" : "open sidebar"}
              className="btn btn-square btn-ghost"
            >
              {drawerOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </label>
          </div>

          {/* Logo / Title */}
          <div className="flex-1 text-lg font-semibold">
            <Link href="/">Navbar Title</Link>
          </div>

          {/* Nav links for desktop */}
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link href="/">Home</Link>
              </li>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Mode toggle button */}
          <button
            onClick={toggleMode}
            className="ml-4 relative group inline-flex items-center gap-2 md:gap-3 px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white text-sm md:text-base font-medium shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-lg active:scale-95 focus:outline-none"
          >
            <span className="absolute inset-0 rounded-full bg-white opacity-10 blur-md group-hover:blur-lg transition duration-300" />
            <span className="relative flex items-center gap-2 z-10">
              {mode === "academic" ? (
                <>
                  <CpuChipIcon className="w-5 h-5 md:w-6 md:h-6" />
                  <span className="sm:inline">Tech Mode</span>
                </>
              ) : (
                <>
                  <AcademicCapIcon className="w-5 h-5 md:w-6 md:h-6" />
                  <span className="sm:inline">Academic Mode</span>
                </>
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Sidebar drawer content for mobile */}
      <div
        className="drawer-side"
        style={{
          position: "fixed",
          top: NAVBAR_HEIGHT,
          height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          zIndex: 1000,
        }}
      >
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-200 h-full overflow-auto">
          <li>
            <Link href="/">Home</Link>
          </li>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={() => setDrawerOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/about" onClick={() => setDrawerOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" onClick={() => setDrawerOpen(false)}>
              Contact
            </Link>
          </li>
          <li>
            <Link href="/terms" onClick={() => setDrawerOpen(false)}>
              Terms of Service
            </Link>
          </li>
          <li>
            <Link href="/privacy" onClick={() => setDrawerOpen(false)}>
              Privacy Policy
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
