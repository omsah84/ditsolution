"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface Course {
  _id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  price: number;
  discountPrice?: number;
  rating?: number;
  reviewCount?: number;
  status: "active" | "inactive";
  category: string[];
  level: string;
  format: string;
  language: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export default function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:8000/api/v1/courses");
        setCourses(response.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Filter courses based on search term and status
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || course.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Render loading state
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
          <h3 className="font-medium">Error Loading Courses</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Render no courses found
  if (filteredCourses.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="text-gray-500 text-5xl mb-4">📚</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-500 mb-6">
            {courses.length === 0 
              ? "No courses available at the moment. Please check back later." 
              : "No courses match your search criteria. Try adjusting your filters."}
          </p>
          <button 
            onClick={() => {
              setSearchTerm("");
              setFilterStatus("all");
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Reset Filters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Course Catalog</h1>
            <p className="text-gray-600 mt-1">
              Showing {filteredCourses.length} of {courses.length} courses
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            <select
              value={filterStatus}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div 
            key={course._id} 
            className={`bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${
              course.status === "inactive" ? "opacity-80" : ""
            }`}
          >
            <div className="p-5">
              {/* Status Badge */}
              <div className="flex justify-between items-start mb-3">
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  course.status === "active" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-gray-100 text-gray-800"
                }`}>
                  {course.status === "active" ? "Active" : "Inactive"}
                </div>
                
                {/* Rating */}
                {course.rating !== undefined && (
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-sm font-medium text-gray-900">
                      {course.rating}
                      {course.reviewCount && (
                        <span className="text-gray-500 text-xs ml-1">({course.reviewCount})</span>
                      )}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Course Title and Subtitle */}
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.title}</h3>
              {course.subtitle && (
                <p className="text-gray-600 text-sm mb-3">{course.subtitle}</p>
              )}
              
              {/* Course Description */}
              <p className="text-gray-700 mb-4 line-clamp-2">{course.description}</p>
              
              {/* Metadata */}
              <div className="flex flex-wrap gap-2 mb-4">
                {course.category?.map((cat, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {cat}
                  </span>
                ))}
                
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {course.level}
                </span>
                
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                  {course.format}
                </span>
                
                {course.language?.map((lang, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"
                  >
                    {lang}
                  </span>
                ))}
              </div>
              
              {/* Price */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div>
                  <span className="text-lg font-bold text-gray-900">
                    ${course.discountPrice || course.price}
                  </span>
                  {course.discountPrice && (
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      ${course.price}
                    </span>
                  )}
                </div>
               
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}