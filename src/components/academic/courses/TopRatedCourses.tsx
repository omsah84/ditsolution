"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import CoursesData from "@/context/data/data.json";
import CourseCard from "./CourseCard";

export default function TopRatedCourses({ limit = 10 }) {
  const topRatedCourses = CoursesData.filter(
    (course) => Number(course.rating) >= 4.5
  ).slice(0, limit);

  const scrollRef = useRef(null);
  const [scrollDirection, setScrollDirection] = useState(1); // 1: right, -1: left

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollAmount = container.scrollLeft;
    const speed = 1; // pixels per frame approx
    let rafId;

    const step = () => {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      // Move scroll
      scrollAmount += speed * scrollDirection;

      // Change direction at edges
      if (scrollAmount >= maxScrollLeft) {
        scrollAmount = maxScrollLeft;
        setScrollDirection(-1);
      } else if (scrollAmount <= 0) {
        scrollAmount = 0;
        setScrollDirection(1);
      }

      container.scrollLeft = scrollAmount;

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(rafId);
  }, [topRatedCourses.length, scrollDirection]);

  if (topRatedCourses.length === 0) return null;

  return (
    <section className="mb-12 px-4">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-10 tracking-tight text-center">
        🌟 Top Rated Courses
      </h2>

      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto no-scrollbar scrollbar-hide scroll-smooth"
        style={{ scrollBehavior: "auto" }} // no smooth scroll for auto animation
      >
        {topRatedCourses.map((course) => (
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
