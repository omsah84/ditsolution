"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import CoursesData from "@/context/data/data.json";
import CourseCard from "./CourseCard";

export default function LevelFilterCourses({ limit = 10 }) {
  const [selectedLevel, setSelectedLevel] = useState("all");

const uniqueLevelsMap = new Map();

CoursesData.forEach(course => {
  const level = course.level?.trim();
  if (!level) return;

  const key = level.toLowerCase();
  if (!uniqueLevelsMap.has(key)) {
    uniqueLevelsMap.set(key, level); // store original casing
  }
});

const levels = Array.from(uniqueLevelsMap.values());

  const filteredCourses = CoursesData.filter(
    (course) => selectedLevel === "all" || course.level === selectedLevel
  ).slice(0, limit);

  const scrollRef = useRef(null);
  const isAutoScrolling = useRef(true);
  const scrollPos = useRef(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const speed = 0.8; // Slower speed

    let rafId;

    const step = () => {
      if (isAutoScrolling.current) {
        scrollPos.current -= speed; // Reverse direction

        if (scrollPos.current <= 0) {
          scrollPos.current = maxScrollLeft; // Loop to end when hitting left
        }

        container.scrollLeft = scrollPos.current;
      }

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [filteredCourses.length, selectedLevel]);

  const handlePrev = () => {
    const container = scrollRef.current;
    if (!container) return;
    isAutoScrolling.current = false;
    container.scrollBy({ left: -container.clientWidth / 2, behavior: "smooth" });
    setTimeout(() => (isAutoScrolling.current = true), 3000);
  };

  const handleNext = () => {
    const container = scrollRef.current;
    if (!container) return;
    isAutoScrolling.current = false;
    container.scrollBy({ left: container.clientWidth / 2, behavior: "smooth" });
    setTimeout(() => (isAutoScrolling.current = true), 3000);
  };

  if (filteredCourses.length === 0)
    return (
      <section className="mb-12 px-4">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight text-center">
          🎯 Courses by Level
        </h2>
        <p className="text-center text-gray-500">No courses found.</p>
      </section>
    );

  return (
    <section className="mb-12 px-4">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight text-center">
      Courses by Level
      </h2>

      {/* Filter Buttons */}
      <div className="flex justify-center flex-wrap gap-4 mb-8">
        <button
          onClick={() => setSelectedLevel("all")}
          className={`px-5 py-2 rounded-full font-semibold transition ${
            selectedLevel === "all"
              ? "bg-indigo-600 text-white shadow"
              : "bg-gray-200 text-gray-700 hover:bg-indigo-100"
          }`}
        >
          All Levels
        </button>
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => setSelectedLevel(level)}
            className={`px-5 py-2 rounded-full font-semibold transition ${
              selectedLevel === level
                ? "bg-indigo-600 text-white shadow"
                : "bg-gray-200 text-gray-700 hover:bg-indigo-100"
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Carousel */}
      <div className="relative">
        <button
          onClick={handlePrev}
          aria-label="Scroll Left"
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-indigo-600 text-white rounded-full p-3 shadow-md z-10 hover:bg-indigo-700 transition"
        >
          ‹
        </button>

        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto no-scrollbar scrollbar-hide scroll-smooth"
          style={{ scrollBehavior: "auto" }}
        >
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="flex-shrink-0 w-72 sm:w-64 md:w-72 lg:w-80"
              style={{ scrollSnapAlign: "start" }}
            >
              <Link href={`/courses/${course.id}`} className="block">
                <CourseCard course={course} />
              </Link>
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="Scroll Right"
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-indigo-600 text-white rounded-full p-3 shadow-md z-10 hover:bg-indigo-700 transition"
        >
          ›
        </button>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
