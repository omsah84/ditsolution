"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function GenAICourseSection() {
  // ✅ Course data
  const allCourses = [
    {
      image: "/images/course1.jpg",
      badge: "Preview",
      org: "DeepLearning.AI",
      title: "AI Python for Beginners",
      type: "Course",
      category: "New",
    },
    {
      image: "/images/course2.jpg",
      badge: "Free Trial",
      org: "Google Cloud",
      title: "Generative AI with Google Cloud",
      type: "Specialization",
      category: "New",
    },
    {
      image: "/images/course3.jpg",
      badge: "Free Trial",
      org: "IBM",
      title: "Generative AI Fundamentals",
      type: "Specialization",
      category: "New",
    },
    {
      image: "/images/course4.jpg",
      badge: "Preview",
      org: "OpenAI",
      title: "Intro to ChatGPT for Beginners",
      type: "Course",
      category: "Beginner",
    },
    {
      image: "/images/course5.jpg",
      badge: "Free Trial",
      org: "DeepLearning.AI",
      title: "AI for Everyone",
      type: "Course",
      category: "Beginner",
    },
    {
      image: "/images/course6.jpg",
      badge: "Free Trial",
      org: "Coursera",
      title: "Generative AI for Beginners",
      type: "Specialization",
      category: "Beginner",
    },
    {
      image: "/images/course7.jpg",
      badge: "Free Trial",
      org: "Google Cloud",
      title: "Advanced Generative AI Tools",
      type: "Specialization",
      category: "Popular",
    },
    {
      image: "/images/course8.jpg",
      badge: "Preview",
      org: "IBM",
      title: "Machine Learning for Generative AI",
      type: "Course",
      category: "Popular",
    },
    {
      image: "/images/course9.jpg",
      badge: "Free Trial",
      org: "OpenAI",
      title: "Building AI Applications",
      type: "Specialization",
      category: "Popular",
    },
    {
      image: "/images/course10.jpg",
      badge: "Preview",
      org: "Google Cloud",
      title: "AI Tools for Developers",
      type: "Course",
      category: "Tools",
    },
    {
      image: "/images/course11.jpg",
      badge: "Free Trial",
      org: "DeepLearning.AI",
      title: "LangChain for GenAI",
      type: "Specialization",
      category: "Tools",
    },
    {
      image: "/images/course12.jpg",
      badge: "Free Trial",
      org: "IBM",
      title: "Generative AI API Integration",
      type: "Course",
      category: "Tools",
    },
  ];

  // ✅ Tabs + state
  const tabs = ["New", "Beginner", "Popular", "Tools"];
  const [activeTab, setActiveTab] = useState("Beginner");

  const filteredCourses = allCourses.filter(
    (course) => course.category === activeTab
  );

  return (
    <section className="  py-4 px-2 sm:px-3  m-auto">
      <div
        className="max-w-7xl mx-2 sm:mx-5 bg-white rounded-2xl shadow-xl p-4 sm:p-5 "
        style={{
          backgroundImage: "url('/images/bg-image.jpeg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right bottom",
          backgroundSize: "100% 100%",
        }}
      >
        {/* Header */}
        <div className="mb-5 text-left">
          <div className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2.5 py-0.5 rounded-full mb-2">
            Explore Generative AI
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            Master Generative AI
          </h1>
          <p className="text-gray-600 max-w-2xl text-sm">
            Identify, develop, and execute impactful GenAI business strategies
            with industry-leading courses.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-5 justify-start flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                activeTab === tab
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                  : "bg-white text-gray-700 hover:bg-gray-50 shadow"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-white"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-start h-full p-4 bg-white bg-opacity-80 backdrop-blur-sm">
                {/* Badge */}
                {course.badge && (
                  <span
                    className={`self-start mb-2 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      course.badge.includes("Free")
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {course.badge}
                  </span>
                )}

                <div className="flex-grow">
                  <div className="text-indigo-600 font-medium text-xs mb-1">
                    {course.org}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {course.title}
                  </h3>
                  <div className="inline-flex items-center text-gray-600 text-xs">
                    <span className="bg-gray-200 border-2 border-dashed rounded-xl w-3 h-3 mr-2"></span>
                    {course.type}
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200 ">
                  <button className="py-2 px-5 bg-white text-indigo-600 font-medium rounded-lg border border-indigo-200 hover:bg-indigo-50 transition-colors text-sm">
                    Explore Course
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-8 text-left">
          <button className="px-5 py-2.5 bg-white text-indigo-600 font-medium rounded-lg shadow hover:bg-gray-50 border border-gray-200 transition-colors text-sm">
            View All Courses
          </button>
        </div>
      </div>
    </section>
  );
}
