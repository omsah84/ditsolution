"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function CoursesTabs() {
  const courseData = {
    Trending: [
      {
        id: 1,
        title: "Fullstack Web Development",
        subtitle: "Become a MERN stack developer in 6 months",
        image: "/images/course-1.jpg",
        level: "Intermediate",
        duration: "6 months",
      },
      {
        id: 2,
        title: "UI/UX Design Mastery",
        subtitle: "Design stunning, user-friendly apps",
        image: "/images/course-2.jpg",
        level: "Beginner",
        duration: "3 months",
      },
    ],
    New: [
      {
        id: 3,
        title: "AI for Beginners",
        subtitle: "Start your journey into artificial intelligence",
        image: "/images/course-3.jpg",
        level: "Beginner",
        duration: "4 months",
      },
      {
        id: 4,
        title: "Cloud Computing 101",
        subtitle: "Master cloud tools and platforms",
        image: "/images/course-4.jpg",
        level: "Intermediate",
        duration: "5 months",
      },
    ],
    Upcoming: [
      {
        id: 5,
        title: "Blockchain Basics",
        subtitle: "Understand blockchain and crypto tech",
        image: "/images/course-5.jpg",
        level: "Advanced",
        duration: "8 weeks",
      },
      {
        id: 6,
        title: "DevOps Engineering",
        subtitle: "CI/CD pipelines and cloud deployment",
        image: "/images/course-6.jpg",
        level: "Advanced",
        duration: "10 weeks",
      },
    ],
  };

  const tabs = Object.keys(courseData);
  const [activeTab, setActiveTab] = useState("Trending");
  const [activeCourse, setActiveCourse] = useState(0);

  const nextCourse = () => {
    setActiveCourse((prev) => (prev + 1) % courseData[activeTab].length);
  };

  const prevCourse = () => {
    setActiveCourse((prev) =>
      prev === 0 ? courseData[activeTab].length - 1 : prev - 1
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="lg:pr-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">
            Transform Your Career with Our Courses
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Discover cutting-edge programs designed by industry experts to help
            you master in-demand skills and advance your career.
          </p>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1 mr-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-indigo-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Industry-Relevant Curriculum
                </h3>
                <p className="text-gray-600">
                  Courses updated regularly to reflect the latest industry
                  trends and technologies.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1 mr-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-indigo-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Hands-On Projects
                </h3>
                <p className="text-gray-600">
                  Build real-world projects to showcase your skills to
                  employers.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1 mr-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-indigo-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Expert Support
                </h3>
                <p className="text-gray-600">
                  Get guidance from experienced mentors throughout your learning
                  journey.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <Link href='courses' className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity shadow-lg">
              Explore All Courses
            </Link>
          </div>
        </div>

        {/* Right Content - Sliding Courses */}
        <div className="relative bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/80 rounded-3xl shadow-xl overflow-hidden border border-white/80 backdrop-blur-sm pb-10 h-full">
          {/* Background elements */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply blur-[100px] opacity-40" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply blur-[120px] opacity-40" />
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply blur-[90px] opacity-30" />

          {/* Tabs */}
          <div className="relative z-10 pt-8 flex justify-center">
            <div className="flex space-x-1 bg-white/80 backdrop-blur-sm p-1.5 rounded-xl border border-gray-200 shadow-sm">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setActiveCourse(0);
                  }}
                  className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                    tab === activeTab
                      ? "bg-white text-indigo-600 shadow-md"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content - Sliding Courses */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 px-4 sm:px-8 mt-10"
            >
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeTab}-${activeCourse}`}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="bg-white/90 backdrop-blur-sm border border-gray-200/80 rounded-2xl p-6 shadow-lg"
                  >
                    {courseData[activeTab].length > 0 && (
                      <>
                        <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6">
                          <Image
                            src={courseData[activeTab][activeCourse].image}
                            alt={courseData[activeTab][activeCourse].title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-3 right-3 bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                            {courseData[activeTab][activeCourse].level}
                          </div>
                        </div>

                        <div className="mb-6">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {courseData[activeTab][activeCourse].title}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {courseData[activeTab][activeCourse].subtitle}
                          </p>

                          <div className="flex items-center text-gray-500 text-sm mb-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            Duration:{" "}
                            {courseData[activeTab][activeCourse].duration}
                          </div>

                          <div className="flex items-center text-gray-500 text-sm">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                              />
                            </svg>
                            Beginner-friendly
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <Link
                            href="/courses"
                            className="text-sm font-medium bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-5 py-2.5 rounded-lg transition-colors"
                          >
                            View Courses
                          </Link>
                          <Link
                          href='/courses'
                           className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity">
                            Enroll Now
                          </Link>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 z-20">
                  <button
                    onClick={prevCourse}
                    className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-700"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                  <button
                    onClick={nextCourse}
                    className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-700"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Course Indicators */}
              <div className="flex justify-center mt-8 space-x-2">
                {courseData[activeTab].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCourse(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      index === activeCourse
                        ? "bg-indigo-600"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
