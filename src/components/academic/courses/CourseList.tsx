"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import CourseCard from "./CourseCard";
import CoursesData from "@/context/data/data.json";

export default function CoursesList() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");

  // Dynamically generate categories and subcategories from CoursesData
  const categories = React.useMemo(() => {
    return Array.from(
      new Set(CoursesData.flatMap((course) => course.category || []))
    ).map((cat) => ({
      id: cat.toLowerCase().replace(/\s+/g, "-"),
      label: cat,
      subcategories: Array.from(
        new Set(
          CoursesData.filter((course) => course.category?.includes(cat)).flatMap(
            (course) => course.subcategory || []
          )
        )
      ),
    }));
  }, []);

  // Map category id (slug) back to label for filtering
  const categoryIdToLabel = React.useMemo(() => {
    const map = {};
    categories.forEach(({ id, label }) => {
      map[id] = label;
    });
    return map;
  }, [categories]);

  // Refs for scroll containers
  const categoryScrollRef = useRef(null);
  const subcategoryScrollRef = useRef(null);

  // Available subcategories based on selected category
  const availableSubcategories =
    selectedCategory === "all"
      ? [...new Set(categories.flatMap((cat) => cat.subcategories))]
      : categories.find((cat) => cat.id === selectedCategory)?.subcategories || [];

  // Convert selectedCategory id to original label for comparison
  const selectedCategoryLabel =
    selectedCategory === "all" ? "all" : categoryIdToLabel[selectedCategory];

  // Filter courses by search term
  const filterBySearch = (courses) =>
    courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Filter courses by category and subcategory
  const filteredCourses = filterBySearch(
    CoursesData.filter((course) => {
      if (selectedCategoryLabel === "all" && selectedSubcategory === "all") {
        return true;
      }
      if (selectedCategoryLabel === "all" && selectedSubcategory !== "all") {
        return (
          Array.isArray(course.subcategory) &&
          course.subcategory.includes(selectedSubcategory)
        );
      }
      if (selectedCategoryLabel !== "all") {
        if (
          !Array.isArray(course.category) ||
          !course.category.includes(selectedCategoryLabel)
        )
          return false;
        if (selectedSubcategory !== "all") {
          return (
            Array.isArray(course.subcategory) &&
            course.subcategory.includes(selectedSubcategory)
          );
        }
        return true;
      }
      return false;
    })
  );

  const coursesToShow = filteredCourses.slice(0, visibleCount);
  const handleSeeMore = () => setVisibleCount((prev) => prev + 8);
  const handleSeeLess = () => setVisibleCount((prev) => prev - 8);

  // Scroll functions for arrows
  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -150, behavior: "smooth" });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 150, behavior: "smooth" });
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Search */}
      <div className="mb-8 max-w-md mx-auto">
        <input
          type="search"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 rounded-lg border border-gray-300 shadow-sm text-lg placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
          aria-label="Search courses"
        />
      </div>

      {/* Category Tabs - Scrollable with arrows */}
      <nav aria-label="Course Categories" className="relative mb-6">
        {/* Left Arrow */}
        <button
          onClick={() => scrollLeft(categoryScrollRef)}
          aria-label="Scroll categories left"
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 z-20 flex items-center justify-center hover:bg-indigo-100 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Scrollable container */}
        <div
          ref={categoryScrollRef}
          className="flex space-x-4 overflow-x-auto no-scrollbar px-14"
          style={{ scrollPaddingLeft: "3.5rem", scrollPaddingRight: "3.5rem" }}
        >
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSelectedSubcategory("all");
              setVisibleCount(8);
            }}
            className={`whitespace-nowrap px-6 py-2 rounded-full font-semibold transition flex-shrink-0 ${
              selectedCategory === "all"
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-indigo-100"
            }`}
            aria-current={selectedCategory === "all" ? "true" : undefined}
          >
            All Categories
          </button>

          {categories.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => {
                setSelectedCategory(id);
                setSelectedSubcategory("all");
                setVisibleCount(8);
              }}
              className={`whitespace-nowrap px-6 py-2 rounded-full font-semibold transition flex-shrink-0 ${
                id === "upcoming"
                  ? selectedCategory === id
                    ? "bg-yellow-500 text-white ring-2 ring-yellow-400"
                    : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 ring-2 ring-yellow-300"
                  : selectedCategory === id
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-indigo-100"
              }`}
              aria-current={selectedCategory === id ? "true" : undefined}
            >
              <span
                className={`${
                  id === "upcoming" && selectedCategory === id
                    ? "text-glow-animation"
                    : ""
                }`}
              >
                {label}
              </span>
            </button>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scrollRight(categoryScrollRef)}
          aria-label="Scroll categories right"
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 z-20 flex items-center justify-center hover:bg-indigo-100 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </nav>

      {/* Subcategory Tabs - Scrollable with arrows */}
      <nav aria-label="Course Subcategories" className="relative mb-10">
        {/* Left Arrow */}
        <button
          onClick={() => scrollLeft(subcategoryScrollRef)}
          aria-label="Scroll subcategories left"
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-1.5 z-20 flex items-center justify-center hover:bg-indigo-100 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Scrollable container */}
        <div
          ref={subcategoryScrollRef}
          className="flex space-x-3 overflow-x-auto no-scrollbar px-12"
          style={{ scrollPaddingLeft: "3rem", scrollPaddingRight: "3rem" }}
        >
          {/* Optional "All Subcategories" button */}
          {/* <button
            onClick={() => {
              setSelectedSubcategory("all");
              setVisibleCount(8);
            }}
            className={`whitespace-nowrap px-5 py-1 rounded-full text-sm font-medium transition flex-shrink-0 ${
              selectedSubcategory === "all"
                ? "bg-indigo-600 text-white shadow"
                : "bg-gray-100 text-gray-600 hover:bg-indigo-100"
            }`}
            aria-current={selectedSubcategory === "all" ? "true" : undefined}
          >
            All Subcategories
          </button> */}

          {availableSubcategories.map((subcat) => (
            <button
              key={subcat}
              onClick={() => {
                setSelectedSubcategory(subcat);
                setVisibleCount(8);
              }}
              className={`whitespace-nowrap px-5 py-1  text-sm font-medium transition flex-shrink-0 ${
                selectedSubcategory === subcat
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-gray-100 text-gray-600 hover:bg-indigo-100"
              }`}
              aria-current={selectedSubcategory === subcat ? "true" : undefined}
            >
              {subcat}
            </button>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scrollRight(subcategoryScrollRef)}
          aria-label="Scroll subcategories right"
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-1.5 z-20 flex items-center justify-center hover:bg-indigo-100 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </nav>

      {/* Course Count */}
      <p className="text-center text-gray-700 mb-6 font-semibold">
        Showing {coursesToShow.length} of {filteredCourses.length} courses
      </p>

      {/* Courses Grid */}
      {coursesToShow.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {coursesToShow.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="group"
              aria-label={`View details for ${course.title}`}
            >
              <CourseCard course={course} />
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-20 text-lg">
          No courses found matching your criteria.
        </p>
      )}

      {/* See More & See Less Buttons */}
      <div className="flex justify-center mt-12 space-x-4">
        {visibleCount > 8 && (
          <button
            onClick={handleSeeLess}
            className="px-8 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-md shadow-lg transition focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            See Less
          </button>
        )}

        {visibleCount < filteredCourses.length && (
          <button
            onClick={handleSeeMore}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-lg transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            See More
          </button>
        )}
      </div>

      <style jsx>{`
        /* Hide scrollbar but allow scroll */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}
